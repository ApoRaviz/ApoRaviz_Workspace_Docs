# Project Bootstrap Template

ชุดไฟล์ default สำหรับ **สแตมป์ลง repo `ApoRaviz_*` ใหม่ทุกตัว** เพื่อไม่ต้องตั้งกฏ/อธิบายซ้ำทุกครั้ง

## ไฟล์ในชุดนี้

```text
AGENTS.template.md  -> stamp เป็น <repo>/AGENTS.md   (agent ทุกตัวอ่านก่อนทำงาน + ชี้ไป ../_docs)
CLAUDE.template.md  -> stamp เป็น <repo>/CLAUDE.md   (import @AGENTS.md ไม่ copy ซ้ำ)
README.template.md  -> stamp เป็น <repo>/README.md   (ทำอะไร / รันยังไง / สถานะ)
```

## วิธีใช้ตอนสร้าง repo ใหม่

1. copy ทั้ง 3 ไฟล์ไป repo ใหม่ แล้วตัด `.template` ออกจากชื่อ
2. แทนที่ `[[placeholder]]` ทุกจุด (ชื่อโปรเจกต์, project mode, snapshot, stack, status)
3. เพิ่ม `.nvmrc` ที่ root ของ repo (ใส่แค่เลข major เช่น `24`) — เป็น **ความจริงเดียว** ของ Node version ใช้ได้ทั้ง PC และ Mac
4. ถ้า Project Mode = `learning` ให้เติม Learning Protocol/role division ตาม `../TEACHING_RULES.md` (ดูตัวอย่างเต็มใน `ApoRaviz_DevEng/AGENTS.md`)

## ทำไมเป็น pointer ไม่ใช่ copy กฏ

AGENTS.md/CLAUDE.md เป็น **ตัวชี้ไป `../_docs`** ไม่ใช่ที่เก็บกฏ — แก้กฏกลางที่ `_docs` ที่เดียว ทุก repo ตามอัตโนมัติ ไม่ drift (หลักเดียวกับ W3Schools / single source)

## เชื่อมกับ skill

`aporaviz-project-starter` skill ใช้ชุดนี้เป็น default ตอน scaffold repo ใหม่
