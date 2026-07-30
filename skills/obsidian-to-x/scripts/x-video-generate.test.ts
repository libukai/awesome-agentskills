import { describe, expect, test } from 'bun:test';
import {
  DEFAULT_VIDEO_MODEL,
  MINIMAX_VIDEO_HOSTS,
  assertBaseResp,
  buildGenerationBody,
  classifyStatus,
  extractDownloadUrl,
  resolveHost,
  resolveRegion,
} from './x-video-generate.js';

describe('resolveRegion', () => {
  test('defaults to global_en', () => {
    expect(resolveRegion()).toBe('global_en');
    expect(resolveRegion('')).toBe('global_en');
    expect(resolveRegion('global')).toBe('global_en');
  });

  test('recognizes the CN region and aliases', () => {
    expect(resolveRegion('cn_zh')).toBe('cn_zh');
    expect(resolveRegion('cn')).toBe('cn_zh');
    expect(resolveRegion('China')).toBe('cn_zh');
  });

  test('rejects unknown regions', () => {
    expect(() => resolveRegion('mars')).toThrow();
  });
});

describe('resolveHost', () => {
  test('uses the region host by default', () => {
    expect(resolveHost('global_en')).toBe('https://api.minimax.io');
    expect(resolveHost('cn_zh')).toBe('https://api.minimaxi.com');
  });

  test('honors an explicit override and trims trailing slashes', () => {
    expect(resolveHost('global_en', 'https://proxy.example.com/')).toBe('https://proxy.example.com');
  });

  test('exposes both regional hosts', () => {
    expect(MINIMAX_VIDEO_HOSTS.global_en).toBe('https://api.minimax.io');
    expect(MINIMAX_VIDEO_HOSTS.cn_zh).toBe('https://api.minimaxi.com');
  });
});

describe('buildGenerationBody', () => {
  test('requires a non-empty prompt', () => {
    expect(() => buildGenerationBody({ prompt: '   ' })).toThrow();
  });

  test('defaults the model and omits unset optional fields', () => {
    const body = buildGenerationBody({ prompt: 'a calm ocean at dawn' });
    expect(body).toEqual({ model: DEFAULT_VIDEO_MODEL, prompt: 'a calm ocean at dawn' });
  });

  test('includes optional fields when provided', () => {
    const body = buildGenerationBody({
      prompt: 'a city timelapse',
      model: 'MiniMax-Hailuo-2.3-Fast',
      promptOptimizer: true,
      fastPretreatment: false,
      duration: 6,
      resolution: '1080P',
      callbackUrl: 'https://example.com/cb',
    });
    expect(body).toEqual({
      model: 'MiniMax-Hailuo-2.3-Fast',
      prompt: 'a city timelapse',
      prompt_optimizer: true,
      fast_pretreatment: false,
      duration: 6,
      resolution: '1080P',
      callback_url: 'https://example.com/cb',
    });
  });
});

describe('classifyStatus', () => {
  test('maps terminal and pending statuses', () => {
    expect(classifyStatus('Success')).toBe('success');
    expect(classifyStatus('Fail')).toBe('fail');
    expect(classifyStatus('Preparing')).toBe('pending');
    expect(classifyStatus('Queueing')).toBe('pending');
    expect(classifyStatus('Processing')).toBe('pending');
    expect(classifyStatus(undefined)).toBe('pending');
  });
});

describe('assertBaseResp', () => {
  test('passes on success code 0 or absent base_resp', () => {
    expect(() => assertBaseResp({ status_code: 0 }, 'ctx')).not.toThrow();
    expect(() => assertBaseResp(undefined, 'ctx')).not.toThrow();
  });

  test('throws on a non-zero status code', () => {
    expect(() => assertBaseResp({ status_code: 1004, status_msg: 'bad key' }, 'Create task')).toThrow(/1004/);
  });
});

describe('extractDownloadUrl', () => {
  test('prefers download_url and falls back to backup', () => {
    expect(extractDownloadUrl({ download_url: 'https://a/v.mp4' })).toBe('https://a/v.mp4');
    expect(extractDownloadUrl({ backup_download_url: 'https://b/v.mp4' })).toBe('https://b/v.mp4');
  });

  test('throws when no URL is present', () => {
    expect(() => extractDownloadUrl({})).toThrow();
    expect(() => extractDownloadUrl(undefined)).toThrow();
  });
});
