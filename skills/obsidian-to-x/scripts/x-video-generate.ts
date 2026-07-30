import fs from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { sleep } from './x-utils.js';
import { postVideoToX } from './x-video.js';

// MiniMax Hailuo text-to-video generation.
//
// Turns a text prompt into a downloaded video file and (optionally) hands the
// result off to the existing x-video.ts posting workflow. The generation API is
// asynchronous: create a task, poll it until the video is ready, retrieve the
// file record, then download the video from its URL.

/** Supported MiniMax service regions. */
export type MiniMaxRegion = 'global_en' | 'cn_zh';

/** Host for each region's `/v1/video_generation` family of endpoints. */
export const MINIMAX_VIDEO_HOSTS: Record<MiniMaxRegion, string> = {
  global_en: 'https://api.minimax.io',
  cn_zh: 'https://api.minimaxi.com',
};

/** Endpoint paths shared by both regions. */
export const CREATE_PATH = '/v1/video_generation';
export const QUERY_PATH = '/v1/query/video_generation';
export const RETRIEVE_PATH = '/v1/files/retrieve';

/** Models exposed by the MiniMax Hailuo video generation API. */
export const MINIMAX_VIDEO_MODELS = [
  'MiniMax-Hailuo-2.3',
  'MiniMax-Hailuo-2.3-Fast',
  'MiniMax-Hailuo-02',
  'T2V-01-Director',
  'T2V-01',
  'I2V-01-Director',
  'I2V-01-live',
  'I2V-01',
] as const;

/** Default model used when the caller does not pass `--model`. */
export const DEFAULT_VIDEO_MODEL = 'MiniMax-Hailuo-2.3';

const DEFAULT_POLL_INTERVAL_MS = 5_000;
const DEFAULT_POLL_TIMEOUT_MS = 600_000;

interface BaseResp {
  status_code?: number;
  status_msg?: string;
}

interface FileRecord {
  download_url?: string;
  backup_download_url?: string;
}

/** Task lifecycle collapsed into the three states the poller cares about. */
export type TaskState = 'pending' | 'success' | 'fail';

/**
 * Normalize a region string. Accepts the canonical `global_en` / `cn_zh`
 * identifiers plus a few common aliases. Defaults to `global_en`.
 */
export function resolveRegion(input?: string): MiniMaxRegion {
  const value = (input ?? '').trim().toLowerCase();
  if (value === '' || value === 'global' || value === 'global_en' || value === 'international') {
    return 'global_en';
  }
  if (value === 'cn' || value === 'cn_zh' || value === 'china') {
    return 'cn_zh';
  }
  throw new Error(`Unknown region "${input}". Use "global_en" or "cn_zh".`);
}

/**
 * Resolve the API host. An explicit override (e.g. `MINIMAX_API_HOST`) wins;
 * otherwise the region's default host is used.
 */
export function resolveHost(region: MiniMaxRegion, override?: string): string {
  const trimmed = override?.trim();
  if (trimmed) return trimmed.replace(/\/+$/, '');
  return MINIMAX_VIDEO_HOSTS[region];
}

export interface GenerationParams {
  model?: string;
  prompt: string;
  promptOptimizer?: boolean;
  fastPretreatment?: boolean;
  duration?: number;
  resolution?: string;
  callbackUrl?: string;
}

/**
 * Build the request body for the text-to-video create call. Only `model` and
 * `prompt` are required; optional fields are included only when provided.
 */
export function buildGenerationBody(params: GenerationParams): Record<string, unknown> {
  if (!params.prompt || !params.prompt.trim()) {
    throw new Error('A non-empty prompt is required for text-to-video generation.');
  }
  const body: Record<string, unknown> = {
    model: params.model?.trim() || DEFAULT_VIDEO_MODEL,
    prompt: params.prompt,
  };
  if (params.promptOptimizer !== undefined) body.prompt_optimizer = params.promptOptimizer;
  if (params.fastPretreatment !== undefined) body.fast_pretreatment = params.fastPretreatment;
  if (params.duration !== undefined) body.duration = params.duration;
  if (params.resolution) body.resolution = params.resolution;
  if (params.callbackUrl) body.callback_url = params.callbackUrl;
  return body;
}

/** Throw when the API reports a non-zero `base_resp.status_code`. */
export function assertBaseResp(baseResp: BaseResp | undefined, context: string): void {
  if (baseResp && baseResp.status_code !== undefined && baseResp.status_code !== 0) {
    throw new Error(`${context} failed (status_code=${baseResp.status_code}): ${baseResp.status_msg ?? 'unknown error'}`);
  }
}

