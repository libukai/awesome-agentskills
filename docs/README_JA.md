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

[English](README_EN.md) | 日本語 | [简体中文](../README.md)

</div>

# Awesome Agent Plugins

> **Formerly Awesome Agent Skills.** 本プロジェクトは、より広い Agent Plugin エコシステムへ軸足を移しました。旧名称はコミュニティとプロジェクト履歴の継続性のためにのみ残します。

このプロジェクトは少数精鋭の原則に従い、発見・インストール・保守が可能な Agent Plugins と、それらを構成する優れた Skills、MCP Servers、Apps、Agents、Commands、Hooks を収集します。各ホストの拡張モデルを理解し、実際のタスクに合う能力パッケージを見つけることが目的です。

> 𝕏 アカウント [@libukai](https://x.com/libukai) および 💬 WeChat 公式アカウント [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) をフォローして、Agent Plugin エコシステムの最新リソースと実践チュートリアルを入手してください!

## Agent Plugin とは

Plugin は、エンドユーザー向けのインストールおよび配布の単位です。タスク手順、ツール接続、専用 Agent、自動化 Hook、インタラクティブ UI を組み合わせて、完全な能力パッケージを構成できます。

Plugin の定義はエコシステムごとにまだ異なります。[Agent Plugins Specification 1.0](https://agent-plugins.org/specification) が現在標準化しているのは Skills と MCP Servers です。一方、Codex、Claude Code、Cursor、GitHub Copilot、VS Code などのホストは、Apps、Agents、Commands、Hooks、LSP Servers などもサポートします。そのため本プロジェクトでは形式とホストを明記し、「1つのホストでインストール可能」を「すべての Agent と互換性がある」とは表現しません。

| 概念 | 本プロジェクトでの意味 | Plugin メインディレクトリへの掲載 |
| --- | --- | --- |
| **Plugin** | 明確なパッケージ境界、インストール方法、バージョンの出所を持つ能力パッケージ | 掲載する |
| **Component** | Skill、MCP Server、App、Agent、Command、Hook などの単独能力 | パッケージ化済みの場合のみ。単独の場合は Component ディレクトリへ |
| **Marketplace** | Plugin の公開、発見、インストール、更新を行うインデックス | Marketplace として掲載し、単独 Plugin とは扱わない |
| **Collection** | Awesome List、公式バンドル、テーマ別ディレクトリ | エコシステムリソースとして掲載し、単独 Plugin とは扱わない |

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

## Agent Plugin エコシステム

### 公式 Plugin コレクションと Marketplace

- [openai/plugins](https://github.com/openai/plugins)：Skills、Apps、MCP Servers、Agents、Commands、Hooks などを含む Codex Plugin の例と公式ディレクトリです。
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)：Anthropic が管理する Claude Code 公式 Plugin ディレクトリです。
- [cursor/plugins](https://github.com/cursor/plugins) と [cursor/community-plugins](https://github.com/cursor/community-plugins)：Cursor の仕様、公式 Plugins、コミュニティディレクトリです。
- [github/copilot-plugins](https://github.com/github/copilot-plugins)：Skills、MCP Servers、Hooks などを含む GitHub Copilot 公式 Plugin コレクションです。
- [flutter/agent-plugins](https://github.com/flutter/agent-plugins)：Flutter チームが管理する Claude Code、Codex、Cursor 向け能力パッケージです。
- [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins)：AWS の設計、デプロイ、運用タスク向け Agent Plugins です。

### オープン仕様と互換性

- [Agent Plugins](https://agent-plugins.org/)：Skills と MCP Servers のための、オープンでベンダー中立な可搬 Plugin 仕様です。
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins)：Claude Code の Plugin 作成、インストール、Marketplace ドキュメントです。
- [Cursor Plugins](https://cursor.com/docs/plugins)：Cursor の Plugin 形式、Marketplace、公開方法です。
- [GitHub Copilot Plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins)：Copilot CLI と Copilot cloud agent の Plugin 概要です。
- [VS Code Agent Plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins)：VS Code の Agent Plugin 対応とツール間互換性の説明です。

## Component エコシステム

Component は単独でも利用でき、Plugin に組み込むこともできます。以下は高品質な発見入口と代表的な実装です。掲載、Star 数、形式検証は、セキュリティ監査やホスト間互換性の認証を意味しません。

### Awesome Agent Skills

- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)：大規模な Skill の発見、選択、検証、計画を支援するカタログとローカルツールチェーンです。
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)：複数の Agent ホストを対象とするコミュニティ Skill ディレクトリです。
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills)：Agent Skills のチュートリアル、ガイド、ディレクトリです。

### Awesome MCP

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)：幅広い MCP Server のコミュニティディレクトリです。
- [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH)：中国語の MCP リソース、Server、Client ガイドです。
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)：早期に作られ、継続的に管理されている MCP Server ディレクトリです。
- [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers)：ネットワーク経由で利用する Remote MCP Servers に特化したディレクトリです。
- [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools)：MCP の開発、テスト、デバッグ、検証ツールのディレクトリです。

### Agent Hooks

- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)：Claude Code Hooks を体系的に学ぶための例とチュートリアルです。
- [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks)：安全性、コスト、可観測性、生産性向け Hooks と、インストール可能な Plugin Marketplace です。
- [sondera-ai/sondera-coding-agent-hooks](https://github.com/sondera-ai/sondera-coding-agent-hooks)：Claude、Cursor、Gemini などの Coding Agent 向けクロスホスト Hook 実装です。
- [1Password/agent-hooks](https://github.com/1Password/agent-hooks)：1Password チームが管理する Agent Hook 実装です。
- [ithiria894/awesome-claude-code-hooks](https://github.com/ithiria894/awesome-claude-code-hooks)：イベント駆動自動化に焦点を当てた Claude Code Hook ディレクトリです。

## 掲載原則

Plugin メインディレクトリには、明確なインストール境界と出所を持つ能力パッケージだけを掲載します。単独の Skill、MCP Server、Hook、その他 Component の投稿も歓迎しますが、対応する Component ディレクトリへ掲載します。各投稿には、対応ホスト、含まれる Component、インストール方法、ライセンス、保守状況、最終確認日、主なリスク面を記載してください。詳細は [CONTRIBUTING.md](../CONTRIBUTING.md) を参照してください。

当面は README-first のカタログを維持し、新しいパッケージマネージャーやホスト型 Marketplace は構築しません。機械可読カタログと生成ツールは、掲載数と保守コストが必要性を示した段階で導入します。

## 特別謝辞

![](../assets/media/talk_is_cheap.jpg)

## プロジェクト履歴

- 2026-08：Awesome Agent Skills から Awesome Agent Plugins への移行を開始し、Skills は Component エコシステムの入口として残しました。

[![](../assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
