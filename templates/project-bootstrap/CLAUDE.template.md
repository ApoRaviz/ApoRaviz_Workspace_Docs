# CLAUDE.md

ไฟล์นี้ให้ context กับ Claude Code เมื่อทำงานใน repo `ApoRaviz_[[ProjectName]]`

กติกาการทำงานร่วม (shared working agreement) ทั้งหมดอยู่ใน `AGENTS.md` เพื่อให้ Claude กับ Codex อ่านกฎชุดเดียวกันเป๊ะ ๆ — **อย่า copy เนื้อหานั้นมาซ้ำที่นี่** ให้ import แทน:

@AGENTS.md

## Claude-specific notes

- ยึด Default Working Mode ใน `AGENTS.md` (`teach` = สอนระหว่างสร้าง / `execute` = ทำให้ครบ / `walkthrough` = อธิบาย artifact ที่มีอยู่เมื่อผู้ใช้ขอ)
- ยึด workspace rules ที่ `../ApoRaviz_Workspace_Docs` เสมอ (ดู section Workspace Rule ใน `AGENTS.md`)
- [[ถ้า Default Working Mode เป็น teach: ระบุบทบาท Claude = Designer/Reviewer และ source documents ของโปรเจกต์]]
