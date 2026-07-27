# ApoRaviz Workspace Plan

## Current Direction

ตั้งแต่วันที่ 2026-06-07 แผนหลักของ repo นี้คือทำ `ApoRaviz_Workspace_Docs` ให้เป็น learning hub และ static web กลางของ `ApoRaviz_*`

กติกาที่ต้องยึด:

```text
WORKSPACE_RULES.md
TEACHING_RULES.md
AI_UPDATE_RULE.md
```

เป้าหมายถัดไปคือจัดโครงบทเรียน Angular ให้เป็น `concepts`, `teach`, และ `labs` ก่อนเริ่มทำ VitePress

ไฟล์นี้เป็น project registry และแผนรวมของ workspace `ApoRaviz` ใช้ดูภาพใหญ่ว่ามีโปรเจกต์อะไร กำลังทำอะไร และโปรเจกต์ใหม่ควรเข้าระบบอย่างไร

แผนละเอียดของแต่ละโปรเจกต์ต้องอยู่ใน `Project/docs/implementation-plan.md`

## Planning Rules

- `ApoRaviz_Workspace_Docs/WORKSPACE_PLAN.md` เก็บภาพรวมระดับ workspace เท่านั้น
- โปรเจกต์ใหม่เพิ่มเป็นแถวใหม่ใน `Project Registry`
- แผนละเอียดของโปรเจกต์ไม่ควรย้ายมาไว้กลาง ให้ link ไปที่ `docs/implementation-plan.md`
- ทุก plan ใช้ checkbox `[ ]` / `[x]`
- ติ๊ก `[x]` เมื่อทำเสร็จจริงและตรวจแล้ว เช่น build/test ผ่าน หรือ docs link ครบ
- ถ้าเจอ rule ที่ใช้ได้ทุกโปรเจกต์ ให้ย้ายไป `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`

## Project Registry

| Project | GitHub Repo | Role | Status | Source Of Truth |
|---|---|---|---|---|
| `ApoRaviz_Workspace_Docs` | `ApoRaviz_Workspace_Docs` | ความรู้กลางตาม topic แบบ W3Schools | Active | `ApoRaviz_Workspace_Docs/WORKSPACE_PLAN.md` |
| `ApoRaviz_DevEng` | `ApoRaviz_DevEng` | โปรเจกต์หลักที่ใช้เรียน/ฝึก dev จริงจัง | Active | `ApoRaviz_DevEng/README.md` |
| `ApoRaviz_Portfolio` | `ApoRaviz_Portfolio` | โชว์ผลงาน/สมัครงาน/link hub อย่างเดียว | Active | `ApoRaviz_Portfolio/README.md` |
| `ApoRaviz_Mooping` | `ApoRaviz_Mooping` | ระบบขาย/สะสมสิทธิ์หมูปิ้ง | Paused | `ApoRaviz_Mooping/README.md` |
| Future project | `ApoRaviz_ProjectName` | เพิ่มเมื่อเริ่มโปรเจกต์ใหม่ | Backlog | `Project/README.md` |

## Current Focus

- [x] 0.1 จัด `ApoRaviz_Workspace_Docs` ให้เหลือเอกสารกลางที่จำเป็น
- [x] 0.2 ย่อ `NEW_PROJECT_GUIDE.md` ให้เป็น concept กลางสำหรับโปรเจกต์ใหม่
- [x] 0.3 ตั้งมาตรฐานว่าโปรเจกต์ใหม่ใช้ `docs/product-spec.md` ก่อน ไม่แตกไฟล์เล็กเกินจำเป็น
- [x] 0.4 ตั้งมาตรฐานว่าโปรเจกต์ใหม่ต้องมี `docs/implementation-plan.md`
- [x] 0.5 รวม command docs ของ Portfolio และ MooPing ให้เหลือ `docs/commands.md`
- [x] 0.6 ลบ prompt/spec เก่าที่ทำให้สับสนกับ frontend baseline ปัจจุบัน
- [x] 0.7 ตรวจและ clean docs ที่เหลือหลัง refactor
- [x] 0.8 ย้าย Portfolio project skill เข้า `.codex/skills/angular-portfolio-mentor`
- [x] 0.9 ลบ generic UI skill copy ที่ซ้ำในแต่ละโปรเจกต์
- [x] 0.10 แยก `ApoRaviz_Workspace_Docs` เป็น repo กลาง `ApoRaviz_Workspace_Docs`
- [x] 0.11 เปลี่ยน repo ของ MooPing เป็น `ApoRaviz_Mooping`
- [x] 0.12 แยก Angular teach/commands กลางไว้ที่ `ApoRaviz_Workspace_Docs/angular/`
- [x] 0.13 แยก Git commands กลางไว้ที่ `ApoRaviz_Workspace_Docs/git/commands.md`
- [x] 0.14 เพิ่ม rule ว่า project teach เก็บตัวอย่างเฉพาะโปรเจกต์ ส่วน common Angular concept อยู่กลาง
- [x] 0.15 ลบ Angular teach กลางที่ซ้ำใน Portfolio และย้ายการเรียนกลับมา Workspace Docs
- [x] 0.16 ปรับ README ของ Portfolio และ MooPing ให้บอกว่าโปรเจกต์ทำอะไรอย่างชัดเจน
- [x] 0.17 เพิ่ม `ApoRaviz_Workspace_Docs/PROJECT_START_HERE.md` เป็นลำดับอ่าน 1-2-3-4 สำหรับโปรเจกต์ใหม่
- [x] 0.18 ตั้ง `ApoRaviz_Portfolio` เป็น default structure reference สำหรับโปรเจกต์ถัดไป
- [x] 0.19 เพิ่ม Tailwind CSS v4 เป็น frontend default ของโปรเจกต์ Angular ใหม่
- [x] 0.20 เพิ่ม Angular 22 baseline note ไว้ใน `ApoRaviz_Workspace_Docs/angular/teach/`
- [x] 0.21 เพิ่ม backend default stack เป็น Angular + NestJS + PostgreSQL/Supabase
- [x] 0.22 เพิ่มบทเรียน Angular run flow และ `angular.json` core model
- [x] 0.23 เพิ่ม Node.js CLI, stream, backpressure, backup safety และ test temp files จาก `ApoRaviz_Tools`
- [x] 0.24 เพิ่ม Fastify เป็น backend option ที่ใช้ได้เมื่อมีเหตุผล แต่ NestJS ยังเป็น default
- [x] 0.25 เพิ่ม PostgreSQL/Supabase learning hub
- [x] 0.26 เพิ่ม `projects/tools/` case study สำหรับ split-order-txt

