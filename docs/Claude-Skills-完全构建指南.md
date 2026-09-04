# Claude Skills 完整构建指南

---

## 目录

- [简介](#简介)
- [第一章：基础知识](#第一章基础知识)
- [第二章：规划与设计](#第二章规划与设计)
- [第三章：测试与迭代](#第三章测试与迭代)
- [第四章：分发与共享](#第四章分发与共享)
- [第五章：模式与故障排除](#第五章模式与故障排除)
- [第六章：资源与参考](#第六章资源与参考)
- [参考 A：快速检查清单](#参考-a快速检查清单)
- [参考 B：YAML Frontmatter](#参考-byaml-frontmatter)
- [参考 C：完整的 Skill 示例](#参考-c完整的-skill-示例)

---

## 简介

Skill 是一组指令——打包成一个简单的文件夹——用于教导 Claude 如何处理特定任务或工作流程。Skills 是根据你的特定需求定制 Claude 最强大的方式之一。你无需在每次对话中重复解释自己的偏好、流程和领域知识，Skills 让你只需教导 Claude 一次，便能每次受益。

Skills 在你拥有可重复工作流程时效果最佳：从规范中生成前端设计、使用一致方法论进行研究、按照团队风格指南创建文档，或编排多步骤流程。它们与 Claude 的内置能力（如代码执行和文档创建）协同良好。对于构建 MCP 集成的用户，Skills 提供了另一个强大层级——帮助将原始工具访问转化为可靠、优化的工作流程。

本指南涵盖构建高效 Skills 所需了解的一切内容——从规划与结构到测试与分发。无论你是为自己、团队还是社区构建 Skill，你都将在全文中找到实用模式和真实案例。

**你将学到：**

- Skills 结构的技术要求和最佳实践
- 独立 Skill 和 MCP 增强工作流的模式
- 我们在不同使用场景中观察到的有效模式
- 如何测试、迭代和分发你的 Skills

**适合人群：**

- 希望 Claude 持续遵循特定工作流程的开发者
- 希望 Claude 遵循特定工作流程的高级用户
- 希望在组织中标准化 Claude 工作方式的团队

---

**本指南的两条路径**

构建独立 Skills？重点关注「基础知识」、「规划与设计」和第 1-2 类。增强 MCP 集成？「Skills + MCP」章节和第 3 类适合你。两条路径共享相同的技术要求，你可根据使用场景选择相关内容。

**你将从本指南中获得什么：** 读完本指南后，你将能够在单次会话中构建一个可运行的 Skill。预计使用 skill-creator 构建并测试你的第一个 Skill 约需 15-30 分钟。

让我们开始吧。

---

## 第一章：基础知识

### 什么是 Skill？

Skill 是一个包含以下内容的文件夹：

- **SKILL.md**（必须）：带有 YAML frontmatter 的 Markdown 格式指令
- **scripts/**（可选）：可执行代码（Python、Bash 等）
- **references/**（可选）：按需加载的文档
- **assets/**（可选）：输出中使用的模板、字体、图标

### 核心设计原则

#### 递进式披露（Progressive Disclosure）

Skills 使用三级系统：

- **第一级（YAML frontmatter）**：始终加载到 Claude 的系统提示中。提供恰到好处的信息，让 Claude 知道何时应使用每个 Skill，而无需将全部内容加载到上下文中。
- **第二级（SKILL.md 正文）**：当 Claude 认为该 Skill 与当前任务相关时加载。包含完整的指令和指导。
- **第三级（链接文件）**：打包在 Skill 目录中的附加文件，Claude 可以按需选择浏览和发现。

这种递进式披露在保持专业能力的同时最大限度地减少了 token 消耗。

#### 可组合性（Composability）

Claude 可以同时加载多个 Skills。你的 Skill 应能与其他 Skills 协同工作，而不是假设自己是唯一可用的能力。

#### 可移植性（Portability）

Skills 在 Claude.ai、Claude Code 和 API 上的工作方式完全相同。创建一次，即可在所有平台使用，无需修改——前提是运行环境支持 Skill 所需的任何依赖项。

---

### 面向 MCP 构建者：Skills + 连接器

> 💡 在没有 MCP 的情况下构建独立 Skills？跳到「规划与设计」——你随时可以回来查看这部分。

如果你已经有一个可运行的 MCP 服务器，那你已经完成了最难的部分。Skills 是顶层的知识层——捕获你已知的工作流程和最佳实践，让 Claude 能够持续地应用它们。

#### 厨房类比

MCP 提供专业厨房：工具、食材和设备的访问权限。

Skills 提供菜谱：一步步地说明如何创造有价值的成果。

两者结合，让用户无需自己摸索每一个步骤就能完成复杂任务。

#### 两者如何协作

| MCP（连接性） | Skills（知识） |
|--------------|--------------|
| 将 Claude 连接到你的服务（Notion、Asana、Linear 等） | 教导 Claude 如何有效使用你的服务 |
| 提供实时数据访问和工具调用 | 捕获工作流程和最佳实践 |
| Claude **能做**什么 | Claude **应该怎么做** |

#### 这对你的 MCP 用户意味着什么

**没有 Skills：**
- 用户连接了你的 MCP，但不知道下一步该做什么
- 支持工单询问"我如何用你的集成做 X"
- 每次对话从零开始
- 因为用户每次提示方式不同，结果不一致
- 用户将问题归咎于你的连接器，而真正的问题是工作流程指导缺失

**有了 Skills：**
- 预构建的工作流程在需要时自动激活
- 一致、可靠的工具使用
- 每次交互中都嵌入了最佳实践
- 降低了你的集成的学习曲线

---

## 第二章：规划与设计

### 从使用场景出发

在编写任何代码之前，先确定你的 Skill 应该实现的 2-3 个具体使用场景。

**良好的使用场景定义示例：**

```
使用场景：项目冲刺规划
触发条件：用户说"帮我规划这个冲刺"或"创建冲刺任务"
步骤：
1. 从 Linear（通过 MCP）获取当前项目状态
2. 分析团队速度和容量
3. 建议任务优先级
4. 在 Linear 中创建带有适当标签和估算的任务
结果：已规划完成的冲刺，并创建了任务
```

**问自己：**
- 用户想完成什么？
- 这需要哪些多步骤工作流程？
- 需要哪些工具（内置或 MCP）？
- 应该嵌入哪些领域知识或最佳实践？

---

### 常见 Skill 使用场景类别

在 Anthropic，我们观察到三类常见使用场景：

#### 第 1 类：文档与资产创建

**用途：** 创建一致、高质量的输出，包括文档、演示文稿、应用、设计、代码等。

**真实案例：** frontend-design skill（另见用于 docx、pptx、xlsx 和 ppt 的 Skills）

> "创建具有高设计质量的独特、生产级前端界面。在构建 Web 组件、页面、artifact、海报或应用时使用。"

**核心技巧：**
- 内嵌样式指南和品牌标准
- 一致输出的模板结构
- 定稿前的质量检查清单
- 无需外部工具——使用 Claude 的内置能力

#### 第 2 类：工作流程自动化

**用途：** 受益于一致方法论的多步骤流程，包括跨多个 MCP 服务器的协调。

**真实案例：** skill-creator skill

> "创建新 Skills 的交互式指南。引导用户完成使用场景定义、frontmatter 生成、指令编写和验证。"

**核心技巧：**
- 带有验证节点的分步工作流程
- 常见结构的模板
- 内置审查和改进建议
- 迭代精炼循环

#### 第 3 类：MCP 增强

**用途：** 工作流程指导，以增强 MCP 服务器提供的工具访问能力。

**真实案例：** sentry-code-review skill（来自 Sentry）

> "通过 Sentry 的 MCP 服务器，使用 Sentry 错误监控数据自动分析并修复 GitHub Pull Request 中检测到的 bug。"

**核心技巧：**
- 按顺序协调多个 MCP 调用
- 嵌入领域专业知识
- 提供用户否则需要自行指定的上下文
- 处理常见 MCP 问题的错误处理

---

### 定义成功标准

你如何知道你的 Skill 在正常工作？

这些是有抱负的目标——粗略的基准，而非精确的阈值。力求严谨，但要接受其中会有一定程度的主观判断。我们正在积极开发更完善的测量指导和工具。

**量化指标：**

- **Skill 在 90% 的相关查询上触发**
  - 测量方法：运行 10-20 个应该触发你的 Skill 的测试查询。追踪它自动加载的次数 vs. 需要显式调用的次数。
- **在 X 次工具调用内完成工作流程**
  - 测量方法：在启用和不启用 Skill 的情况下比较相同任务。统计工具调用次数和消耗的 token 总量。
- **每个工作流程 0 次 API 调用失败**
  - 测量方法：在测试运行期间监控 MCP 服务器日志。追踪重试率和错误代码。

**定性指标：**

- **用户不需要提示 Claude 下一步该做什么**
  - 评估方法：在测试期间，记录你需要重定向或澄清的频率。向测试用户征求反馈。
- **工作流程无需用户纠正即可完成**
  - 评估方法：将相同请求运行 3-5 次。比较输出的结构一致性和质量。
- **跨会话结果一致**
  - 评估方法：新用户能否在最少指导下第一次就完成任务？

---

### 技术要求

#### 文件结构

```
your-skill-name/
├── SKILL.md                  # 必须——主 Skill 文件
├── scripts/                  # 可选——可执行代码
│    ├── process_data.py      # 示例
│    └── validate.sh          # 示例
├── references/               # 可选——文档
│    ├── api-guide.md         # 示例
│    └── examples/            # 示例
└── assets/                   # 可选——模板等
     └── report-template.md  # 示例
```

#### 关键规则

**SKILL.md 命名：**
- 必须完全命名为 `SKILL.md`（区分大小写）
- 不接受任何变体（SKILL.MD、skill.md 等）

**Skill 文件夹命名：**
- 使用 kebab-case：`notion-project-setup` ✅
- 不使用空格：`Notion Project Setup` ❌
- 不使用下划线：`notion_project_setup` ❌
- 不使用大写：`NotionProjectSetup` ❌

**不包含 README.md：**
- 不要在你的 Skill 文件夹内包含 README.md
- 所有文档放在 SKILL.md 或 references/ 中
- 注意：通过 GitHub 分发时，你仍然需要在仓库级别为人类用户提供 README——参见「分发与共享」章节。

---

### YAML Frontmatter：最重要的部分

YAML frontmatter 是 Claude 决定是否加载你的 Skill 的方式。务必把这部分做好。

**最小必要格式：**

```yaml
---
name: your-skill-name
description: What it does. Use when user asks to [specific phrases].
---
```

这就是你开始所需的全部内容。

**字段要求：**

`name`（必须）：
- 仅使用 kebab-case
- 无空格或大写字母
- 应与文件夹名称匹配

`description`（必须）：
- 必须同时包含：
  - 该 Skill 的功能
  - 何时使用它（触发条件）
- 少于 1024 个字符
- 无 XML 标签（`<` 或 `>`）
- 包含用户可能说的具体任务
- 如相关，提及文件类型

`license`（可选）：
- 将 Skill 开源时使用
- 常用：MIT、Apache-2.0

`compatibility`（可选）：
- 1-500 个字符
- 说明环境要求：例如目标产品、所需系统包、网络访问需求等

`metadata`（可选）：
- 任意自定义键值对
- 建议：author、version、mcp-server
- 示例：

```yaml
metadata:
       author: ProjectHub
       version: 1.0.0 mcp-server: projecthub
```

#### 安全限制

**Frontmatter 中禁止：**
- XML 尖括号（`< >`）
- 名称中含有 "claude" 或 "anthropic" 的 Skills（保留字）

**原因：** Frontmatter 出现在 Claude 的系统提示中。恶意内容可能注入指令。

---

### 编写高效的 Skills

#### Description 字段

根据 Anthropic 工程博客的说法："这些元数据……提供恰到好处的信息，让 Claude 知道何时应使用每个 Skill，而无需将全部内容加载到上下文中。"这是递进式披露的第一级。

**结构：**

```
[它做什么] + [何时使用] + [核心能力]
```

**良好 description 的示例：**

```yaml
# 好——具体且可执行
description: Analyzes Figma design files and generates
developer handoff documentation. Use when user uploads .fig
files, asks for "design specs", "component documentation", or
"design-to-code handoff".

# 好——包含触发短语
description: Manages Linear project workflows including sprint
planning, task creation, and status tracking. Use when user
mentions "sprint", "Linear tasks", "project planning", or asks
to "create tickets".

# 好——清晰的价值主张
description: End-to-end customer onboarding workflow for
PayFlow. Handles account creation, payment setup, and
subscription management. Use when user says "onboard new
customer", "set up subscription", or "create PayFlow account".
```

**糟糕 description 的示例：**

```yaml
# 太模糊
description: Helps with projects.

# 缺少触发条件
description: Creates sophisticated multi-page documentation
systems.

# 过于技术性，没有用户触发词
description: Implements the Project entity model with
hierarchical relationships.
```

---

#### 编写主体指令

在 frontmatter 之后，用 Markdown 编写实际指令。

**推荐结构：**

根据你的 Skill 调整此模板。用你的具体内容替换括号中的部分。

````markdown
---
name: your-skill
description: [...]
---

# Your Skill Name

## Instructions

### Step 1: [First Major Step]
Clear explanation of what happens.

```bash
python scripts/fetch_data.py --project-id PROJECT_ID
Expected output: [describe what success looks like]
```

(Add more steps as needed)


Examples

Example 1: [common scenario]

User says: "Set up a new marketing campaign"

Actions:
1. Fetch existing campaigns via MCP
2. Create new campaign with provided parameters

Result: Campaign created with confirmation link

(Add more examples as needed)


Troubleshooting

Error: [Common error message]

Cause: [Why it happens]

Solution: [How to fix]

(Add more error cases as needed)
````

---

#### 指令最佳实践

**具体且可执行**

✅ 好：

```
Run `python scripts/validate.py --input {filename}` to check
data format.
If validation fails, common issues include:
- Missing required fields (add them to the CSV)
- Invalid date formats (use YYYY-MM-DD)
```

❌ 差：

```
Validate the data before proceeding.
```

**包含错误处理**

```markdown
## Common Issues

### MCP Connection Failed
If you see "Connection refused":
1. Verify MCP server is running: Check Settings > Extensions
2. Confirm API key is valid
3. Try reconnecting: Settings > Extensions > [Your Service] >
Reconnect
```

**清晰引用捆绑的资源**

```
Before writing queries, consult `references/api-patterns.md`
for:
- Rate limiting guidance
- Pagination patterns
- Error codes and handling
```

**使用递进式披露**

保持 SKILL.md 专注于核心指令。将详细文档移至 `references/` 并添加链接。（参见「核心设计原则」了解三级系统的工作方式。）

---

## 第三章：测试与迭代

Skills 可以根据你的需求进行不同严格程度的测试：

- **在 Claude.ai 中手动测试** - 直接运行查询并观察行为。迭代快速，无需配置。
- **在 Claude Code 中脚本化测试** - 自动化测试用例，实现跨版本的可重复验证。
- **通过 Skills API 程序化测试** - 构建评估套件，系统地针对定义的测试集运行。

根据你的质量要求和 Skill 的可见度选择合适的方法。供小团队内部使用的 Skill 与部署给数千名企业用户的 Skill，其测试需求截然不同。

> **专业建议：在扩展之前先在单一任务上迭代**
>
> 我们发现，最有效的 Skill 创建者会在单个具有挑战性的任务上持续迭代直到 Claude 成功，然后将成功的方法提炼成 Skill。这利用了 Claude 的上下文学习能力，比广泛测试提供更快的信号反馈。一旦有了可用的基础，再扩展到多个测试用例以提升覆盖率。

### 推荐的测试方法

基于早期经验，有效的 Skills 测试通常涵盖三个方面：

#### 1. 触发测试

**目标：** 确保你的 Skill 在正确时机加载。

**测试用例：**
- ✅ 在明显任务上触发
- ✅ 在换句话的请求上触发
- ❌ 不在无关话题上触发

**示例测试套件：**

```
应该触发：
- "Help me set up a new ProjectHub workspace"
- "I need to create a project in ProjectHub"
- "Initialize a ProjectHub project for Q4 planning"

不应触发：
- "What's the weather in San Francisco?"
- "Help me write Python code"
- "Create a spreadsheet" (unless ProjectHub skill handles sheets)
```

#### 2. 功能测试

**目标：** 验证 Skill 能产生正确的输出。

**测试用例：**
- 生成有效的输出
- API 调用成功
- 错误处理正常工作
- 边缘情况有所覆盖

**示例：**

```
Test: Create project with 5 tasks
Given: Project name "Q4 Planning", 5 task descriptions
When: Skill executes workflow
Then:
   - Project created in ProjectHub
   - 5 tasks created with correct properties
   - All tasks linked to project
   - No API errors
```

#### 3. 性能对比

**目标：** 证明 Skill 相比基线有所改善。

使用「定义成功标准」中的指标。以下是一个对比示例：

**基线对比：**

```
Without skill:
- User provides instructions each time
- 15 back-and-forth messages
- 3 failed API calls requiring retry
- 12,000 tokens consumed

With skill:
- Automatic workflow execution
- 2 clarifying questions only
- 0 failed API calls
- 6,000 tokens consumed
```

---

### 使用 skill-creator Skill

Anthropic 维护的 [`skill-creator`](https://github.com/anthropics/skills/tree/main/skills/skill-creator) Skill 可以帮助你构建和迭代 Skills。如果你有一个 MCP 服务器并了解你的 2-3 个主要工作流程，你可以在单次会话中构建并测试一个功能性 Skill——通常只需 15-30 分钟。

**创建 Skills：**
- 从自然语言描述生成 Skills
- 生成带有 frontmatter 的规范格式 SKILL.md
- 建议触发短语和结构

**审查 Skills：**
- 标记常见问题（模糊描述、缺少触发词、结构问题）
- 识别潜在的过度/不足触发风险
- 根据 Skill 的目标用途建议测试用例

**迭代改进：**
- 使用 Skill 过程中遇到边缘情况或失败时，将这些示例带回 skill-creator
- 示例："Use the issues & solution identified in this chat to improve how the skill handles [specific edge case]"

**使用方法：**

```
"Use the skill-creator skill to help me build a skill for
[your use case]"
```

注意：skill-creator 帮助你设计和完善 Skills，但不执行自动化测试套件或生成定量评估结果。

---

### 基于反馈的迭代

Skills 是动态文档。计划根据以下信号进行迭代：

**触发不足的信号：**
- Skill 在应该加载时没有加载
- 用户手动启用它
- 关于何时使用它的支持问题

> 解决方案：在 description 中添加更多细节和针对性内容——对于技术术语，可能需要包含关键词

**过度触发的信号：**
- Skill 在无关查询时加载
- 用户禁用它
- 对用途感到困惑

> 解决方案：添加负面触发词，更加具体

**执行问题：**
- 结果不一致
- API 调用失败
- 需要用户纠正

> 解决方案：改进指令，添加错误处理

---

## 第四章：分发与共享

Skills 让你的 MCP 集成更加完整。当用户比较各种连接器时，拥有 Skills 的连接器提供了更快的价值路径，让你在仅有 MCP 的替代方案中脱颖而出。

### 当前分发模型（2026 年 1 月）

**个人用户获取 Skills 的方式：**

1. 下载 Skill 文件夹
2. 压缩文件夹（如需要）
3. 通过 Claude.ai 的 Settings > Capabilities > Skills 上传
4. 或放置在 Claude Code skills 目录中

**组织级 Skills：**
- 管理员可以在整个工作区部署 Skills（2025 年 12 月 18 日上线）
- 自动更新
- 集中管理

### 开放标准

我们将 Agent Skills 作为开放标准发布。与 MCP 一样，我们相信 Skills 应该可以跨工具和平台移植——无论使用 Claude 还是其他 AI 平台，同一个 Skill 都应该能够工作。也就是说，有些 Skills 被设计为充分利用特定平台的能力；作者可以在 Skill 的 `compatibility` 字段中注明这一点。我们一直在与生态系统的各方成员合作推进这一标准，并对早期采用者的积极反响感到振奋。

### 通过 API 使用 Skills

对于程序化使用场景——如构建利用 Skills 的应用程序、智能体或自动化工作流——API 提供对 Skill 管理和执行的直接控制。

**核心能力：**
- `/v1/skills` 端点，用于列举和管理 Skills
- 通过 `container.skills` 参数将 Skills 添加到 Messages API 请求
- 通过 Claude Console 进行版本控制和管理
- 与 Claude Agent SDK 协同工作，用于构建自定义智能体

**何时使用 API vs. Claude.ai：**

| 使用场景 | 最佳平台 |
|---------|:-------:|
| 终端用户直接与 Skills 交互 | Claude.ai / Claude Code |
| 开发期间的手动测试和迭代 | Claude.ai / Claude Code |
| 个人、临时工作流 | Claude.ai / Claude Code |
| 以编程方式使用 Skills 的应用程序 | API |
| 大规模生产部署 | API |
| 自动化流水线和智能体系统 | API |

注意：API 中的 Skills 需要代码执行工具（Code Execution Tool）beta 版，该工具提供了 Skills 运行所需的安全环境。

更多实现细节，请参阅：
- Skills API 快速入门
- 创建自定义 Skills
- Agent SDK 中的 Skills

---

### 当前推荐方法

从在 GitHub 上用公开仓库托管你的 Skill 开始，包含清晰的 README（面向人类访问者——这与你的 Skill 文件夹分开，Skill 文件夹不应包含 README.md）以及带截图的示例用法。然后在你的 MCP 文档中添加一个章节，链接到该 Skill，解释同时使用两者为何有价值，并提供快速入门指南。

**1. 在 GitHub 上托管**
- 开源 Skills 使用公开仓库
- 清晰的 README，包含安装说明
- 示例用法和截图

**2. 在你的 MCP 仓库中建立文档**
- 从 MCP 文档链接到 Skills
- 解释同时使用两者的价值
- 提供快速入门指南

**3. 创建安装指南**

```markdown
## Installing the [Your Service] skill

1. Download the skill:
    - Clone repo: `git clone https://github.com/yourcompany/
      skills`
    - Or download ZIP from Releases

2. Install in Claude:
    - Open Claude.ai > Settings > skills
    - Click "Upload skill"
    - Select the skill folder (zipped)

3. Enable the skill:
    - Toggle on the [Your Service] skill
    - Ensure your MCP server is connected

4. Test:
    - Ask Claude: "Set up a new project in [Your Service]"
```

### 定位你的 Skill

你描述 Skill 的方式决定了用户是否理解其价值并真正尝试使用它。在 README、文档或推广材料中介绍你的 Skill 时，请遵循以下原则：

**聚焦结果，而非功能：**

✅ 好：

```
"The ProjectHub skill enables teams to set up complete project
workspaces in seconds — including pages, databases, and
templates — instead of spending 30 minutes on manual setup."
```

❌ 差：

```
"The ProjectHub skill is a folder containing YAML frontmatter
and Markdown instructions that calls our MCP server tools."
```

**突出 MCP + Skills 的组合：**

```
"Our MCP server gives Claude access to your Linear projects.
Our skills teach Claude your team's sprint planning workflow.
Together, they enable AI-powered project management."
```

---

## 第五章：模式与故障排除

这些模式来自早期采用者和内部团队创建的 Skills。它们代表了我们观察到的常见有效方法，而非规定性模板。

### 选择方法：问题优先 vs. 工具优先

把它想象成家得宝（Home Depot）。你可能带着一个问题走进去——"我需要修厨房橱柜"——然后员工引导你找到合适的工具。或者你可能挑好了一把新电钻，然后询问如何用它完成你的特定工作。

Skills 的工作方式相同：

- **问题优先**："我需要设置一个项目工作区" → 你的 Skill 按正确顺序编排合适的 MCP 调用。用户描述结果；Skill 处理工具。
- **工具优先**："我已连接了 Notion MCP" → 你的 Skill 教导 Claude 最优工作流程和最佳实践。用户拥有访问权限；Skill 提供专业知识。

大多数 Skills 偏向某一方向。了解哪种框架适合你的使用场景，有助于你选择下方合适的模式。

---

### 模式 1：顺序工作流程编排

**适用场景：** 用户需要按特定顺序执行的多步骤流程。

**示例结构：**

```markdown
## Workflow: Onboard New Customer

### Step 1: Create Account
Call MCP tool: `create_customer`
Parameters: name, email, company

### Step 2: Setup Payment
Call MCP tool: `setup_payment_method`
Wait for: payment method verification

### Step 3: Create Subscription
Call MCP tool: `create_subscription`
Parameters: plan_id, customer_id (from Step 1)

### Step 4: Send Welcome Email
Call MCP tool: `send_email`
Template: welcome_email_template
```

**核心技巧：**
- 明确的步骤顺序
- 步骤间的依赖关系
- 每个阶段的验证
- 失败时的回滚指令

---

### 模式 2：多 MCP 协调

**适用场景：** 工作流程跨越多个服务。

**示例：** 设计到开发的交接

```markdown
### Phase 1: Design Export (Figma MCP)
1. Export design assets from Figma
2. Generate design specifications
3. Create asset manifest

### Phase 2: Asset Storage (Drive MCP)
1. Create project folder in Drive
2. Upload all assets
3. Generate shareable links

### Phase 3: Task Creation (Linear MCP)
1. Create development tasks
2. Attach asset links to tasks
3. Assign to engineering team

### Phase 4: Notification (Slack MCP)
1. Post handoff summary to #engineering
2. Include asset links and task references
```

**核心技巧：**
- 清晰的阶段划分
- MCP 之间的数据传递
- 进入下一阶段前的验证
- 集中的错误处理

---

### 模式 3：迭代精炼

**适用场景：** 输出质量随迭代提升。

**示例：** 报告生成

```markdown
## Iterative Report Creation

### Initial Draft
1. Fetch data via MCP
2. Generate first draft report
3. Save to temporary file

### Quality Check
1. Run validation script: `scripts/check_report.py`
2. Identify issues:
    - Missing sections
    - Inconsistent formatting
    - Data validation errors

### Refinement Loop
1. Address each identified issue
2. Regenerate affected sections
3. Re-validate
4. Repeat until quality threshold met

### Finalization
1. Apply final formatting
2. Generate summary
3. Save final version
```

**核心技巧：**
- 明确的质量标准
- 迭代改进
- 验证脚本
- 知道何时停止迭代

---

### 模式 4：上下文感知工具选择

**适用场景：** 相同的结果，根据上下文使用不同的工具。

**示例：** 文件存储

```markdown
## Smart File Storage

### Decision Tree
1. Check file type and size
2. Determine best storage location:
    - Large files (>10MB): Use cloud storage MCP
    - Collaborative docs: Use Notion/Docs MCP
    - Code files: Use GitHub MCP
    - Temporary files: Use local storage

### Execute Storage
Based on decision:
- Call appropriate MCP tool
- Apply service-specific metadata
- Generate access link

### Provide Context to User
Explain why that storage was chosen
```

**核心技巧：**
- 清晰的决策标准
- 备选方案
- 关于选择的透明度

---

### 模式 5：领域特定智能

**适用场景：** 你的 Skill 在工具访问之外增加了专业知识。

**示例：** 金融合规

```markdown
## Payment Processing with Compliance

### Before Processing (Compliance Check)
1. Fetch transaction details via MCP
2. Apply compliance rules:
   - Check sanctions lists
   - Verify jurisdiction allowances
   - Assess risk level
3. Document compliance decision

### Processing
IF compliance passed:
  - Call payment processing MCP tool
  - Apply appropriate fraud checks
  - Process transaction
ELSE:
  - Flag for review
  - Create compliance case

### Audit Trail
- Log all compliance checks
- Record processing decisions
- Generate audit report
```

**核心技巧：**
- 逻辑中嵌入领域专业知识
- 行动前先合规
- 全面的文档记录
- 清晰的治理

---

### 故障排除

#### Skill 无法上传

**错误："Could not find SKILL.md in uploaded folder"**

原因：文件没有完全命名为 SKILL.md

解决方案：
- 重命名为 SKILL.md（区分大小写）
- 用 `ls -la` 验证，应显示 SKILL.md

---

**错误："Invalid frontmatter"**

原因：YAML 格式问题

常见错误：

```yaml
# 错误——缺少分隔符
name: my-skill
description: Does things

# 错误——未闭合的引号
name: my-skill
description: "Does things

# 正确
---
name: my-skill
description: Does things
---
```

---

**错误："Invalid skill name"**

原因：名称含有空格或大写字母

```yaml
# 错误
name: My Cool Skill

# 正确
name: my-cool-skill
```

---

#### Skill 不触发

**症状：** Skill 从不自动加载

**修复：**

修改你的 description 字段。参见「Description 字段」章节中的好/坏示例。

**快速检查清单：**
- 是否太通用？（"Helps with projects" 无效）
- 是否包含用户实际会说的触发短语？
- 如果适用，是否提及了相关文件类型？

**调试方法：**

询问 Claude："When would you use the [skill name] skill?" Claude 会引用 description 内容。根据缺失的内容进行调整。

---

#### Skill 触发过于频繁

**症状：** Skill 在无关查询时加载

**解决方案：**

**1. 添加负面触发词**

```yaml
description: Advanced data analysis for CSV files. Use for
statistical modeling, regression, clustering. Do NOT use for
simple data exploration (use data-viz skill instead).
```

**2. 更加具体**

```yaml
# 太宽泛
description: Processes documents

# 更具体
description: Processes PDF legal documents for contract review
```

**3. 明确范围**

```yaml
description: PayFlow payment processing for e-commerce. Use
specifically for online payment workflows, not for general
financial queries.
```

---

#### MCP 连接问题

**症状：** Skill 加载但 MCP 调用失败

**检查清单：**

1. 验证 MCP 服务器是否已连接
   - Claude.ai：Settings > Extensions > [你的服务]
   - 应显示"Connected"状态

2. 检查身份验证
   - API 密钥有效且未过期
   - 已授予正确的权限/范围
   - OAuth token 已刷新

3. 独立测试 MCP
   - 让 Claude 直接调用 MCP（不使用 Skill）
   - "Use [Service] MCP to fetch my projects"
   - 如果这也失败，问题在 MCP 而非 Skill

4. 验证工具名称
   - Skill 引用了正确的 MCP 工具名称
   - 检查 MCP 服务器文档
   - 工具名称区分大小写

---

#### 指令未被遵循

**症状：** Skill 加载但 Claude 不遵循指令

**常见原因：**

1. 指令太冗长
   - 保持指令简洁
   - 使用项目符号和编号列表
   - 将详细参考内容移至单独文件

2. 指令被埋没
   - 将关键指令放在最前面
   - 使用 `## Important` 或 `## Critical` 标题
   - 如有必要，重复关键要点

3. 语言模糊

```markdown
# 差
Make sure to validate things properly

# 好
CRITICAL: Before calling create_project, verify:
- Project name is non-empty
- At least one team member assigned
- Start date is not in the past
```

**高级技巧：** 对于关键验证，考虑打包一个以编程方式执行检查的脚本，而不是依赖语言指令。代码是确定性的；语言解读则不然。参见 Office skills 了解此模式的示例。

4. 模型"偷懒" 添加明确的鼓励：

```markdown
## Performance Notes
- Take your time to do this thoroughly
- Quality is more important than speed
- Do not skip validation steps
```

注意：将此内容添加到用户提示中比放在 SKILL.md 中更有效。

---

#### 大上下文问题

**症状：** Skill 看起来变慢或响应质量下降

**原因：**
- Skill 内容太大
- 同时启用的 Skills 太多
- 所有内容被加载而非递进式披露

**解决方案：**

1. 优化 SKILL.md 大小
   - 将详细文档移至 references/
   - 链接引用而非内联
   - 将 SKILL.md 控制在 5,000 字以内

2. 减少启用的 Skills 数量
   - 评估是否同时启用了超过 20-50 个 Skills
   - 建议选择性启用
   - 考虑将相关能力打包成 Skill "套件"

---

## 第六章：资源与参考

如果你在构建第一个 Skill，从最佳实践指南开始，然后根据需要参考 API 文档。

### 官方文档

**Anthropic 资源：**
- 最佳实践指南
- Skills 文档
- API 参考
- MCP 文档

**博客文章：**
- Introducing Agent Skills
- Engineering Blog: Equipping Agents for the Real World
- Skills Explained
- How to Create Skills for Claude
- Building Skills for Claude Code
- Improving Frontend Design through Skills

### 示例 Skills

**公开 Skills 仓库：**
- GitHub：anthropics/skills
- 包含 Anthropic 创建的可供定制的 Skills

### 工具与实用程序

**skill-creator skill：**
- 内置于 Claude.ai 并可用于 Claude Code
- 可以从描述生成 Skills
- 提供审查和建议
- 使用方法："Help me build a skill using skill-creator"

**验证：**
- skill-creator 可以评估你的 Skills
- 询问："Review this skill and suggest improvements"

### 获取支持

**技术问题：**
- 一般问题：Claude Developers Discord 社区论坛

**Bug 报告：**
- GitHub Issues：anthropics/skills/issues
- 请包含：Skill 名称、错误信息、复现步骤

---

## 参考 A：快速检查清单

使用此检查清单在上传前后验证你的 Skill。如果你想更快上手，可以使用 skill-creator skill 生成初稿，然后通过此清单确保没有遗漏任何内容。

### 开始之前

- [ ] 已确定 2-3 个具体使用场景
- [ ] 已确定所需工具（内置或 MCP）
- [ ] 已阅读本指南和示例 Skills
- [ ] 已规划文件夹结构

### 开发过程中

- [ ] 文件夹以 kebab-case 命名
- [ ] SKILL.md 文件存在（拼写准确）
- [ ] YAML frontmatter 有 `---` 分隔符
- [ ] `name` 字段：kebab-case，无空格，无大写字母
- [ ] `description` 包含功能描述（WHAT）和使用时机（WHEN）
- [ ] 无 XML 标签（`< >`）
- [ ] 指令清晰且可执行
- [ ] 包含错误处理
- [ ] 提供了示例
- [ ] 引用已清晰链接

### 上传之前

- [ ] 已测试在明显任务上的触发
- [ ] 已测试在换句话请求上的触发
- [ ] 已验证不会在无关话题上触发
- [ ] 功能测试通过
- [ ] 工具集成正常工作（如适用）
- [ ] 已压缩为 .zip 文件

### 上传之后

- [ ] 在真实对话中测试
- [ ] 监控触发不足/过度触发情况
- [ ] 收集用户反馈
- [ ] 迭代 description 和指令
- [ ] 在 metadata 中更新版本号

---

## 参考 B：YAML Frontmatter

### 必填字段

```yaml
---
name: skill-name-in-kebab-case
description: What it does and when to use it. Include specific
trigger phrases.
---
```

### 所有可选字段

```yaml
name: skill-name
description: [required description]
license: MIT # 可选：开源许可证
allowed-tools: "Bash(python:*) Bash(npm:*) WebFetch" # 可选：限制工具访问
metadata: # 可选：自定义字段
  author: Company Name
  version: 1.0.0
  mcp-server: server-name
  category: productivity
  tags: [project-management, automation]
  documentation: https://example.com/docs
  support: support@example.com
```

### 安全说明

**允许：**
- 任何标准 YAML 类型（字符串、数字、布尔值、列表、对象）
- 自定义 metadata 字段
- 较长的 description（最多 1024 个字符）

**禁止：**
- XML 尖括号（`< >`）——安全限制
- YAML 中的代码执行（使用安全 YAML 解析）
- 以 "claude" 或 "anthropic" 为前缀命名的 Skills（保留字）

---

## 参考 C：完整的 Skill 示例

完整的、生产就绪的 Skills 演示了本指南中的各种模式，请参阅：

- **Document Skills** - PDF、DOCX、PPTX、XLSX 创建
- **Example Skills** - 各种工作流程模式
- **Partner Skills Directory** - 查看来自各合作伙伴的 Skills，包括 Asana、Atlassian、Canva、Figma、Sentry、Zapier 等

这些仓库持续更新，并包含本指南之外的更多示例。克隆它们，根据你的使用场景进行修改，并将其作为模板使用。
