# ApoRaviz Workspace Docs

## Current Rule

ตั้งแต่วันที่ 2026-06-07 repo นี้คือ learning hub และ web กลางของ `ApoRaviz_*` ทั้งหมด

ให้อ่านกติกาใหม่ก่อน:

```text
WORKSPACE_RULES.md = บทบาทของแต่ละ repo และ source of truth
TEACHING_RULES.md  = วิธีเขียนบทเรียนแบบภาพจำง่าย ๆ -> technical term -> flow -> code
AI_UPDATE_RULE.md  = กติกาให้ AI อัปเดตความรู้กลับมา repo นี้โดยไม่ต้องสั่งซ้ำ
templates/         = template สำหรับ concept, lesson, lab
```

`ApoRaviz_Portfolio` เป็น profile/showcase/link hub เท่านั้น ไม่ใช่แหล่งบทเรียนกลางอีกต่อไป

เอกสารใน `_docs/` คือความจำระดับ workspace ใช้กับทุกโปรเจกต์ใน `/Users/aporaviz/ApoRaviz`

## Document Types

```text
README.md                = แผนที่ของเอกสารกลาง
PROJECT_START_HERE.md     = ลำดับอ่านและ checklist สำหรับเริ่มโปรเจกต์ใหม่
NEW_PROJECT_GUIDE.md      = กติกาก่อนเริ่มโปรเจกต์ใหม่
WORKSPACE_PLAN.md         = แผนรวมแบบ step/substep ของ workspace
angular/                  = Angular teach และ command กลาง
git/                      = Git command กลาง
projects/                 = case study และบทเรียนจากโปรเจกต์จริง
vitepress/                = คู่มือรันและแก้เว็บ docs ด้วย VitePress
```

## Repository

```text
GitHub repo = https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs
Local path  = /Users/aporaviz/ApoRaviz/_docs
```

repo นี้เก็บเฉพาะความรู้กลางของ workspace ไม่เก็บ code ของโปรเจกต์ใดโปรเจกต์หนึ่ง

## How To Use

ก่อนเริ่มงานแต่ละวัน ให้อ่านตามลำดับ:

1. `_docs/README.md`
2. `_docs/PROJECT_START_HERE.md` ถ้าเริ่มโปรเจกต์ใหม่
3. `_docs/NEW_PROJECT_GUIDE.md`
4. `_docs/WORKSPACE_PLAN.md`
5. `_docs/angular/index.md` ถ้างานเกี่ยวกับ Angular
6. เอกสารในโปรเจกต์จริง เช่น `ApoRaviz_Mooping/docs/implementation-plan.md`
7. `projects/` ถ้าต้องการอ่าน case study จากโปรเจกต์จริง
8. `vitepress/index.md` ถ้าต้องการรันหรือแก้เว็บ docs

## Static Site

repo นี้เริ่มใช้ VitePress เป็น static docs site

```bash
npm install
npm run docs:dev
npm run docs:build
```

ตัวอย่างบทเรียนแรกสำหรับทดสอบรูปแบบคือ:

```text
angular/labs/01-signal-counter.md
```

ถ้ายังไม่เคยใช้ VitePress ให้อ่าน:

```text
vitepress/index.md
```

## Project Roles

```text
_docs/                 = ความจำกลาง ใช้กับทุกโปรเจกต์ในอนาคต
ApoRaviz_Portfolio/    = profile หลักและ hub ที่ link ไปโปรเจกต์ต่าง ๆ
ApoRaviz_Mooping/     = โปรเจกต์ลูกตัวแรก ระบบขาย/สะสมสิทธิ์หมูปิ้ง
```

## Ownership Rule

