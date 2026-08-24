# ApoRaviz Gift — System Guide

> เอกสารชุดนี้คัดลอกมาจาก `ApoRaviz_Gift/docs/system-guide/` เพื่อเปิดอ่านบน VitePress ชั่วคราว โดยคง architecture และ flow เดิมไว้ ส่วนหัวข้อ security เพิ่มมุมมองเชิงป้องกันและไม่มีค่าลับจริง เมื่ออ่านเสร็จแล้วสามารถลบหมวด `aporaviz-gift/` และรายการเมนูที่เกี่ยวข้องออกได้

## ลำดับแนะนำ

1. [System Architecture and Defensive Boundaries](./SYSTEM_OVERVIEW.md) — ภาพรวม ขอบเขต และ control ของระบบ
2. [Screen and Route Flow](./SCREEN_AND_ROUTE_FLOW.md) — หน้าจอ route และ user journey
3. [End-to-End System Flow](./END_TO_END_SYSTEM_FLOW.md) — ลำดับการทำงานตั้งแต่ต้นจนจบ
4. [Code Map](./CODE_MAP.md) — แผนที่ไฟล์ source สำคัญ
5. [Frontend Flow](./FRONTEND_FLOW.md) — event, state และ HTTP ฝั่ง Angular
6. [Backend Flow](./BACKEND_FLOW.md) — controller, service และ request pipeline
7. [Database and Prisma](./DATABASE_AND_PRISMA.md) — schema, relation และ transaction
8. [Request Lifecycle](./REQUEST_LIFECYCLE.md) — เจาะ lifecycle ของแต่ละ request
9. [Signature and Upload Flow](./SIGNATURE_AND_UPLOAD_FLOW.md) — upload และ trust boundary
10. [Security Architecture and Defensive Controls](./AUTHENTICATION_AND_SECURITY.md) — token, permission, risk และแนวป้องกัน
11. [Feature Flows](./FEATURE_FLOWS.md) — flow แยกตาม feature
12. [Error Handling Flow](./ERROR_HANDLING_FLOW.md) — failure path และการจัดการ error
13. [Config and Environment](./CONFIG_AND_ENVIRONMENT.md) — config, environment และ production gaps
14. [Important Technical Concepts](./IMPORTANT_TECHNICAL_CONCEPTS.md) — แนวคิดเทคนิคที่ควรรู้
15. [Unknown or Unused Code](./UNKNOWN_OR_UNUSED_CODE.md) — จุดที่ยังไม่ใช้หรือยังไม่ชัดเจน