/** Map a raw task status string onto a coarse lifecycle state. */
export function classifyStatus(status: string | undefined): TaskState {
  switch ((status ?? '').trim()) {
    case 'Success':
      return 'success';
    case 'Fail':
      return 'fail';
    default:
      // Preparing / Queueing / Processing / empty are all "still working".
      return 'pending';
  }
}

/** Pull the downloadable video URL out of a file retrieve response. */
export function extractDownloadUrl(file: FileRecord | undefined): string {
  const url = file?.download_url || file?.backup_download_url;
  if (!url) throw new Error('File retrieve response did not include a download URL.');
  return url;
}

function authHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

/** Create a text-to-video task and return its task id. */
export async function createGenerationTask(
  host: string,
  apiKey: string,
  params: GenerationParams,
): Promise<string> {
  const res = await fetch(`${host}${CREATE_PATH}`, {
    method: 'POST',
    headers: authHeaders(apiKey),
    body: JSON.stringify(buildGenerationBody(params)),
  });
  if (!res.ok) throw new Error(`Create task request failed: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as { task_id?: string; base_resp?: BaseResp };
  assertBaseResp(data.base_resp, 'Create task');
  if (!data.task_id) throw new Error('Create task response did not include a task_id.');
  return data.task_id;
}

/** Query a task once, returning its coarse state and (when ready) the file id. */
export async function queryTask(
  host: string,
  apiKey: string,
  taskId: string,
): Promise<{ state: TaskState; status?: string; fileId?: string }> {
  const url = `${host}${QUERY_PATH}?task_id=${encodeURIComponent(taskId)}`;
  const res = await fetch(url, { method: 'GET', headers: authHeaders(apiKey) });
  if (!res.ok) throw new Error(`Query task request failed: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as { status?: string; file_id?: string; base_resp?: BaseResp };
  assertBaseResp(data.base_resp, 'Query task');
  return { state: classifyStatus(data.status), status: data.status, fileId: data.file_id };
}

/** Retrieve a file record and return its download URL. */
export async function retrieveFileUrl(host: string, apiKey: string, fileId: string): Promise<string> {
  const url = `${host}${RETRIEVE_PATH}?file_id=${encodeURIComponent(fileId)}`;
  const res = await fetch(url, { method: 'GET', headers: authHeaders(apiKey) });
  if (!res.ok) throw new Error(`File retrieve request failed: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as { file?: FileRecord; base_resp?: BaseResp };
  assertBaseResp(data.base_resp, 'File retrieve');
  return extractDownloadUrl(data.file);
}

/** Download a video from `url` to `destPath`, creating parent dirs as needed. */
export async function downloadVideo(url: string, destPath: string): Promise<string> {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Video download failed: ${res.status} ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(path.resolve(destPath)), { recursive: true });
  await writeFile(destPath, buffer);
  return path.resolve(destPath);
}

export interface GenerateVideoOptions extends GenerationParams {
  apiKey: string;
  region?: MiniMaxRegion;
  host?: string;
  outputPath?: string;
  pollIntervalMs?: number;
  pollTimeoutMs?: number;
}

/**
 * Full text-to-video pipeline: create task -> poll until ready -> retrieve the
 * file -> download it. Returns the absolute path of the downloaded video.
 */
export async function generateVideo(options: GenerateVideoOptions): Promise<string> {
  const region = options.region ?? 'global_en';
  const host = options.host ?? MINIMAX_VIDEO_HOSTS[region];
  const pollIntervalMs = options.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  const pollTimeoutMs = options.pollTimeoutMs ?? DEFAULT_POLL_TIMEOUT_MS;

  console.log(`[x-video-generate] Region: ${region} (${host})`);
  console.log(`[x-video-generate] Model: ${options.model?.trim() || DEFAULT_VIDEO_MODEL}`);
  console.log('[x-video-generate] Creating video generation task...');
  const taskId = await createGenerationTask(host, options.apiKey, options);
  console.log(`[x-video-generate] Task created: ${taskId}`);

  console.log('[x-video-generate] Waiting for video generation...');
  const start = Date.now();
  let fileId: string | undefined;
  while (Date.now() - start < pollTimeoutMs) {
    const { state, status, fileId: id } = await queryTask(host, options.apiKey, taskId);
    if (state === 'success') {
      if (!id) throw new Error('Task succeeded but no file_id was returned.');
      fileId = id;
      break;
    }
    if (state === 'fail') {
      throw new Error(`Video generation failed (status=${status ?? 'Fail'}).`);
    }
    console.log(`[x-video-generate] Status: ${status ?? 'pending'}...`);
    await sleep(pollIntervalMs);
  }
  if (!fileId) throw new Error('Timed out waiting for video generation to finish.');

  console.log('[x-video-generate] Retrieving generated file...');
  const downloadUrl = await retrieveFileUrl(host, options.apiKey, fileId);

  const outputPath = options.outputPath ?? `x-video-${taskId}.mp4`;
  console.log(`[x-video-generate] Downloading video to ${outputPath}...`);
  const savedPath = await downloadVideo(downloadUrl, outputPath);
  console.log(`[x-video-generate] Video saved: ${savedPath}`);
  return savedPath;
}

function printUsage(): never {
  console.log(`Generate a video from a text prompt (MiniMax Hailuo) and optionally post it to X.

Usage:
  npx -y bun x-video-generate.ts --prompt "<text>" [options]

Options:
  --prompt <text>        Text prompt for the video (required)
  --model <name>         Model id (default: ${DEFAULT_VIDEO_MODEL})
  --region <name>        Service region: global_en (default) or cn_zh
  --duration <seconds>   Requested clip duration
  --resolution <value>   Requested resolution (e.g. 768P, 1080P)
  --prompt-optimizer     Enable prompt optimization
  --no-prompt-optimizer  Disable prompt optimization
  --fast-pretreatment    Enable fast pretreatment
  --output <path>        Where to save the downloaded video (default: ./x-video-<task_id>.mp4)
  --post                 Hand the downloaded video to the X posting workflow
  --submit               When posting, actually publish (default: preview only)
  --text <text>          Post text to use with --post
  --profile <dir>        Chrome profile directory (used with --post)
  --help                 Show this help

Environment:
  MINIMAX_API_KEY        API key (required)
  MINIMAX_API_REGION     Overrides --region when set
  MINIMAX_API_HOST       Overrides the region host entirely

Examples:
  npx -y bun x-video-generate.ts --prompt "A cat surfing a wave at sunset"
  npx -y bun x-video-generate.ts --prompt "City timelapse" --region cn_zh --output ./clip.mp4
  npx -y bun x-video-generate.ts --prompt "Product demo" --post --submit --text "New drop!"
`);
  process.exit(0);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) printUsage();

  let prompt: string | undefined;
  let model: string | undefined;
  let regionInput: string | undefined;
  let duration: number | undefined;
  let resolution: string | undefined;
  let promptOptimizer: boolean | undefined;
  let fastPretreatment: boolean | undefined;
  let outputPath: string | undefined;
  let post = false;
  let submit = false;
  let text: string | undefined;
  let profileDir: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === '--prompt' && args[i + 1]) prompt = args[++i];
    else if (arg === '--model' && args[i + 1]) model = args[++i];
    else if (arg === '--region' && args[i + 1]) regionInput = args[++i];
    else if (arg === '--duration' && args[i + 1]) duration = Number.parseInt(args[++i]!, 10);
    else if (arg === '--resolution' && args[i + 1]) resolution = args[++i];
    else if (arg === '--prompt-optimizer') promptOptimizer = true;
    else if (arg === '--no-prompt-optimizer') promptOptimizer = false;
    else if (arg === '--fast-pretreatment') fastPretreatment = true;
    else if (arg === '--output' && args[i + 1]) outputPath = args[++i];
    else if (arg === '--post') post = true;
    else if (arg === '--submit') submit = true;
    else if (arg === '--text' && args[i + 1]) text = args[++i];
    else if (arg === '--profile' && args[i + 1]) profileDir = args[++i];
  }

  if (!prompt) {
    console.error('Error: --prompt <text> is required.');
    printUsage();
  }
  if (duration !== undefined && Number.isNaN(duration)) {
    throw new Error('--duration must be an integer number of seconds.');
  }

  const apiKey = process.env.MINIMAX_API_KEY?.trim();
  if (!apiKey) throw new Error('MINIMAX_API_KEY environment variable is required.');

  const region = resolveRegion(process.env.MINIMAX_API_REGION ?? regionInput);
  const host = resolveHost(region, process.env.MINIMAX_API_HOST);

  const videoPath = await generateVideo({
    apiKey,
    region,
    host,
    prompt: prompt!,
    model,
    duration,
    resolution,
    promptOptimizer,
    fastPretreatment,
    outputPath,
  });

  if (post) {
    console.log('[x-video-generate] Handing off to X posting workflow...');
    await postVideoToX({ text, videoPath, submit, profileDir });
  } else {
    console.log('[x-video-generate] Done. Add --post to publish the generated video to X.');
  }
}

if (import.meta.main) {
  await main().catch((err) => {
    console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  });
}

// Verify the downloaded file exists when this module drives a post handoff.
export function assertVideoExists(videoPath: string): void {
  if (!fs.existsSync(videoPath)) throw new Error(`Generated video not found: ${videoPath}`);
}
