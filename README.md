# ApoRaviz Workspace Docs

เอกสารใน `_docs/` คือความจำระดับ workspace ใช้กับทุกโปรเจกต์ใน `/Users/aporaviz/ApoRaviz`

## Document Types

```text
README.md                = แผนที่ของเอกสารกลาง
NEW_PROJECT_GUIDE.md      = กติกาก่อนเริ่มโปรเจกต์ใหม่
WORKSPACE_PLAN.md         = แผนรวมแบบ step/substep ของ workspace
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
2. `_docs/NEW_PROJECT_GUIDE.md`
3. `_docs/WORKSPACE_PLAN.md`
4. เอกสารในโปรเจกต์จริง เช่น `MooPing_Loyalty/docs/implementation-plan.md`

## Project Roles

```text
_docs/                 = ความจำกลาง ใช้กับทุกโปรเจกต์ในอนาคต
ApoRaviz_Portfolio/    = profile หลักและ hub ที่ link ไปโปรเจกต์ต่าง ๆ
MooPing_Loyalty/       = โปรเจกต์ลูกตัวแรก ระบบขาย/สะสมสิทธิ์หมูปิ้ง
```

## Ownership Rule

- Concept ที่ใช้เริ่มโปรเจกต์ใหม่อยู่ใน `_docs/NEW_PROJECT_GUIDE.md`
- Design direction กลางอยู่ใน `_docs/NEW_PROJECT_GUIDE.md`; design เฉพาะ portfolio อยู่ใน `ApoRaviz_Portfolio/docs/design-direction.md`
- Commands กลางที่ใช้ซ้ำอยู่ใน `_docs/NEW_PROJECT_GUIDE.md`; commands เฉพาะโปรเจกต์อยู่ใน `docs/commands.md`
- Skills กลางอธิบายใน `_docs/NEW_PROJECT_GUIDE.md`; skill เฉพาะโปรเจกต์อยู่ใน `.codex/skills/<project>/SKILL.md`
- Teach rule กลางอยู่ใน `_docs/NEW_PROJECT_GUIDE.md`; teach เฉพาะโปรเจกต์อยู่ใน `docs/teach/`
- แผนละเอียดของโปรเจกต์ต้องอยู่ใน `docs/implementation-plan.md` และใช้ checkbox `[x]`

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

- ถ้าเป็นคำสั่งใหม่, command ที่ใช้แก้ปัญหา, CI/CD command, Docker/Jenkins/Kubernetes command ให้เพิ่มใน `docs/commands.md` ของโปรเจกต์นั้น
- ถ้าเป็นบทเรียน, best practice, bug root cause, architecture decision, Angular/SSR/testing concept ให้เพิ่มใน `docs/teach/` ของโปรเจกต์นั้น
- ถ้าบทเรียนหรือ command ใช้ได้ทุกโปรเจกต์ ให้สรุปเป็น rule สั้น ๆ ใน `_docs/NEW_PROJECT_GUIDE.md`
- ถ้าเป็นสิ่งที่ทำเสร็จแล้ว ให้เพิ่มใน `progress.md`
- ถ้าเป็นสิ่งที่ต้องทำต่อ ให้เพิ่มใน `docs/implementation-plan.md`
- ถ้าเป็นแผนระดับ workspace ให้เพิ่มใน `_docs/WORKSPACE_PLAN.md`
- ถ้าเป็น coding/commenting convention ที่ใช้ได้หลายโปรเจกต์ ให้เพิ่มใน `_docs/NEW_PROJECT_GUIDE.md` หรือ skill ของโปรเจกต์นั้น

```text
แก้ code อย่างเดียว = ความรู้หาย
แก้ code + update teach/commands = ความรู้กลายเป็นระบบ
```
