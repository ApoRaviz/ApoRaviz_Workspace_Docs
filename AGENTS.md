# AGENTS.md

คู่มือทำงานร่วมกันของ AI agents ในrepo `ApoRaviz_Workspace_Docs` (โฟลเดอร์ `ApoRaviz_Workspace_Docs`)

ไฟล์นี้เป็น **entry point** สำหรับ Codex, Claude และ AI ตัวอื่นที่เข้ามาแก้เอกสารใน repo นี้ ให้อ่านไฟล์นี้ก่อนแตะ content

> repo นี้ต่างจาก child project (`ApoRaviz_DevEng` ฯลฯ) — child ชี้ **ออก** มาที่ `../ApoRaviz_Workspace_Docs` เพื่อยึดกฎกลาง แต่ repo นี้**คือ** ตัวกฎกลางเอง path ในไฟล์นี้จึงเป็น internal (ไม่มี `../ApoRaviz_Workspace_Docs` ให้ชี้ตัวเอง)

## Repo Identity

```text
ApoRaviz_Workspace_Docs = ความรู้กลางตาม topic แบบ W3Schools ของ ApoRaviz / source of truth
```

- เก็บ**เฉพาะความรู้กลางที่ใช้ซ้ำได้ทุกโปรเจกต์** ไม่เก็บ code ของโปรเจกต์ใดโปรเจกต์หนึ่ง
- เผยแพร่เป็น VitePress static site (public github.io)

## North Star + Public-Repo Warning

North Star ของ workspace (**topic-first / single-source / machine-agnostic**) เป็น canonical อยู่ที่ [Workspace Rules](./WORKSPACE_RULES.md#north-star) — ยึดที่นั่น **อย่า restate ที่นี่**

operating warning ที่เพิ่มเฉพาะ repo นี้ (ยังไม่ canonical ที่อื่น):

```text
PUBLIC repo = ทุกไฟล์ที่ commit คนนอกอ่านได้
              ***ห้ามมี personal context (การเงิน/สุขภาพ/เรื่องส่วนตัว) เด็ดขาด***
              -> เก็บใน private planning repo แยก
```

## Read Order (ยึดของที่มีอยู่ อย่าเขียนกฎซ้ำที่นี่)

ไฟล์นี้เป็นแค่ hook ให้ auto-discover — กฎจริงอยู่ในไฟล์เดิม อ่านตามลำดับ:

1. [Project Start Here](./PROJECT_START_HERE.md) = ลำดับอ่าน + checklist (entry point ทางการ)
2. [Workspace Rules](./WORKSPACE_RULES.md) = บทบาท repo + boundary
3. [Teaching Rules](./TEACHING_RULES.md) = วิธีเขียนบทเรียน (ภาพจำ → term → flow → code)
4. [AI Update Rule](./AI_UPDATE_RULE.md) = ความรู้ไหนไปไหน (Decision Table) + Date Check Rule
5. [New Project Guide](./NEW_PROJECT_GUIDE.md) / [Workspace Plan](./WORKSPACE_PLAN.md) = เริ่มโปรเจกต์ + แผน workspace
6. [`baseline.md`](./baseline.md) = version baseline (Node/Angular/Tailwind/TS) — single source

## What Belongs Here / What Doesn't

```text
อยู่ที่นี่ได้  : ศัพท์/flow/pattern reusable ตาม topic (angular/, nodejs/, backend/, git/ ฯลฯ)
                ซึมบทเรียนจากงานจริงเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง
ไม่อยู่ที่นี่  : code ของโปรเจกต์, business rule เฉพาะ repo, personal context,
                case study แยกตามโปรเจกต์ (route projects/<name>/ ยกเลิกแล้ว)
```

เนื้อหาไหนไปไฟล์ไหน ให้ยึด Decision Table ใน [AI Update Rule](./AI_UPDATE_RULE.md)

## Knowledge Sync (เนื้อหาจากโปรเจกต์เรียนไหลเข้ามายังไง)

- Codex เขียนร่างความรู้ reusable เข้า repo นี้หน้างาน → Claude (Reviewer/QA) ตรวจก่อนถือว่า sync เสร็จ
- ก่อนแก้หัวข้อที่มีวันที่/สถานะ ให้ทำตาม **Date Check Rule** ใน [AI Update Rule](./AI_UPDATE_RULE.md#date-check-rule) (เช็ควันจริงก่อน ห้าม copy วันเก่า)

## Commands (machine-agnostic — PC/Mac)

repo ระบุ Node version ที่ `.nvmrc` — เลือกให้ตรงก่อนรัน อย่า hardcode path เต็มของ Node

```bash
# macOS (nvm):           nvm use          # อ่าน .nvmrc อัตโนมัติ
# Windows (nvm-windows): nvm use <เลขจาก .nvmrc>
npm install
npm run docs:dev      # preview เว็บระหว่างแก้
npm run docs:build    # ต้องผ่านก่อนถือว่างานเสร็จ (VitePress ตรวจ dead link ตอน build)
```

## Before Finishing

- ถ้าแตะ content: `npm run docs:build` ผ่าน (ไม่มี dead link)
- ไม่มี personal context หลุดเข้าไฟล์ใด ๆ
- ความรู้อยู่ถูก topic ตาม Decision Table ไม่ปล่อยค้างใน chat
- ถ้าไม่ได้อัปเดต docs ให้บอกเหตุผลสั้น ๆ
