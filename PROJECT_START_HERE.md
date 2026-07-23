# Project Start Here

ไฟล์นี้คือ entry point เพียงจุดเดียวสำหรับเริ่มโปรเจกต์ใหม่ หรือกลับมาทำงานต่อใน workspace `ApoRaviz`

## Read Order

### อ่านทุกครั้ง

1. [Workspace Rules](WORKSPACE_RULES.md) — เข้าใจบทบาทและขอบเขตของแต่ละ repo
2. [New Project Guide](NEW_PROJECT_GUIDE.md) — กติกาตั้งต้นที่ทุก `ApoRaviz_*` ต้องใช้
3. [Workspace Baseline](baseline.md) — เลือก version และ tooling เริ่มต้นให้ตรง workspace

สามไฟล์นี้ตอบคนละคำถาม:

```text
Workspace Rules     = repo นี้มีหน้าที่อะไร และข้อมูลควรอยู่ที่ไหน
New Project Guide   = จะเริ่ม ApoRaviz_* โปรเจกต์ใหม่อย่างไร
Workspace Baseline  = โปรเจกต์ใหม่ควรเริ่มด้วย version อะไร
```

### เลือกอ่านตาม Stack

#### Frontend — Angular และ Tailwind CSS

1. [Angular Overview](angular/)
2. [Angular Quick Recall](angular/memory-aids.md)
3. [Tailwind CSS with Angular](angular/tailwind/)

#### Backend — Node.js และ NestJS

1. [Backend Overview](backend/)
2. [Backend Quick Recall](backend/memory-aids.md)
3. [Node.js Overview](nodejs/)
4. [NestJS Overview](nestjs/)

#### Database — PostgreSQL หรือ Supabase

1. [Database Overview](postgresql/)
2. [Database Quick Recall](postgresql/memory-aids.md)

#### Git

1. [Git Overview](git/)
2. [Git Quick Recall](git/memory-aids.md)
3. [Git Commands](git/commands.md)

`Core Concepts`, `Learning Guides` และ Commands อื่นไม่ต้องอ่านทั้งหมดก่อนเริ่ม ให้เปิดตามเรื่องที่กำลังทำหรือเมื่อต้องการทบทวน

### อ่านเฉพาะตอนดูแล Workspace Docs

- [Teaching Rules](TEACHING_RULES.md) — รูปแบบการเขียนบทเรียน
- [AI Update Rule](AI_UPDATE_RULE.md) — routing ความรู้ใหม่
- [Workspace Plan](WORKSPACE_PLAN.md) — แผนระดับ workspace
- [VitePress Guide](vitepress/) — วิธีดูแลเว็บเอกสาร

## Current Roles

```text
ApoRaviz_Workspace_Docs = ความรู้กลางตาม topic แบบ W3Schools / source of truth
ApoRaviz_DevEng         = โปรเจกต์หลักที่ใช้เรียน/ฝึก dev จริงจัง
ApoRaviz_Portfolio      = profile/showcase/link hub — โชว์ผลงานอย่างเดียว
ApoRaviz_Mooping        = app project ที่พักไว้ก่อน
```

## Before Coding a New Project

- [ ] อ่านเอกสารในหัวข้อ “อ่านทุกครั้ง” ครบ
- [ ] อ่าน Overview และ Quick Recall ของ stack ที่โปรเจกต์ใช้
- [ ] ระบุว่าโปรเจกต์นี้แก้ปัญหาอะไร
- [ ] ระบุ user หลัก
- [ ] ระบุ first usable flow
- [ ] stamp bootstrap templates (`AGENTS.md`/`CLAUDE.md`/`README.md`) จาก `templates/project-bootstrap/` + เพิ่ม `.nvmrc`
- [ ] `README.md` บังคับ (ทำอะไร / รันยังไง / สถานะ)
- [ ] docs อื่น (`progress.md`, `docs/product-spec.md`, `implementation-plan.md`, `commands.md`, `design-direction.md`, `architecture.md`) = optional เพิ่มเมื่อจำเป็น (ดู `NEW_PROJECT_GUIDE.md`)
- [ ] ถ้ามีบทเรียน reusable จากงานจริง ให้ซึมเข้าหน้า topic ที่เกี่ยวข้องใน `ApoRaviz_Workspace_Docs` เป็นตัวอย่าง

## Do Not

- ไม่สร้างบทเรียนกลางใน `ApoRaviz_Portfolio`
- ไม่สร้าง `docs/teach/` ในโปรเจกต์ลูกเป็น default
- ไม่ปล่อยความรู้ใหม่ค้างอยู่แค่ในแชท
- ไม่ copy Angular/Tailwind/Git concept ซ้ำหลาย repo

## Remember

```text
คุยแล้วหาย = ความรู้หาย
คุยแล้วจดเป็นระบบ = ความรู้กลายเป็น asset
```