- Concept ที่ใช้เริ่มโปรเจกต์ใหม่อยู่ใน `_docs/NEW_PROJECT_GUIDE.md`
- ลำดับอ่าน 1-2-3-4 สำหรับโปรเจกต์ใหม่อยู่ใน `_docs/PROJECT_START_HERE.md`
- Design direction กลางอยู่ใน `_docs/NEW_PROJECT_GUIDE.md`; design เฉพาะ portfolio อยู่ใน `ApoRaviz_Portfolio/docs/design-direction.md`
- Commands กลางที่ใช้ซ้ำอยู่ใน `_docs/NEW_PROJECT_GUIDE.md`; commands เฉพาะโปรเจกต์อยู่ใน `docs/commands.md`
- Angular commands กลางอยู่ใน `_docs/angular/commands.md`
- Git commands กลางอยู่ใน `_docs/git/commands.md`
- Skills กลางอธิบายใน `_docs/NEW_PROJECT_GUIDE.md`; skill เฉพาะโปรเจกต์อยู่ใน `.codex/skills/<project>/SKILL.md`
- Angular teach กลางอยู่ใน `_docs/angular/teach/`; case study จากโปรเจกต์จริงอยู่ใน `_docs/projects/`
- แผนละเอียดของโปรเจกต์ต้องอยู่ใน `docs/implementation-plan.md` และใช้ checkbox `[x]`
- Project repo ไม่ควรมี learning docs แยกยาว ๆ ถ้าจะใช้สอน ให้ย้ายหรือสรุปกลับมาไว้ที่ `_docs/projects/` หรือ `_docs/angular/`

## Rule

```text
progress = สิ่งที่เกิดขึ้นแล้ว
implementation-plan = สิ่งที่จะทำต่อแบบละเอียด
requirements = ระบบต้องทำอะไร
architecture = ระบบถูกออกแบบอย่างไร
commands = ต้องพิมพ์คำสั่งอะไร
teach = เรื่องนี้สอนอะไร
```

## Learning Capture Rule

ทุกครั้งที่แก้ระบบหรือเจอเรื่องใหม่ที่ควรจำ ต้องอัปเดตเอกสารควบคู่กับ code:

- ถ้าเป็นคำสั่งใหม่ที่มี path, URL, repo, port หรือ base-href เฉพาะโปรเจกต์ ให้เพิ่มใน `docs/commands.md` ของโปรเจกต์นั้น
- ถ้าเป็น Angular command pattern ที่ใช้ซ้ำได้ ให้เพิ่มใน `_docs/angular/commands.md`
- ถ้าเป็น Git command pattern ที่ใช้ซ้ำได้ ให้เพิ่มใน `_docs/git/commands.md`
- ถ้าเป็นบทเรียน Angular/SSR/testing/component/CI ที่ใช้ได้ทุกโปรเจกต์ ให้เพิ่มใน `_docs/angular/teach/`
- ถ้าเป็นบทเรียนเฉพาะ domain, UX, business rule หรือ bug ของโปรเจกต์ที่ใช้สอนได้ ให้เพิ่มใน `_docs/projects/<project>/`
- ถ้าบทเรียนหรือ command ใช้ได้ทุกโปรเจกต์และเป็น rule สั้น ๆ ให้สรุปใน `_docs/NEW_PROJECT_GUIDE.md`
- ถ้า project repo เริ่มมีบทเรียนยาว ให้ย้ายกลับ `_docs` แล้วเหลือในโปรเจกต์แค่ product spec, implementation plan, commands หรือ system docs ที่จำเป็นต่อ app นั้น
- ถ้าเป็นสิ่งที่ทำเสร็จแล้ว ให้เพิ่มใน `progress.md`
- ถ้าเป็นสิ่งที่ต้องทำต่อ ให้เพิ่มใน `docs/implementation-plan.md`
- ถ้าเป็นแผนระดับ workspace ให้เพิ่มใน `_docs/WORKSPACE_PLAN.md`
- ถ้าเป็น coding/commenting convention ที่ใช้ได้หลายโปรเจกต์ ให้เพิ่มใน `_docs/NEW_PROJECT_GUIDE.md` หรือ skill ของโปรเจกต์นั้น

```text
แก้ code อย่างเดียว = ความรู้หาย
แก้ code + update teach/commands = ความรู้กลายเป็นระบบ
```
