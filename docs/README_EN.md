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

English | [日本語](README_JA.md) | [简体中文](../README.md)

</div>

This project is dedicated to following the principle of quality over quantity, collecting and sharing the finest Skill resources, tutorials, and best practices, helping more people easily take their first step in building Agents.

> Follow me on 𝕏 [@libukai](https://x.com/libukai) and 💬 WeChat Official Account [@李不凯正在研究](https://mp.weixin.qq.com/s/uer7HvD2Z9ZbJSPEZWHKRA?scene=0&subscene=90) for the latest Skills resources and practical tutorials!

## Quick Start

Skill is a lightweight universal standard that packages workflows and professional knowledge to enhance AI's ability to perform specific tasks.

When you need to execute repeatable tasks, you no longer need to repeatedly provide relevant information in every conversation with AI. Simply install the corresponding Skill, and AI will master the related capabilities.

After half a year of development and iteration, Skill has become the standard solution for enhancing personalized AI capabilities in Agent frameworks, and has been widely supported by various AI products.

## Standard Structure

According to the standard definition, each Skill is a standardized named folder containing workflows, references, scripts, and other resources. AI progressively imports these contents in context to learn related skills.

```markdown
my-skill/
├── SKILL.md          # Required: description and metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation references
└── assets/           # Optional: templates, resources
```

## Install Skills

Skills can be used in Claude and ChatGPT apps, IDE and TUI coding tools like Cursor and Claude Code, and Agent Harnesses like OpenClaw.

The essence of installing a Skill is simply placing the Skill's folder into a specific directory so that AI can load and use it on demand.

### Claude App Ecosystem

![](../assets/media/claude_app.png)

There are currently two main ways to use Skills in the App: install through the App's built-in Skill store, or install by uploading a zip file.

For Skills not available in the official store, you can download them from the recommended third-party Skill stores below and install them manually.

### Claude Code Ecosystem

![](../assets/media/skills_mp.png)

It is recommended to use the [skillsmp](https://skillsmp.com/zh) marketplace, which automatically indexes all Skill projects on GitHub and organizes them by category, update time, star count, and other tags.

You can also use Vercel's [skills.sh](https://skills.sh/) leaderboard to intuitively view the most popular Skills repositories and individual Skill usage.

For specific skills, use the `npx skills` command-line tool to quickly discover, add, and manage skills. For detailed parameters, see [vercel-labs/skills](https://github.com/vercel-labs/skills).

```bash
npx skills find [query]                          # Search for related skills
npx skills add <owner/repo>                      # Install skills (supports GitHub shorthand, full URL, local path)
npx skills list                                  # List installed skills
npx skills check                                 # Check for available updates
npx skills update                                # Upgrade all skills
npx skills remove [skill-name]                   # Uninstall skills
```

### OpenClaw Ecosystem

![](../assets/media/clawhub.png)

If you have access to international networks and use the official OpenClaw version, it is recommended to use the official [ClawHub](https://clawhub.com/) marketplace, which provides more technical-oriented skills and includes integration with many overseas products.

```bash
npx clawhub search [query]          # Search for related skills
npx clawhub explore                 # Browse the marketplace
npx clawhub install <slug>          # Install a skill
npx clawhub uninstall <slug>        # Uninstall a skill
npx clawhub list                    # List installed skills
npx clawhub update --all            # Upgrade all skills
npx clawhub inspect <slug>          # View skill details (without installing)
```

![](../assets/media/skillshub.png)

For users primarily on domestic networks or using a domestically customized version of OpenClaw, it is recommended to use Tencent's [SkillHub](https://skillhub.tencent.com/) marketplace, which offers many skills better suited to Chinese users' needs.

First, install the Skill Hub CLI tool with the following command:

```bash
curl -fsSL https://skillhub-1251783334.cos.ap-guangzhou.myqcloud.com/install/install.sh | bash
```

After installation, use the following commands to install and manage skills:

```bash
skillhub search [query]           # Search for related skills
skillhub install <skill-name>     # Add a skill by name
skillhub list                     # List installed skills
skillhub upgrade                  # Upgrade installed skills
```

## Quality Tutorials

### Official Documentation

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
<td></td>
<td></td>
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
<td></td>
<td></td>
</tr>
<tr><th colspan="5">🛠️ Dev Frameworks & Tools</th></tr>
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
<td><a href="https://github.com/go165/agent-skill-groups">agent-skill-groups</a></td>
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
<td></td>
<td></td>
</tr>
</table>

## Featured Skills

### Programming & Development

-   [superpowers](https://github.com/obra/superpowers): Complete programming project workflow
-   [frontend-design](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design): Frontend design skills
-   [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): More refined and personalized UI/UX design
-   [code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review): Code review skills
-   [code-simplifier](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier): Code simplification skills
-   [commit-commands](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands): Git commit skills

### Content Creation

-   [baoyu-skills](https://github.com/JimLiu/baoyu-skills): Baoyu's personal Skills collection, including WeChat article writing, PPT creation, etc.
-   [libukai](https://github.com/libukai/awesome-agent-skills): Obsidian-related skill collection, tailored for Obsidian writing workflows
-   [op7418](https://github.com/op7418): High-quality PPT creation and YouTube analysis skills
-   [cclank](https://github.com/cclank/news-aggregator-skill): Automatically fetch and summarize the latest news in specified domains
-   [huangserva](https://github.com/huangserva/skill-prompt-generator): Generate and optimize AI portrait text-to-image prompts
-   [dontbesilent](https://github.com/dontbesilent2025/dbskill): Content creation framework by an X influencer based on their own tweets
-   [seekjourney](https://github.com/geekjourneyx/md2wechat-skill/): AI-assisted WeChat article writing from drafting to publishing

### Product Usage

-   [wps](https://github.com/wpsnote/wpsnote-skills): Control WPS office software
-   [notebooklm](https://github.com/teng-lin/notebooklm-py): Control NotebookLM
-   [n8n](https://github.com/czlonkowski/n8n-skills): Create n8n workflows
-   [threejs](https://github.com/cloudai-x/threejs-skills): Assist with Three.js development

### Other Types

-  [pua](https://github.com/tanweai/pua): Drive AI to work harder in a PUA style
-   [office-hours](https://github.com/garrytan/gstack/tree/main/office-hours): Provide startup advice from a YC perspective
-   [marketingskills](https://github.com/coreyhaines31/marketingskills): Enhance marketing capabilities
-   [scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills): Improve skills for researchers

## Security Audit

Since Skills may contain potentially risky operations such as calling external APIs or silently executing scheduled scripts, security must be taken seriously when designing and using Skills.

When installing Skills, it is recommended to prioritize those from official stores or well-known third-party stores, and carefully read the Skill's description and user reviews to avoid installing Skills from unknown sources.

For scenarios with higher security requirements, you can use @余弦's [slowmist-agent-security skill](https://github.com/slowmist/slowmist-agent-security) to conduct security audits and risk assessments of Skills, ensuring their security and reliability.

If using Agent Harnesses with high autonomy like OpenClaw, it is recommended to use the [OpenClaw Minimal Security Practice Guide](https://github.com/slowmist/openclaw-security-practice-guide) together, applying system prompt-level security constraints to minimize potential risks.

## Create Skills

While you can directly install skills created by others through skill marketplaces, to improve skill fit and personalization, it is strongly recommended to create your own skills as needed, or fine-tune others' skills.

### Official Plugin

Use the official [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) plugin to quickly create and iterate personal skills.

![](../assets/media/skill-creator.png)

### Enhanced Plugin

Building on the official skill-creator plugin, this project integrates best practices from Anthropic and Google teams to build a more powerful Agent Skills Toolkit to help you quickly create and improve Agent Skills. (**Note: This plugin currently only supports Claude Code**)

#### Add Marketplace

Launch Claude Code, enter the plugin marketplace, and add the `libukai/awesome-agent-skills` marketplace. You can also directly use the following command in the input box:

```bash
/plugin marketplace add libukai/awesome-agent-skills
```

#### Install Plugin

After successfully installing the marketplace, select and install the `agent-skills-toolkit` plugin.

![](../assets/media/skill-creator-pro.png)

#### Quick Commands

The plugin includes multiple quick commands covering the complete workflow from creation, improvement, testing to optimizing skill descriptions:

- `/agent-skills-toolkit:skill-creator-pro` - Complete workflow (Enhanced)
- `/agent-skills-toolkit:create-skill` - Create new skill
- `/agent-skills-toolkit:improve-skill` - Improve existing skill
- `/agent-skills-toolkit:test-skill` - Test and evaluate skill
- `/agent-skills-toolkit:optimize-description` - Optimize description

## Acknowledgments

![](../assets/media/talk_is_cheap.jpg)

## Project History

[![Star History Chart](https://api.star-history.com/svg?repos=libukai/awesome-agent-skills&type=date&legend=top-left)](https://www.star-history.com/#libukai/awesome-agent-skills&type=date&legend=top-left)
