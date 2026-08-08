# Contributing to Awesome Agent Plugins

感谢你帮助维护这个跨生态目录。Awesome Agent Plugins 是一份少而精的发现指南，不追求收录数量，也不把 Star 数或 Marketplace 上架视为安全、质量或兼容性证明。

Thank you for helping maintain this cross-ecosystem catalog. Awesome Agent Plugins favors useful, well-described entries over volume. Stars and marketplace listings are discovery signals, not proof of safety, quality, or compatibility.

## Choose the correct entry type / 选择正确类型

| Type | Boundary |
| --- | --- |
| **Plugin** | An installable, versioned capability package with a manifest, marketplace entry, or documented package boundary |
| **Skill** | A standalone Agent Skill or Skill collection using `SKILL.md` |
| **MCP** | A standalone MCP server, MCP App, client, gateway, registry, or focused MCP collection |
| **Hook** | A standalone hook implementation, hook pack, framework, or learning collection |
| **Marketplace** | A distribution index used to discover, install, and update Plugins |
| **Specification & Tooling** | A format, validator, scanner, authoring tool, compatibility layer, or governance resource |

A standalone Skill, MCP server, or Hook is valuable, but it is not automatically a Plugin. Do not claim cross-host compatibility unless the repository documents or demonstrates it.

单独的 Skill、MCP Server 或 Hook 仍然有收录价值，但不会自动被称为 Plugin。除非项目有明确文档或验证记录，否则不要声称跨宿主兼容。

## Required information / 必填信息

Every submission must include:

- **Name and canonical URL** — use the original project or official marketplace entry, not a mirror.
- **Outcome** — one sentence describing what the user can accomplish.
- **Entry type** — Plugin, Skill, MCP, Hook, Marketplace, or Specification & Tooling.
- **Publisher status** — official, vendor-maintained, community-maintained, or archived reference.
- **Supported hosts** — for example Codex, ChatGPT, Claude Code, Cursor, GitHub Copilot, VS Code, Kiro, or portable Agent Plugins v1.
- **Included components** — Skills, MCP servers, apps, agents, commands, hooks, LSP servers, UI, or other extensions.
- **Installation or usage path** — an exact command, marketplace route, upload flow, or documentation link.
- **Source and license** — identify closed-source or partially inspectable capabilities explicitly.
- **Maintenance evidence** — latest release or meaningful commit date and any known deprecation status.
- **Last verified date** — use `YYYY-MM-DD` and state what was verified.
- **Risk surfaces** — local code execution, hooks, network access, credentials, external reads, external writes, or closed-source dependencies.

## Acceptance criteria / 收录标准

An entry should:

1. Have a clear purpose and a usable documentation path.
2. Be maintained, or have durable reference value that is clearly labeled.
3. Link to the canonical source and avoid hidden download or referral redirects.
4. Use accurate terminology and avoid unsupported compatibility claims.
5. Disclose important setup, permission, and execution risks.
6. Add distinct value instead of duplicating an existing entry without explanation.

The maintainers may decline generated link dumps, empty category shells, unexplained mirrors, deceptive installers, repositories with visible credential leaks, or submissions whose primary purpose is promotion rather than user value.

维护者可以拒绝自动生成的链接堆砌、空分类、无说明的镜像、误导性安装器、存在明显凭据泄漏的仓库，以及以推广为主要目的而缺乏用户价值的提交。

## Pull requests

- Keep descriptions factual and concise; avoid marketing superlatives.
- Prefer relative links for files inside this repository.
- Update all three READMEs when changing shared information architecture. For a single resource submission, maintainers may help synchronize translations.
- Do not reorder unrelated entries or reformat the entire document.
- Run a Markdown and link check when available, then inspect the rendered tables and headings.
- One pull request should have one clear purpose.

## Security language

Use **curated**, **listed**, or **last checked** unless an artifact was actually installed and exercised. Use **verified** only when the verification scope and date are stated. Never describe a plugin as safe solely because it is official, popular, scanned, or available in a marketplace.
