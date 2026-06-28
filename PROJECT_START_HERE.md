# Project Start Here

ไฟล์นี้คือ entry point สำหรับเริ่มงานใน workspace `ApoRaviz`

## Read Order

1. `README.md`
2. `WORKSPACE_RULES.md`
3. `TEACHING_RULES.md`
4. `AI_UPDATE_RULE.md`
5. `NEW_PROJECT_GUIDE.md`
6. `WORKSPACE_PLAN.md`
7. `angular/index.md` ถ้างานเกี่ยวกับ Angular/Tailwind
8. `baseline.md` ถ้าต้องรู้ version Node/Angular ปัจจุบัน
9. `vitepress/index.md` ถ้าต้องการรันหรือแก้เว็บ docs

## Current Roles

```text
ApoRaviz_Workspace_Docs = ความรู้กลางตาม topic แบบ W3Schools / source of truth
ApoRaviz_DevEng         = โปรเจกต์หลักที่ใช้เรียน/ฝึก dev จริงจัง
ApoRaviz_Portfolio      = profile/showcase/link hub — โชว์ผลงานอย่างเดียว
ApoRaviz_Mooping        = app project ที่พักไว้ก่อน
```

## Before Coding A New Project

- [ ] อ่านกติกากลางครบ
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
