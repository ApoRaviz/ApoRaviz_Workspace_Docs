# New Project Guide

ไฟล์นี้คือกติกากลางก่อนเริ่มโปรเจกต์ใหม่ใน ecosystem `ApoRaviz_*`

## Core Rule

```text
ApoRaviz_Workspace_Docs = learning hub, static docs site, shared rules, case studies
ApoRaviz_Portfolio      = profile/showcase/job site, link hub
ApoRaviz_Mooping        = app project, paused for now
ApoRaviz_*              = future project repos
```

โปรเจกต์ใหม่ทุกตัวต้องเริ่มจาก `ApoRaviz_Workspace_Docs` ก่อน ไม่เริ่มจากการ copy บทเรียนใน Portfolio หรือ Mooping

## Read First

```text
README.md
WORKSPACE_RULES.md
TEACHING_RULES.md
AI_UPDATE_RULE.md
PROJECT_START_HERE.md
WORKSPACE_PLAN.md
angular/index.md
```

## Default Frontend Stack

- Angular latest stable
- Node latest Active LTS
- TypeScript strict
- Tailwind CSS latest stable
- Standalone components
- Angular Router
- Angular signals
- SSR/prerender เมื่อเป็น public/demo app

Angular app ของ ApoRaviz ใช้ Tailwind CSS เป็น styling system หลักเสมอ ถ้าเจอ Tailwind pattern ใหม่ ให้เพิ่มกลับมาที่ `angular/tailwind/` หรือ `angular/teach/`

## Default Backend Stack

ถ้าโปรเจกต์ต้องมีหลังบ้าน ให้ใช้ stack นี้เป็นค่า default:

- NestJS
- Node.js 24+
- PostgreSQL
- Supabase เมื่ออยากเริ่มเร็วด้วย managed PostgreSQL, auth, storage, หรือ API

ภาพรวม full stack ของ workspace:

```text
Angular frontend
-> NestJS backend API
-> PostgreSQL/Supabase database
```

ถ้าโปรเจกต์เริ่มจาก CLI เช่น `ApoRaviz_Tools` ให้แยก logic สำคัญให้เรียกซ้ำได้ เพื่อให้ NestJS service นำไปใช้ต่อได้ในอนาคต

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
git/                     = Git command กลาง
```

## What Goes Where

```text
Angular concept ที่ใช้ซ้ำได้        -> angular/
Tailwind pattern ที่ใช้ซ้ำได้       -> angular/tailwind/
Node.js concept / CLI flow          -> nodejs/
NestJS backend pattern              -> nestjs/
Git command pattern                 -> git/
Business/UX lesson จากโปรเจกต์จริง  -> projects/<project-name>/
Product spec / implementation plan   -> repo ของโปรเจกต์นั้น
Repo URL / port / base-href command  -> repo ของโปรเจกต์นั้น docs/commands.md
Portfolio showcase                   -> ApoRaviz_Portfolio
```

## Project Startup Checklist

- [ ] ตั้งชื่อ repo เป็น `ApoRaviz_<ProjectName>`
- [ ] เขียน problem statement
- [ ] ระบุ user หลัก
- [ ] ระบุ workflow หลัก
- [ ] เลือก stack ตาม default frontend stack
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

ถ้าใช้ Angular 22 ต้องใช้ Node ที่ Angular รองรับ เช่น Node 24.15+ ไม่ใช่ Node 22.14

## Static Docs Site Rule

`ApoRaviz_Workspace_Docs` ใช้ VitePress เป็น static docs site

กติกา:

- config อยู่ที่ `.vitepress/config.mts`
- dev server ใช้ `npm run docs:dev`
- static build ใช้ `npm run docs:build`
- ตัวอย่างแรกของรูปแบบบทเรียนคือ `angular/labs/01-signal-counter.md`
- บทเรียนใหม่ต้องมี flow, code, expected result และ self-check
- ถ้ายังไม่เคยใช้ VitePress ให้อ่าน `vitepress/index.md` ก่อน
