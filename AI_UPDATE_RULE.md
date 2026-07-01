# AI Update Rule

ไฟล์นี้คือกติกาสำหรับ AI ทุกครั้งที่ช่วยทำงานใน workspace `ApoRaviz`

เป้าหมายคือไม่ให้ความรู้ใหม่หายอยู่แค่ในแชท และไม่ให้บทเรียนกลางกระจายผิด repo

## Required Reading

ก่อนเริ่มงานที่เกี่ยวกับ `ApoRaviz_*` ให้อ่านหรือยึดตามไฟล์เหล่านี้:

```text
ApoRaviz_Workspace_Docs/WORKSPACE_RULES.md
ApoRaviz_Workspace_Docs/TEACHING_RULES.md
ApoRaviz_Workspace_Docs/PROJECT_START_HERE.md
ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md
ApoRaviz_Workspace_Docs/WORKSPACE_PLAN.md
```

ถ้างานเกี่ยวกับ Angular ให้อ่านเพิ่ม:

```text
ApoRaviz_Workspace_Docs/angular/index.md
ApoRaviz_Workspace_Docs/angular/commands.md
ApoRaviz_Workspace_Docs/angular/teach/index.md
ApoRaviz_Workspace_Docs/angular/concepts/index.md
ApoRaviz_Workspace_Docs/angular/tailwind/index.md
```

ถ้างานเกี่ยวกับ Node.js, CLI, backend, NestJS, Fastify หรือ database ให้อ่านเพิ่มตามเรื่อง:

```text
ApoRaviz_Workspace_Docs/nodejs/index.md
ApoRaviz_Workspace_Docs/backend/index.md
ApoRaviz_Workspace_Docs/nestjs/index.md
ApoRaviz_Workspace_Docs/postgresql/index.md
```

## Source Of Truth

```text
ApoRaviz_Workspace_Docs = ความรู้กลางตาม topic แบบ W3Schools / source of truth
ApoRaviz_DevEng         = โปรเจกต์หลักที่ใช้เรียน/ฝึก dev จริงจัง
ApoRaviz_Portfolio      = เว็บ profile/showcase/link hub — โชว์ผลงานอย่างเดียว
ApoRaviz_Mooping        = app project MooPing Reward (พักไว้)
ApoRaviz_Tools          = tools project และ CLI/file processing project
```

ห้ามสร้างบทเรียนกลางใหม่ใน `ApoRaviz_Portfolio`

โปรเจกต์ลูกไม่ควรสร้าง `docs/teach/` เป็น default ถ้าบทเรียนนั้นใช้สอนซ้ำได้ ให้กลับมาที่ `ApoRaviz_Workspace_Docs`

## When To Update Docs

AI ต้องพิจารณาอัปเดต docs กลางเมื่อเจอ:

- ศัพท์ Angular/Node/backend/database ใหม่
- Angular API ใหม่ เช่น `signal`, `computed`, `input`, `output`, `inject`
- file default ของ Angular เช่น `angular.json`, `main.ts`, `app.config.ts`
- Tailwind CSS pattern, layout, responsive rule หรือ style ownership ใหม่
- Node.js CLI, stream, fs, test หรือ file safety pattern ใหม่
- NestJS/Fastify/backend architecture pattern ใหม่
- PostgreSQL/Supabase schema, transaction, migration หรือ relationship concept ใหม่
- command ใหม่ที่ใช้ซ้ำได้
- bug pattern ที่อาจเจอซ้ำ
- flow ที่คนเรียนควรเข้าใจ
- rule เริ่มโปรเจกต์ที่ใช้ซ้ำได้

## Date Check Rule

ก่อนอัปเดตหัวข้อที่มีวันที่ เช่น `อัปเดตล่าสุด`, progress log, changelog, review status, step status หรือสรุปว่าเรียนจบวันไหน ต้องเช็กวันที่ปัจจุบันก่อนเสมอ

ใช้วันที่แบบ absolute date ไม่ใช้คำลอย ๆ อย่าง "วันนี้" ในเอกสารที่ต้องอ่านย้อนหลัง:

```text
ถูกต้อง: 1 กรกฎาคม 2026
ไม่ดี: วันนี้
```

ถ้ารัน terminal ได้ ให้เช็กก่อนเขียน:

