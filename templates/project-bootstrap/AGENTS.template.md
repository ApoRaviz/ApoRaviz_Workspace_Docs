# AGENTS.md

คู่มือทำงานร่วมกันของ AI agents ในโปรเจกต์ `ApoRaviz_[[ProjectName]]`

ไฟล์นี้เป็น shared working agreement สำหรับ Codex, Claude และ AI ตัวอื่น ให้ **อ่านไฟล์นี้ก่อนแก้ code หรือ docs เสมอ**

## Project Mode

```text
[[learning | build]]
```

- `learning` = เน้นเรียนให้เข้าใจทุกบรรทัด ใช้ Learning Loop + Explanation Protocol, capture ความรู้กลับ `../_docs` เยอะ (เช่น `ApoRaviz_DevEng`)
- `build` = เน้น ship งานจริง ถือว่า stack เข้าใจแล้ว, capture **เฉพาะของใหม่จริง** ที่ `../_docs` ยังไม่มี

## Project Snapshot

- ทำอะไร: [[หนึ่งบรรทัดว่าโปรเจกต์นี้แก้ปัญหาอะไร]]
- Stack: [[ยึด default จาก ../_docs/WORKSPACE_RULES.md — Angular + Tailwind / NestJS / PostgreSQL ฯลฯ]]
- สถานะ: [[phase/step ปัจจุบัน]]

รายละเอียดเต็มอยู่ใน `README.md`

## Workspace Rule (อ่าน doc กลางเสมอ)

โปรเจกต์นี้เป็น child repo ของ workspace `ApoRaviz` ต้องยึดกฏกลางจาก `../_docs` เสมอ:

- `../_docs/WORKSPACE_RULES.md` = บทบาท repo + stack default + boundary (source of truth)
- `../_docs/AI_UPDATE_RULE.md` = ความรู้ไหนไปไหน (Decision Table)
- `../_docs/NEW_PROJECT_GUIDE.md` = กติกาเริ่มโปรเจกต์
- `../_docs/PROJECT_START_HERE.md` = ลำดับการอ่าน
- ถ้าเป็น learning project: `../_docs/TEACHING_RULES.md`

ถ้าเปิด `../_docs` ไม่ได้ (คนละเครื่อง / CI) ให้ดู repo กลาง: https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs

หลักที่ห้ามลืม:

- `../_docs` = ความรู้กลางจัด**ตาม topic** (W3Schools ของ ApoRaviz)
- ความรู้ reusable -> ซึมเข้าหน้า topic ใน `../_docs` เป็นตัวอย่าง ไม่ทำ case study แยก
- รายละเอียดเฉพาะโปรเจกต์ -> repo นี้ (README เป็นหลัก)
- อย่าปล่อยความรู้ใหม่ไว้แค่ใน chat

## Capture Rule (แปรผันตาม Project Mode)

- `learning` mode: เจอ concept / flow / pattern ที่ใช้ซ้ำได้ -> ซึมเข้า `../_docs` หน้า topic ที่เกี่ยวข้อง
- `build` mode: capture เฉพาะ "ของใหม่จริง" (lib ใหม่, pattern ที่ยังไม่เคยจด, gotcha, version bump) ที่เหลือถือว่า `../_docs` มีแล้ว เปิดอ่านเอา

## Stack & Conventions

ยึด default stack จาก `../_docs/WORKSPACE_RULES.md`:

- Frontend: Angular latest stable + Tailwind CSS (styling หลัก) + standalone components + signals + SSR เมื่อเหมาะ
- Backend (ถ้ามี): NestJS + PostgreSQL/Supabase
- Runtime: Node ตามเลขใน `.nvmrc` ของ repo นี้

ระวัง SSR: อย่าเรียก `window` / `document` / `localStorage` ตรง ๆ ใน code ที่อาจรันฝั่ง server — ถ้าจำเป็นให้ guard ด้วย platform-safe pattern แล้วจดความรู้ที่ใช้ซ้ำได้กลับ `../_docs`

## Commands (machine-agnostic — ใช้ได้ทั้ง PC และ Mac)

repo ระบุ Node version ที่ `.nvmrc` — เลือก version ให้ตรงก่อนรัน อย่า hardcode path เต็มของ Node เพราะ PC กับ Mac path ไม่เหมือนกัน

```bash
# macOS (nvm):            nvm use            # อ่าน .nvmrc อัตโนมัติ
# Windows (nvm-windows):  nvm use <เลขจาก .nvmrc>   # nvm-windows ไม่อ่าน .nvmrc อัตโนมัติ
npm install
npm start
npm run build
npm test -- --watch=false
```

เมื่อแก้ code ที่กระทบ runtime ให้รัน build/test ที่เกี่ยวข้องก่อนส่งต่อ

## Before Finishing

- build/test รันแล้ว หรือบอกเหตุผลสั้น ๆ ว่าทำไมยังไม่ได้รัน
- ความรู้ reusable ไม่ค้างใน chat (ตาม Capture Rule + Project Mode)
- handoff ให้ agent ถัดไปเข้าใจสถานะจากไฟล์ใน repo ไม่ใช่จากความจำใน chat

---

> ถ้า Project Mode = `learning` ให้เพิ่มหัวข้อด้านล่างตาม `../_docs/TEACHING_RULES.md` และ source documents ของโปรเจกต์:
> Learning Protocol (Learning Loop + Explanation Protocol + No Black Box), Mentor stance, role division (Claude = Designer/Reviewer, Codex = Hands-on Tutor) — ดูตัวอย่างเต็มใน `ApoRaviz_DevEng/AGENTS.md`
