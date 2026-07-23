# New Project Guide

ไฟล์นี้คือกติกากลางสำหรับตั้งต้นทุก repo ใน ecosystem ที่ชื่อ `ApoRaviz_*`

ใช้ไฟล์นี้ทั้งตอน:

- สร้าง `ApoRaviz_*` repo ใหม่
- เพิ่ม frontend, backend หรือ database ให้ repo เดิม
- ตรวจว่าเอกสารและโครงสร้างเริ่มต้นยังตรงกับ workspace หรือไม่

ลำดับการอ่านทั้งหมดอยู่ที่ [Project Start Here](PROJECT_START_HERE.md) เพียงจุดเดียว ไฟล์นี้รับหน้าที่อธิบาย “วิธีเริ่มโปรเจกต์” โดยไม่สร้าง Read Order ซ้ำ

## Core Rule

```text
ApoRaviz_Workspace_Docs = ความรู้กลางตาม topic แบบ W3Schools / shared rules
ApoRaviz_DevEng         = โปรเจกต์หลักที่ใช้เรียน/ฝึก dev จริงจัง
ApoRaviz_Portfolio      = profile/showcase/job site, link hub — โชว์ผลงานอย่างเดียว
ApoRaviz_Mooping        = MooPing Reward app project (พักไว้)
ApoRaviz_Tools          = tools/CLI/file processing project
ApoRaviz_*              = future project repos
```

โปรเจกต์ใหม่ทุกตัวต้องเริ่มจาก `ApoRaviz_Workspace_Docs` ก่อน ไม่เริ่มจากการ copy บทเรียนใน Portfolio หรือโปรเจกต์ลูก

## Default Frontend Stack

- Angular latest stable
- Node ตาม [`baseline.md`](baseline.md)
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
-> Node runtime (ตาม baseline.md)
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

โปรเจกต์ลูกต้องมีอย่างน้อย `README.md` ที่บอกว่า **โปรเจกต์นี้ทำอะไร / รันยังไง / สถานะ** ส่วนเอกสารอื่นเพิ่มเมื่อจำเป็นเท่านั้น

```text
README.md            = บังคับ (ทำอะไร, รันยังไง, สถานะ)
progress.md          = optional เมื่ออยากเก็บความคืบหน้า
docs/
  product-spec.md       = optional เมื่อ scope เริ่มใหญ่
  implementation-plan.md = optional เมื่อมีแผนหลาย step
  commands.md            = optional เมื่อมี command เฉพาะ repo
  design-direction.md    = optional สำหรับ UI app
  architecture.md        = optional เมื่อ architecture ซับซ้อน
.codex/
  skills/<project-name>/SKILL.md = optional เมื่อมี domain rule สำคัญ
```

ไม่สร้าง `docs/teach/` เป็น default ในโปรเจกต์ลูก — บทเรียน reusable ไปอยู่ใน Workspace Docs ตาม topic แทน

ถ้ามีบทเรียน reusable ที่ใช้สอนได้ ให้ซึมเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง:

```text
angular/      = Angular/Tailwind concept กลาง
nodejs/       = Node.js/CLI/file processing concept กลาง
backend/      = backend architecture กลาง
nestjs/       = NestJS pattern
postgresql/   = PostgreSQL/Supabase concept
git/          = Git command กลาง
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
บทเรียน reusable จากโปรเจกต์จริง    -> ซึมเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง
ภาพจำใหม่ที่ใช้ทบทวนได้เร็ว          -> หน้าเนื้อหาหลัก + Quick Recall ของ topic
Product spec / implementation plan  -> repo ของโปรเจกต์นั้น (README เป็นหลัก)
Repo URL / port / base-href command -> repo ของโปรเจกต์นั้น docs/commands.md
Portfolio showcase                  -> ApoRaviz_Portfolio
```

## Project Startup Checklist

- [ ] ตั้งชื่อ repo เป็น `ApoRaviz_<ProjectName>`
- [ ] เขียน problem statement
- [ ] ระบุ user หลัก
- [ ] ระบุ workflow หลัก
- [ ] เลือก stack ตาม default frontend/backend rule
- [ ] สร้าง `README.md` ขั้นต่ำของโปรเจกต์
- [ ] สร้าง implementation plan แบบ step/substep เมื่อ scope มีหลายขั้น
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

