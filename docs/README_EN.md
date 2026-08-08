<div>
  <p align="center">
    <a href="https://platform.composio.dev/?utm_source=Github&utm_medium=Youtube&utm_campaign=2025-11&utm_content=AwesomeSkills">
    <img width="100%" alt="Composio banner" src="../assets/media/awesome-agent-skills.png">
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

English | [日本語](README_JA.md) | [简体中文](../README.md)

</div>

# Awesome Agent Plugins

> **Formerly Awesome Agent Skills.** The project now focuses on the broader Agent Plugin ecosystem; the former name is retained only for community and project-history continuity.

This project favors quality over quantity. It curates discoverable, installable, and maintainable Agent Plugins, together with the high-quality Skills, MCP servers, apps, agents, commands, and hooks that compose them. The goal is to help developers understand each host's extension model and find capability packages that fit real tasks.

> Follow me on 𝕏 [@libukai](https://x.com/libukai) and 💬 WeChat Official Account [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) for the latest Agent Plugin ecosystem resources and practical tutorials!

## What Is an Agent Plugin?

A plugin is an installation and distribution unit for end users. It can combine task guidance, tool connections, specialized agents, automation hooks, and interactive interfaces into a complete capability package.

Plugin definitions still differ across ecosystems. [Agent Plugins Specification 1.0](https://agent-plugins.org/specification) currently standardizes Skills and MCP servers, while hosts such as Codex, Claude Code, Cursor, GitHub Copilot, and VS Code can also support apps, agents, commands, hooks, LSP servers, and other extensions. This project therefore labels formats and hosts explicitly instead of treating "installable in one host" as "compatible with every agent."

| Concept | Meaning in this project | Listed in the main Plugin directory? |
| --- | --- | --- |
| **Plugin** | A capability package with a clear package boundary, installation path, and version source | Yes |
| **Component** | A Skill, MCP server, app, agent, command, hook, or other individual capability | Only when packaged; otherwise listed in a component directory |
| **Marketplace** | An index for publishing, discovering, installing, and updating Plugins | Listed as a Marketplace, not as an individual Plugin |
| **Collection** | An Awesome List, official bundle, or thematic directory | Listed as an ecosystem resource, not as an individual Plugin |

```text
Agent Plugin
├── Instructions & knowledge: Skills
├── Tools & data: MCP Servers, Apps & Connectors
├── Delegation: Agents
├── User entry points: Commands
├── Automation & guardrails: Hooks
├── Code intelligence: LSP Servers
└── UI, assets, templates and other host extensions
```

## Agent Plugin Ecosystem

### Official Plugin Collections and Marketplaces

- [openai/plugins](https://github.com/openai/plugins): Codex plugin examples and official directory entries spanning Skills, apps, MCP servers, agents, commands, hooks, and related surfaces.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official): Anthropic's official, maintained directory of Claude Code Plugins.
- [cursor/plugins](https://github.com/cursor/plugins) and [cursor/community-plugins](https://github.com/cursor/community-plugins): Cursor's specification, official Plugins, and community directory.
- [github/copilot-plugins](https://github.com/github/copilot-plugins): GitHub's official Copilot Plugin collection, including Skills, MCP servers, hooks, and other extensions.
- [flutter/agent-plugins](https://github.com/flutter/agent-plugins): Flutter-team capability packages for Claude Code, Codex, and Cursor workflows.
- [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins): Agent Plugins for AWS architecture, deployment, and operations tasks.

### Open Specifications and Compatibility

- [Agent Plugins](https://agent-plugins.org/): An open, vendor-neutral portable Plugin specification for Skills and MCP servers.
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins): Plugin creation, installation, and Marketplace documentation for Claude Code.
- [Cursor Plugins](https://cursor.com/docs/plugins): Cursor's Plugin format, Marketplace, and publishing documentation.
- [GitHub Copilot Plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins): Plugin overview for Copilot CLI and Copilot cloud agent.
- [VS Code Agent Plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins): Agent Plugin support and cross-tool compatibility in VS Code.

## Component Ecosystem

Components can be used on their own or assembled into Plugins. The following projects are high-quality discovery points and representative implementations. Inclusion, Star counts, and format validation are not security audits or cross-host compatibility certifications.

### Awesome Agent Skills

- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills): A large catalog and local toolchain for Skill discovery, selection, validation, and planning.
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills): A community Agent Skill directory spanning multiple hosts.
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills): Tutorials, guides, and directories for Agent Skills.

### Awesome MCP

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers): A broad community directory of MCP servers.
- [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH): Chinese-language MCP resources and guides to servers and clients.
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers): An early and actively maintained MCP server directory.
- [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers): A directory focused on remotely accessible MCP servers.
- [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools): Developer tools for building, testing, debugging, and validating MCP implementations.

### Agent Hooks

- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery): Examples and tutorials for systematically learning Claude Code Hooks.
- [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks): Hooks for safety, cost, observability, and productivity, plus an installable Plugin Marketplace.
- [sondera-ai/sondera-coding-agent-hooks](https://github.com/sondera-ai/sondera-coding-agent-hooks): Cross-host hook implementations for coding agents including Claude, Cursor, and Gemini.
- [1Password/agent-hooks](https://github.com/1Password/agent-hooks): Agent Hook implementations maintained by the 1Password team.
- [ithiria894/awesome-claude-code-hooks](https://github.com/ithiria894/awesome-claude-code-hooks): A Claude Code Hook directory focused on event-driven automation.

## Inclusion Principles

The main Plugin directory accepts capability packages with a clear installation boundary and source. Standalone Skills, MCP servers, hooks, and other components are still welcome, but belong in their corresponding component directories. Every submission should identify supported hosts, included components, installation method, license, maintenance status, last verification date, and primary risk surfaces. See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full requirements.

For now this remains a README-first catalog, not a new package manager or hosted marketplace. Machine-readable catalog data and generation tooling should be introduced only when the number of entries and maintenance needs justify them.

## Special Thanks

![](../assets/media/talk_is_cheap.jpg)

## Project History

- 2026-08: The project began its transition from Awesome Agent Skills to Awesome Agent Plugins, with Skills retained as a component-ecosystem entry point.

[![](../assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
