<div>
  <p align="center">
    <a href="https://platform.composio.dev/?utm_source=Github&utm_medium=Youtube&utm_campaign=2025-11&utm_content=AwesomeSkills">
    <img width="100%" alt="Composio banner" src="assets/media/awesome-agent-skills.png">
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

本项目致力于遵循少而精的原则，收集和分享最优质的 Skill 资源、教程和实践案例，帮助更多人轻松迈出构建个性化 Agent 的第一步。

> 如果觉得这个项目对你有所帮助，还请帮忙点个 🌟 让更多人知晓。同时，也欢迎关注我的 𝕏 账号 [@李不凯正在研究](https://x.com/libukai) ，获取有关 Agent Skill 的最新资源和实战教程！

## 快速入门

Skill 是一种轻量级的 Agent 构建方案，通过封装特定的业务流程与行业知识，强化 AI 执行特定任务的专业能力。

![](assets/media/model-harness-skill.png)

面对重复性的任务需求，你无需在每次对话中反复输入背景信息。只需安装对应的 Skill，Agent 即可习得该领域的专业技能。

历经接近一年的迭代演进，Skill 已成为增强 AI 垂直领域能力的标准方案，获得了主流 Harness 框架与 AI 产品的广泛支持。


## 支持状况

Skill 开放规范已经被 Claude Code、ChatGPT 与 Codex、GitHub Copilot、Cursor、Gemini CLI、VS Code、OpenCode、Kiro、JetBrains Junie 等大量宿主采用。不同宿主的搜索路径和实验字段支持度可能不同，请以 [Agent Skills Client Showcase](https://agentskills.io/clients) 和对应产品文档为准。

## 标准结构

Agent Skills 是由 Anthropic 发起、社区共同维护的[开放规范](https://agentskills.io/specification)。每个 Skill 都是一个规范化命名的文件夹，其中包含流程、资料、脚本等资源；Agent 通过渐进式加载减少无关上下文。

```markdown
my-skill/
├── SKILL.md          # 必需：元数据 + 使用说明
├── scripts/          # 可选：可执行代码
├── references/       # 可选：参考资料和文档
├── assets/           # 可选：模板、资源
└── ...               # 其他附加文件或者文件夹
```

一个最精简的 Skill 中，至少需要包含 `SKILL.md` 这个文件。

`SKILL.md` 的 YAML frontmatter 必须包含 `name` 和 `description`，还可声明 `license`、`compatibility`、`metadata`，以及实验性的 `allowed-tools`。

`name` 最长 64 个字符，只能使用小写字母、数字和连字符，且必须与父目录一致；`description` 最长 1024 个字符，需要同时说明“做什么”和“何时使用”。正文建议少于 500 行、5000 tokens，详细内容应拆到独立资源文件中。

除 `SKILL.md` 外，还可以按需加入以下文件或目录：

- `scripts/`：存放可直接执行的代码，适合固化重复、复杂或需要确定性结果的操作，例如数据处理、格式转换和结果校验。
- `references/`：存放 Agent 仅在特定任务中才需要阅读的补充资料，例如领域知识、技术文档、示例和数据格式说明。
- `assets/`：存放执行或产出时使用的静态资源，例如文档模板、配置模板、图片、查找表和 Schema。
- 其他文件：也可以加入许可证、面向使用者的说明文档，或完成任务所需的其他文件和目录。

这些内容都是可选的。应在 `SKILL.md` 中使用相对于 Skill 根目录的路径引用它们，并明确 Agent 在什么情况下需要读取或执行。

Agent 通常分三个阶段加载 Skill：启动时只读取所有 Skill 的 `name` 和 `description` 用于发现；任务匹配后再激活并加载完整 `SKILL.md`；执行过程中仅按需读取 `scripts/`、`references/` 和 `assets/`。这也是渐进式披露能够同时维持大量 Skill、又不过度占用上下文的原因。

## 安装技能

Skill 可以在 Claude 和 ChatGPT 这类 GUI App 中使用，也可以在 Cursor 这类 IDE、Claude Code 这类 TUI CLI 中使用。

安装 Skill 过程的本质，其实就是将 Skill 对应的文件夹放到特定的目录下，以便 Agent 能按需加载和使用。

### 通用目录约定

越来越多兼容客户端会扫描 `.agents/skills/`，可分别在项目级和用户级安装：

```text
<project>/.agents/skills/<skill-name>/
~/.agents/skills/<skill-name>/
```

同名 Skill 通常由项目级覆盖用户级；不同客户端还可能扫描自己的原生目录。具体路径应以对应产品文档为准。项目级 Skill 会随仓库进入工作区，因此加载陌生仓库中的 Skill 前仍需检查来源和内容。

### 在 App 中安装

![](assets/media/workbuddy.png)

目前在 App 中使用 Skill 的方式主要有两种：通过 App 自带的 Skill 商店安装，或者通过上传压缩包的方式安装。

部分 App 已内置 Skill 商店或管理入口，可以便捷地完成安装和管理。

对于官方商店中没有的 Skill，可以从下方推荐的 Skill 第三方商店中下载并手动上传安装。

### 在 CLI 中安装

![](assets/media/skills_mp.png)

推荐使用 [skillsmp](https://skillsmp.com/zh) 商店发现 GitHub 上的 Skill 项目，并按照分类、更新时间、星标数量等标签筛选。

可辅助使用 Vercel 出品的 [skills.sh](https://skills.sh/) 排行榜，直观查看当前最受欢迎的 Skills 仓库和单个 Skill 的使用情况。

对于特定的 Skill，使用 `npx skills` 命令行工具可快速发现、添加和管理 Skill，具体参数详见 [vercel-labs/skills](https://github.com/vercel-labs/skills)。

```bash
npx skills find [query]                          # 搜索相关技能
npx skills add <owner/repo>                      # 安装技能（支持 GitHub 简写、完整 URL、本地路径）
npx skills add <owner/repo> --list               # 仅查看仓库中的技能
npx skills use <owner/repo@skill>                # 临时使用，不永久安装
npx skills list                                  # 列出已安装的技能
npx skills update [skill-name]                   # 升级一个或多个技能
npx skills remove [skill-name]                   # 卸载技能
npx skills init [skill-name]                     # 创建技能模板
```

当前 `skills` CLI 支持 70 多种 Agent，并可指定 project/global scope、目标 Agent、复制或符号链接安装。详细参数以 [vercel-labs/skills](https://github.com/vercel-labs/skills) 为准。

#### GitHub CLI：可追溯安装与发布

如果更重视版本固定和供应链可追溯性，可使用 GitHub CLI 2.90.0 及以上版本提供的 `gh skill`（目前为 public preview）：

```bash
gh skill search <query>                          # 搜索技能
gh skill preview <owner/repo> <skill>            # 安装前检查内容
gh skill install <owner/repo> <skill>@<tag>      # 按 tag 安装
gh skill install <owner/repo> <skill> --pin <sha> # 固定到 commit
gh skill update --all                            # 检查并更新技能
gh skill publish                                 # 校验并发布技能
```

`gh skill` 会记录仓库、ref 和 git tree SHA，可配合不可变 Release、secret scanning 和 code scanning 使用。详见 [GitHub 官方发布说明](https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/)。

## 优质教程

### 官方文档

- @Agent Skills：[官方概览](https://agentskills.io/home)、[完整规范](https://agentskills.io/specification)、[快速入门](https://agentskills.io/skill-creation/quickstart)
- @Agent Skills：[创作最佳实践](https://agentskills.io/skill-creation/best-practices)、[质量评测](https://agentskills.io/skill-creation/evaluating-skills)、[description 优化](https://agentskills.io/skill-creation/optimizing-descriptions)、[脚本设计](https://agentskills.io/skill-creation/using-scripts)
- @Agent Skills：[为 Agent 添加 Skills 支持](https://agentskills.io/client-implementation/adding-skills-support)
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
<td><a href="https://github.com/google/skills">google</a></td>
<td><a href="https://github.com/NVIDIA/skills">nvidia</a></td>
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
<td><a href="https://github.com/aws/agent-toolkit-for-aws">aws</a></td>
<td><a href="https://github.com/amd/skills">amd</a></td>
</tr>
<tr>
<td><a href="https://github.com/elastic/agent-skills">elastic</a></td>
<td><a href="https://github.com/mongodb/agent-skills">mongodb</a></td>
<td><a href="https://github.com/redis/agent-skills">redis</a></td>
<td><a href="https://github.com/wandb/skills">wandb</a></td>
<td></td>
</tr>
<tr><th colspan="5">🛠️ 开发框架与工具</th></tr>
<tr>
<td><a href="https://github.com/vercel-labs/agent-skills">vercel</a></td>
<td><a href="https://github.com/microsoft/skills">microsoft</a></td>
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
<td><a href="https://github.com/hardhackerlabs/podwise-cli">podwise-cli</a></td>
<td><a href="https://github.com/wpsnote/wpsnote-skills">wps</a></td>
<td><a href="https://github.com/marswaveai/skills">listenhub</a></td>
<td><a href="https://github.com/larksuite/cli">lark</a></td>
<td></td>
</tr>
</table>

## 精选技能

### 编程开发

-   [superpowers](https://github.com/obra/superpowers)：涵盖完整编程项目工作流程
-   [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)：前端设计技能
-   [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)：更精致和个性化的 UI/UX 设计
-   [archify](https://github.com/tt-a1i/archify)：生成可验证、可导出的架构图与流程图
-   [text-to-cad](https://github.com/earthtojake/text-to-cad)：面向 CAD、CAE 与 CAM 的工程技能库
-   [native-feel-skill](https://github.com/yetone/native-feel-skill)：跨平台桌面应用的原生体验设计指南


### 内容创作

-   [baoyu-skills](https://github.com/JimLiu/baoyu-skills)：宝玉的自用 SKills 集合，包括公众号写作、PPT 制作等
-   [libukai](https://github.com/libukai/awesome-agent-skills): Obsidian 相关技能集合，专门适配 Obsidian 的写作场景
-   [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)：歸藏创作的 HTML 幻灯片生成技能
-   [cclank](https://github.com/cclank/news-aggregator-skill)：自动抓取和总结指定领域的最新资讯
-   [huangserva](https://github.com/huangserva/skill-prompt-generator)：生成和优化 AI 人像文生图提示词
-   [dontbesilent](https://github.com/dontbesilent2025/dbskill)： X 万粉大V 基于自己的推文制作的内容创作框架
-   [seekjourney](https://github.com/geekjourneyx/md2wechat-skill/)：从写作到发布的 AI 辅助公众号写作
-   [cangjie-skill](https://github.com/kangarooking/cangjie-skill)：把书、视频和播客蒸馏为可执行的 Agent Skills

### 产品使用

-   [wps](https://github.com/wpsnote/wpsnote-skills)：操控 WPS 办公软件
-   [notebooklm](https://github.com/teng-lin/notebooklm-py)：操控 NotebookLM 
-   [n8n](https://github.com/czlonkowski/n8n-skills)：创建 n8n 工作流
-   [threejs](https://github.com/cloudai-x/threejs-skills)： 辅助开发 Three.js 项目
-   [skills-manage](https://github.com/iamzhihuix/skills-manage)：跨多种 Agent 管理本地 Skills

### 其他类型

-  [pua](https://github.com/tanweai/pua)：以 PUA 的方式驱动 AI 更卖力的干活
-   [office-hours](https://github.com/garrytan/gstack/tree/main/office-hours)：使用 YC 的视角提供各种创业建议
-   [marketingskills](https://github.com/coreyhaines31/marketingskills)：强化市场营销的能力
-   [scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)： 提升科研工作者的技能


## 安全审查

Skill 不只是文档：它的描述会影响检索和选择，正文会改变 Agent 行为，脚本还可能访问文件、网络、密钥和外部账号。已有研究表明，仅修改 `SKILL.md` 的语义内容也可能操纵发现、选择和治理环节。因此，安全审查需要覆盖来源、内容、依赖、权限、运行时和更新六层风险。

安装前建议优先选择官方或可信维护者，先执行 `gh skill preview` 或人工检查全部文件，并固定 tag/commit；运行时使用最小权限、沙箱、敏感操作人工确认和审计日志；更新时检查 diff 并保留回滚版本。注意：商店收录、Star 数和格式校验都不等于安全或有效。

对于安全性要求较高的场景，可使用 [Cisco AI Defense Skill Scanner](https://github.com/cisco-ai-defense/skill-scanner) 或 @余弦的 [slowmist-agent-security skill](https://github.com/slowmist/slowmist-agent-security) 做初步扫描；同时参考 [NVIDIA Verified Skills](https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/) 的 Skill Card、扫描、签名和来源治理思路。扫描器只能提供信号，不能替代人工审查和隔离运行。

## 创建技能

虽然可以通过技能商店直接安装他人创建的技能，但是为了提升技能的适配度和个性化，强烈建议根据需要自己动手创建技能，或者在其他人的基础上进行微调。

### 设计原则

- 从真实任务中提炼：优先使用实际执行步骤、人工纠正、项目文档、故障案例和历史修复，而不是让模型凭通用知识生成空泛流程。
- 保持边界完整：一个 Skill 应覆盖一个可组合、可独立验收的任务单元；过窄会增加加载和冲突成本，过宽则难以准确触发。
- 节约上下文：只写 Agent 容易做错或无法自行知道的内容，把细节拆到聚焦的引用文件，并明确何时读取。
- 校准控制强度：脆弱、不可逆或顺序敏感的步骤写得严格；存在多种合理路径的任务说明目标与原因，保留判断空间。
- 提供默认方案：优先给出一个可靠默认和必要的退出路径，使用可复用流程，不要堆砌平级选项或只针对单次任务的答案。
- 内置反馈闭环：使用 Gotchas、输出模板、检查清单、验证循环和 plan-validate-execute，让失败能够产生下一轮可复用的修正。

### 脚本与资源

已有工具能够稳定完成的一次性操作，可以直接在 `SKILL.md` 中引用命令；反复出现或参数复杂的逻辑，应固化为经过测试的 `scripts/`。引用文件一律使用相对 Skill 根目录的路径，并在说明中明确何时调用。

- 固定依赖版本，并通过 `compatibility` 或正文声明运行环境和网络要求。
- 避免交互式提示，所有输入通过参数、环境变量或 stdin 传入，并提供简洁的 `--help`。
- 错误信息应说明实际问题、期望值和下一步；结构化数据写入 stdout，诊断和进度信息写入 stderr。
- `references/` 中的文件保持聚焦，避免让 Agent 沿着多层链接才能找到真正需要的内容。

详见官方的 [Using scripts in skills](https://agentskills.io/skill-creation/using-scripts) 指南。

### 测试与评测

Skill 评估可以分为两个维度：**`description` 评估**检查 Agent 在应该使用时能否正确触发、不该使用时能否避免误触发；**Skill 效果评估**检查加载后是否真正提升任务的质量、稳定性或效率。前者回答“能不能找对”，后者回答“找到后有没有用”。建议使用一组带有明确成功标准的真实任务持续回归，并与不使用 Skill 或旧版本的结果进行对比。

完整流程可参考官方的[质量评测](https://agentskills.io/skill-creation/evaluating-skills)与[描述优化](https://agentskills.io/skill-creation/optimizing-descriptions)指南。

- [SkillsBench](https://www.skillsbench.ai/)：跨领域评测 Skill 实际增益的基准与排行榜
- [microsoft/waza](https://github.com/microsoft/waza)：创建、测试、度量和改进 Agent Skills
- [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)：基于轨迹与验证集的 Skill 文本优化
- [alibaba/skill-up](https://github.com/alibaba/skill-up)：Agent Skill 评测与演化工具
- [rpamis/comet](https://github.com/rpamis/comet)：把想法迭代为经过评测的 Agent 工作流

现有研究的共同结论是：聚焦单一任务、带明确验收标准和持续回归的 Skill，通常比大而全的知识包更可靠；过时或不匹配的 Skill 可能增加成本甚至降低成功率。

## 特别致谢

![](assets/media/talk_is_cheap.jpg)

## 项目历史

[![](assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
