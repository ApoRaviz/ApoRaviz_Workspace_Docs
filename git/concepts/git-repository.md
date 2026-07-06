# Git Repository คืออะไร

## ภาพจำง่าย ๆ

ให้นึกว่าโปรเจกต์เป็นโต๊ะทำงาน และ Git เป็นสมุดประวัติ

```text
โฟลเดอร์โปรเจกต์ = โต๊ะทำงาน
.git/            = สมุดประวัติของ Git
commit           = รูปถ่าย/snapshot ที่เก็บเข้าประวัติ
```

ถ้าโฟลเดอร์ยังไม่มี `.git/` Git จะยังไม่รู้ว่าโฟลเดอร์นั้นเป็น repository

## แปลเป็นภาษาคนธรรมดา

Git repository คือโฟลเดอร์ที่ Git เริ่มติดตามประวัติแล้ว

คำสั่งที่ทำให้โฟลเดอร์ธรรมดากลายเป็น Git repository คือ:

```bash
git init
```

หลังรันแล้ว Git จะสร้างโฟลเดอร์ซ่อนชื่อ `.git/`

## แปลเป็น Git

```text
.git/      = database และ metadata ของ Git repository
.gitignore = รายการไฟล์หรือโฟลเดอร์ที่ Git ควรเมิน
```

สองตัวนี้ไม่ใช่สิ่งเดียวกัน:

```text
มี .gitignore แต่ไม่มี .git/ = ยังไม่ใช่ Git repository
มี .git/ แล้ว             = Git เริ่ม track ประวัติให้โฟลเดอร์นี้ได้
```

## ตัวอย่างสั้นที่สุด

```bash
git status
```

ถ้ายังไม่ได้ `git init` อาจเห็น:

```text
fatal: not a git repository (or any of the parent directories): .git
```

แปลว่า Git หา `.git/` ไม่เจอทั้งในโฟลเดอร์ปัจจุบันและโฟลเดอร์แม่

หลัง `git init` แล้วอาจเห็น:

```text
No commits yet
Untracked files:
```

แปลว่า repo ถูกสร้างแล้ว แต่ยังไม่มี commit แรก และไฟล์ยังไม่ได้ถูก track

## Flow ทีละขั้น

1. เปิดโฟลเดอร์โปรเจกต์
2. รัน `git init`
3. Git สร้าง `.git/`
4. รัน `git status`
5. Git แสดงไฟล์ที่ยัง untracked เช่น `?? README.md`

## จุดที่มักงง

- `.git/` ไม่ใช่ไฟล์ที่จะเอาขึ้น Git แต่เป็นฐานข้อมูลของ Git เอง
- `.gitignore` ไม่ได้สร้าง repository มันแค่บอกว่าไฟล์ไหนควรถูกเมิน
- `No commits yet` ไม่ได้แปลว่าโฟลเดอร์ไม่มีไฟล์ แต่แปลว่ายังไม่มี snapshot แรก
- `??` ใน `git status --short` แปลว่า untracked file
- VS Code Source Control แสดงข้อมูลเดียวกับ `git status` และ diff ของ Git

## ศัพท์ที่เกี่ยวข้อง

- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `.git/` กับ `.gitignore` ต่างกันยังไง
- `No commits yet` แปลว่าอะไร
- `??` ใน `git status --short` แปลว่าอะไร
- ทำไม `node_modules/` มักไม่โผล่ใน `git status`

## จำสั้น ๆ

```text
.git/ = สมุดประวัติของ repo
.gitignore = รายการที่ Git ควรเมิน
git init = เริ่มสร้างสมุดประวัติ
```
