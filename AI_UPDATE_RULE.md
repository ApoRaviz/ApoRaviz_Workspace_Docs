# AI Update Rule

ไฟล์นี้คือกติกาสำหรับ AI ทุกครั้งที่ช่วยทำงานใน workspace `ApoRaviz`

เป้าหมายคือไม่ต้องให้เจ้าของโปรเจ็คสั่งซ้ำบ่อย ๆ ว่า "อย่าลืมอัปเดต docs" หรือ "คำนี้ต้องสอนเพิ่มไหม"

## Required Reading

ก่อนเริ่มงานที่เกี่ยวกับ `ApoRaviz_*` ให้ AI อ่านหรือยึดตามไฟล์เหล่านี้ก่อน:

```text
ApoRaviz_Workspace_Docs/WORKSPACE_RULES.md
ApoRaviz_Workspace_Docs/TEACHING_RULES.md
ApoRaviz_Workspace_Docs/PROJECT_START_HERE.md
ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md
ApoRaviz_Workspace_Docs/WORKSPACE_PLAN.md
```

ถ้างานเกี่ยวกับ Angular ให้ดูเพิ่ม:

```text
ApoRaviz_Workspace_Docs/angular/README.md
ApoRaviz_Workspace_Docs/angular/commands.md
ApoRaviz_Workspace_Docs/angular/tailwind/README.md
ApoRaviz_Workspace_Docs/angular/teach/README.md
```

## Source Of Truth

ให้ถือว่า:

```text
ApoRaviz_Workspace_Docs = ความรู้กลางและบทเรียน
ApoRaviz_Portfolio      = เว็บ profile/showcase/link hub
ApoRaviz_Mooping        = app project ที่หยุดไว้ก่อน
```

ห้ามสร้างบทเรียนกลางใหม่ใน `ApoRaviz_Portfolio`

ถ้ามีความรู้ที่ใช้ซ้ำได้ ให้เพิ่มใน `ApoRaviz_Workspace_Docs`

## When To Update Docs

AI ต้องพิจารณาอัปเดต docs กลางเมื่อเจอสิ่งเหล่านี้:

- ศัพท์ Angular ใหม่
- API Angular ใหม่
- Tailwind CSS class, config, pattern, layout, responsive rule, หรือ style ownership ใหม่
- file default ของ Angular ที่ยังไม่ได้อธิบาย
- command ใหม่
- config ใหม่
- bug pattern ที่อาจเจอซ้ำ
- SSR/browser API safety issue
- flow ที่คนเรียนควรเข้าใจ
- project setup rule ที่ใช้ซ้ำได้

## Decision Table

```text
เจอศัพท์ใหม่                         -> เพิ่ม/อัปเดต angular/concepts/
เจอ flow การทำงาน                    -> เพิ่ม/อัปเดต angular/lessons/
เจอตัวอย่างทดลองเล็ก ๆ              -> เพิ่ม/อัปเดต angular/labs/
เจอ Tailwind pattern                  -> เพิ่ม/อัปเดต angular/tailwind/
เจอ command ที่ใช้ซ้ำได้              -> เพิ่ม/อัปเดต angular/commands.md หรือ git/commands.md
เจอ rule เริ่มโปรเจ็ค                 -> เพิ่ม/อัปเดต NEW_PROJECT_GUIDE.md
เจอ step เริ่มงาน                     -> เพิ่ม/อัปเดต PROJECT_START_HERE.md
เจอแผนระดับ workspace                -> เพิ่ม/อัปเดต WORKSPACE_PLAN.md
เจอ teaching pattern ใหม่             -> เพิ่ม/อัปเดต TEACHING_RULES.md
เจอ project-specific business rule    -> เก็บใน docs ของโปรเจ็คนั้น
เจอ portfolio showcase content        -> เก็บใน ApoRaviz_Portfolio
```

## Teaching Output Rule

ถ้า AI เพิ่มบทเรียน ต้องเขียนตาม `TEACHING_RULES.md`

ทุกบทเรียนต้องมี:

- ภาพจำง่าย ๆ
- คำแปลแบบคนธรรมดา
- technical term
- flow ทีละขั้น
- code ตัวอย่างสั้น ๆ
- จุดที่มักงง
- self-check
- สรุปจำสั้น ๆ

## New Term Rule

ถ้าใช้ศัพท์ใหม่ที่คนเรียนอาจงง:

1. link ไป concept page ใน docs นี้
2. ถ้ายังไม่มี concept page ให้สร้าง placeholder
3. อย่าปล่อยศัพท์ใหม่ลอย ๆ

ตัวอย่าง:

```md
`hydration` คือการที่ browser รับ HTML ที่ server render ไว้ แล้วทำให้หน้านั้น interactive ต่อ

อ่านต่อ: [Hydration คืออะไร](./hydration.md)
```

## No External-First Rule

AI ห้ามตอบว่า "ไปอ่าน Angular docs" เป็นคำตอบหลัก

ใช้ official docs ได้เฉพาะเพื่อ verify หรือใส่ reference ท้ายหน้า แต่บทเรียนหลักต้องอธิบายภาษาไทยใน repo นี้เอง

## No Portfolio-Learning Dependency

AI ห้ามเขียนบทเรียนที่ต้องพึ่ง `ApoRaviz_Portfolio` เพื่อเข้าใจ concept กลาง

ถ้าต้องมีตัวอย่าง ให้สร้าง tiny example หรือ lab ใน `ApoRaviz_Workspace_Docs`

## Before Finishing Work

ก่อนจบงาน AI ต้องเช็ก:

- มีศัพท์ใหม่ที่ยังไม่มี concept page ไหม
- มี flow ใหม่ที่ควรทำเป็น lesson ไหม
- มี Tailwind pattern ใหม่ที่ควรจดไหม
- มี command ใหม่ที่ควรจดไหม
- มี rule ใหม่ที่ควรอัปเดตไหม
- มีเนื้อหาไปอยู่ผิด repo ไหม

ถ้าไม่มีการอัปเดต docs ต้องบอกเหตุผลสั้น ๆ ว่าทำไมไม่จำเป็น

## Memory Rule

จำสั้น ๆ:

```text
แก้ code อย่างเดียว = ความรู้กระจาย
แก้ code + อัปเดต docs = ความรู้กลับบ้าน
```
