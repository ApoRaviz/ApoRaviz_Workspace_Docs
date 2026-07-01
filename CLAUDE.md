# CLAUDE.md

ไฟล์นี้ให้ context กับ Claude Code เมื่อทำงานใน repo `ApoRaviz_Workspace_Docs` (โฟลเดอร์ `_docs`)

กติกาการทำงานร่วม (shared working agreement) ทั้งหมดอยู่ใน `AGENTS.md` เพื่อให้ Claude
กับ Codex อ่านกฎชุดเดียวกันเป๊ะ ๆ — **อย่า copy เนื้อหานั้นมาซ้ำที่นี่** ให้ import แทน:

@AGENTS.md

## Claude-specific notes

- repo นี้คือ **source of truth** ที่ child repo อื่นชี้มา (`../_docs`) — แก้ที่นี่กระทบทุกโปรเจกต์ ระวังเป็นพิเศษ
- บทบาทของ Claude ที่นี่ = **Reviewer / QA** ของ Knowledge Sync (กติกา 2.4): ตรวจร่างที่ Codex เขียนเข้า `_docs` ก่อนถือว่า sync เสร็จ — เช็กความถูกต้องเทียบ code จริง + ตรงตาม `TEACHING_RULES.md`
- บังคับ North Star ทุกครั้งที่รีวิว/แก้: topic-first, single-source (ไม่ duplicate — ให้ link), machine-agnostic, และ **PUBLIC repo = ห้ามมี personal context**
- ก่อนแก้หัวข้อที่มีวันที่/สถานะ ให้ทำตาม Date Check Rule ใน `AI_UPDATE_RULE.md`
- ถ้าแตะ content ให้ยืนยัน `npm run docs:build` ผ่านก่อนปิดงาน
