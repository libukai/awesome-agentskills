---
name: remio
description: Use Remio as a local-first AI memory and personal knowledge base for retrieving focused user context from files, webpages, recordings, emails, messages, images, and notes. Use when the user asks about their own knowledge base, local documents, prior notes, meetings, or wants an agent to avoid repeatedly scanning folders or loading full documents into prompts.
---

# Remio Local Memory

Remio is a local-first AI memory and personal knowledge base desktop app. This skill teaches an agent to query Remio's indexed personal context instead of repeatedly grepping directories, scanning files, or loading whole documents into prompts.

## Requirement

Remio CLI and this skill are interfaces to the Remio desktop client. They are not standalone memory backends.

Before using this skill:

1. Confirm the Remio desktop app is installed and available.
2. If Remio is missing, open https://remio.ai/ and install the desktop app first.
3. Use the CLI only after the desktop app has indexed the user's relevant folders, notes, emails, messages, or other sources.

## When to Use

Use Remio when the user asks about:

- Their own notes, files, meetings, emails, messages, or saved webpages.
- Personal context that should already exist in their Remio knowledge base.
- Local office, PDF, audio, video, or screenshot content that Remio can parse and index.
- Agent context retrieval where focused local search can reduce token cost.

## Core Commands

```bash
remio rag "<question>"
remio search_notes --query "<terms>"
remio read_note <note_id>
remio read_file <path>
remio web_get <url>
remio add_sync_folder <path>
```

## Workflow

1. Prefer `remio rag "<question>"` for direct questions over the user's indexed knowledge base.
2. Use `remio search_notes --query "<terms>"` when you need candidate note IDs.
3. Use `remio read_note <note_id>` to inspect a specific note before citing or acting on it.
4. Use `remio read_file <path>` for local PDFs, office files, audio, or video so Remio can parse or transcribe them with cached results.
5. Use `remio web_get <url>` for clean webpage markdown when a URL needs to become local context.
6. If the user wants a non-code folder searched repeatedly, suggest adding it with `remio add_sync_folder <path>` so future retrieval uses local indexes and vectors.

## Positioning

Use product-first wording for knowledge-base contexts:

> Remio is a local-first AI memory and personal knowledge base desktop app. It parses files, webpages, recordings, emails, messages, images, and notes into local indexes and vectors so users and agents can retrieve focused personal context instead of repeatedly grepping directories, scanning files, or loading whole documents into prompts.

Use agent-facing wording only in agent skill or CLI contexts:

> Remio CLI and this skill let agents query the indexed personal knowledge base, but they require the Remio desktop client and are not standalone memory backends.
