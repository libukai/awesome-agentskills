---
name: obsidian-to-x
description: 发布内容和文章到 X (Twitter)。支持常规推文(文字/图片/视频)和 X Articles(长文 Markdown)。使用真实 Chrome 浏览器绕过反机器人检测。当用户说"发推"、"发到 X"、"发到 twitter"、"分享到 X"、"分享到 twitter"、"发 tweet"、"同步到 X"、"发布到 X"、提到"X Articles"、想从 Obsidian 笔记发布长文内容、或需要转换 Obsidian Markdown 到 X 格式时使用。适用于所有 X/Twitter 发布任务。
---

# Post to X (Twitter)

Posts text, images, videos, and long-form articles to X via real Chrome browser (bypasses anti-bot detection).

## Default Behavior (No Additional Instructions)

When user invokes this skill without specifying what to publish (e.g., just says "发到 X" or uses slash command):

1. **Clean Chrome CDP processes first** (see [CDP Cleanup](#cdp-cleanup) below)

2. **Get current active file**，按优先级依次尝试：

   **优先级 1：`<current_note>` 标签（Claudian 注入，最准确）**
   检查用户消息末尾是否有 `<current_note>` 标签，直接提取路径，**无需执行任何命令**。

   **优先级 2：workspace.json（本地 fallback）**
   ```bash
   jq -r '.lastOpenFiles[] | select(endswith(".md"))' .obsidian/workspace.json | head -1
   ```

   **优先级 3：Obsidian CLI（最后手段）**
   ```bash
   obsidian file active
   ```

3. **Read the file content** using Read tool

4. **Auto-detect publishing type**:
   - Check if file has frontmatter with `是否长文: true`
   - **`是否长文: true`** → Publish as **X Article** (long-form)
   - **`是否长文: false`, `是否长文` absent, or no frontmatter** → Publish as **Regular Post** (short-form)

5. **Inform user** of detected type and proceed with publishing

6. **Execute appropriate workflow**:
   - For X Article: Publish with `x-article.ts` (handles Obsidian conversion internally)
   - For Regular Post: Convert with `md-to-post.ts` → Publish with `x-post.ts`

7. **Execute publishing scripts via Bash background process** (REQUIRED - do NOT use Agent `run_in_background=true`):
   - **Always use Bash `&` with log redirected to vault**: `bun ... > .temp/x-article-output.log 2>&1 &`
   - **Never use Agent tool with `run_in_background=true`** — the output file lands in `/private/tmp/` which is blocked by vault permission hooks, causing TaskOutput to fail and triggering a duplicate execution
   - Poll progress by reading `.temp/x-article-output.log` with `sleep N && cat .temp/x-article-output.log | tail -30`

8. **Success Detection**: Check `.temp/x-article-output.log` for success markers:
   - **Best method**: Count `Image upload verified` occurrences matching expected image count
   - **Alternative**: Look for `Post composed (preview mode)` or `Browser remains open`
   - **For X Articles**: Look for `Article composed` or `Browser remains open`
   - Use `sleep 15 && cat .temp/x-article-output.log | tail -30` to poll
   - Report success immediately when markers detected, don't wait for task completion

**Example**:
```
User: "发到 X"
AI: ✓ Detected current file: Articles/news/my-article.md
    ✓ Found `是否文章: true` → Publishing as X Article
    [proceeds with article publishing workflow]
```

## CDP Cleanup

Run this before every publishing script to prevent "Chrome debug port not ready" errors. Do it automatically — no need to ask the user.

```bash
pkill -f "Chrome.*remote-debugging-port"; pkill -f "Chromium.*remote-debugging-port"; sleep 2
```

---

## Content Types

**X Articles vs Regular Posts**:

| Feature | X Articles | Regular Posts |
|---------|-----------|---------------|
| Content | Rich text (Markdown) | Plain text only |
| Formatting | ✅ Bold, italic, headers, lists | ❌ All stripped |
| Code blocks | ✅ Syntax highlighting | ❌ Not supported |
| Images | ✅ Multiple images | ✅ Max 4 images |
| Length | Long-form (unlimited) | Short (280 chars) |
| Requirements | X Premium | Free |
| Script | `x-article.ts` | `x-post.ts` |
| Conversion | `md-to-article.ts` | `md-to-post.ts` |

**When to use**:
- **X Articles**: Blog posts, tutorials, technical articles with code
- **Regular Posts**: Quick updates, announcements, simple text + images


## Quick Start

For Obsidian users who want to publish the currently active article:

```bash
bash ${SKILL_DIR}/scripts/publish-active.sh
```

This automatically:
1. Detects the active file (via workspace.json or Obsidian CLI)
2. Converts Obsidian syntax to X format
3. Opens X Articles editor with content filled in

## Script Directory

**Important**: All scripts are located in the `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`
3. Replace all `${SKILL_DIR}` in this document with the actual path
4. Resolve `${BUN_X}` runtime: if `bun` installed → `bun`; if `npx` available → `npx -y bun`; else suggest installing bun

**Script Reference**:
| Script | Purpose |
|--------|---------|
| **Publishing Scripts** | |
| `scripts/x-post.ts` | Publish regular posts (text + images, max 4) |
| `scripts/x-video.ts` | Publish video posts (text + video) |
| `scripts/x-video-generate.ts` | Generate a video from a text prompt (MiniMax Hailuo) and hand it to `x-video.ts` |
| `scripts/x-quote.ts` | Publish quote tweet with comment |
| `scripts/x-article.ts` | Publish X Articles (rich text + images + code) |
| **Conversion Scripts** | |
| `scripts/md-to-post.ts` | Convert Obsidian Markdown → plain text + images (for Posts) |
| `scripts/md-to-article.ts` | Convert Obsidian Markdown → HTML + images (for Articles) |
| **Utilities** | |
| `scripts/publish-active.sh` | One-command publish for active Obsidian file |

## Prerequisites

- Google Chrome or Chromium
- `bun` runtime
- First run: log in to X manually (session saved)
- For Obsidian integration: `jq` tool (`brew install jq` on macOS)

## Pre-flight Check (Optional)

Before first use, suggest running the environment check:

```bash
${BUN_X} ${SKILL_DIR}/scripts/check-paste-permissions.ts
```

Checks: Chrome, Bun, Accessibility permissions, clipboard, paste keystroke.

**If any check fails**, provide fix guidance per item:

| Check | Fix |
|-------|-----|
| Chrome | Install Chrome or set `X_BROWSER_CHROME_PATH` env var |
| Bun runtime | `brew install oven-sh/bun/bun` (macOS) or `npm install -g bun` |
| Accessibility (macOS) | System Settings → Privacy & Security → Accessibility → enable terminal app |
| Paste keystroke (Linux) | Install `xdotool` (X11) or `ydotool` (Wayland) |

## Obsidian Integration

For Obsidian users, this skill can automatically detect the currently active file and convert Obsidian-specific syntax.

**Quick workflow**:
```bash
# One-command publish
bash ${SKILL_DIR}/scripts/publish-active.sh
```

**Manual workflow**:
```bash
# Step 1: Get active file (workspace.json method, 39x faster)
ACTIVE_FILE=$(jq -r '.lastOpenFiles[0]' .obsidian/workspace.json)

# Step 2: Publish (x-article.ts handles Obsidian conversion internally)
bun ${SKILL_DIR}/scripts/x-article.ts "$ACTIVE_FILE"
```

**For detailed Obsidian integration**, see `references/obsidian-integration.md`:
- How to detect active file (workspace.json vs CLI)
- Performance comparison (0.007s vs 0.274s)
- Error handling and fallback strategies

**For Obsidian syntax conversion**, see `references/obsidian-conversion.md`:
- Converting `![[]]` image syntax
- Handling Chinese frontmatter fields
- Manual conversion commands

---

## Regular Posts

Text + up to 4 images. **Plain text only** (all Markdown formatting stripped).

### From Obsidian Markdown

**Step 1: CDP cleanup** (see [CDP Cleanup](#cdp-cleanup) section)

**Step 2: Convert Markdown to plain text + images**

```bash
# Extract content from Markdown file
# Supports both standard Markdown ![](path) and Obsidian ![[path]] image syntax
# --output-dir keeps downloaded images inside the vault (.temp) to avoid permission issues
bun ${SKILL_DIR}/scripts/md-to-post.ts "Articles/my-post.md" --output-dir ".temp/x-post" > .temp/post-content.json
TEXT=$(jq -r '.text' .temp/post-content.json)
IMAGES=$(jq -r '.images[]' .temp/post-content.json)
```

**Image Syntax Support**:
- ✅ Standard Markdown: `![alt](path/to/image.png)`
- ✅ Obsidian syntax: `![[path/to/image.png]]`
- ✅ Network URLs: `![alt](https://example.com/image.jpg)` or `![[https://example.com/image.jpg]]`
- Local paths are converted to absolute paths
- Network images are automatically downloaded in parallel (3-4x faster than sequential)

**Step 2.5: 提取封面图作为第一张图**

从文件 frontmatter 中读取 `封面` 属性，若存在则将其路径作为第一张图片：

```bash
# 提取 封面 属性（支持 ![[path]] 和裸路径两种格式）
COVER_RAW=$(grep -m1 '^封面:' "Articles/my-post.md" | sed 's/^封面: *//' | tr -d '"')
# 解析 Obsidian wikilink 格式 ![[path]] → path
COVER_PATH=$(echo "$COVER_RAW" | sed 's/^!\[\[//;s/\]\]$//')

# 组合图片列表：封面优先，正文图片补充（总数上限 4 张）
IMAGE_ARGS=""
if [ -n "$COVER_PATH" ]; then
  IMAGE_ARGS="--image \"$COVER_PATH\""
fi
for img in $IMAGES; do
  IMAGE_ARGS="$IMAGE_ARGS --image \"$img\""
done
```

- 若 `封面` 属性为空或不存在，则跳过，仅使用正文图片
- 总图片数量上限 4 张（x-post.ts 限制），超出部分自动截断

**Step 3: Publish post**

```bash
eval "${BUN_X} ${SKILL_DIR}/scripts/x-post.ts \"$TEXT\" $IMAGE_ARGS"
```

### Direct Usage

```bash
${BUN_X} ${SKILL_DIR}/scripts/x-post.ts "Hello!" --image ./photo.png
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<text>` | Post content (plain text, positional) |
| `--image <path>` | Image file (repeatable, max 4) |
| `--profile <dir>` | Custom Chrome profile |

**Content Processing**:
- ✅ Plain text (all formatting stripped)
- ✅ Images (max 4)
- ❌ No rich text formatting
- ❌ No code blocks
- ❌ No HTML

**Browser Behavior**:
- Script opens browser with content filled in
- Browser **remains open** for manual review
- User can review, edit, and publish at their own pace
- User manually closes browser when done
- Add `--submit` flag to auto-publish (closes after 2 seconds)

**AI Success Detection** (for background execution):
- Don't wait for task completion (browser stays open indefinitely)
- **Best method**: Count `Image upload verified` in output matching expected image count
- **Alternative**: Check for `Post composed (preview mode)` or `Browser remains open`
- Use short timeout (10-15s) then check output content
- Report success immediately when markers detected
- Example workflow:
  ```
  1. Know you're uploading 3 images
  2. Wait 10-15s for uploads
  3. Check output: grep "Image upload verified" | wc -l
  4. If count == 3 → Report success immediately
  ```

---

## Video Posts

Text + video file.

**Step 1: CDP cleanup** (see [CDP Cleanup](#cdp-cleanup) section)

**Step 2: Publish video post**

```bash
${BUN_X} ${SKILL_DIR}/scripts/x-video.ts "Check this out!" --video ./clip.mp4
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<text>` | Post content (positional) |
| `--video <path>` | Video file (MP4, MOV, WebM) |
| `--profile <dir>` | Custom Chrome profile |

**Limits**: Regular 140s max, Premium 60min. Processing: 30-60s.

---

## Generate Video (Text-to-Video)

Generate a video from a text prompt with MiniMax Hailuo, then hand the downloaded
clip to the video posting workflow above.

**Step 1: Set credentials**

```bash
export MINIMAX_API_KEY=<your-key>
# Optional region override: global_en (default) or cn_zh
export MINIMAX_API_REGION=global_en
```

**Step 2: Generate (and optionally post)**

```bash
# Generate only — saves ./x-video-<task_id>.mp4 for review
${BUN_X} ${SKILL_DIR}/scripts/x-video-generate.ts --prompt "A cat surfing a wave at sunset"

# Generate and hand off to the X posting workflow
${BUN_X} ${SKILL_DIR}/scripts/x-video-generate.ts --prompt "Product demo" --post --text "New drop!"
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `--prompt <text>` | Text prompt for the video (required) |
| `--model <name>` | Model id (default: `MiniMax-Hailuo-2.3`) |
| `--region <name>` | Service region: `global_en` (default) or `cn_zh` |
| `--duration <seconds>` | Requested clip duration |
| `--resolution <value>` | Requested resolution (e.g. `768P`, `1080P`) |
| `--prompt-optimizer` / `--no-prompt-optimizer` | Toggle prompt optimization |
| `--fast-pretreatment` | Enable fast pretreatment |
| `--output <path>` | Where to save the downloaded video |
| `--post` | Hand the downloaded video to `x-video.ts` |
| `--submit` | When posting, actually publish (default: preview only) |
| `--text <text>` | Post text to use with `--post` |

**How it works**: the script creates a `/v1/video_generation` task, polls
`/v1/query/video_generation` until the video is ready, retrieves the file via
`/v1/files/retrieve`, downloads it, and (with `--post`) calls the same
`postVideoToX` flow used by `x-video.ts`.

**Environment**:
| Variable | Description |
|----------|-------------|
| `MINIMAX_API_KEY` | API key (required) |
| `MINIMAX_API_REGION` | Overrides `--region` when set |
| `MINIMAX_API_HOST` | Overrides the region host entirely |

---

## Quote Tweets

Quote an existing tweet with comment.

**Step 1: CDP cleanup** (see [CDP Cleanup](#cdp-cleanup) section)

**Step 2: Publish quote tweet**

```bash
${BUN_X} ${SKILL_DIR}/scripts/x-quote.ts https://x.com/user/status/123 "Great insight!"
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<tweet-url>` | URL to quote (positional) |
| `<comment>` | Comment text (positional, optional) |
| `--profile <dir>` | Custom Chrome profile |

---

## X Articles

Long-form Markdown articles (requires X Premium).

**Step 1: CDP cleanup** (see [CDP Cleanup](#cdp-cleanup) section)

**Step 2: Publish article**

```bash
${BUN_X} ${SKILL_DIR}/scripts/x-article.ts article.md
${BUN_X} ${SKILL_DIR}/scripts/x-article.ts article.md --cover ./cover.jpg
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<markdown>` | Markdown file (positional) |
| `--cover <path>` | Cover image |
| `--title <text>` | Override title |

**Frontmatter**: `title` / `标题`, `cover_image` / `封面` / `配图` supported in YAML front matter.

**Title Resolution** (for X Articles):
```bash
# 优先读 frontmatter 的 `标题` 属性，为空则 fallback 到文件名
TITLE=$(obsidian property:read name="标题" path="$NOTE_PATH" 2>/dev/null | tr -d '[:space:]')
if [ -z "$TITLE" ]; then
  TITLE=$(basename "$NOTE_PATH" .md)
fi
# 传入脚本
${BUN_X} ${SKILL_DIR}/scripts/x-article.ts "$NOTE_PATH" --title "$TITLE"
```

**Note**: Script opens browser with article filled in. User reviews and publishes manually.

### Code Blocks Support

Code blocks are automatically extracted from Markdown and inserted into X Articles editor. Supports all languages (JavaScript, Python, TypeScript, Rust, Go, Shell, etc.). No manual action required.

---

## Troubleshooting

**Common issues**:
- Chrome debug port not ready → Always clean CDP processes first (see above)
- macOS Accessibility Permission Error → Enable in System Settings
- Code blocks not inserting → Automatic, check console for errors
- Image temp path outside vault → `md-to-post.ts` downloads images to system `/tmp` by default, which may be blocked by vault-restricted hooks. **Fix**: always pass `--output-dir ".temp/x-post"` to keep images inside the vault:
  ```bash
  bun ${SKILL_DIR}/scripts/md-to-post.ts "Articles/my-post.md" --output-dir ".temp/x-post"
  ```

**For detailed troubleshooting**, see `references/troubleshooting.md`.

---

## References

- `references/obsidian-integration.md` - Obsidian file detection and integration
- `references/obsidian-conversion.md` - Converting Obsidian syntax to standard Markdown
- `references/regular-posts.md` - Regular posts workflow and troubleshooting
- `references/articles.md` - X Articles detailed guide
- `references/troubleshooting.md` - Common issues and solutions
- `references/browser-automation-lessons.md` - Browser automation patterns and lessons learned (CDP, DraftJS, background tabs)

## Extension Support

Custom configurations via EXTEND.md. Check these paths (priority order):
- `.libukai-skills/obsidian-to-x/EXTEND.md` (project directory)
- `$HOME/.libukai-skills/obsidian-to-x/EXTEND.md` (user home)

**EXTEND.md Supports**: Default Chrome profile

## Notes

- First run: manual login required (session persists)
- All scripts fill content into the browser and keep it open for manual review
- Browser remains open until user manually closes it (except when using `--submit` flag)
- Cross-platform: macOS, Linux, Windows
