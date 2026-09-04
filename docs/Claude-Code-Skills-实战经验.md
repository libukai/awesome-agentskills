# Claude Code Skills 实战经验

Skills 已经成为 Claude Code 中使用最广泛的扩展点（extension points）之一。它们灵活、容易制作，分发起来也很简单。

但也正因为太灵活，你很难知道怎样用才最好。什么类型的 Skills 值得做？写出好 Skill 的秘诀是什么？什么时候该把它们分享给别人？

我们在 Anthropic 内部大量使用 Claude Code 的 Skills（技能扩展），目前活跃使用的已经有几百个。以下就是我们在用 Skills 加速开发过程中总结出的经验。

## 什么是 Skills？

如果你还不了解 Skills，建议先看看[我们的文档](https://code.claude.com/docs/en/skills)或最新的 [Skilljar 上关于 Agent Skills 的课程](https://anthropic.skilljar.com/introduction-to-agent-skills)，本文假设你已经对 Skills 有了基本的了解。

我们经常听到一个误解，认为 Skills"只不过是 markdown 文件"。但 Skills 最有意思的地方恰恰在于它们不只是文本文件——它们是文件夹，可以包含脚本、资源文件、数据等等，智能体可以发现、探索和使用这些内容。

在 Claude Code 中，Skills 还拥有[丰富的配置选项](https://code.claude.com/docs/en/skills#frontmatter-reference)，包括注册动态钩子（hooks）。

我们发现，Claude Code 中最有意思的那些 Skills，往往就是创造性地利用了这些配置选项和文件夹结构。

在梳理了我们所有的 Skills 之后，我们注意到它们大致可以归为几个反复出现的类别。最好的 Skills 清晰地落在某一个类别里；让人困惑的 Skills 往往横跨了好几个。这不是一份终极清单，但如果你想检查团队里是否还缺了什么类型的 Skills，这是一个很好的思路。


## 九种 Skill 类型

![](https://pbs.twimg.com/media/HDo5BLyXEAA8McR?format=jpg&name=large)

### 1. 库与 API 参考

帮助你正确使用某个库、命令行工具或 SDK 的 Skills。它们既可以针对内部库，也可以针对 Claude Code 偶尔会犯错的常用库。这类 Skills 通常会包含一个参考代码片段的文件夹，以及一份 Claude 在写代码时需要避免的踩坑点（gotchas）列表。

示例：
- `billing-lib` — 你的内部计费库：边界情况、容易踩的坑（footguns）等
- `internal-platform-cli` — 内部 CLI 工具的每个子命令及其使用场景示例
- `frontend-design` — 让 Claude 更好地理解你的设计系统

### 2. 产品验证

描述如何测试或验证代码是否正常工作的 Skills。通常会搭配 Playwright、tmux 等外部工具来完成验证。

验证类 Skills 对于确保 Claude 输出的正确性非常有用。值得安排一个工程师花上一周时间专门打磨你的验证 Skills。

可以考虑一些技巧，比如让 Claude 录制输出过程的视频，这样你就能看到它到底测试了什么；或者在每一步强制执行程序化的状态断言。这些通常通过在 Skill 中包含各种脚本来实现。

示例：
- `signup-flow-driver` — 在无头浏览器中跑完注册→邮件验证→引导流程，每一步都可以插入状态断言的钩子
- `checkout-verifier` — 用 Stripe 测试卡驱动结账 UI，验证发票最终是否到了正确的状态
- `tmux-cli-driver` — 针对需要 TTY 的交互式命令行测试

### 3. 数据获取与分析

连接你的数据和监控体系的 Skills。这类 Skills 可能会包含带有凭证的数据获取库、特定的仪表盘 ID 等，以及常用工作流和数据获取方式的说明。

示例：
- `funnel-query` — "要看注册→激活→付费的转化，需要关联哪些事件？"，再加上真正存放规范 user_id 的那张表
- `cohort-compare` — 对比两个用户群的留存或转化率，标记统计显著的差异，链接到分群定义
- `grafana` — 数据源 UID、集群名称、问题→仪表盘对照表

### 4. 业务流程与团队自动化

把重复性工作流自动化为一条命令的 Skills。这类 Skills 通常指令比较简单，但可能会依赖其他 Skills 或 MCP（Model Context Protocol，模型上下文协议）。对于这类 Skills，把之前的执行结果保存在日志文件中，有助于模型保持一致性并反思之前的执行情况。

示例：
- `standup-post` — 汇总你的任务追踪器、GitHub 活动和之前的 Slack 消息→生成格式化的站会汇报，只报变化部分（delta-only）
- `create-<ticket-system>-ticket` — 强制执行 schema（合法的枚举值、必填字段）加上创建后的工作流（通知审查者、在 Slack 中发链接）
- `weekly-recap` — 已合并的 PR + 已关闭的工单 + 部署记录→格式化的周报

### 5. 代码脚手架与模板

为代码库中的特定功能生成框架样板代码（boilerplate）的 Skills。你可以把这些 Skills 和脚本组合使用。当你的脚手架（scaffolding）有自然语言需求、无法纯靠代码覆盖时，这类 Skills 特别有用。

示例：
- `new-<framework>-workflow` — 用你的注解搭建新的服务/工作流/处理器
- `new-migration` — 你的数据库迁移文件模板加上常见踩坑点
- `create-app` — 新建内部应用，预配好你的认证、日志和部署配置

### 6. 代码质量与审查

在团队内部执行代码质量标准并辅助代码审查的 Skills。可以包含确定性的脚本或工具来保证最大的可靠性。你可能希望把这些 Skills 作为钩子的一部分自动运行，或者放在 GitHub Action 中执行。

示例：
- `adversarial-review` — 生成一个全新视角的子智能体来挑刺，实施修复，反复迭代直到发现的问题退化为吹毛求疵。子智能体（subagent）是指 Claude Code 在执行任务时启动的另一个独立 Claude 实例。这里的做法是让一个"没见过这段代码"的新实例来做代码审查，避免原实例的思维惯性。
- `code-style` — 强制执行代码风格，特别是那些 Claude 默认做不好的风格
- `testing-practices` — 关于如何写测试以及测试什么的指导

### 7. CI/CD 与部署

帮你拉取、推送和部署代码的 Skills。这类 Skills 可能会引用其他 Skills 来收集数据。

示例：
- `babysit-pr` — 监控一个 PR→重试不稳定的 CI→解决合并冲突→启用自动合并
- `deploy-<service>` — 构建→冒烟测试→渐进式流量切换并对比错误率→指标恶化时自动回滚
- `cherry-pick-prod` — 隔离的工作树（worktree）→cherry-pick→解决冲突→用模板创建 PR

### 8. 运维手册

接收一个现象（比如一条 Slack 消息、一条告警或者一个错误特征），引导你走完多工具排查流程，最后生成结构化报告的 Skills。

示例：
- `<service>-debugging` — 把现象对应到工具→查询模式，覆盖你流量最大的服务
- `oncall-runner` — 拉取告警→检查常见嫌疑→格式化输出排查结论
- `log-correlator` — 给定一个请求 ID，从所有可能经过的系统中拉取匹配的日志

### 9. 基础设施运维

执行日常维护和运维操作的 Skills——其中一些涉及破坏性操作，需要安全护栏。这些 Skills 让工程师在执行关键操作时更容易遵循最佳实践。

示例：
- `<resource>-orphans` — 找到孤立的 Pod/Volume→发到 Slack→等待观察→用户确认→级联清理
- `dependency-management` — 你所在组织的依赖审批工作流
- `cost-investigation` — "我们的存储/出口带宽费用为什么突然涨了"，附带具体的存储桶和查询模式

## 编写技巧

![](https://pbs.twimg.com/media/HDo5Dl9XsAAWY7o?format=jpg&name=large)

确定了要做什么 Skill 之后，怎么写呢？以下是我们总结的一些最佳实践和技巧。

我们最近还发布了 [Skill Creator](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)，让在 Claude Code 中创建 Skills 变得更加简单。

### 不要说显而易见的事

Claude Code 对你的代码库已经非常了解，Claude 本身对编程也很在行，包括很多默认的观点。如果你发布的 Skill 主要是提供知识，那就把重点放在能打破 Claude 常规思维模式的信息上。

[`frontend design` 这个 Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) 就是一个很好的例子——它是 Anthropic 的一位工程师通过与用户反复迭代、改进 Claude 的设计品味而构建的，专门避免那些典型的套路，比如 Inter 字体和紫色渐变。

### 建一个踩坑点章节

![](https://pbs.twimg.com/media/HDo5GDjbEAMAlZj?format=jpg&name=large)

任何 Skill 中信息量最大的部分就是踩坑点章节。这些章节应该根据 Claude 在使用你的 Skill 时遇到的常见失败点逐步积累起来。理想情况下，你会持续更新 Skill 来记录这些踩坑点。

### 利用文件系统与渐进式披露

![](https://pbs.twimg.com/media/HDo5JN1WQAAPmnG?format=jpg&name=large)

就像前面说的，Skill 是一个文件夹，不只是一个 markdown 文件。你应该把整个文件系统当作上下文工程（Context Engineering）和渐进式披露（progressive disclosure）的工具。告诉 Claude 你的 Skill 里有哪些文件，它会在合适的时候去读取它们。

上下文工程（Context Engineering）是 2025 年由 Andrej Karpathy 等人提出并广泛传播的概念，指的是精心设计和管理输入给大语言模型的上下文信息，以最大化模型的输出质量。渐进式披露（progressive disclosure）借用了 UI 设计中的概念，意思是不一次性把所有信息塞给模型，而是让它在需要时再去读取，从而节省上下文窗口空间。

最简单的渐进式披露形式是指向其他 markdown 文件让 Claude 使用。例如，你可以把详细的函数签名和用法示例拆分到 `references/api.md` 里。

另一个例子：如果你的最终输出是一个 markdown 文件，你可以在 `assets/` 中放一个模板文件供复制使用。

你可以有参考资料、脚本、示例等文件夹，帮助 Claude 更高效地工作。

### 不要把 Claude 限制得太死

Claude 通常会努力遵循你的指令，而由于 Skills 的复用性很强，你需要注意不要把指令写得太具体。给 Claude 它需要的信息，但留给它适应具体情况的灵活性。

![](https://pbs.twimg.com/media/HDo5Lo1W8AArlpo?format=jpg&name=large)

### 考虑好初始设置

![](https://pbs.twimg.com/media/HDo5OrObEAAENZA?format=jpg&name=large)

有些 Skills 可能需要用户提供上下文来完成初始设置。例如，如果你做了一个把站会内容发到 Slack 的 Skill，你可能希望 Claude 先问用户要发到哪个 Slack 频道。

一个好的做法是把这些设置信息存在 Skill 目录下的 `config.json` 文件里。如果配置还没设置好，智能体就会向用户询问相关信息。

如果你希望智能体向用户展示结构化的多选题，可以让 Claude 使用 `AskUserQuestion` 工具。

### description 字段是给模型看的

当 Claude Code 启动一个会话时，它会构建一份所有可用 Skills 及其描述的清单。Claude 通过扫描这份清单来判断"这个请求有没有对应的 Skill？"所以 `description` 字段不是摘要——它描述的是**何时该触发这个 Skill**。

这条建议经常被忽略。很多人写 description 时会写"这个 Skill 做什么"，但 Claude 需要的是"什么情况下该用这个 Skill"。好的 description 读起来更像 if-then 条件，而不是功能说明。

![](https://pbs.twimg.com/media/HDo5Rspa0AApYXU?format=jpg&name=large)

### 记忆与数据存储

![](https://pbs.twimg.com/media/HDo5UrhbEAAqlvQ?format=jpg&name=large)

有些 Skills 可以通过在内部存储数据来实现某种形式的记忆。你可以用最简单的方式——一个只追加写入的文本日志文件或 JSON 文件，也可以用更复杂的方式——比如 SQLite 数据库。

例如，一个 `standup-post` Skill 可以保留一份 `standups.log`，记录它写过的每一条站会汇报。这样下次运行时，Claude 会读取自己的历史记录，就能知道从昨天到现在发生了什么变化。

存在 Skill 目录下的数据可能会在升级 Skill 时被删除，因此持久数据应保存在 Skill 目录之外、由用户明确选择的稳定位置，并在配置中记录该路径。

### 存储脚本与生成代码

你能给 Claude 的最强大的工具之一就是代码。给 Claude 提供脚本和库，让它把精力花在组合编排上——决定下一步做什么，而不是重新构造样板代码。

例如，在你的数据科学 Skill 中，你可以放一组从事件源获取数据的函数库。为了让 Claude 做更复杂的分析，你可以提供一组辅助函数，像这样：

![](https://pbs.twimg.com/media/HDo5XLwXcAA-ocz?format=jpg&name=large)

Claude 就可以即时生成脚本来组合这些功能，完成更高级的分析——比如回答"周二发生了什么？"这样的问题。

![](https://pbs.twimg.com/media/HDo5ZkUW0AAMmfP?format=jpg&name=large)

### 按需钩子

Skills 可以包含只在该 Skill 被调用时才激活的钩子（On Demand Hooks），并且在整个会话期间保持生效。这适合那些比较主观、你不想一直运行但有时候极其有用的钩子。

例如：
- `/careful` — 通过 `PreToolUse` 匹配器拦截 Bash 中的 `rm -rf`、`DROP TABLE`、force-push、`kubectl delete`。你只在知道自己在操作生产环境时才需要这个——要是一直开着会让你抓狂。PreToolUse 是 Claude Code 的钩子（hook）机制之一，会在 Claude 每次调用工具之前触发。你可以在这个钩子里检查 Claude 即将执行的命令，如果命中危险操作就阻止执行。这里 `/careful` 是一个按需激活的 Skill，只有用户主动调用时才会注册这个钩子。
- `/freeze` — 阻止对特定目录之外的任何 Edit/Write 操作。在调试时特别有用："我想加日志但老是不小心'修'了不相关的代码"

---

## 团队分发

Skills 最大的好处之一就是你可以把它们分享给团队的其他人。

最直接的分享方式是把 Skills 提交到代码仓库的 `.agents/skills/` 中，让项目成员和兼容客户端共同使用；跨项目复用时，也可以通过独立 Git 仓库或压缩包分发到用户级 Skills 目录。无论采用哪种方式，都应在正式分发前检查重复内容、来源、权限和实际评测结果。

### 组合 Skills

你可能希望 Skills 之间互相依赖。例如，你可能有一个文件上传 Skill 用来上传文件，以及一个 CSV 生成 Skill 用来生成 CSV 并上传。Agent Skills 规范目前没有定义 Skill 间的依赖管理；可以在说明中引用其他 Skill，但需要明确前置条件，并为缺少依赖的情况提供替代路径。

### 衡量 Skills 的效果

为了了解一个 Skill 的表现，我们使用了一个 `PreToolUse` 钩子来在公司内部记录 Skill 的使用情况（[示例代码在这里](https://gist.github.com/ThariqS/24defad423d701746e23dc19aace4de5)）。这样我们就能发现哪些 Skills 很受欢迎，或者哪些触发频率低于预期。


## 结语

Skills 是 AI 智能体（AI Agent）极其强大且灵活的工具，但这一切还处于早期阶段，我们都在摸索怎样用好它们。

与其把这篇文章当作权威指南，不如把它看作我们实践中验证过有效的一堆实用技巧合集。理解 Skills 最好的方式就是动手开始做、不断试验、看看什么对你管用。我们大多数 Skills 一开始就是几行文字加一个踩坑点，后来因为大家不断补充 Claude 遇到的新边界情况，才慢慢变好的。

希望这篇文章对你有帮助，如果有任何问题欢迎告诉我。
