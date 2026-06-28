---
name: aporaviz-docs-mentor
description: Use when working in or discussing ApoRaviz_Workspace_Docs, the _docs folder, ApoRaviz learning hub, Angular/Git/VitePress docs, learning content, concepts, glossary terms, labs, lessons, commands, sidebar/navigation, GitHub Pages deployment, or project knowledge-capture rules. Always read the workspace docs rules first and enforce the New Term Rule: reusable new terms must become concept pages and link to related existing concepts.
---

# ApoRaviz Docs Mentor

## Purpose

Treat `ApoRaviz_Workspace_Docs` (`_docs/`) as the learning hub and source of truth for ApoRaviz. Do not treat it as ordinary notes. It is a Thai-first teaching site **organized by topic** (W3Schools ของ ApoRaviz): workspace rulebook, command reference, concept glossary, and lab collection. Reusable lessons from real projects are folded into the related topic page as examples — `_docs` is **not** a per-project case-study home.

Core memory:

```text
คุยแล้วหาย = ความรู้หาย
คุยแล้วจดเป็นระบบ = ความรู้กลายเป็น asset
```

## Required Reading Before Changes

When the task touches `_docs/`, `ApoRaviz_Workspace_Docs`, learning material, Angular/Git/VitePress knowledge, or project knowledge capture, read or re-check the relevant source files before editing:

```text
PROJECT_START_HERE.md
WORKSPACE_RULES.md
TEACHING_RULES.md
AI_UPDATE_RULE.md
NEW_PROJECT_GUIDE.md when project startup rules matter
WORKSPACE_PLAN.md when planning/status matters
baseline.md when Node/Angular/version matters
```

When the task touches Angular learning, also inspect:

```text
angular/index.md
angular/concepts/index.md
angular/labs/index.md
angular/teach/index.md
angular/commands.md when commands are involved
```

When the task touches Git or VitePress learning, inspect:

```text
git/commands.md
vitepress/index.md
vitepress/commands.md
.vitepress/config.mts when menus/sidebar/nav are involved
```

## Document Type Rules

Keep content in the correct home:

```text
Concept   = one term or one idea, one page
Lesson    = flow/process explained step by step
Lab       = tiny exercise or mini example
Guide     = workflow, setup, or operating rule
Command   = command syntax and usage pattern
```

(ไม่มี "case study" เป็น document type แล้ว — บทเรียน reusable จากโปรเจกต์ให้ซึมเข้าหน้า topic เป็นตัวอย่าง ส่วนรายละเอียดเฉพาะโปรเจกต์อยู่ใน README ของ repo นั้น)

Use existing templates when creating new teaching pages:

```text
templates/CONCEPT_TEMPLATE.md
templates/LESSON_TEMPLATE.md
templates/LAB_TEMPLATE.md
```

## New Term Rule

If a task introduces a term that a beginner may not understand, do not leave it floating in chat, commands, or a long guide.

Decision:

```text
Angular term/API/concept      -> angular/concepts/<term>.md
Git term/concept              -> git/concepts/<term>.md, create index if missing
VitePress/docs-site concept   -> vitepress/concepts/<term>.md, create index if missing
Tailwind concept/pattern      -> angular/tailwind/ or angular/concepts/ depending on scope
Command syntax/pattern        -> relevant commands.md, with links to concept pages
Flow/process                  -> teach/ page
Small exercise                -> labs/
Reusable lesson from a project -> fold into the related topic page as an example
Project-specific detail        -> that project repo README/docs
```

Every concept page should be one concept only and include:

- ภาพจำง่าย ๆ
- ความหมายแบบคนธรรมดา
- ความหมายแบบ technical term
- ตัวอย่างสั้นที่สุด when useful
- flow ทีละขั้น when useful
- จุดที่มักงง
- links to related concepts before external docs
- เช็กตัวเอง or self-check
- จำสั้น ๆ

If a command page uses a term, link to its concept page:

```md
`git add` ย้าย change เข้า [staging area](concepts/staging-area.md)
`(input)` คือ [event binding](concepts/event-binding.md)
```

If the concept page does not exist yet, create at least a small placeholder page that follows the teaching style and links back to related existing concepts.

## Link And Learning Path Rule

Prefer internal links first. Official docs can be references, not prerequisites.

Good:

```md
อ่านต่อ: [Signal](../concepts/signal.md)
```

Avoid:

```text
ไปอ่าน official docs ก่อนแล้วค่อยกลับมา
```

New pages must be discoverable:

- Add concept pages to the relevant concept index.
- Add labs to `angular/labs/index.md` when Angular labs are added.
- Add sidebar entries in `.vitepress/config.mts` when the user expects menu visibility.
- Keep sidebar organized by learning path, not just file list.

## Teaching Style

Write Thai-first. Start from a life analogy or concrete question, then translate to technical language.

Preferred flow:

```text
ชีวิตจริงก่อน -> แปลเป็น technical term -> flow ทีละขั้น -> tiny code/example -> จุดที่มักงง -> จำสั้น ๆ
```

Avoid starting with hard definitions such as "Signal is a reactive primitive...".

Keep examples tiny and self-contained inside `_docs`. Do not require readers to open `ApoRaviz_Portfolio` or app source code to understand a shared concept.

## Commands Are Not Concepts

Do not confuse command references with concept learning.

- `commands.md` teaches what to type, when to use it, and what output means.
- `concepts/*.md` teaches vocabulary and mental models.
- Command pages should link to concept pages when terms appear.

Example:

```text
Git command page may show `git add`.
Git concept page explains staging area.
```

## Repository Boundaries

Shared/reusable knowledge belongs in `_docs`.

Project repos keep only project-specific details:

```text
specific port, deploy URL, base-href, product spec, implementation plan, brand decision, environment detail
```

If a project-specific note becomes generally reusable, summarize it back into `_docs`.

## Validation

Before finishing `_docs` work:

1. Check whether new terms need concept pages.
2. Check whether new pages need index/sidebar links.
3. Run VitePress build with the baseline Node (see `baseline.md`) when files changed. Select the version machine-agnostically (macOS `nvm use`, Windows `nvm use <version>`), then:

```bash
npm run docs:build
```

4. Check git status inside `_docs`:

```bash
git status --short --branch
git diff --cached --stat
```

5. If the user asked to push, or has established that `_docs` changes should be pushed when ready, commit and push only intentional `_docs` changes.

Never stage unrelated modified files such as a stray `package-lock.json` diff unless the task requires it.

## Commit And Push Practice

For `_docs`, prefer focused commits:

```text
Add Angular concept pages
Organize docs sidebar
Expand command references
```

After push, verify sync:

```bash
git rev-list --left-right --count HEAD...origin/main
```

Expected clean result:

```text
0 0
```
