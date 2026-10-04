---
title: หัวข้อทั้งหมด
description: สารบัญความรู้ แยกตาม Frontend, Backend, Database และเครื่องมือพัฒนา
---

# เลือกหัวข้อที่อยากเรียน

เริ่มจากเรื่องที่กำลังใช้ แต่ละหมวดมีภาพรวมสำหรับเลือกบทอ่านต่อ ถ้ายังไม่แน่ใจว่า Concept ต่างจากบทเรียนอย่างไร เปิด [คู่มือการอ่าน](./reading-guide.md) ก่อน

## Frontend

| หัวข้อ | เริ่มเรียน | เปิดอ้างอิง |
| --- | --- | --- |
| **Angular** — component, state, HTTP, SSR และ testing | [ภาพรวม](./angular/) · [ลำดับบทเรียน](./angular/teach/) | [แนวคิด](./angular/concepts/) · [ทบทวนเร็ว](./angular/memory-aids.md) · [คำสั่ง](./angular/commands.md) |
| **Tailwind CSS** — styling และ responsive ใน Angular | [ภาพรวม](./angular/tailwind/) · [บทเรียน Tailwind v4](./angular/teach/tailwind-css-v4.md) | [คำสั่ง Angular และ Tailwind](./angular/commands.md) |

## Backend

| หัวข้อ | เริ่มเรียน | เปิดอ้างอิง |
| --- | --- | --- |
| **พื้นฐาน Backend** — HTTP, API, security และการออกแบบ | [ภาพรวม](./backend/) | [แนวคิด](./backend/concepts/) · [ทบทวนเร็ว](./backend/memory-aids.md) |
| **Node.js** — runtime, CLI, ไฟล์ และ stream | [เส้นทางเรียน](./nodejs/) · [เตรียม Node และ npm](./nodejs/teach/06-node-npm-version-check.md) | [Environment และ secrets](./nodejs/concepts/) · [คำสั่ง](./nodejs/commands.md) |
| **NestJS** — module, controller, service และ request pipeline | [เส้นทางเรียน](./nestjs/) · [โครงสร้างโปรเจกต์](./nestjs/nest-cli-project-structure.md) | [แนวคิด](./nestjs/concepts/) · [คำสั่ง](./nestjs/commands.md) |
| **ASP.NET Core** — พื้นฐาน .NET และ integration testing | [ภาพรวม](./aspnet-core/) · [โครงสร้างโปรเจกต์](./aspnet-core/foundations-and-project-structure.md) | [คำสั่ง dotnet](./aspnet-core/commands.md) |

นำไปเชื่อมระบบจริง: [Fastify](./backend/fastify.md) · [LINE OA Webhook](./backend/line-oa-webhook.md)

## Database

| ต้องการเรียนเรื่อง | เปิดอ่าน |
| --- | --- |
| PostgreSQL และภาพรวมฐานข้อมูล | [Database Overview](./postgresql/) |
| ทดลองฐานข้อมูลในเครื่อง | [PostgreSQL ครั้งแรกผ่าน Docker](./postgresql/teach/postgresql-first-run-with-docker.md) |
| แอปคุยกับฐานข้อมูลอย่างไร | [ORM และการเข้าถึงฐานข้อมูล](./postgresql/teach/orm-and-database-access.md) |
| Key, constraint, index และ transaction | [แนวคิดทั้งหมด](./postgresql/concepts/) · [ทบทวนเร็ว](./postgresql/memory-aids.md) |

## เครื่องมือพัฒนา

| หัวข้อ | เริ่มต้น | เปิดอ้างอิง |
| --- | --- | --- |
| **Git** — ประวัติการเปลี่ยนแปลงและทำงานร่วมกัน | [ภาพรวม](./git/) · [แนวคิด](./git/concepts/) | [ทบทวนเร็ว](./git/memory-aids.md) · [คำสั่ง](./git/commands.md) |
| **Docker** — รันบริการและจัดการ container | [ภาพรวม](./docker/) · [Docker Desktop UI](./docker/docker-desktop-ui.md) | [คำสั่ง](./docker/commands.md) |
| **Claude Code** — เครื่องมือช่วยพัฒนา | [ภาพรวมและคำสั่ง](./claude/) | [Skill / Plugin / MCP](./claude/extensions.md) |
| **VitePress** — ดูแลเว็บเอกสารนี้ | [คู่มือเขียนและรันเว็บ](./vitepress/) | [คำสั่ง](./vitepress/commands.md) |

## กติกา Workspace

ส่วนนี้ใช้ตอนเริ่มโปรเจกต์หรือดูแลเอกสารกลาง เลือกอ่านตามงานที่ทำได้

| ต้องการทำอะไร | หน้าหลักที่รับผิดชอบ |
| --- | --- |
| เริ่มโปรเจกต์ใหม่ | [ลำดับอ่านและ checklist](./PROJECT_START_HERE.md) · [วิธีตั้งโปรเจกต์](./NEW_PROJECT_GUIDE.md) |
| เลือกเวอร์ชันเครื่องมือ | [Version Baseline](./baseline.md) |
| เข้าใจขอบเขตแต่ละ repo | [Workspace Rules](./WORKSPACE_RULES.md) |
| เขียนบทเรียนหรือสรุปความรู้ | [Teaching Rules](./TEACHING_RULES.md) · [AI Update Rule](./AI_UPDATE_RULE.md) |
| ดูสถานะภาพรวมโปรเจกต์ | [Workspace Plan](./WORKSPACE_PLAN.md) |
