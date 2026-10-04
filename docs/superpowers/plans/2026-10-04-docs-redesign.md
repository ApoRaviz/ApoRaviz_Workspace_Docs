# Workspace Docs Redesign Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Independent content audits may run through dispatching-parallel-agents.

**Goal:** Make the existing Thai knowledge library easier to enter, navigate, and trust, while preserving published URLs.

**Architecture:** Extend the existing VitePress default theme with one homepage component, shared topic links, and contextual sidebars. Keep articles in their existing folders. Consolidate repeated procedures into their existing canonical pages and retain old headings as links.

**Tech Stack:** VitePress 1.6.4, Vue 3, CSS, Node.js; no added dependencies.

**Spec:** Design and audit decisions below, authorized for implementation by the repository owner.

## Design and audit decisions

- Warm paper / charcoal / orange palette, light and dark modes, readable Thai text, visible keyboard focus, reduced-motion support.
- Four entry intentions: learn, browse topics, find commands, start a project. Homepage topic groups: Frontend, Backend, Database, Tools. AI tools and workspace governance remain separate references.
- A topic page shows its own sidebar rather than the entire library tree. A shared library link always allows switching subjects.
- Concept, lesson, quick recall, and commands are distinct reading modes; repeating a short definition across modes is useful, not automatically duplication.
- Actual duplication: Git stage/undo procedures, VitePress command catalog, Angular config/run flow, Nest module-boundary examples, and root workspace policy copies. Replace duplicate detail with precise links.
- Explanation gaps: Node prerequisites and self-contained examples; ASP.NET test setup; PostgreSQL transaction boundaries and first-run persistence; missing concept recall links.
- Policy drift: AGENTS and Claude pages still imply mandatory Claude review, while current Teaching Rules allow the active agent to complete review. Link to the canonical rule.

## Global constraints

- Preserve every existing article URL and meaningful heading anchor when shortening content.
- No framework migration, dependency additions, edits to global skills, deployment, or merge.
- Keep version policy in baseline.md, setup policy in NEW_PROJECT_GUIDE.md, learning policy in TEACHING_RULES.md, and knowledge routing in AI_UPDATE_RULE.md.
- Exclude internal plans from the reader-facing site and search.

## Review focus

- Thai headings and cards must fit a 375px viewport without horizontal page scroll.
- Nested base URL must work for homepage links, navigation, search results, and assets.
- Existing deep links must survive the content consolidation.
- Light and dark reading pages must retain readable text and keyboard-visible controls.
- Runnable Node examples must clean up temporary files and avoid modifying user files.

## Tasks

### 1. Baseline and plan
- [x] Create exuxui-docs-design from clean main (9e871b1).
- [x] Audit learning, reference, and workspace policy groups.
- [x] Run the unchanged docs build successfully.
- [x] Capture the original homepage at desktop and mobile sizes.

### 2. Entry points and navigation
Files: .vitepress/config.mts, .vitepress/navigation.mts, .vitepress/theme/{index.ts,custom.css,KnowledgeHome.vue}, index.md, topics.md, reading-guide.md.
- [x] Add four entry intentions, topic directory, and reading-mode guide.
- [x] Reuse existing sidebar contents in topic-specific navigation; include Advisory Lock and NestJS commands.
- [x] Apply warm visual theme, responsive homepage, Thai labels, and accessible focus states.
- [x] Validate navigation destinations against generated HTML, including base URL handling.

### 3. Learning content
Files: angular/, nodejs/, nestjs/, aspnet-core/ audited pages only.
- [x] Reorder prerequisite links and repair Tailwind navigation.
- [x] Supply complete Node examples and ASP.NET setup links.
- [x] Consolidate Angular run flow and Nest module-boundary duplication while preserving headings.
- [x] Execute the new Node examples and verify their output/cleanup.

### 4. Reference and policy content
Files: backend/, postgresql/, git/commands.md, vitepress/, claude/index.md, commands.md and root policy/entry files.
- [x] Correct the database/external-message boundary and add prerequisite/persistence links.
- [x] Consolidate Git/VitePress procedures; add missing recall entries and group concept indexes.
- [x] Replace copied workspace policies with canonical links; remove stale roles and setup status.
- [x] Preserve useful historical headings and test rendered fragment links.

### 5. Verification and delivery
- [x] Run docs build and internal HTML link/fragment/navigation audit.
- [x] Review homepage and article at 375px, 768px, and 1440px, light/dark; exercise search and mobile navigation.
- [x] Request an independent branch review, resolve material findings, and rerun affected checks.
- [x] Save before/after visual comparison locally, commit on the new branch, and report preview plus limitations.

## Outcome

Implemented on exuxui-docs-design. Existing article URLs and 372 pre-existing heading IDs across modified articles are preserved. The homepage and topic sidebars share the existing VitePress framework; no dependencies were added.

Verification:
- npm run docs:build: passed (VitePress 1.6.4).
- npm test: 3 passed; tests first reproduced the source-file alias link failure, then verified the fix.
- npm run docs:check-links: 134 generated pages, 6,880 internal link occurrences; zero missing destinations or fragments.
- Four extracted Node examples passed. Temporary files were removed, including a deliberately failing assertion check.
- Chrome production preview: 18 combinations across home, topic directory, and Signal article at 375/768/1440px in light/dark mode; no horizontal page overflow or runtime exceptions.
- Mobile menu and contextual sidebar navigation, keyboard search, Thai/English results, Escape focus return, and root-policy navigation passed.
- Independent review: sidebar-maintenance instructions and missing NestJS command link corrected; scoped re-review clean. Focus-return fix also reviewed.

Additional defect found during verification: VitePress route rewrites did not transform existing uppercase source-file links. A small Markdown renderer adapter now applies the same route map while keeping source links usable on GitHub. Added permanent tests and a generated-site link/fragment checker.

Local review artifacts (ignored): tmp/visual-review/comparison.html, browser-report.json, and before/after screenshots. Production preview uses port 4174. No deployment or merge performed.

Review limits: this is an information-architecture and targeted content audit, not an independent re-verification of every technical statement in all 134 generated pages.
