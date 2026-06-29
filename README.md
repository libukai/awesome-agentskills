<div>
  <p align="center">
    <a href="https://platform.composio.dev/?utm_source=Github&utm_medium=Youtube&utm_campaign=2025-11&utm_content=AwesomeSkills">
    <img width="1280" height="640" alt="Composio banner" src="assets/media/awesome-agent-skills.png">
    </a>
  </p>
</div>

<div>
  <p align="center">
    <a href="https://awesome.re">
      <img src="https://awesome.re/badge.svg" alt="Awesome" />
    </a>
    <a href="https://makeapullrequest.com">
      <img src="https://img.shields.io/badge/Issues-welcome-brightgreen.svg?style=flat-square" alt="Issues Welcome" />
    </a>
    <a href="https://www.apache.org/licenses/LICENSE-2.0">
      <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square" alt="License: Apache-2.0" />
    </a>
  </p>
</div>

<div align="center">

简体中文 | [English](docs/README_EN.md) | [日本語](docs/README_JA.md) 

</div>

本项目致力于遵循少而精的原则，收集和分享最优质的 Skill 资源、教程和实践案例，帮助更多人轻松迈出搭建 Agent 的第一步。

> 如果觉得这个项目对你有所帮助，还请帮忙点个 🌟 让更多人知晓。同时，也欢迎关注我的 𝕏 账号 [@李不凯正在研究](https://x.com/libukai) ，即时获取 Agent Skill 的最新资源和实战教程！

## 快速入门

Skill 是一种轻量级的 Agent 构建方案，通过封装特定的业务流程与行业知识，强化 AI 执行特定任务的专业能力。

面对重复性的任务需求，你无需在每次对话中反复输入背景信息。只需安装对应的 Skill，AI 即可习得该领域的专业技能。

历经半年的迭代演进，Skill 已成为增强 AI 垂直领域能力的标准方案，并获得了各类 Agent 框架与 AI 产品的广泛支持。

## 标准结构

根据标准定义，每个 Skill 都是一个规范化命名的文件夹，其中包含了流程、资料、脚本等各类资源。通过在上下文中渐进式导入这些文件，AI 即可学会相应的技能。

```markdown
my-skill/
├── SKILL.md          # 必需：流程说明和元数据
├── references/       # 可选：参考资料
├── scripts/          # 可选：可执行脚本
└── assets/           # 可选：模板、资源
```

## 安装技能

Skill 可以在 Claude 和 ChatGPT 这类 GUI 的 App 中使用，也可以在 Cursor 和 Claude Code 这类编程 IDE 及 TUI CLI 中使用，还可以在 OpenClaw 等 Agent Harness 上使用。

安装 Skill 过程的本质，其实就是将 Skill 对应的文件夹放到特定的目录下，以便 AI 能按需加载和使用。

### 类 Claude App 生态

![](assets/media/claude_app.png)

目前在 App 中使用 Skill 的方式主要有两种：通过 App 自带的 Skill 商店安装，或者通过上传压缩包的方式安装。

对于官方商店中没有的 Skill，可以从下方推荐的 Skill 第三方商店中下载并手动上传安装。

### 类 Claude Code 生态

![](assets/media/skills_mp.png)

推荐使用 [skillsmp](https://skillsmp.com/zh) 商店，该商店中自动抓取了 Github 上的所有的 Skill 项目，并按照分类、更新时间、星标数量等标签进行了分类整理。

可辅助使用 Vercel 出品的 [skills.sh](https://skills.sh/) 排行榜，直观查看当前最受欢迎的 Skills 仓库和单个 Skill 的使用情况。

对于特定的 skill，使用 `npx skills` 命令行工具可快速发现、添加和管理 skill，具体参数详见 [vercel-labs/skills](https://github.com/vercel-labs/skills)。

```bash
npx skills find [query]                          # 搜索相关技能
npx skills add <owner/repo>                      # 安装技能（支持 GitHub 简写、完整 URL、本地路径）
npx skills list                                  # 列出已安装的技能
npx skills check                                 # 检查可用更新
npx skills update                                # 升级所有技能
npx skills remove [skill-name]                   # 卸载技能
```

### 类 OpenClaw 生态

![](assets/media/clawhub.png)

如果有科学上网的能力，且使用官方版本 OpeClaw，推荐使用官方的 [ClawHub](https://clawhub.com/) 商店，提供的技能更偏技术向且包含了大量海外产品的整合。

```bash
npx clawhub search [query]          # 搜索相关技能
npx clawhub explore                 # 浏览技能市场
npx clawhub install <slug>          # 安装技能
npx clawhub uninstall <slug>        # 卸载技能
npx clawhub list                    # 列出已安装的技能
npx clawhub update --all            # 升级所有技能
npx clawhub inspect <slug>          # 查看技能详情（不安装）
```

![](assets/media/skillshub.png)

对于主要在国内网络环境下使用，或者是使用国内定制版的 OpenClaw，推荐使用腾讯推出的 [SkillHub](https://skillhub.tencent.com/) 商店，提供了大量更符合中国用户使用需求的技能。

首先，需要安装 Skill Hub CLI 工具，可以通过以下命令进行安装：

```bash
curl -fsSL https://skillhub-1388575217.cos.ap-guangzhou.myqcloud.com/install/install.sh | bash
```

安装完成后，可以使用以下命令来安装和管理技能：

```bash
skillhub search [query] # 搜索相关技能
skillhub install <skill-name> # 使用 skill name 添加技能
skillhub list # 列出已安装的技能
skillhub upgrade # 升级已安装的技能
```

## 优质教程

### 官方文档

- @Anthropic：[Claude Skill 完全构建指南](docs/Claude-Skills-完全构建指南.md) 
- @Anthropic：[Claude Agent Skills 实战经验](docs/Claude-Code-Skills-实战经验.md)
- @Google：[Agent Skills 五种设计模式](docs/Agent-Skill-五种设计模式.md)

### 图文教程

  - @李不凯正在研究：[Agent Skills 简要介绍 PPT](/assets/docs/Agent%20Skills%20终极指南.pdf)
-   @一泽 Eze：[Agent Skills 终极指南：入门、精通、预测](https://mp.weixin.qq.com/s/jUylk813LYbKw0sLiIttTQ)
-   @deeptoai：[Claude Agent Skills 第一性原理深度解析](https://skills.deeptoai.com/zh/docs/ai-ml/claude-agent-skills-first-principles-deep-dive)

### 视频教程

-   @马克的技术工作坊：[Agent Skill 从使用到原理，一次讲清](https://www.youtube.com/watch?v=yDc0_8emz7M)
-   @宝玉：[Agent Skills 设计哲学和实战进化](https://x.com/dotey/status/2036114136245969025)

## 官方项目

<table>
<tr><th colspan="5">🤖 AI 模型与平台</th></tr>
<tr>
<td><a href="https://github.com/anthropics/skills">anthropics</a></td>
<td><a href="https://github.com/openai/skills">openai</a></td>
<td><a href="https://github.com/google-gemini/gemini-skills">gemini</a></td>
<td><a href="https://github.com/huggingface/skills">huggingface</a></td>
<td><a href="https://github.com/replicate/skills">replicate</a></td>
</tr>
<tr>
<td><a href="https://github.com/elevenlabs/skills">elevenlabs</a></td>
<td><a href="https://github.com/black-forest-labs/skills">black-forest-labs</a></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr><th colspan="5">☁️ 云服务与基础设施</th></tr>
<tr>
<td><a href="https://github.com/cloudflare/skills">cloudflare</a></td>
<td><a href="https://github.com/hashicorp/agent-skills">hashicorp</a></td>
<td><a href="https://github.com/databricks/databricks-agent-skills">databricks</a></td>
<td><a href="https://github.com/ClickHouse/agent-skills">clickhouse</a></td>
<td><a href="https://github.com/supabase/agent-skills">supabase</a></td>
</tr>
<tr>
<td><a href="https://github.com/stripe/ai">stripe</a></td>
<td><a href="https://github.com/launchdarkly/agent-skills">launchdarkly</a></td>
<td><a href="https://github.com/getsentry/skills">sentry</a></td>
<td></td>
<td></td>
</tr>
<tr><th colspan="5">🛠️ 开发框架与工具</th></tr>
<tr>
<td><a href="https://github.com/vercel-labs/agent-skills">vercel</a></td>
<td><a href="https://github.com/microsoft/agent-skills">microsoft</a></td>
<td><a href="https://github.com/expo/skills">expo</a></td>
<td><a href="https://github.com/better-auth/skills">better-auth</a></td>
<td><a href="https://github.com/posit-dev/skills">posit</a></td>
</tr>
<tr>
<td><a href="https://github.com/remotion-dev/skills">remotion</a></td>
<td><a href="https://github.com/slidevjs/slidev">slidev</a></td>
<td><a href="https://github.com/vercel-labs/agent-browser">agent-browser</a></td>
<td><a href="https://github.com/browser-use/browser-use">browser-use</a></td>
<td><a href="https://github.com/firecrawl/cli">firecrawl</a></td>
</tr>
<tr>
<td><a href="https://github.com/greensock/gsap-skills">gsap</a></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr><th colspan="5">📝 内容与协作</th></tr>
<tr>
<td><a href="https://github.com/makenotion/skills">notion</a></td>
<td><a href="https://github.com/kepano/obsidian-skills">obsidian</a></td>
<td><a href="https://github.com/WordPress/agent-skills">wordpress</a></td>
<td><a href="https://github.com/langgenius/dify">dify</a></td>
<td><a href="https://github.com/sanity-io/agent-toolkit">sanity</a></td>
</tr>
<tr>
<td><a href="https://github.com/hardhackerlabs/podwise">podwise-cli</a></td>
<td><a href="https://github.com/wpsnote/wpsnote-skills">wps</a></td>
<td><a href="https://github.com/marswaveai/skills">listenhub</a></td>
<td></td>
<td></td>
</tr>
</table>

## 精选技能

### 编程开发

-   [superpowers](https://github.com/obra/superpowers)：涵盖完整编程项目工作流程
-   [frontend-design](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design)：前端设计技能
-   [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)：更精致和个性化的 UI/UX 设计
-   [code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review)：代码审查技能
-   [code-simplifier](hhttps://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier)：代码简化技能
-   [commit-commands](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands)：Git 提交技能


### 内容创作

-   [baoyu-skills](https://github.com/JimLiu/baoyu-skills)：宝玉的自用 SKills 集合，包括公众号写作、PPT 制作等
-   [libukai](https://github.com/libukai/awesome-agent-skills): Obsidian 相关技能集合，专门适配 Obsidian 的写作场景
-   [op7418](https://github.com/op7418)：歸藏创作的高质量 PPT 制作、Youtube 分析技能
-   [cclank](https://github.com/cclank/news-aggregator-skill)：自动抓取和总结指定领域的最新资讯
-   [huangserva](https://github.com/huangserva/skill-prompt-generator)：生成和优化 AI 人像文生图提示词
-   [dontbesilent](https://github.com/dontbesilent2025/dbskill)： X 万粉大V 基于自己的推文制作的内容创作框架
-   [seekjourney](https://github.com/geekjourneyx/md2wechat-skill/)：从写作到发布的 AI 辅助公众号写作

### 产品使用

-   [wps](https://github.com/wpsnote/wpsnote-skills)：操控 WPS 办公软件
-   [notebooklm](https://github.com/teng-lin/notebooklm-py)：操控 NotebookLM 
-   [n8n](https://github.com/czlonkowski/n8n-skills)：创建 n8n 工作流
-   [threejs](https://github.com/cloudai-x/threejs-skills)： 辅助开发 Three.js 项目

### 其他类型

-  [pua](https://github.com/tanweai/pua)：以 PUA 的方式驱动 AI 更卖力的干活
-   [office-hours](https://github.com/garrytan/gstack/tree/main/office-hours)：使用 YC 的视角提供各种创业建议
-   [marketingskills](https://github.com/coreyhaines31/marketingskills)：强化市场营销的能力
-   [scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)： 提升科研工作者的技能


## 安全审查

由于 Skill 中可能包含了调用外部 API、静默执行定时脚本等具有潜在风险的操作，因此在设计和使用 Skill 时，务必高度重视安全问题。

建议在安装 Skill 时，优先选择来自官方商店或知名第三方商店的 Skill，并仔细阅读 Skill 的描述和用户评价，避免安装来源不明的 Skill。

对于安全性要求性较高的场景，可以使用 @余弦 的 [slowmist-agent-security skill](https://github.com/slowmist/slowmist-agent-security) 对 Skill 进行安全审计和风险评估，确保 Skill 的安全性和可靠性。

如果使用 OpenClaw 这类具有高度自主权限的 Agent Harness，建议配合使用 [OpenClaw极简安全实践指南](https://github.com/slowmist/openclaw-security-practice-guide) ，通过系统提示词级别的安全约束，最大程度地降低潜在风险。

## 创建技能

虽然可以通过技能商店直接安装他人创建的技能，但是为了提升技能的适配度和个性化，强烈建议根据需要自己动手创建技能，或者在其他人的基础上进行微调。

### 官方插件

通过官方出品的  [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) 插件可快速创建和迭代个人专属的 skill。


![](assets/media/skill-creator.png)

### 增强插件

在官方 skill-creator plugin 的基础上，本项目整合来自 Anthropic 和 Google 团队的最佳实践，构建了一个更为强大的 Agent Skills Toolkit，帮助你快速创建和改进 Agent Skills。（**注意：该插件目前仅支持 Claude Code**）

#### 添加市场

启动 Claude Code，进入插件市场，添加 `libukai/awesome-agent-skills` 市场，也可以直接在输入框中使用以下指令添加市场：

```bash
/plugin marketplace add libukai/awesome-agent-skills
```

#### 安装插件

成功安装市场之后，选择安装 `agent-skills-toolkit` 插件

![](assets/media/skill-creator-pro.png)

#### 快捷指令

插件中置入了多个快捷指令，覆盖了从创建、改进、测试到优化技能描述的完整工作流程：

- `/agent-skills-toolkit:skill-creator-pro` - 完整工作流程
- `/agent-skills-toolkit:create-skill` - 创建新 skill
- `/agent-skills-toolkit:improve-skill` - 改进现有 skill
- `/agent-skills-toolkit:test-skill` - 测试评估 skill

## 技能索引推荐

- [Skill Hub](https://github.com/rdone4425/skill) — 收录分类 4133+ 个 AI Agent Skills，按 22 个类别（开发工具、Agent框架、设计UI等）组织，支持按平台筛选（Claude Code、Codex、Cursor、Hermes、OpenCode）。中英双语。[在线访问](https://skill.442595.xyz/)

## 致谢

![](assets/media/talk_is_cheap.jpg)

## 项目历史

[![Star History Chart](https://api.star-history.com/svg?repos=libukai/awesome-agent-skills&type=date&legend=top-left)](https://www.star-history.com/#libukai/awesome-agent-skills&type=date&legend=top-left)
