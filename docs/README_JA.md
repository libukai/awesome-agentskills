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

> **Formerly Awesome Agent Skills.** 本プロジェクトは Agent Plugin エコシステムへ軸足を移しました。旧名称はコミュニティとプロジェクト履歴の継続性のためにのみ残します。

本プロジェクトは [Agent Plugins Specification](https://agent-plugins.org/specification) を中心的な基準とし、可搬な Agent Plugins を収録します。各クライアント固有の形式と機能は、独立した章で説明します。あらゆるものを Plugin と呼ぶのではなく、能力パッケージの可搬性に明確で検証可能な境界を与えることが目的です。

> 𝕏 アカウント [@libukai](https://x.com/libukai) および 💬 WeChat 公式アカウント [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) をフォローして、Agent Plugin エコシステムの最新リソースと実践チュートリアルを入手してください!

## Agent Plugins 標準

[Agent Plugins v1.0.0](https://agent-plugins.org/specification) は、可搬な Agent Plugin パッケージのためのベンダー中立仕様です。現在のステータスは **Working Draft** です。これは複数のクライアントが実装できる最小の相互運用契約であり、単一クライアントの機能上限ではありません。

v1 が標準化する Component は **Skills** と **MCP Servers** の2種類だけです。Agents、Commands、Hooks、Apps、LSP Servers、Rules、UI なども重要ですが、ライフサイクル、権限、実行時の意味がクライアントごとに異なるため、v1 の可搬コアには含まれません。

### 可搬な最小セット

| レイヤー | 固定位置 | 要件 | 可搬性 |
| --- | --- | --- | --- |
| **コア Manifest** | ルートの `plugin.json` | 必須。少なくとも仕様の `$schema` と `name` を含む | Agent Plugins v1 |
| **Skills** | `skills/<name>/SKILL.md` | 任意。Agent Skills 仕様に従う | 標準コア Component |
| **MCP Servers** | ルートの `mcp.json` | 任意。Agent Plugins の MCP 設定形式に従う | 標準コア Component |
| **クライアント拡張** | `plugin.json` の `extensions["com.example.client"]` および／またはトップレベルの `com.example.client/` | 任意。意味は対応クライアントが定義する | その名前空間を実装するクライアントでのみ有効 |

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

最小の `plugin.json`：

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "minimal-plugin"
}
```

`skills/` または `mcp.json` が存在しなくても形式エラーにはなりません。また、クライアントは Component と MCP transport を段階的に実装できます。したがって、**パッケージの仕様適合**、**クライアントの対応**、**Component の実行成功**は、それぞれ独立して確認すべき主張です。

### 標準が意図的に小さい理由

- Skills は可搬なタスク手順、知識、補助リソースを提供します。
- MCP はツールとデータ接続のための可搬なプロトコルを提供します。
- その他の機能には、まだ安定したクライアント間共通セマンティクスがありません。名前空間付き拡張により、誤った互換性を主張せずに革新できます。
- 小さなコアにより、作者は1つのパッケージでより多くのクライアントを対象にでき、各クライアントはその上に豊かなネイティブ体験を提供できます。

### 本カタログの用語

| 種類 | 本プロジェクトでの境界 | 掲載場所 |
| --- | --- | --- |
| **Portable Agent Plugin** | ルート `plugin.json` が Agent Plugins v1 を宣言する | 標準ベースのメインカタログ |
| **Client extension** | 適合パッケージ内で逆ドメイン名前空間を使うクライアント固有データまたはファイル | 対応クライアントの章。非可搬部分を明記 |
| **Host-native Plugin** | `.codex-plugin`、`.claude-plugin`、`.cursor-plugin`、または Copilot 固有形式を使用する | クライアント固有の章。既定では可搬とみなさない |
| **Standalone component** | 適合 Plugin パッケージ境界を持たない単独の Skill、MCP Server、Hook など | Component エコシステム |
| **Marketplace / Collection** | Plugin の発見、インストール、集約に使うインデックス | エコシステムディレクトリ。単独 Plugin ではない |

## クライアント固有機能

以下の形式と機能は、各クライアントのネイティブな製品面に属します。Agent Plugins コアと共存できますが、標準でも表現されていない限り、v1 の可搬 Component ではありません。

| クライアント | ネイティブ形式のマーカー | クライアント固有機能の例 |
| --- | --- | --- |
| **ChatGPT / Codex** | `.codex-plugin/plugin.json` | Apps、Agents、Commands、Hooks、Assets、Codex 固有の `.app.json` / `.mcp.json` |
| **Claude Code** | `.claude-plugin/plugin.json` | Agents、Commands、Hooks、LSP Servers、Monitors、Themes、Claude 固有の `.mcp.json` |
| **Cursor** | `.cursor-plugin/plugin.json` | Rules、Cursor 固有の Skills/MCP 構成、Canvas、その他の Cursor 機能 |
| **GitHub Copilot** | ルート `plugin.json`。Agent Plugins の `$schema` がなければ Copilot 形式として解釈 | Custom Agents、Hooks、Copilot 固有の `.mcp.json`、LSP Servers |
| **VS Code** | Agent Plugins 1.0、Copilot、Claude、Legacy OpenPlugin 形式を自動判定 | VS Code の Agents、Hooks、Slash Commands。Skills と `mcp.json` は標準形式を利用可能 |

現在の公開互換表には VS Code、Cursor、GitHub Copilot、ChatGPT / Codex、Kiro が掲載されています。各クライアントは Skills、MCP transport、その他の機能を段階的に実装できます。詳細は [Compatible Clients](https://agent-plugins.org/compatible-clients) を参照してください。

## エコシステムディレクトリ

### 標準と互換実装

- [Agent Plugins Specification](https://agent-plugins.org/specification)：パッケージ形式、Manifest Schema、Component 探索、拡張機構の規範文書です。
- [agentplugins/agent-plugins-spec](https://github.com/agentplugins/agent-plugins-spec)：仕様、Schema、ガバナンス、参考資料の公開リポジトリです。
- [Compatible Clients](https://agent-plugins.org/compatible-clients)：クライアントごとの標準 Component と MCP transport 対応表です。
- [VS Code Agent Plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins)：標準形式、ホスト拡張、複数のネイティブ形式の自動判定を区別する実装例です。

### クライアント固有コレクションと Marketplace

- [openai/plugins](https://github.com/openai/plugins)：Codex Plugin の例と公式ディレクトリです。
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)：Anthropic が管理する Claude Code 公式 Plugin ディレクトリです。
- [cursor/plugins](https://github.com/cursor/plugins) と [cursor/community-plugins](https://github.com/cursor/community-plugins)：Cursor 公式 Plugins とコミュニティディレクトリです。
- [github/copilot-plugins](https://github.com/github/copilot-plugins)：GitHub Copilot 公式 Plugin コレクションです。

### クライアント横断・分野別コレクション

- [flutter/agent-plugins](https://github.com/flutter/agent-plugins)：Flutter チームが管理する Claude Code、Codex、Cursor 向け能力パッケージです。
- [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins)：AWS の設計、デプロイ、運用タスク向け Agent Plugins です。

### 仕様・ガバナンス・セキュリティツール

- [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)：Tencent Zhuque Lab が管理する AI レッドチームおよびインフラセキュリティ基盤です。`aig-agent-redteam` Skill はネットワーク探査、コマンド実行、対象との対話を伴う認可済み動的テストを実行できるため、明示的な許可と隔離された境界の中でのみ使用してください。
- [AMAP-ML/SkillClaw](https://github.com/AMAP-ML/SkillClaw)：Skill の進化、重複排除、端末間共有のための基盤です。モデル要求のプロキシ、セッション記録、Skill の自動書き換えを行えるため、共有ストレージや自動進化を有効にする前に、プライバシー、認証情報、書き込み境界を確認してください。

## Component エコシステム

Component は単独でも利用でき、標準 Plugin に組み込むこともできます。以下は高品質な発見入口だけを残しています。掲載、Star 数、形式検証は、セキュリティ監査やクライアント間互換性の認証を意味しません。

### Skills（標準コア Component）

- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)：大規模な Skill の発見、選択、検証、計画を支援するカタログとローカルツールチェーンです。
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)：複数の Agent クライアントを対象とするコミュニティ Skill ディレクトリです。
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills)：Agent Skills のチュートリアル、ガイド、ディレクトリです。
- [sandbaseai/sandbase-skills](https://github.com/sandbaseai/sandbase-skills)：調査、ソーシャルインテリジェンス、業務ワークフロー向けのクライアント横断 Skill コレクションです。宿主ツールを再利用する Skill もあれば外部データサービスを呼び出すものもあるため、利用前に認証情報、データ送信、サービス依存関係を確認してください。

### MCP Servers（標準コア Component）

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)：幅広い MCP Server のコミュニティディレクトリです。
- [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH)：中国語の MCP リソース、Server、Client ガイドです。
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)：早期に作られ、継続的に管理されている MCP Server ディレクトリです。
- [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers)：ネットワーク経由で利用する Remote MCP Servers に特化したディレクトリです。
- [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools)：MCP の開発、テスト、デバッグ、検証ツールのディレクトリです。

### Hooks（クライアント拡張 Component）

- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)：Claude Code Hooks を体系的に学ぶための例とチュートリアルです。
- [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks)：セキュリティ、コスト、可観測性、生産性向け Hooks と、インストール可能な Plugin Marketplace です。
- [sondera-ai/sondera-coding-agent-hooks](https://github.com/sondera-ai/sondera-coding-agent-hooks)：Claude、Cursor、Gemini などの Coding Agent 向けクライアント横断 Hook 実装です。
- [1Password/agent-hooks](https://github.com/1Password/agent-hooks)：1Password チームが管理する Agent Hook 実装です。
- [ithiria894/awesome-claude-code-hooks](https://github.com/ithiria894/awesome-claude-code-hooks)：イベント駆動自動化に焦点を当てた Claude Code Hook ディレクトリです。

## 掲載原則

1. **標準を優先**：ルート `plugin.json` で Agent Plugins v1 の `$schema` を宣言するパッケージだけを、可搬 Plugin メインカタログに掲載します。
2. **クライアント固有面を分離**：Host-native Plugin と Client extension は、形式、対応クライアント、非可搬部分を明記します。
3. **Component を自動的に Plugin と呼ばない**：単独の Skills、MCP Servers、Hooks などは Component エコシステムに掲載します。
4. **互換性を段階別に記述**：形式の妥当性、クライアントでの読み込み、Component の実行、セキュリティは異なる結論です。
5. **十分な根拠を提示**：インストール方法、ライセンス、保守状況、最終確認日、主要なリスク面を提出してください。

詳細は [CONTRIBUTING.md](../CONTRIBUTING.md) を参照してください。当面は README-first のカタログを維持し、新しいパッケージマネージャーやホスト型 Marketplace は構築しません。機械可読カタログと生成ツールは、掲載数と保守コストが必要性を示した段階で導入します。

## 特別謝辞

![](../assets/media/talk_is_cheap.jpg)

## プロジェクト履歴

- 2026-08：Awesome Agent Skills から Awesome Agent Plugins への移行を開始し、「可搬標準を中心に、クライアント固有機能と単独 Component を分離する」構成を採用しました。

[![](../assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