## Project Lifecycle Template

ใช้ lifecycle นี้เมื่อมีโปรเจกต์ใหม่เข้ามา

### Step 1 - Intake

- [ ] 1.1 ตั้งชื่อโปรเจกต์และสร้าง repo แยก
- [ ] 1.2 เขียน problem statement สั้น ๆ
- [ ] 1.3 ระบุ user หลักและ workflow หลัก
- [ ] 1.4 ระบุว่าจะโชว์ใน portfolio อย่างไร

### Step 2 - Foundation

- [ ] 2.1 สร้าง Angular latest stable project ตาม `baseline.md` (Tailwind CSS เป็น styling หลัก)
- [ ] 2.2 stamp bootstrap templates จาก `templates/project-bootstrap/` (AGENTS.md/CLAUDE.md/README.md) + เพิ่ม `.nvmrc`
- [ ] 2.3 `README.md` บังคับ; docs อื่น (progress/product-spec/implementation-plan/commands/design-direction/architecture) = optional เพิ่มเมื่อจำเป็น
- [ ] 2.4 เพิ่ม project-specific skill ใน `.codex/skills/<project>/SKILL.md` เฉพาะเมื่อมี domain rule สำคัญ
- [ ] 2.5 ถ้ามีบทเรียน reusable จากโปรเจกต์จริง ให้ซึมเข้าหน้า topic ที่เกี่ยวข้องใน `ApoRaviz_Workspace_Docs` เป็นตัวอย่าง

### Step 3 - MVP

- [ ] 3.1 ทำ first usable screen ไม่ใช่ landing page เปล่า
- [ ] 3.2 ทำ core business flow ให้กดได้จริง
- [ ] 3.3 เพิ่ม state/error/empty/loading ที่จำเป็น
- [ ] 3.4 เพิ่ม comments ภาษาไทยในจุดที่สอน intent
- [ ] 3.5 รัน build/test

### Step 4 - Learning Capture

- [ ] 4.1 อัปเดต `progress.md`
- [ ] 4.2 ติ๊ก `docs/implementation-plan.md`
- [ ] 4.3 เพิ่ม teach note เมื่อมีบทเรียนใหม่
- [ ] 4.4 เพิ่ม command ใน `docs/commands.md` เมื่อมีคำสั่งใหม่

### Step 5 - Portfolio Integration

- [ ] 5.1 เพิ่ม project card ใน `ApoRaviz_Portfolio`
- [ ] 5.2 เพิ่ม live demo URL เมื่อ deploy แล้ว
- [ ] 5.3 เพิ่ม GitHub URL
- [ ] 5.4 เขียน case study สั้น ๆ เมื่อ MVP เห็นภาพ

### Step 6 - Production Path

- [ ] 6.1 ตัดสินใจว่าต้องมี backend/database หรือไม่
- [ ] 6.2 ถ้ามี backend ให้ใช้ NestJS เป็น default และเลือก PostgreSQL/Supabase เป็น database
- [ ] 6.3 เพิ่ม CI/CD
- [ ] 6.4 เพิ่ม deploy notes
- [ ] 6.5 ตรวจ demo URL และ workflow บน GitHub

## Backlog Ideas

- [ ] AI LINE OA Assistant: webhook, backend API, OpenAI integration, queue/retry, logging
- [ ] Small CRM / Lead Tracker: auth, CRUD, role-based access, dashboard
- [ ] Expense / Invoice Tracker: data model, report, export CSV/PDF, form validation
- [ ] Admin CMS for portfolio projects: owner login, project CRUD, image upload, draft/publish
