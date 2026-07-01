---
name: aporaviz-project-starter
description: Use when the user wants to create, scaffold, initialize, rename, plan, continue, maintain, refactor, document, or set up any ApoRaviz_* project/repository/app, or when a request mentions a project name starting with ApoRaviz_, an existing/new workspace project, repo startup, project docs, implementation plan, product spec, Angular project setup, Tailwind setup, GitHub Pages demo, reusable learning capture, or project-specific Codex skill. Enforce ApoRaviz workspace rules and capture reusable terms/concepts back to ApoRaviz_Workspace_Docs before finishing.
---

# ApoRaviz Project Starter

## Purpose

Use this skill to start, continue, or organize any repo whose name begins with `ApoRaviz_`. Treat these projects as children of the `ApoRaviz` workspace. Do not treat app work as isolated code work; keep project purpose, docs, and reusable-learning boundaries visible.

Core rule:

```text
ApoRaviz_Workspace_Docs = learning hub and source of truth
ApoRaviz_* project repo = app/product implementation plus project-specific docs
```

## Always-On Workspace Rule

For every `ApoRaviz_*` repo, actively watch for reusable learning while working.

If the work introduces a new term, API, command, flow, Tailwind pattern, browser/SSR issue, CI/CD pattern, Git workflow, or testing idea that can help future projects, update `ApoRaviz_Workspace_Docs` instead of leaving it only in chat or inside the project repo.

This applies both when:

- creating a brand-new project
- continuing an existing project such as `ApoRaviz_Portfolio`
- refactoring or debugging an app
- writing project docs
- adding deployment or CI/CD

Do not create a project-local skill just to repeat this rule. This rule belongs in this global workspace skill.

## Required Reading

Before creating a new `ApoRaviz_*` project, read from `_docs` / `ApoRaviz_Workspace_Docs`:

```text
PROJECT_START_HERE.md
NEW_PROJECT_GUIDE.md
WORKSPACE_RULES.md
AI_UPDATE_RULE.md
WORKSPACE_PLAN.md
```

If the project is Angular/frontend, also read:

```text
angular/index.md
angular/commands.md
angular/teach/angular-22-baseline.md
angular/teach/tailwind-css-v4.md
```

If the task may create teaching material, also read:

```text
TEACHING_RULES.md
```

When continuing an existing `ApoRaviz_*` project, at minimum inspect the project-local docs/skill plus the relevant `_docs` files:

```text
project README/progress/docs
project .codex/skills/*/SKILL.md if present
_docs/WORKSPACE_RULES.md
_docs/AI_UPDATE_RULE.md
_docs/TEACHING_RULES.md when reusable learning appears
```

## Startup Workflow

For a new `ApoRaviz_*` project, do this in order:

1. Confirm or infer the project name, user, problem, first usable flow, and **Project Mode** (`learning` or `build`).
2. Check `_docs/NEW_PROJECT_GUIDE.md` for the current baseline.
3. Decide what belongs in the project repo vs `_docs`.
4. Scaffold the repo/app only after the purpose and docs shape are clear.
5. **Stamp the bootstrap templates** from `_docs/templates/project-bootstrap/` into the new repo: `AGENTS.template.md` -> `AGENTS.md`, `CLAUDE.template.md` -> `CLAUDE.md`, `README.template.md` -> `README.md`. Fill every `[[placeholder]]` and add a `.nvmrc` (major version only, e.g. `24`).
6. Run build/test when possible.
7. Update `_docs` only when genuinely new reusable learning appears (more in learning mode, deltas-only in build mode).

## Default Project Docs

A new app repo requires only `README.md` (what it does, how to run, status). Add other docs only when the project actually needs them:

```text
README.md                = required (what it does, how to run, status)
progress.md              = optional
docs/product-spec.md     = optional, when scope grows
docs/implementation-plan.md = optional, when there are multi-step plans
docs/commands.md         = optional, for repo-specific commands
docs/design-direction.md = optional, for UI apps
docs/architecture.md     = optional, when architecture is nontrivial
```

