# Contributing to Awesome Agent Plugins

感谢你帮助维护这个跨生态目录。Awesome Agent Plugins 以 [Agent Plugins Specification v1](https://agent-plugins.org/specification) 为主线，优先记录可移植格式，并将客户端原生能力单独标注。Star 数和 Marketplace 上架只是发现信号，不是安全、质量或兼容性证明。

Thank you for helping maintain this cross-ecosystem catalog. Awesome Agent Plugins uses the [Agent Plugins Specification v1](https://agent-plugins.org/specification) as its primary baseline, prioritizes portable packages, and labels client-native capabilities separately. Stars and marketplace listings are discovery signals, not proof of safety, quality, or compatibility.

## Choose the correct entry type / 选择正确类型

| Type | Boundary |
| --- | --- |
| **Portable Agent Plugin** | A package with a root `plugin.json` declaring `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` |
| **Host-native Plugin** | An installable package using a client-native format such as `.codex-plugin`, `.claude-plugin`, `.cursor-plugin`, or Copilot format |
| **Skill** | A standalone Agent Skill or Skill collection using `SKILL.md` |
| **MCP** | A standalone MCP server, client, gateway, registry, or focused MCP collection |
| **Client extension resource** | A standalone MCP App, Hook, Agent, Command, LSP, Rule, App, UI extension, framework, or learning collection tied to one or more clients |
| **Marketplace / Collection** | A distribution or discovery index for Plugins |
| **Specification & Tooling** | A format, validator, scanner, authoring tool, compatibility layer, or governance resource |

A package can be useful and installable without being portable. Do not label a host-native package as an Agent Plugins v1 package unless the root manifest declares the canonical `$schema`. A standalone Skill, MCP server, or Hook is not automatically a Plugin.

一个包可以很好用、也可以直接安装，但并不因此具有可移植性。只有根清单声明规范 `$schema` 时，才可标为 Agent Plugins v1；单独的 Skill、MCP Server 或 Hook 也不会自动成为 Plugin。

## Portability model / 可移植性模型

For each entry, separate these layers:

1. **Portable manifest** — root `plugin.json` using the Agent Plugins v1 schema.
2. **Portable core components** — `skills/` and root `mcp.json`.
3. **Client extensions** — reverse-domain namespaced data or directories whose semantics are defined by a client.
4. **Host-native surfaces** — native manifests and capabilities that are not portable by default.

Do not treat package conformance, client support, successful component execution, and security review as the same claim.

每个条目都应分别说明规范清单、标准核心组件、客户端命名空间扩展和宿主原生能力。格式符合、客户端支持、组件实际运行和安全审计是四种不同结论。

## Required information / 必填信息

Every submission must include:

- **Name and canonical URL** — use the original project or official marketplace entry, not a mirror.
- **Outcome** — one sentence describing what the user can accomplish.
- **Entry type** — choose one type from the table above.
- **Format and manifest path** — for example Agent Plugins v1 root `plugin.json`, `.codex-plugin/plugin.json`, or “standalone component.”
- **Portability claim** — portable v1, client-native, standalone component, or directory/tooling resource.
- **Publisher status** — official, vendor-maintained, community-maintained, or archived reference.
- **Supported clients** — for example Codex, ChatGPT, Claude Code, Cursor, GitHub Copilot, VS Code, Kiro, or Agent Plugins v1.
- **Portable core components** — Skills and/or MCP servers, when present.
- **Client-specific capabilities** — MCP Apps, other apps, agents, commands, hooks, LSP servers, rules, UI, or other extensions, when present.
- **Installation or usage path** — an exact command, marketplace route, upload flow, or documentation link.
- **Source and license** — identify closed-source or partially inspectable capabilities explicitly.
- **Maintenance evidence** — latest release or meaningful commit date and any known deprecation status.
- **Last verified date** — use `YYYY-MM-DD` and state what was verified.
- **Risk surfaces** — local code execution, hooks, network access, credentials, external reads, external writes, or closed-source dependencies.

## Acceptance criteria / 收录标准

An entry should:

1. Have a clear purpose and a usable documentation path.
2. Use the canonical source and avoid hidden download or referral redirects.
3. Put only conforming Agent Plugins v1 packages in the portable catalog.
4. Label host-native formats and client-specific capabilities explicitly.
5. Avoid unsupported cross-client or security claims.
6. Disclose important setup, permission, and execution risks.
7. Be maintained, or have durable reference value that is clearly labeled.
8. Add distinct value instead of duplicating an existing entry without explanation.

The maintainers may decline generated link dumps, empty category shells, unexplained mirrors, deceptive installers, repositories with visible credential leaks, or submissions whose primary purpose is promotion rather than user value.

维护者可以拒绝自动生成的链接堆砌、空分类、无说明的镜像、误导性安装器、存在明显凭据泄漏的仓库，以及以推广为主要目的而缺乏用户价值的提交。

## Pull requests

- Keep descriptions factual and concise; avoid marketing superlatives.
- Prefer relative links for files inside this repository.
- Update all three READMEs when changing shared information architecture. For a single resource submission, maintainers may help synchronize translations.
- Do not reorder unrelated entries or reformat the entire document.
- Run a Markdown and link check when available, then inspect rendered tables, code blocks, and headings.
- One pull request should have one clear purpose.

## Security language

Use **curated**, **listed**, or **last checked** unless an artifact was actually installed and exercised. Use **verified** only when the verification scope and date are stated. Never describe a Plugin as safe solely because it is official, popular, schema-valid, scanned, or available in a Marketplace.
