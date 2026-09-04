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

This project follows the principle of quality over quantity, collecting and sharing the best Skill resources, tutorials, and practices to help more people take their first step toward building a personalized Agent.

> Follow me on 𝕏 [@libukai](https://x.com/libukai) and 💬 WeChat Official Account [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) for the latest Skills resources and practical tutorials!

## Quick Start

Skill is a lightweight universal standard that packages workflows and professional knowledge to enhance AI's ability to perform specific tasks.

For recurring tasks, you no longer need to repeat the same background information in every conversation. Install the corresponding Skill, and the Agent can acquire the relevant capabilities.

After nearly a year of evolution, Skill has become a standard way to extend AI with domain-specific capabilities and is now supported by mainstream Agent Harness frameworks and AI products.

## Support Status

The open Skill specification has been adopted by many hosts, including Claude Code, ChatGPT and Codex, GitHub Copilot, Cursor, Gemini CLI, VS Code, OpenCode, Kiro, and JetBrains Junie. Search paths and support for experimental fields vary by host; consult the [Agent Skills Client Showcase](https://agentskills.io/clients) and each product's documentation for current details.

## Standard Structure

Agent Skills is an [open specification](https://agentskills.io/specification) initiated by Anthropic and maintained with the community. Each Skill is a standardized folder containing workflows, references, scripts, and other resources that an agent loads progressively.

```markdown
my-skill/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: references and documentation
├── assets/           # Optional: templates, resources
└── ...               # Other files or directories
```

A minimal Skill needs only a `SKILL.md` file.

The YAML frontmatter in `SKILL.md` requires `name` and `description`; it may also declare `license`, `compatibility`, `metadata`, and the experimental `allowed-tools`.

`name` is limited to 64 characters, uses lowercase letters, numbers, and hyphens, and must match its parent directory. `description` is limited to 1,024 characters and should explain both what the Skill does and when to use it. Keep the body below 500 lines and 5,000 tokens, moving details into focused resource files.

In addition to `SKILL.md`, a Skill may include the following optional files or directories:

- `scripts/`: directly executable code for repeated, complex, or deterministic operations such as data processing, format conversion, and output validation.
- `references/`: supporting material that the Agent reads only for relevant tasks, such as domain knowledge, technical documentation, examples, and data-format specifications.
- `assets/`: static resources used during execution or included in outputs, such as document templates, configuration templates, images, lookup tables, and schemas.
- Other files: licenses, human-facing documentation, or any other files and directories needed to complete the task.

All of these are optional. Reference them from `SKILL.md` using paths relative to the Skill root, and state when the Agent should read or execute each one.

Agents usually load a Skill in three stages: at startup, they read only each Skill's `name` and `description` for discovery; when a task matches, they activate and load the full `SKILL.md`; during execution, they read `scripts/`, `references/`, and `assets/` only as needed. This progressive disclosure keeps a large catalog available without consuming unnecessary context.

## Install Skills

Skills can be used in GUI apps such as Claude and ChatGPT, IDEs such as Cursor, and TUI CLI tools such as Claude Code.

Installing a Skill essentially means placing its folder in a designated directory so that an Agent can load and use it on demand.

### Shared Directory Convention

Many compatible clients scan `.agents/skills/` at both project and user scope:

```text
<project>/.agents/skills/<skill-name>/
~/.agents/skills/<skill-name>/
```

A project-level Skill normally overrides a user-level Skill with the same name. Clients may also scan their own native directories, so confirm exact paths in the product documentation. Because project Skills arrive with a repository, inspect the source and contents before loading Skills from an unfamiliar checkout.

### Installing in Apps

![](../assets/media/workbuddy.png)

There are currently two main ways to use Skills in the App: install through the App's built-in Skill store, or install by uploading a zip file.

Some Apps now provide a built-in Skill store or management entry point for convenient installation and management.

For Skills not available in the official store, you can download them from the recommended third-party Skill stores below and install them manually.

### Installing in the CLI

![](../assets/media/skills_mp.png)

Use the [skillsmp](https://skillsmp.com/zh) marketplace to discover Skill projects on GitHub and filter them by category, update time, star count, and other tags.

You can also use Vercel's [skills.sh](https://skills.sh/) leaderboard to intuitively view the most popular Skills repositories and individual Skill usage.

For a specific Skill, use the `npx skills` command-line tool to quickly discover, add, and manage it. For detailed parameters, see [vercel-labs/skills](https://github.com/vercel-labs/skills).

```bash
npx skills find [query]                          # Search for related skills
npx skills add <owner/repo>                      # Install skills (supports GitHub shorthand, full URL, local path)
npx skills add <owner/repo> --list               # Preview the skills in a repository
npx skills use <owner/repo@skill>                # Use temporarily without installing
npx skills list                                  # List installed skills
npx skills update [skill-name]                   # Update one or more skills
npx skills remove [skill-name]                   # Uninstall skills
npx skills init [skill-name]                     # Create a skill template
```

The current `skills` CLI supports more than 70 Agents and lets you choose project or global scope, target Agents, and copy or symbolic-link installation. See [vercel-labs/skills](https://github.com/vercel-labs/skills) for current parameters.

If version pinning and supply-chain provenance matter more, GitHub CLI 2.90.0 and later provide the public-preview `gh skill` commands:

```bash
gh skill search <query>                          # Search for Skills
gh skill preview <owner/repo> <skill>            # Inspect content before installation
gh skill install <owner/repo> <skill>@<tag>      # Install from a tag
gh skill install <owner/repo> <skill> --pin <sha> # Pin to a commit
gh skill update --all                            # Check for and install updates
gh skill publish                                 # Validate and publish a Skill
```

`gh skill` records the repository, ref, and Git tree SHA, and can be combined with immutable releases, secret scanning, and code scanning. See the [GitHub announcement](https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/).

## Quality Tutorials

### Official Documentation

- @Agent Skills: [Overview](https://agentskills.io/home), [Specification](https://agentskills.io/specification), and [Quickstart](https://agentskills.io/skill-creation/quickstart)
- @Agent Skills: [Creator best practices](https://agentskills.io/skill-creation/best-practices), [Quality evaluation](https://agentskills.io/skill-creation/evaluating-skills), [Description optimization](https://agentskills.io/skill-creation/optimizing-descriptions), and [Script design](https://agentskills.io/skill-creation/using-scripts)
- @Agent Skills: [Add Skills support to an agent](https://agentskills.io/client-implementation/adding-skills-support)
- @Anthropic: [Claude Skills Complete Build Guide](Claude-Skills-完全构建指南.md)
- @Anthropic: [Claude Agent Skills Practical Experience](Claude-Code-Skills-实战经验.md)
- @Google: [5 Agent Skill Design Patterns](Agent-Skill-五种设计模式.md)

### Written Tutorials

- @libukai: [Agent Skills Introduction Slides](../assets/docs/Agent%20Skills%20终极指南.pdf)
- @Eze: [Agent Skills Ultimate Guide: Getting Started, Mastery, and Predictions](https://mp.weixin.qq.com/s/jUylk813LYbKw0sLiIttTQ)
- @deeptoai: [Claude Agent Skills First Principles Deep Dive](https://skills.deeptoai.com/zh/docs/ai-ml/claude-agent-skills-first-principles-deep-dive)

### Video Tutorials

- @Mark's Tech Workshop: [Agent Skill: From Usage to Principles, All in One](https://www.youtube.com/watch?v=yDc0_8emz7M)
- @BaiBai on LLMs: [Stop Building Agents, the Future is Skills](https://www.youtube.com/watch?v=xeoWgfkxADI)
- @01Coder: [OpenCode + GLM + Agent Skills for High-Quality Dev Environment](https://www.youtube.com/watch?v=mGzY2bCoVhU)

## Official Skills

<table>
<tr><th colspan="5">🤖 AI Models & Platforms</th></tr>
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
<td><a href="https://github.com/google/skills">google</a></td>
<td><a href="https://github.com/NVIDIA/skills">nvidia</a></td>
<td></td>
</tr>
<tr><th colspan="5">☁️ Cloud Services & Infrastructure</th></tr>
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
<td><a href="https://github.com/aws/agent-toolkit-for-aws">aws</a></td>
<td><a href="https://github.com/amd/skills">amd</a></td>
</tr>
<tr>
<td><a href="https://github.com/elastic/agent-skills">elastic</a></td>
<td><a href="https://github.com/mongodb/agent-skills">mongodb</a></td>
<td><a href="https://github.com/redis/agent-skills">redis</a></td>
<td><a href="https://github.com/wandb/skills">wandb</a></td>
<td></td>
</tr>
<tr><th colspan="5">🛠️ Dev Frameworks & Tools</th></tr>
<tr>
<td><a href="https://github.com/vercel-labs/agent-skills">vercel</a></td>
<td><a href="https://github.com/microsoft/skills">microsoft</a></td>
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
<tr><th colspan="5">📝 Content & Collaboration</th></tr>
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
<td><a href="https://github.com/larksuite/cli">lark</a></td>
<td></td>
</tr>
</table>

## Featured Skills

### Programming & Development

-   [superpowers](https://github.com/obra/superpowers): Complete programming project workflow
-   [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design): Frontend design skills
-   [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): More refined and personalized UI/UX design
-   [archify](https://github.com/tt-a1i/archify): Verifiable, exportable architecture and workflow diagrams
-   [text-to-cad](https://github.com/earthtojake/text-to-cad): CAD, CAE, and CAM agent skills
-   [native-feel-skill](https://github.com/yetone/native-feel-skill): Native-feeling cross-platform desktop app guidance

### Content Creation

-   [baoyu-skills](https://github.com/JimLiu/baoyu-skills): Baoyu's personal Skills collection, including WeChat article writing, PPT creation, etc.
-   [libukai](https://github.com/libukai/awesome-agent-skills): Obsidian-related skill collection, tailored for Obsidian writing workflows
-   [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill): Polished HTML slide-deck generation
-   [cclank](https://github.com/cclank/news-aggregator-skill): Automatically fetch and summarize the latest news in specified domains
-   [huangserva](https://github.com/huangserva/skill-prompt-generator): Generate and optimize AI portrait text-to-image prompts
-   [dontbesilent](https://github.com/dontbesilent2025/dbskill): Content creation framework by an X influencer based on their own tweets
-   [seekjourney](https://github.com/geekjourneyx/md2wechat-skill/): AI-assisted WeChat article writing from drafting to publishing
-   [cangjie-skill](https://github.com/kangarooking/cangjie-skill): Distill books, videos, and podcasts into executable Agent Skills

### Product Usage

-   [wps](https://github.com/wpsnote/wpsnote-skills): Control WPS office software
-   [notebooklm](https://github.com/teng-lin/notebooklm-py): Control NotebookLM
-   [n8n](https://github.com/czlonkowski/n8n-skills): Create n8n workflows
-   [threejs](https://github.com/cloudai-x/threejs-skills): Assist with Three.js development
-   [skills-manage](https://github.com/iamzhihuix/skills-manage): Manage local Skills across multiple agent hosts

### Other Types

-  [pua](https://github.com/tanweai/pua): Drive AI to work harder in a PUA style
-   [office-hours](https://github.com/garrytan/gstack/tree/main/office-hours): Provide startup advice from a YC perspective
-   [marketingskills](https://github.com/coreyhaines31/marketingskills): Enhance marketing capabilities
-   [scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills): Improve skills for researchers

## Security Audit

Skills are not passive documentation: descriptions influence discovery, instructions change agent behavior, and scripts may access files, networks, credentials, and external accounts. Review six layers of risk: provenance, content, dependencies, permissions, runtime, and updates.

Before installation, prefer official or trusted maintainers, inspect every file with `gh skill preview` or manually, and pin a tag or commit. At runtime, use least privilege, sandboxing, human approval for sensitive actions, and audit logs. Marketplace inclusion, stars, and spec compliance do not prove safety or effectiveness.

For an initial scan, use [Cisco AI Defense Skill Scanner](https://github.com/cisco-ai-defense/skill-scanner) or [slowmist-agent-security](https://github.com/slowmist/slowmist-agent-security). Also see the provenance, skill-card, scanning, and signing model used by [NVIDIA Verified Skills](https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/). Scanners are signals, not substitutes for review and isolation.

## Create Skills

While you can directly install skills created by others through skill marketplaces, to improve skill fit and personalization, it is strongly recommended to create your own skills as needed, or fine-tune others' skills.

### Design Principles

- Start from real work: extract successful steps, human corrections, project artifacts, failure cases, and historical fixes instead of generating generic procedures from model knowledge alone.
- Keep a coherent boundary: one Skill should cover a composable task with an independently verifiable outcome. Overly narrow skills add loading and conflict overhead; broad skills trigger imprecisely.
- Spend context carefully: include what an agent would otherwise miss or get wrong, move detail into focused reference files, and say exactly when each file should be read.
- Calibrate control: prescribe fragile, irreversible, or order-sensitive operations; explain goals and reasoning where several approaches are valid.
- Provide defaults: offer one reliable default with a clear escape hatch, favor reusable procedures, and avoid menus of equal options or answers tailored to one instance.
- Build a feedback loop with gotchas, output templates, checklists, validation loops, and plan-validate-execute workflows.

### Scripts and Resources

Reference an existing command directly when it reliably handles a simple one-off operation. Move repeated or complex logic into tested scripts under `scripts/`. Use paths relative to the skill root and tell the agent exactly when to invoke each file.

- Pin dependency versions and declare runtime or network requirements in `compatibility` or the instructions.
- Avoid interactive prompts. Accept input through flags, environment variables, or stdin, and provide concise `--help` output.
- Make errors actionable. Write structured data to stdout and diagnostics or progress to stderr.
- Keep files in `references/` focused and avoid deep chains of references.

See the official [Using scripts in skills](https://agentskills.io/skill-creation/using-scripts) guide.

### Testing and Evaluation

Skill evaluation has two dimensions. **`description` evaluation** checks whether the Agent activates the Skill when it should and avoids false triggers when it should not. **Skill effectiveness evaluation** checks whether loading the Skill genuinely improves task quality, stability, or efficiency. The first asks, “Can the Agent find the right Skill?” The second asks, “Is the Skill useful once found?” Use a set of realistic tasks with explicit success criteria for regression testing, and compare results against runs without the Skill or with the previous version.

For the complete workflow, see the official guides to [evaluating Skill output](https://agentskills.io/skill-creation/evaluating-skills) and [optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

- [SkillsBench](https://www.skillsbench.ai/): cross-domain benchmark and leaderboard
- [microsoft/waza](https://github.com/microsoft/waza): create, test, measure, and improve Skills
- [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt): trajectory- and validation-driven text optimization
- [alibaba/skill-up](https://github.com/alibaba/skill-up): evaluation and evolution tooling
- [rpamis/comet](https://github.com/rpamis/comet): turn ideas into evaluated agent workflows

Existing research points to the same conclusion: a focused Skill with explicit acceptance criteria and continuous regression testing is usually more reliable than an all-encompassing knowledge bundle; an outdated or mismatched Skill can increase cost and even reduce success rates.

## Special Thanks

![](../assets/media/talk_is_cheap.jpg)

## Project History

[![](../assets/media/20260805233809.png)](https://www.star-history.com/?repos=libukai%2Fawesome-agent-skills&type=date&legend=top-left)
