# Git Commands

ไฟล์นี้รวม command Git กลางที่ใช้ได้ทุก repo ใน workspace

รายละเอียด remote URL หรือ commit message จริงให้ดูใน repo นั้น

## Daily Status

```bash
git status --short --branch
```

ใช้ดู:

- branch ปัจจุบัน
- ahead/behind จาก remote
- ไฟล์ที่แก้
- ไฟล์ที่ staged แล้ว

## Review Changes

```bash
git diff
git diff --stat
git diff --cached
git diff --cached --stat
```

ใช้ก่อน commit เพื่อดูว่ามีไฟล์แปลกปนหรือไม่

```bash
git diff --check
```

ใช้จับ whitespace error ก่อน commit

## Fetch And Compare

```bash
git fetch origin
git rev-list --left-right --count HEAD...origin/main
```

ผลลัพธ์เช่น:

```text
0 0
```

แปลว่า local กับ remote เท่ากัน

ถ้าเลขซ้ายมากกว่า 0 แปลว่า local ahead  
ถ้าเลขขวามากกว่า 0 แปลว่า remote ahead

## Stage And Commit

```bash
git add -A
git commit -m "Describe the change"
```

ก่อน commit ควรดู:

```bash
git diff --cached --stat
```

เพื่อยืนยันว่า staged เฉพาะไฟล์ที่ตั้งใจ

## Push

```bash
git push origin main
```

หลัง push ให้เช็ก:

```bash
git status --short --branch
```

ถ้าขึ้น:

```text
## main...origin/main
```

และไม่มีไฟล์ต่อท้าย แปลว่า clean และ sync แล้ว

## Remote

ดู remote:

```bash
git remote -v
```

เปลี่ยน remote:

```bash
git remote set-url origin https://github.com/ApoRaviz/Repo_Name.git
```

ใช้เมื่อ rename repo หรือย้าย repo ปลายทาง

