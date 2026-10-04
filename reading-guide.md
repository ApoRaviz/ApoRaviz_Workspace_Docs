---
title: เริ่มเรียนอย่างไร
description: เลือกเส้นทางเรียนและรูปแบบบทอ่านให้ตรงกับสิ่งที่กำลังทำ
---

# เริ่มจากสิ่งที่อยากทำ

คลังนี้จัดตามหัวข้อความรู้ ไม่ต้องอ่านเรียงทั้งเว็บ เลือกเส้นทางหนึ่ง ลองตัวอย่าง แล้วกลับมาเปิดอ้างอิงตอนใช้งานจริงได้เสมอ

## เลือกเส้นทางแรก

### อยากสร้างหน้าเว็บ

เริ่มที่ [Angular Overview](./angular/) แล้วใช้ [ลำดับบทเรียน Angular](./angular/teach/) เรียนตั้งแต่ TypeScript และ component ไปจนถึง state, HTTP และ testing เมื่อเริ่มจัดหน้าจอ ให้ต่อด้วย [Tailwind CSS](./angular/tailwind/)

### อยากเขียน API หรือเครื่องมือจัดการไฟล์

1. เช็ก [Node และ npm](./nodejs/teach/06-node-npm-version-check.md) ให้รันคำสั่งได้ก่อน
2. ถ้าทำ CLI หรืออ่านเขียนไฟล์ ไปที่ [Node.js](./nodejs/)
3. ถ้าทำ API อ่าน [Web Service, Web API และ REST](./backend/concepts/web-service-and-web-api.md) แล้วเลือก [NestJS](./nestjs/) หรือ [.NET / ASP.NET Core](./aspnet-core/) ตาม stack ของงาน

### อยากเข้าใจฐานข้อมูล

อ่าน [Database Overview](./postgresql/) แล้วลอง [PostgreSQL ผ่าน Docker](./postgresql/teach/postgresql-first-run-with-docker.md) จากนั้นศึกษา [key และความสัมพันธ์](./postgresql/concepts/) ก่อนเชื่อมกับแอปผ่าน [ORM](./postgresql/teach/orm-and-database-access.md)

### อยากใช้เครื่องมือทำงานให้คล่อง

- [Git](./git/) — เข้าใจ working tree, commit, branch และการกู้คืน
- [Docker](./docker/) — เข้าใจ image, container, port และ volume
- [Claude Code](./claude/) — คำสั่งและส่วนเสริมสำหรับงานพัฒนา

## เลือกรูปแบบบทอ่าน

| รูปแบบ | ใช้เมื่อ | ตัวอย่าง |
| --- | --- | --- |
| **Concept / แนวคิด** | เจอศัพท์ใหม่และอยากรู้ว่ามันคืออะไร | [Signal](./angular/concepts/signal.md), [Transaction](./postgresql/concepts/database-transaction.md) |
| **Lesson / บทเรียนลงมือทำ** | อยากต่อหลายแนวคิดเป็นงานที่ลองได้ | [Reactive Signals](./angular/teach/reactive-signals.md), [CLI File Processing](./nodejs/teach/01-cli-file-processing.md) |
| **Quick Recall / ทบทวนเร็ว** | เคยเรียนแล้วและอยากนึกภาพให้ออก | [Angular](./angular/memory-aids.md), [Backend](./backend/memory-aids.md), [Database](./postgresql/memory-aids.md), [Git](./git/memory-aids.md) |
| **Commands / คำสั่ง** | เข้าใจงานแล้ว แต่จำคำสั่งหรือ option ไม่ได้ | [สารบัญคำสั่ง](./commands.md) |

ตัวอย่าง: ถ้าอ่านโค้ดแล้วไม่เข้าใจ `signal()` ให้เปิด Concept ก่อน ถ้าอยากจัดการสถานะทั้ง component ให้ไปบทเรียน Reactive Signals ส่วน Quick Recall ช่วยทวนภาพรวมก่อนกลับไปทำงาน

## อ่านหนึ่งบทให้ได้อะไรกลับไป

1. บอกได้ว่าหัวข้อนี้แก้ปัญหาอะไร
2. อ่าน flow แล้วคาดเดาผลลัพธ์ของตัวอย่าง
3. รันตามขั้นตอน และเทียบกับ expected result
4. เปลี่ยน input เล็กน้อยแล้วอธิบายว่าทำไมผลเปลี่ยน

โค้ดจากโปรเจกต์จริงเป็นตัวอย่างเสริม บทเรียนหลักควรอ่านรู้เรื่องได้โดยไม่ต้องเปิด repo อื่น ถ้าติดคำศัพท์ให้ตามลิงก์ไป Concept แล้วกลับมาเรียนต่อ

## กำลังเริ่มโปรเจกต์ใน Workspace?

ใช้ [Project Start Here](./PROJECT_START_HERE.md) สำหรับลำดับอ่าน กติกา และ checklist ก่อนสร้างโปรเจกต์ ส่วนคนที่มาเรียนหัวข้อใดหัวข้อหนึ่งเลือกจาก [สารบัญทั้งหมด](./topics.md) ได้ทันที
