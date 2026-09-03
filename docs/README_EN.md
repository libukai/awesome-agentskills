<div>
  <p align="center">
    <img width="100%" alt="Awesome Agent Plugins banner" src="../assets/media/awesome-agent-plugins.png">
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

English | [日本語](README_JA.md) | [简体中文](../README.md)

</div>

# Awesome Agent Plugins

> **Formerly Awesome Agent Skills.** The project now focuses on the Agent Plugin ecosystem; the former name is retained only for community and project-history continuity.

This project uses the [Agent Plugins Specification](https://agent-plugins.org/specification) as its primary baseline. It curates portable Agent Plugins while documenting client-native formats and host-specific capabilities in a separate chapter. The goal is not to call everything a Plugin, but to give capability packages a clear, testable portability boundary.

> Follow me on 𝕏 [@libukai](https://x.com/libukai) and 💬 WeChat Official Account [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) for the latest Agent Plugin ecosystem resources and practical tutorials!

## The Agent Plugins Standard

[Agent Plugins v1.0.0](https://agent-plugins.org/specification) is a vendor-neutral specification for portable Agent Plugin packages. Its current status is **Working Draft**. It defines the smallest interoperability contract that multiple clients can implement, not the feature ceiling of any one client.

Version 1 standardizes exactly two component types: **Skills** and **MCP servers**. Agents, commands, hooks, apps, LSP servers, rules, UI, and similar capabilities can be important, but their lifecycle, permissions, and runtime semantics differ by client, so they are not part of the portable v1 core.

### Portable Minimum

| Layer | Fixed location | Requirement | Portability |
| --- | --- | --- | --- |
| **Core manifest** | Root `plugin.json` | Required; contains at least the specification `$schema` and `name` | Agent Plugins v1 |
| **Skills** | `skills/<name>/SKILL.md` | Optional; follows the Agent Skills specification | Standard core component |
| **MCP servers** | Root `mcp.json` | Optional; follows the Agent Plugins MCP configuration format | Standard core component |
| **Client extensions** | `extensions["com.example.client"]` in `plugin.json` and/or top-level `com.example.client/` | Optional; semantics are defined by the corresponding client | Only meaningful to clients implementing that namespace |

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

Minimal `plugin.json`:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "minimal-plugin"
}
```

The absence of `skills/` or `mcp.json` is not a format error, and clients may implement component types and MCP transports incrementally. Therefore, **package conformance**, **client support**, and **successful component execution** are three separate claims that must be checked independently.

### Why the Standard Is Intentionally Small

- Skills carry portable task instructions, knowledge, and supporting resources.
- MCP provides a portable protocol for tools and data connections.
- Other capabilities do not yet share stable cross-client semantics. Namespaced extensions let clients innovate without creating false compatibility promises.
- A small core lets authors target more clients with one package while clients continue to offer richer native experiences above it.

### Terminology Used in This Catalog

| Type | Boundary in this project | Where it belongs |
| --- | --- | --- |
| **Portable Agent Plugin** | Has a root `plugin.json` declaring Agent Plugins v1 | Main standards-based catalog |
| **Client extension** | Client-specific data or files inside a conforming package, expressed through a reverse-domain namespace | Relevant client chapter, with the non-portable surface labeled |
| **Host-native Plugin** | Uses `.codex-plugin`, `.claude-plugin`, `.cursor-plugin`, or a native Copilot format | Client-specific chapter; not portable by default |
| **Standalone component** | A Skill, MCP server, hook, or other capability without a conforming Plugin package boundary | Component ecosystem |
| **Marketplace / Collection** | An index for discovering, installing, or collecting Plugins | Ecosystem directory, not an individual Plugin |

## Client-Specific Capabilities

The formats and capabilities below belong to native client product surfaces. They can coexist with the Agent Plugins core, but they are not portable v1 components unless they are also represented through the standard.

| Client | Native format marker | Examples of client-specific capabilities |
| --- | --- | --- |
| **ChatGPT / Codex** | `.codex-plugin/plugin.json` | Apps, agents, commands, hooks, assets, and Codex-native `.app.json` / `.mcp.json` files |
| **Claude Code** | `.claude-plugin/plugin.json` | Agents, commands, hooks, LSP servers, monitors, themes, and Claude-native `.mcp.json` files |
| **Cursor** | `.cursor-plugin/plugin.json` | Rules, Cursor-native Skills/MCP organization, Canvas, and other Cursor capabilities |
| **GitHub Copilot** | Root `plugin.json`; interpreted as Copilot format when the Agent Plugins `$schema` is absent | Custom agents, hooks, Copilot-native `.mcp.json`, and LSP servers |
| **VS Code** | Auto-detects Agent Plugins 1.0, Copilot, Claude, and Legacy OpenPlugin formats | VS Code agents, hooks, and slash commands; Skills and `mcp.json` can use the standard format |

The current public compatibility matrix lists VS Code, Cursor, GitHub Copilot, ChatGPT / Codex, and Kiro. Each client may adopt Skills, MCP transports, and other capabilities incrementally. See [Compatible Clients](https://agent-plugins.org/compatible-clients).

## Ecosystem Directory

### Standard and Compatible Implementations

- [Agent Plugins Specification](https://agent-plugins.org/specification): Normative package format, manifest schema, component discovery, and extension mechanism.
- [agentplugins/agent-plugins-spec](https://github.com/agentplugins/agent-plugins-spec): Open repository for the specification, schemas, governance, and references.
- [Compatible Clients](https://agent-plugins.org/compatible-clients): Current matrix of standard component and MCP transport support by client.
- [VS Code Agent Plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins): An implementation reference that distinguishes the standard format, host extensions, and auto-detected native formats.

### Client-Native Collections and Marketplaces

- [openai/plugins](https://github.com/openai/plugins): Codex Plugin examples and official directory entries.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official): Anthropic's official, maintained Claude Code Plugin directory.
- [cursor/plugins](https://github.com/cursor/plugins) and [cursor/community-plugins](https://github.com/cursor/community-plugins): Cursor's official Plugins and community directory.
- [github/copilot-plugins](https://github.com/github/copilot-plugins): GitHub's official Copilot Plugin collection.

### Cross-Client and Domain Collections

- [flutter/agent-plugins](https://github.com/flutter/agent-plugins): Flutter-team capability packages for Claude Code, Codex, and Cursor workflows.
- [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins): Agent Plugins for AWS architecture, deployment, and operations tasks.

### Specification, Governance, and Security Tooling

- [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard): An AI red-teaming and infrastructure-security platform maintained by Tencent Zhuque Lab. Its `aig-agent-redteam` Skill can perform authorized dynamic tests involving network probes, command execution, and target interaction, so it should be used only with explicit authorization and isolated boundaries.
- [AMAP-ML/SkillClaw](https://github.com/AMAP-ML/SkillClaw): Infrastructure for Skill evolution, deduplication, and cross-device sharing. It can proxy model requests, record sessions, and rewrite Skills automatically; review privacy, credential, and write boundaries before enabling shared storage or automatic evolution.

## Component Ecosystem

Components can be used independently or assembled into a standard Plugin. The list below keeps only high-quality discovery points. Inclusion, Stars, and format validation are not security audits or cross-client compatibility certifications.

### Skills (Standard Core Component)

- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills): A catalog and local toolchain for large-scale Skill discovery, selection, validation, and planning.
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills): A community Skill directory spanning multiple Agent clients.
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills): Agent Skills tutorials, guides, and directory indexes.
- [sandbaseai/sandbase-skills](https://github.com/sandbaseai/sandbase-skills): A cross-client Skill collection for research, social intelligence, and business workflows. Some Skills reuse host tools while others call external data services; review credentials, data transmission, and service dependencies before use.

### MCP Servers (Standard Core Component)

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers): A broad community directory of MCP servers.
- [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH): Chinese-language MCP resources and server/client guides.
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers): An early and actively maintained MCP server directory.
- [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers): A directory focused on network-accessible remote MCP servers.
- [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools): MCP development, testing, debugging, and validation tools.

### Hooks (Client Extension Component)

- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery): Examples and tutorials for systematically learning Claude Code Hooks.
- [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks): Hooks for security, cost, observability, and productivity, plus an installable Plugin Marketplace.
- [sondera-ai/sondera-coding-agent-hooks](https://github.com/sondera-ai/sondera-coding-agent-hooks): Cross-client Hook implementations for coding agents including Claude, Cursor, and Gemini.
- [1Password/agent-hooks](https://github.com/1Password/agent-hooks): Agent Hook implementations maintained by 1Password.
- [ithiria894/awesome-claude-code-hooks](https://github.com/ithiria894/awesome-claude-code-hooks): A Claude Code Hook directory focused on event-driven automation.

## Inclusion Principles

1. **Standards first:** Only packages with a root `plugin.json` declaring the Agent Plugins v1 `$schema` belong in the portable Plugin catalog.
2. **Separate client-specific surfaces:** Host-native Plugins and client extensions must identify their format, supported clients, and non-portable parts.
3. **Components are not automatically Plugins:** Standalone Skills, MCP servers, hooks, and other capabilities belong in the component ecosystem.
4. **State compatibility in layers:** Valid format, client loading, component execution, and security are different conclusions.
5. **Provide complete evidence:** Submissions should include installation, license, maintenance status, last verification date, and primary risk surfaces.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full requirements. This remains a README-first catalog, not a new package manager or hosted marketplace. Machine-readable catalog data and generation tooling should be introduced only when entry volume and maintenance needs justify them.

## Special Thanks

![](../assets/media/talk_is_cheap.jpg)

## Project History

- 2026-08: The project began its transition from Awesome Agent Skills to Awesome Agent Plugins and adopted a standards-first structure with separate client-specific and standalone-component sections.

[![](../assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
