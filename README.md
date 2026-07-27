# ApoRaviz Workspace Docs

## Current Rule

ตั้งแต่วันที่ 2026-06-07 repo นี้คือ learning hub และ web กลางของ `ApoRaviz_*` ทั้งหมด

ให้อ่านกติกาใหม่ก่อน:

```text
WORKSPACE_RULES.md = บทบาทของแต่ละ repo และ source of truth
TEACHING_RULES.md  = วิธีเขียนบทเรียนแบบภาพจำง่าย ๆ -> technical term -> flow -> code
AI_UPDATE_RULE.md  = กติกาให้ AI อัปเดตความรู้กลับมา repo นี้โดยไม่ต้องสั่งซ้ำ
templates/         = template สำหรับ concept และ lesson
```

`ApoRaviz_Portfolio` เป็น profile/showcase/link hub เท่านั้น ไม่ใช่แหล่งบทเรียนกลางอีกต่อไป

เอกสารใน `ApoRaviz_Workspace_Docs/` คือความจำระดับ workspace ใช้กับทุกโปรเจกต์ใน `/Users/aporaviz/ApoRaviz`

## Document Types

```text
README.md                = แผนที่ของเอกสารกลาง
PROJECT_START_HERE.md     = ลำดับอ่านและ checklist สำหรับเริ่มโปรเจกต์ใหม่
NEW_PROJECT_GUIDE.md      = กติกาก่อนเริ่มโปรเจกต์ใหม่
WORKSPACE_PLAN.md         = แผนรวมแบบ step/substep ของ workspace
angular/                  = Angular concepts, lessons และ commands
backend/                  = Backend concepts และ integrations
nodejs/                   = Node.js concepts, lessons และ commands
nestjs/                   = NestJS concepts และ commands
postgresql/               = Database concepts
git/                      = Git concepts และ commands
baseline.md               = version baseline (single source)
vitepress/                = คู่มือรันและแก้เว็บ docs ด้วย VitePress
```

## Repository

```text
GitHub repo = https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs
Local path  = /Users/aporaviz/ApoRaviz/ApoRaviz_Workspace_Docs
```

repo นี้เก็บเฉพาะความรู้กลางของ workspace ไม่เก็บ code ของโปรเจกต์ใดโปรเจกต์หนึ่ง

## How to Use

ลำดับการอ่านเริ่มงาน (read order) เก็บไว้ที่เดียวใน [Project Start Here](./PROJECT_START_HERE.md) เพื่อไม่ให้ลำดับซ้ำและขัดกันหลายไฟล์

## Static Site

repo นี้เริ่มใช้ VitePress เป็น static docs site

```bash
npm install
npm run docs:dev
npm run docs:build
```

ตัวอย่างหน้าสำหรับทดสอบรูปแบบคือ:

```text
angular/concepts/signal.md
angular/memory-aids.md
```

ถ้ายังไม่เคยใช้ VitePress ให้อ่าน:

```text
vitepress/index.md
```

## Project Roles

ตาราง role/status ของทุก repo เก็บไว้ที่เดียวใน [Workspace Plan](./WORKSPACE_PLAN.md) หัวข้อ Project Registry เพื่อไม่ให้ข้อมูลโปรเจกต์ซ้ำหลายไฟล์

## Ownership Rule

- Concept ที่ใช้เริ่มโปรเจกต์ใหม่อยู่ใน `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`
- ลำดับอ่านสำหรับโปรเจกต์ใหม่อยู่ใน `ApoRaviz_Workspace_Docs/PROJECT_START_HERE.md`
- Design direction กลางอยู่ใน `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`; design เฉพาะ portfolio อยู่ใน `ApoRaviz_Portfolio/docs/design-direction.md`
- Commands กลางที่ใช้ซ้ำอยู่ใน `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`; commands เฉพาะโปรเจกต์อยู่ใน `docs/commands.md`
- Angular commands กลางอยู่ใน `ApoRaviz_Workspace_Docs/angular/commands.md`
- Git commands กลางอยู่ใน `ApoRaviz_Workspace_Docs/git/commands.md`
- Skills กลางอธิบายใน `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`; skill เฉพาะโปรเจกต์อยู่ใน `.codex/skills/<project>/SKILL.md`
- Angular teach กลางอยู่ใน `ApoRaviz_Workspace_Docs/angular/teach/`; บทเรียน reusable จากโปรเจกต์จริงให้ซึมเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง
- แผนละเอียดของโปรเจกต์ต้องอยู่ใน `docs/implementation-plan.md` และใช้ checkbox `[x]`
- Project repo ไม่ควรมี learning docs แยกยาว ๆ ถ้าจะใช้สอน ให้สรุปกลับมาเป็นความรู้ตาม topic ที่ `ApoRaviz_Workspace_Docs/angular/`, `ApoRaviz_Workspace_Docs/nodejs/` ฯลฯ

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
- ถ้าเป็น Angular command pattern ที่ใช้ซ้ำได้ ให้เพิ่มใน `ApoRaviz_Workspace_Docs/angular/commands.md`
- ถ้าเป็น Git command pattern ที่ใช้ซ้ำได้ ให้เพิ่มใน `ApoRaviz_Workspace_Docs/git/commands.md`
- ถ้าเป็นบทเรียน Angular/SSR/testing/component/CI ที่ใช้ได้ทุกโปรเจกต์ ให้เพิ่มใน `ApoRaviz_Workspace_Docs/angular/teach/`
- ถ้าเป็นบทเรียน reusable จากโปรเจกต์ (เช่น UX, bug, decision ที่ใช้ซ้ำได้) ให้ซึมเข้าหน้า topic ที่เกี่ยวข้องใน `ApoRaviz_Workspace_Docs` เป็นตัวอย่าง ส่วนที่เฉพาะโปรเจกต์ให้อยู่ใน README ของ repo นั้น
- ถ้าบทเรียนหรือ command ใช้ได้ทุกโปรเจกต์และเป็น rule สั้น ๆ ให้สรุปใน `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`
- ถ้า project repo เริ่มมีบทเรียนยาว ให้ย้ายกลับ `ApoRaviz_Workspace_Docs` แล้วเหลือในโปรเจกต์แค่ product spec, implementation plan, commands หรือ system docs ที่จำเป็นต่อ app นั้น
- ถ้าเป็นสิ่งที่ทำเสร็จแล้ว ให้เพิ่มใน `progress.md`
- ถ้าเป็นสิ่งที่ต้องทำต่อ ให้เพิ่มใน `docs/implementation-plan.md`
- ถ้าเป็นแผนระดับ workspace ให้เพิ่มใน `ApoRaviz_Workspace_Docs/WORKSPACE_PLAN.md`
- ถ้าเป็น coding/commenting convention ที่ใช้ได้หลายโปรเจกต์ ให้เพิ่มใน `ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md` หรือ skill ของโปรเจกต์นั้น

```text
แก้ code อย่างเดียว = ความรู้หาย
แก้ code + update teach/commands = ความรู้กลายเป็นระบบ
```
