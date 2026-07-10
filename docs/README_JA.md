<div>
  <p align="center">
    <a href="https://platform.composio.dev/?utm_source=Github&utm_medium=Youtube&utm_campaign=2025-11&utm_content=AwesomeSkills">
    <img width="1280" height="640" alt="Composio banner" src="../assets/media/awesome-agent-skills.png">
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

[English](README_EN.md) | 日本語 | [简体中文](../README.md)

</div>

このプロジェクトは、少数精鋭の原則に従い、最高品質の Skill リソース、チュートリアル、ベストプラクティスの収集と共有を目的とし、より多くの人が Agent 構築の第一歩を簡単に踏み出せるよう支援します。

> 𝕏 アカウント [@libukai](https://x.com/libukai) および 💬 WeChat 公式アカウント [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) をフォローして、Skills の最新リソースと実用的なチュートリアルをいち早く入手してください!

## クイックスタート

Skill は軽量な汎用標準で、ワークフローと専門知識をパッケージ化することで、AI が特定のタスクを実行する能力を強化します。

反復可能なタスクを実行する必要がある時、毎回の AI との会話で関連情報を繰り返し提供する必要はありません。対応する Skill をインストールするだけで、AI は関連スキルを習得できます。

半年間の開発と反復を経て、Skill は Agent フレームワークにおいてパーソナライズされた AI 能力を強化する標準ソリューションとなり、様々な AI 製品に広くサポートされています。

## 標準構造

標準の定義によれば、各 Skill は標準化された命名のフォルダで、フロー、資料、スクリプトなど各種リソースを含みます。AI はこれらのコンテンツをコンテキスト内で段階的にインポートし、関連スキルを学習します。

```markdown
my-skill/
├── SKILL.md          # 必須：説明とメタデータ
├── scripts/          # オプション：実行可能コード
├── references/       # オプション：ドキュメント参考資料
└── assets/           # オプション：テンプレート、リソース
```

## スキルのインストール

Skill は Claude や ChatGPT のアプリ、Cursor や Claude Code などの IDE や TUI コーディングツール、OpenClaw などの Agent Harness で使用できます。

Skill をインストールする本質は、Skill のフォルダを特定のディレクトリに配置することで、AI が必要に応じてロードして使用できるようにすることです。

### Claude App エコシステム

![](../assets/media/claude_app.png)

現在、App で Skill を使用する主な方法は2つあります：App 内蔵の Skill ストアからインストールするか、zip ファイルをアップロードしてインストールする方法です。

公式ストアにない Skill については、以下で推奨するサードパーティ Skill ストアからダウンロードして手動でインストールできます。

### Claude Code エコシステム

![](../assets/media/skills_mp.png)

[skillsmp](https://skillsmp.com/zh) マーケットプレイスの使用を推奨します。このマーケットプレイスは GitHub 上のすべての Skill プロジェクトを自動的にインデックス化し、カテゴリ、更新時間、スター数などのタグで整理しています。

また、Vercel の [skills.sh](https://skills.sh/) ランキングボードを補助的に使用できます。最も人気のある Skills リポジトリと個別 Skill の使用状況を直感的に確認できます。

特定の skill については、`npx skills` コマンドラインツールを使用して迅速に発見、追加、管理できます。詳細なパラメータについては [vercel-labs/skills](https://github.com/vercel-labs/skills) を参照してください。

```bash
npx skills find [query]                          # 関連スキルを検索
npx skills add <owner/repo>                      # スキルをインストール（GitHub 省略形、完全 URL、ローカルパス対応）
npx skills list                                  # インストール済みスキルをリスト表示
npx skills check                                 # 利用可能なアップデートを確認
npx skills update                                # すべてのスキルをアップグレード
npx skills remove [skill-name]                   # スキルをアンインストール
```

### OpenClaw エコシステム

![](../assets/media/clawhub.png)

国際的なネットワークにアクセスでき、公式版 OpenClaw を使用している場合は、公式の [ClawHub](https://clawhub.com/) マーケットプレイスの使用を推奨します。より技術志向のスキルを提供し、多くの海外製品との統合が含まれています。

```bash
npx clawhub search [query]          # 関連スキルを検索
npx clawhub explore                 # マーケットプレイスを閲覧
npx clawhub install <slug>          # スキルをインストール
npx clawhub uninstall <slug>        # スキルをアンインストール
npx clawhub list                    # インストール済みスキルをリスト表示
npx clawhub update --all            # すべてのスキルをアップグレード
npx clawhub inspect <slug>          # スキルの詳細を表示（インストールなし）
```

![](../assets/media/skillshub.png)

主に国内ネットワーク環境で使用する場合、または国内カスタマイズ版の OpenClaw を使用している場合は、Tencent が提供する [SkillHub](https://skillhub.tencent.com/) マーケットプレイスの使用を推奨します。中国ユーザーのニーズに合ったスキルが多数提供されています。

まず、以下のコマンドで Skill Hub CLI ツールをインストールします：

```bash
curl -fsSL https://skillhub-1251783334.cos.ap-guangzhou.myqcloud.com/install/install.sh | bash
```

インストール後、以下のコマンドでスキルをインストール・管理できます：

```bash
skillhub search [query]           # 関連スキルを検索
skillhub install <skill-name>     # スキル名でスキルを追加
skillhub list                     # インストール済みスキルをリスト表示
skillhub upgrade                  # インストール済みスキルをアップグレード
```

## 優質チュートリアル

### 公式ドキュメント

- @Anthropic：[Claude Skills 完全構築ガイド](Claude-Skills-完全構建指南.md)
- @Anthropic：[Claude Agent Skills 実践経験](Claude-Code-Skills-実战経験.md)
- @Google：[Agent Skills 5つのデザインパターン](Agent-Skill-五种设计模式.md)

### 図文チュートリアル

- @libukai：[Agent Skills 簡易紹介スライド](../assets/docs/Agent%20Skills%20终极指南.pdf)
- @Eze：[Agent Skills 究極ガイド：入門、習熟、予測](https://mp.weixin.qq.com/s/jUylk813LYbKw0sLiIttTQ)
- @deeptoai：[Claude Agent Skills ファーストプリンシプル深掘り解析](https://skills.deeptoai.com/zh/docs/ai-ml/claude-agent-skills-first-principles-deep-dive)

### 動画チュートリアル

- @Mark's Tech Workshop：[Agent Skill：使い方から原理まで一度に解説](https://www.youtube.com/watch?v=yDc0_8emz7M)
- @白白说大模型：[Agent を作るのはもうやめよう、未来は Skills の時代](https://www.youtube.com/watch?v=xeoWgfkxADI)
- @01Coder：[OpenCode + 智谱GLM + Agent Skills で高品質な開発環境を構築](https://www.youtube.com/watch?v=mGzY2bCoVhU)

## 公式スキル

<table>
<tr><th colspan="5">🤖 AI モデルとプラットフォーム</th></tr>
<tr>
<td><a href="https://github.com/anthropics/skills">anthropics</a></td>
<td><a href="https://github.com/openai/skills">openai</a></td>
<td><a href="https://github.com/google-gemini/gemini-skills">gemini</a></td>
<td><a href="https://github.com/huggingface/skills">huggingface</a></td>
<td><a href="https://github.com/replicate/skills">replicates</a></td>
</tr>
<tr>
<td><a href="https://github.com/elevenlabs/skills">elevenlabs</a></td>
<td><a href="https://github.com/black-forest-labs/skills">black-forest-labs</a></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr><th colspan="5">☁️ クラウドサービスとインフラ</th></tr>
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
<td></td>
<td></td>
</tr>
<tr><th colspan="5">🛠️ 開発フレームワークとツール</th></tr>
<tr>
<td><a href="https://github.com/vercel-labs/agent-skills">vercel</a></td>
<td><a href="https://github.com/microsoft/agent-skills">microsoft</a></td>
<td><a href="https://github.com/expo/skills">expo</a></td>
<td><a href="https://github.com/better-auth/skills">better-auth</a></td>
<td><a href="https://github.com/posit-dev/skills">posit</a></td>
</tr>
<tr>
<td><a href="https://github.com/remotion-dev/skills">remotion</a></td>
<td><a href="https://github.com/slidevjs/slidev/tree/main/skills/slidev">slidev</a></td>
<td><a href="https://github.com/vercel-labs/agent-browser/tree/main/skills">agent-browser</a></td>
<td><a href="https://github.com/browser-use/browser-use/tree/main/skills">browser-use</a></td>
<td><a href="https://github.com/firecrawl/cli">firecrawl</a></td>
</tr>
<tr>
<td><a href="https://github.com/greensock/gsap-skills">gsap</a></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr><th colspan="5">📝 コンテンツとコラボレーション</th></tr>
<tr>
<td><a href="https://github.com/makenotion/skills">notion</a></td>
<td><a href="https://github.com/kepano/obsidian-skills">obsidian</a></td>
<td><a href="https://github.com/WordPress/agent-skills">wordpress</a></td>
<td><a href="https://github.com/langgenius/dify/tree/main/.claude/skills">dify</a></td>
<td><a href="https://github.com/sanity-io/agent-toolkit/tree/main/skills">sanity</a></td>
</tr>
<tr>
<td><a href="https://github.com/hardhackerlabs/podwise-cli">podwise-cli</a></td>
<td><a href="https://github.com/wpsnote/wpsnote-skills">wps</a></td>
<td><a href="https://github.com/marswaveai/skills">listenhub</a></td>
<td></td>
<td></td>
</tr>
</table>

## 厳選スキル

### プログラミング開発

-   [superpowers](https://github.com/obra/superpowers)：完全なプログラミングプロジェクトワークフローをカバー
-   [frontend-design](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design)：フロントエンドデザインスキル
-   [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)：より洗練されたパーソナライズされた UI/UX デザイン
-   [code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review)：コードレビュースキル
-   [code-simplifier](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier)：コード簡略化スキル
-   [commit-commands](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands)：Git コミットスキル

### コンテンツ制作

-   [baoyu-skills](https://github.com/JimLiu/baoyu-skills)：宝玉の個人用 Skills コレクション（WeChat 記事執筆、PPT 作成など）
-   [libukai](https://github.com/libukai/awesome-agent-skills)：Obsidian 関連スキルコレクション、Obsidian の執筆シーンに特化
-   [op7418](https://github.com/op7418)：高品質な PPT 作成・YouTube 分析スキル
-   [cclank](https://github.com/cclank/news-aggregator-skill)：指定分野の最新情報を自動収集・要約
-   [huangserva](https://github.com/huangserva/skill-prompt-generator)：AI 人物画像テキスト生成プロンプトを生成・最適化
-   [dontbesilent](https://github.com/dontbesilent2025/dbskill)：X のインフルエンサーが自身のツイートをもとに制作したコンテンツ制作フレームワーク
-   [seekjourney](https://github.com/geekjourneyx/md2wechat-skill/)：執筆から公開まで AI 支援の WeChat 記事作成

### 製品活用

-   [wps](https://github.com/wpsnote/wpsnote-skills)：WPS オフィスソフトを操作
-   [notebooklm](https://github.com/teng-lin/notebooklm-py)：NotebookLM を操作
-   [n8n](https://github.com/czlonkowski/n8n-skills)：n8n ワークフローを作成
-   [threejs](https://github.com/cloudai-x/threejs-skills)：Three.js プロジェクト開発を支援

### その他

-  [pua](https://github.com/tanweai/pua)：PUA スタイルで AI をより一生懸命働かせる
-   [office-hours](https://github.com/garrytan/gstack/tree/main/office-hours)：YC の視点から様々な起業アドバイスを提供
-   [maoxuan-product-agent](https://github.com/atdy/maoxuan-product-agent)：『矛盾論』『実践論』の推論構造から蒸留した中国語のプロダクト意思決定 Agent Skill。要件、成長、データ、プロジェクト、協業の課題に対応
-   [marketingskills](https://github.com/coreyhaines31/marketingskills)：マーケティング能力を強化
-   [scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)：研究者のスキルを向上

## セキュリティ監査

Skill には外部 API の呼び出しやスクリプトのサイレント実行など、潜在的なリスクを伴う操作が含まれている場合があるため、Skill の設計と使用においてセキュリティを十分に重視する必要があります。

Skill をインストールする際は、公式ストアや信頼できるサードパーティストアのものを優先し、Skill の説明とユーザーレビューをよく読んで、出所不明の Skill のインストールを避けることをお勧めします。

セキュリティ要件が高いシナリオでは、@余弦 の [slowmist-agent-security skill](https://github.com/slowmist/slowmist-agent-security) を使用して Skill のセキュリティ監査とリスク評価を行い、セキュリティと信頼性を確保できます。

OpenClaw のような高度な自律権限を持つ Agent Harness を使用する場合は、[OpenClaw 極簡セキュリティ実践ガイド](https://github.com/slowmist/openclaw-security-practice-guide) を併用し、システムプロンプトレベルのセキュリティ制約を適用して、潜在的なリスクを最小限に抑えることをお勧めします。

## スキルの作成

技能ショップから他の人が作成したスキルを直接インストールできますが、適合度とパーソナライズを高めるため、必要に応じて自分でスキルを作成するか、他の人のものをベースに微調整することを強くお勧めします。

### 公式プラグイン

公式の [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) プラグインを使用して、個人専用の skill を迅速に作成・反復できます。

![](../assets/media/skill-creator.png)

### 強化プラグイン

公式 skill-creator plugin をベースに、本プロジェクトは Anthropic と Google チームのベストプラクティスを統合し、Agent Skills を迅速に作成・改善するためのより強力な Agent Skills Toolkit を構築しました。（**注意：このプラグインは現在 Claude Code のみをサポートしています**）

#### マーケットプレイスの追加

Claude Code を起動し、プラグインマーケットプレイスに入り、`libukai/awesome-agent-skills` マーケットプレイスを追加します。入力ボックスで以下のコマンドを直接使用してマーケットプレイスを追加することもできます：

```bash
/plugin marketplace add libukai/awesome-agent-skills
```

#### プラグインのインストール

マーケットプレイスのインストールに成功したら、`agent-skills-toolkit` プラグインを選択してインストールします。

![](../assets/media/skill-creator-pro.png)

#### クイックコマンド

プラグインには複数のクイックコマンドが組み込まれており、作成、改善、テストからスキル説明の最適化まで、完全なワークフローをカバーしています：

- `/agent-skills-toolkit:skill-creator-pro` - 完全なワークフロー（強化版）
- `/agent-skills-toolkit:create-skill` - 新しい skill を作成
- `/agent-skills-toolkit:improve-skill` - 既存の skill を改善
- `/agent-skills-toolkit:test-skill` - skill をテストして評価
- `/agent-skills-toolkit:optimize-description` - 説明を最適化

## 謝辞

![](../assets/media/talk_is_cheap.jpg)

## プロジェクト履歴

[![Star History Chart](https://api.star-history.com/svg?repos=libukai/awesome-agent-skills&type=date&legend=top-left)](https://www.star-history.com/#libukai/awesome-agent-skills&type=date&legend=top-left)
