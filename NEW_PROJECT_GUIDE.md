# New Project Guide

ไฟล์นี้คือกติกากลางก่อนเริ่มโปรเจกต์ใหม่ใน ecosystem `ApoRaviz_*`

## Core Rule

```text
ApoRaviz_Workspace_Docs = learning hub, static docs site, shared rules, case studies
ApoRaviz_Portfolio      = profile/showcase/job site, link hub
ApoRaviz_Mooping        = MooPing Reward app project
ApoRaviz_Tools          = tools/CLI/file processing project
ApoRaviz_*              = future project repos
```

โปรเจกต์ใหม่ทุกตัวต้องเริ่มจาก `ApoRaviz_Workspace_Docs` ก่อน ไม่เริ่มจากการ copy บทเรียนใน Portfolio หรือโปรเจกต์ลูก

## Read First

```text
README.md
WORKSPACE_RULES.md
TEACHING_RULES.md
AI_UPDATE_RULE.md
PROJECT_START_HERE.md
WORKSPACE_PLAN.md
angular/index.md
commands.md
```

ถ้าเป็น backend หรือ CLI ให้อ่านเพิ่ม:

```text
nodejs/index.md
backend/index.md
nestjs/index.md
postgresql/index.md
```

## Default Frontend Stack

- Angular latest stable
- Node 24+ เป็นค่า default ของ workspace
- TypeScript strict
- Tailwind CSS latest stable
- Standalone components
- Angular Router
- Angular signals
- SSR/prerender เมื่อเหมาะกับ public/demo app

Angular app ของ ApoRaviz ใช้ Tailwind CSS เป็น styling system หลักเสมอ ถ้าเจอ Tailwind pattern ใหม่ ให้เพิ่มกลับมาที่ `angular/tailwind/` หรือ `angular/teach/`

## Default Backend Stack

ถ้าโปรเจกต์ต้องมีหลังบ้าน ให้เริ่มคิดจาก stack นี้เป็นค่า default:

```text
Angular frontend
-> NestJS backend API
-> PostgreSQL/Supabase database
-> Node.js 24+ runtime
```

ใช้ NestJS เมื่อ:

- มีหลาย domain เช่น customers, transactions, rewards, reports
- ต้องมี auth, database, file upload/download หรือ test เยอะ
- ต้องการ structure ชัดแบบ controller/service/module

ใช้ Fastify ได้เมื่อ:

- API เล็กและ scope ชัด
- ต้องทำ webhook prototype
- อยากเรียน HTTP request/response แบบตรง
- ยังไม่ต้องมี module structure ใหญ่

ถ้าเลือก Fastify ให้จดเหตุผลไว้ใน project docs และแยก business logic ออกจาก route handler เพื่อย้ายไป NestJS ได้ในอนาคต

ใช้ PostgreSQL เมื่อ:

- ต้องการ relational database จริง
- ต้องคุม schema, relationship, transaction และ report

ใช้ Supabase เมื่อ:

- อยากเริ่มเร็วด้วย managed PostgreSQL
- ต้องการ auth, storage, dashboard หรือ generated API

## CLI/File Processing Rule

ถ้าโปรเจกต์เริ่มจาก CLI เช่น `ApoRaviz_Tools`:

- เริ่มด้วย Node.js + TypeScript ได้
- แยก core logic ออกจาก CLI args
- แยก parser/splitter/writer/test ให้ชัด
- ใช้ stream เมื่อไฟล์อาจใหญ่
- ให้ input file อยู่ที่เดิมเมื่อ process fail
- ย้าย input ไป backup หลัง process สำเร็จเท่านั้น
- อนาคตค่อยให้ NestJS service เรียก core logic เดิม

## Default Project Docs

โปรเจกต์ลูกควรมีเอกสารที่จำเป็นต่อการทำงานของ app:

```text
README.md
progress.md
docs/
  architecture.md
  commands.md
  design-direction.md
  implementation-plan.md
  product-spec.md
.codex/
  skills/<project-name>/SKILL.md
```

ไม่สร้าง `docs/teach/` เป็น default ในโปรเจกต์ลูกแล้ว

ถ้ามีบทเรียนที่ใช้สอนได้ ให้เก็บที่:

```text
projects/<project-name>/ = case study จากโปรเจกต์จริง
angular/                 = Angular/Tailwind concept กลาง
nodejs/                  = Node.js/CLI/file processing concept กลาง
backend/                 = backend architecture กลาง
nestjs/                  = NestJS pattern
postgresql/              = PostgreSQL/Supabase concept
git/                     = Git command กลาง
```

## What Goes Where

```text
Angular concept ที่ใช้ซ้ำได้        -> angular/
Tailwind pattern ที่ใช้ซ้ำได้       -> angular/tailwind/
Node.js concept / CLI flow          -> nodejs/
Backend architecture                -> backend/
NestJS backend pattern              -> nestjs/
Fastify decision/pattern            -> backend/fastify.md
PostgreSQL/Supabase concept         -> postgresql/
Git command pattern                 -> git/
Business/UX lesson จากโปรเจกต์จริง  -> projects/<project-name>/
Product spec / implementation plan  -> repo ของโปรเจกต์นั้น
Repo URL / port / base-href command -> repo ของโปรเจกต์นั้น docs/commands.md
Portfolio showcase                  -> ApoRaviz_Portfolio
```

## Project Startup Checklist

- [ ] ตั้งชื่อ repo เป็น `ApoRaviz_<ProjectName>`
- [ ] เขียน problem statement
- [ ] ระบุ user หลัก
- [ ] ระบุ workflow หลัก
- [ ] เลือก stack ตาม default frontend/backend rule
- [ ] สร้าง docs ขั้นต่ำของโปรเจกต์
- [ ] สร้าง implementation plan แบบ step/substep
- [ ] สร้าง project-specific skill ถ้ามี domain rule สำคัญ
- [ ] ถ้าเป็น Angular app ให้ติดตั้ง Tailwind CSS
- [ ] รัน build/test ครั้งแรก
- [ ] ถ้ามีความรู้ใหม่ ให้เพิ่มกลับมาที่ Workspace Docs

## Validation

ก่อนบอกว่างานเสร็จ:

```bash
npm run build
npm test -- --watch=false
```

ถ้าเป็น VitePress:

```bash
npm run docs:build
```

ถ้าเป็น Node CLI:

```bash
npm run build
npm test
```

## Static Docs Site Rule

`ApoRaviz_Workspace_Docs` ใช้ VitePress เป็น static docs site

กติกา:

- config อยู่ที่ `.vitepress/config.mts`
- dev server ใช้ `npm run docs:dev`
- static build ใช้ `npm run docs:build`
- บทเรียนใหม่ต้องมี flow, code, expected result และ self-check เมื่อเหมาะ
- ถ้ายังไม่เคยใช้ VitePress ให้อ่าน `vitepress/index.md` ก่อน

