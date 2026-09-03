<div>
  <p align="center">
    <img width="100%" alt="Awesome Agent Plugins banner" src="assets/media/awesome-agent-plugins.png">
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

# Awesome Agent Plugins

> **Formerly Awesome Agent Skills.** 项目现已转向 Agent Plugin 生态，旧名称仅作为社区与项目历史的延续。

本项目以 [Agent Plugins Specification](https://agent-plugins.org/specification) 为主线，收录遵循可移植标准的 Agent Plugins，并把各客户端的原生格式和特有能力放在独立章节中说明。目标不是把一切都叫作 Plugin，而是为能力包建立清楚、可核验的可移植性边界。

> 如果觉得这个项目对你有所帮助，还请帮忙点个 🌟 让更多人知晓。同时，也欢迎关注我的 𝕏 账号 [@李不凯正在研究](https://x.com/libukai)，获取 Agent Plugin 生态的最新资源与实战教程！

## Agent Plugins 标准

[Agent Plugins v1.0.0](https://agent-plugins.org/specification) 是面向可移植 Agent Plugin 包的厂商中立规范，目前状态为 **Working Draft**。它定义的是多个客户端都能实现的最小互操作合同，而不是单个客户端的功能上限。

v1 只标准化两类组件：**Skills** 和 **MCP Servers**。Agents、Commands、Hooks、Apps、LSP Servers、Rules、UI 等能力可以很重要，但它们的生命周期、权限和运行语义因客户端而异，因此不属于 v1 的可移植核心。

### 可移植最小集

| 层级 | 固定位置 | 要求 | 可移植性 |
| --- | --- | --- | --- |
| **核心清单** | 根目录 `plugin.json` | 必需；至少包含规范 `$schema` 与 `name` | Agent Plugins v1 |
| **Skills** | `skills/<name>/SKILL.md` | 可选；遵循 Agent Skills 规范 | 标准核心组件 |
| **MCP Servers** | 根目录 `mcp.json` | 可选；遵循 Agent Plugins MCP 配置格式 | 标准核心组件 |
| **客户端扩展** | `plugin.json` 的 `extensions["com.example.client"]` 和/或顶层 `com.example.client/` | 可选；语义由对应客户端定义 | 仅对实现该命名空间的客户端有效 |

```text
my-plugin/
├── plugin.json
├── skills/
│   └── summarize/
│       └── SKILL.md
├── mcp.json
└── com.example.client/
    └── hooks/
```

最小 `plugin.json`：

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "minimal-plugin"
}
```

`skills/` 或 `mcp.json` 不存在并不构成格式错误；客户端也可以渐进支持不同组件和 MCP transport。因此，**包符合规范**、**客户端支持规范**、**某个组件能实际运行**是三个需要分别核验的结论。

### 为什么标准刻意保持最小

- Skills 提供可移植的任务说明、知识和配套资源。
- MCP 提供可移植的工具与数据连接协议。
- 其他能力暂时没有稳定的跨客户端共同语义，放入客户端命名空间可以继续创新，又不会制造虚假的兼容性承诺。
- 最小核心让插件作者能够用同一份包覆盖更多客户端；客户端仍可在核心之上提供更丰富的原生体验。

### 本目录使用的术语

| 类型 | 本项目中的边界 | 收录位置 |
| --- | --- | --- |
| **Portable Agent Plugin** | 根目录包含声明 Agent Plugins v1 的规范 `plugin.json` | 标准主目录 |
| **Client extension** | 规范包内、使用反向域名命名空间表达的客户端专属数据或文件 | 对应客户端章节，并注明非可移植部分 |
| **Host-native Plugin** | 使用 `.codex-plugin`、`.claude-plugin`、`.cursor-plugin` 或 Copilot 原生格式 | 客户端特异性章节；默认不声称跨客户端可移植 |
| **Standalone component** | 单独的 Skill、MCP Server、Hook 或其他能力，没有规范 Plugin 包边界 | 组件生态 |
| **Marketplace / Collection** | 用于发现、安装或汇总 Plugins 的索引 | 生态目录，不作为单个 Plugin |

## 客户端特异性

以下格式和能力属于各客户端的原生产品面。它们可以和 Agent Plugins 标准核心共存，但除非同时按规范表达，否则不属于 v1 的可移植部分。

| 客户端 | 原生格式标记 | 客户端特有能力示例 |
| --- | --- | --- |
| **ChatGPT / Codex** | `.codex-plugin/plugin.json` | Apps、Agents、Commands、Hooks、Assets，以及 Codex 原生 `.app.json` / `.mcp.json` |
| **Claude Code** | `.claude-plugin/plugin.json` | Agents、Commands、Hooks、LSP Servers、Monitors、Themes，以及 Claude 原生 `.mcp.json` |
| **Cursor** | `.cursor-plugin/plugin.json` | Rules、Cursor 原生 Skills/MCP 组织方式、Canvas 和其他 Cursor 能力 |
| **GitHub Copilot** | 根目录 `plugin.json`，但未声明 Agent Plugins 规范 `$schema` 时按 Copilot 格式解释 | Custom Agents、Hooks、Copilot 原生 `.mcp.json`、LSP Servers |
| **VS Code** | 自动识别 Agent Plugins 1.0、Copilot、Claude 与 Legacy OpenPlugin 格式 | Agents、Hooks、Slash Commands 等 VS Code 扩展；Skills 与 `mcp.json` 可使用标准格式 |

当前公开兼容矩阵列出了 VS Code、Cursor、GitHub Copilot、ChatGPT / Codex 和 Kiro；每个客户端可以渐进实现 Skills、MCP transport 和其他能力，详见 [Compatible Clients](https://agent-plugins.org/compatible-clients)。

## 生态目录

### 标准与兼容实现

- [Agent Plugins Specification](https://agent-plugins.org/specification)：可移植 Agent Plugin 包的规范正文、清单 Schema、组件发现和扩展机制。
- [agentplugins/agent-plugins-spec](https://github.com/agentplugins/agent-plugins-spec)：规范、Schema、治理和参考资料的开放仓库。
- [Compatible Clients](https://agent-plugins.org/compatible-clients)：各客户端当前支持的标准组件与 MCP transport 矩阵。
- [VS Code Agent Plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins)：同时展示标准格式、宿主扩展和多种原生格式自动识别的实现参考。

### 客户端原生集合与市场

- [openai/plugins](https://github.com/openai/plugins)：Codex Plugin 示例与官方目录。
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)：Anthropic 维护的 Claude Code 官方 Plugin 目录。
- [cursor/plugins](https://github.com/cursor/plugins) 与 [cursor/community-plugins](https://github.com/cursor/community-plugins)：Cursor 官方 Plugins 与社区目录。
- [github/copilot-plugins](https://github.com/github/copilot-plugins)：GitHub Copilot 官方 Plugin 集合。

### 跨客户端与领域集合

- [flutter/agent-plugins](https://github.com/flutter/agent-plugins)：Flutter 团队维护的跨 Claude Code、Codex 与 Cursor 的开发能力包。
- [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins)：面向 AWS 架构、部署和运维任务的 Agent Plugins。

### 规范、治理与安全工具

- [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)：腾讯朱雀实验室维护的 AI 红队与基础设施安全平台；其中的 `aig-agent-redteam` Skill 可执行授权动态测试，涉及网络探测、命令执行和目标交互，应只在明确授权及隔离边界内使用。
- [AMAP-ML/SkillClaw](https://github.com/AMAP-ML/SkillClaw)：面向 Skill 演化、去重与跨端共享的基础设施；它可以代理模型请求、记录会话并自动改写 Skill，启用共享存储或自动演化前应审查隐私、凭据和写入边界。

## 组件生态

组件可以单独使用，也可以进一步组合进标准 Plugin。下面只保留高质量发现入口；收录、Star 数和格式校验都不代表安全审计或跨客户端兼容认证。

### Skills（标准核心组件）

- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)：覆盖大规模 Skill 发现、选择、校验与规划的目录和本地工具链。
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)：面向多种 Agent 客户端的社区 Skill 汇总目录。
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills)：Agent Skills 教程、指南与目录索引。
- [sandbaseai/sandbase-skills](https://github.com/sandbaseai/sandbase-skills)：面向研究、社交情报和业务工作流的跨客户端 Skill 集合；部分 Skill 可复用宿主工具，另一些会调用外部数据服务，使用前应核对凭据、数据传输和服务依赖。

### MCP Servers（标准核心组件）

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)：覆盖广泛的 MCP Server 社区目录。
- [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH)：中文 MCP 资源、服务端与客户端指南。
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)：较早建立并持续维护的 MCP Server 目录。
- [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers)：专注可通过网络连接的 Remote MCP Servers。
- [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools)：MCP 开发、测试、调试和验证工具目录。

### Hooks（客户端扩展组件）

- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)：系统学习 Claude Code Hooks 的示例与教程。
- [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks)：覆盖安全、成本、可观测性与生产力的 Hook 集合和可安装 Plugin Marketplace。
- [sondera-ai/sondera-coding-agent-hooks](https://github.com/sondera-ai/sondera-coding-agent-hooks)：面向 Claude、Cursor、Gemini 等编码 Agent 的跨客户端 Hook 实现。
- [1Password/agent-hooks](https://github.com/1Password/agent-hooks)：1Password 团队维护的 Agent Hook 实现集合。
- [ithiria894/awesome-claude-code-hooks](https://github.com/ithiria894/awesome-claude-code-hooks)：面向事件驱动自动化的 Claude Code Hook 目录。

## 收录原则

1. **标准优先**：只有使用规范根 `plugin.json` 并声明 Agent Plugins v1 `$schema` 的包，才进入可移植 Plugin 主目录。
2. **客户端特性单列**：Host-native Plugin 和客户端扩展必须标明格式、支持客户端及非可移植部分。
3. **组件不冒充 Plugin**：单独的 Skill、MCP Server、Hook 或其他能力进入组件生态。
4. **兼容性逐层陈述**：格式有效、客户端可加载、组件可运行和安全可信是不同结论。
5. **证据完整**：提交应提供安装方式、许可证、维护状态、最近核验日期和主要风险面。

完整要求见 [CONTRIBUTING.md](CONTRIBUTING.md)。当前保持 README-first，不建设新的包管理器或托管市场；当条目规模和维护需求证明有必要时，再引入机器可读目录和自动生成流程。

## 特别致谢

![](assets/media/talk_is_cheap.jpg)

## 项目历史

- 2026-08：项目开始由 Awesome Agent Skills 转型为 Awesome Agent Plugins，并确立“可移植标准为主、客户端特异性单列、独立组件分区”的信息架构。

[![](assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