Project docs should store project-specific details:

```text
port, deploy URL, base-href, output folder, product requirement, UI decision, environment detail, repo-specific command
```

Shared/reusable knowledge must go back to `_docs`:

```text
Angular concept, Git concept, VitePress concept, Tailwind pattern, command pattern, reusable workflow, teaching lab, lesson, glossary term
```

## Default Frontend Stack

For frontend projects in this workspace, default to:

```text
Angular latest stable
Node = per _docs/baseline.md
TypeScript strict
Tailwind CSS latest stable
Standalone components
Angular Router
Angular signals
SSR/prerender when appropriate for public/demo apps
npm package manager
```

Use exact versions from `_docs/baseline.md` and command patterns from `_docs/angular/commands.md`. Do not rely on stale remembered versions.

## Angular Project Creation

When scaffolding an Angular app, prefer the workspace pattern:

```bash
# เลือก Node version ก่อน (machine-agnostic): macOS `nvm use`, Windows `nvm use <version>`
npx -y @angular/cli@<current-baseline> new ApoRaviz_ProjectName --routing --style css --ssr --skip-git --package-manager npm
```

อย่า hardcode path เต็มของ Node (เช่น `/Users/.../v24.16.0/bin`) เพราะ PC กับ Mac path ต่างกัน — ใช้ `.nvmrc` + `nvm use` เป็นความจริงเดียว

Then verify:

```bash
npm run build
npm test -- --watch=false
```

If exact Angular version may have changed, verify from `_docs/angular/commands.md` or official Angular docs before generating.

## Learning Capture Rule

During project work, actively check for reusable learning:

```text
new Angular term/API          -> _docs/angular/concepts/
new Angular flow              -> _docs/angular/teach/
small reusable exercise        -> _docs/angular/labs/
Tailwind pattern               -> _docs/angular/tailwind/
Git concept                    -> _docs/git/concepts/ if present, otherwise create the structure
Git command pattern            -> _docs/git/commands.md
VitePress concept              -> _docs/vitepress/concepts/ if present, otherwise create the structure
VitePress command pattern      -> _docs/vitepress/commands.md
reusable lesson from a project -> fold into the related _docs topic page as an example
project-specific detail        -> project repo README/docs
```

Never leave useful knowledge only in chat.

When adding a command that uses a new term, also create or link the concept page. Commands are not a replacement for concept learning.

## Project-Specific Skill

Create or update a project-specific skill only when the project has rules Codex must remember across chats, such as domain rules, file ownership, product constraints, tone/design rules, business rules, or repeated workflows.

Possible location:

```text
.codex/skills/<project-name>/SKILL.md
```

Only create this when it adds real value. Do not create a skill just because a project exists.

Do not duplicate global workspace rules in every project skill. Project skills should contain only project-specific rules and should point back to this global rule for reusable learning capture.

Good reasons to create a project skill:

```text
Portfolio tone/design/section ownership
MooPing loyalty/POS/saved reward domain rules
custom deploy workflow that repeats often
strict file ownership or architecture rule
```

Weak reasons:

```text
project exists
project uses Angular
project should update _docs when reusable learning appears
```

## Git And Push Practice

For new repos:

```bash
git init
git status --short --branch
git add README.md docs progress.md
git commit -m "Initialize project docs"
```

Do not commit unrelated changes. If `_docs` also changed, treat it as a separate repo and separate commit.

## Completion Checklist

Before saying project setup is done:

- Project purpose and first usable flow are written down.
- Required docs exist or the user explicitly postponed them.
- Stack follows workspace baseline.
- Build/test ran or the reason is stated.
- Reusable terms/concepts/flows/patterns were added back to `_docs` or explicitly not needed.
- New command terms link to concept pages when appropriate.
- Git status is checked.
- Any push requested by the user is completed and sync verified.