```bash
date '+%Y-%m-%d %Z %z'
```

กติกา:

- วันที่ใน header ต้องสอดคล้องกับ progress log ล่าสุด
- ถ้าเปลี่ยนสถานะ step จากรอ review เป็นผ่าน review ให้ปรับวันที่/สถานะในหัวข้อที่เกี่ยวข้องด้วย
- ห้ามคัดลอกวันที่เก่าจากบรรทัดก่อนหน้าโดยไม่ตรวจวันจริง
- ถ้าเป็น topic page ที่ไม่มีสถานะตามเวลา ไม่ต้องใส่วันที่เพิ่มเอง เพื่อรักษา `_docs` ให้เป็น topic-first

## Decision Table

```text
เจอศัพท์ Angular ใหม่                  -> angular/concepts/
เจอ Angular flow ที่ใช้สอนซ้ำได้       -> angular/teach/
เจอแบบฝึกหัด Angular เล็ก ๆ            -> angular/labs/
เจอ Tailwind pattern                   -> angular/tailwind/
เจอ Angular command                    -> angular/commands.md
เจอ Node.js CLI/file/stream/test        -> nodejs/
เจอ backend architecture                -> backend/
เจอ NestJS-specific pattern             -> nestjs/
เจอ Fastify decision/pattern            -> backend/fastify.md
เจอ PostgreSQL/Supabase concept         -> postgresql/ หรือ backend/
เจอ Git command                         -> git/commands.md
เจอ VitePress command/site rule         -> vitepress/
เจอ rule เริ่มโปรเจกต์                 -> NEW_PROJECT_GUIDE.md
เจอ step เริ่มงาน                       -> PROJECT_START_HERE.md
เจอแผนระดับ workspace                  -> WORKSPACE_PLAN.md
เจอ teaching pattern ใหม่               -> TEACHING_RULES.md
เจอ project-specific business rule      -> README/docs ของโปรเจกต์นั้น
เจอบทเรียน reusable จากโปรเจกต์จริง     -> ซึมเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง
เจอ portfolio showcase content          -> ApoRaviz_Portfolio
```

## Teaching Output Rule

ถ้า AI เพิ่มบทเรียน ต้องเขียนตาม `TEACHING_RULES.md`

ทุกบทเรียนควรมี:

- ภาพจำง่าย ๆ
- คำแปลแบบคนธรรมดา
- technical term
- flow ทีละขั้น
- code ตัวอย่างสั้น ๆ ถ้าเหมาะ
- จุดที่มักงง
- self-check
- สรุปจำสั้น ๆ

## New Term Rule

ถ้าใช้ศัพท์ใหม่ที่คนเรียนอาจงง:

1. link ไป concept page ใน docs นี้
2. ถ้ายังไม่มี concept page ให้สร้างหน้าใหม่หรือเพิ่ม placeholder ที่เหมาะ
3. อย่าปล่อยศัพท์ใหม่ลอย ๆ

ตัวอย่าง:

```md
`hydration` คือขั้นตอนที่ browser รับ HTML ที่ server render มาแล้วทำให้หน้านั้น interactive ต่อ

อ่านต่อ: [Hydration](./hydration.md)
```

## No External-First Rule

AI ห้ามตอบว่า "ไปอ่าน official docs" เป็นคำตอบหลัก

ใช้ official docs เพื่อ verify หรือ reference ได้ แต่บทเรียนหลักต้องอธิบายเป็นภาษาไทยใน repo นี้เอง

## Before Finishing Work

ก่อนจบงาน AI ต้องเช็ก:

- มีศัพท์ใหม่ที่ยังไม่มี concept page ไหม
- มี flow ใหม่ที่ควรทำเป็น lesson ไหม
- มี Tailwind/Node/backend/database pattern ที่ควรจดไหม
- มี command ใหม่ที่ควรจดไหม
- มี rule ใหม่ที่ควรอัปเดตไหม
- มีเนื้อหาไปอยู่ผิด repo ไหม
- ถ้าไม่อัปเดต docs ต้องบอกเหตุผลสั้น ๆ ว่าทำไมไม่จำเป็น

## Memory Rule

```text
แก้ code อย่างเดียว = ความรู้กระจาย
แก้ code + อัปเดต docs = ความรู้กลับบ้าน
```
