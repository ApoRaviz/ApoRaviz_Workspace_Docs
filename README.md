# ApoRaviz Workspace Docs

## Current Rule

คลังความรู้ภาษาไทยของ ApoRaviz จัดตามหัวข้อ เพื่อเรียน ลงมือทำ และกลับมาเปิดอ้างอิง ใช้ [Workspace Rules](./WORKSPACE_RULES.md#north-star) เป็นหลักเรื่องขอบเขตและแหล่งข้อมูลกลาง

## Document Types

- [เริ่มเรียนอย่างไร](./reading-guide.md) — เลือกเส้นทางและรูปแบบบทอ่าน
- [หัวข้อทั้งหมด](./topics.md) — Frontend, Backend, Database และเครื่องมือ
- [คำสั่ง](./commands.md) — เปิดอ้างอิงตามงานที่ทำ
- [เริ่มโปรเจกต์](./PROJECT_START_HERE.md) — ลำดับอ่านและ checklist

## Repository

[GitHub repository](https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs) · [เว็บเอกสาร](https://aporaviz.github.io/ApoRaviz_Workspace_Docs/)

คำสั่งด้านล่างรันจากโฟลเดอร์ repo ที่ clone ไว้บนเครื่อง ไม่ผูกกับ path ของผู้ใช้คนใด

## How to Use

คนที่มาเรียนเลือกจาก [คู่มือการอ่าน](./reading-guide.md) ส่วนผู้เริ่มโปรเจกต์ใช้ [Project Start Here](./PROJECT_START_HERE.md)

## Static Site

เลือก Node ตาม `.nvmrc` และ [Baseline](./baseline.md) ก่อนรัน:

```bash
npm install
npm run docs:dev
npm run docs:build
```

รายละเอียดแต่ละคำสั่งและความต่างของ shell อยู่ใน [VitePress Commands](./vitepress/commands.md) วิธีเขียนบทความและเพิ่มหน้าอยู่ใน [VitePress Guide](./vitepress/)

## Project Roles

ดูขอบเขตของ repo ที่ [Workspace Rules](./WORKSPACE_RULES.md#project-roles) และสถานะโปรเจกต์ที่ [Project Registry](./WORKSPACE_PLAN.md#project-registry)

## Ownership Rule

| ข้อมูล | หน้าหลัก |
| --- | --- |
| ขอบเขตและกติกา workspace | [Workspace Rules](./WORKSPACE_RULES.md) |
| ตั้งโปรเจกต์และเลือก stack | [New Project Guide](./NEW_PROJECT_GUIDE.md) |
| เวอร์ชันเครื่องมือ | [Baseline](./baseline.md) |
| รูปแบบการสอนและรีวิว | [Teaching Rules](./TEACHING_RULES.md) |
| เก็บความรู้ใหม่ไว้ที่ไหน | [AI Update Rule](./AI_UPDATE_RULE.md#decision-table) |

## Rule

รูปแบบเอกสารเฉพาะโปรเจกต์อยู่ที่ [New Project Guide — Default Project Docs](./NEW_PROJECT_GUIDE.md#default-project-docs) ส่วน Concept / Lesson / Quick Recall / Commands อธิบายไว้ใน [คู่มือการอ่าน](./reading-guide.md)

## Learning Capture Rule

เมื่อพบความรู้ใหม่ ให้ใช้ [Decision Table](./AI_UPDATE_RULE.md#decision-table) เลือกปลายทาง แล้วเชื่อมลิงก์กลับไปยังหน้าหลักแทนการคัดลอกคำอธิบายยาวซ้ำหลายแห่ง
