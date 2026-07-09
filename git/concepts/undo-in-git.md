# Undo ใน Git คืออะไร

## ภาพจำง่าย ๆ

คำว่า undo ใน Git ไม่ได้มีปุ่มเดียว เพราะงานอยู่คนละชั้น

```text
working tree  = ไฟล์ที่แก้ในเครื่อง
staging area  = ไฟล์ที่ git add แล้ว
commit        = ประวัติที่บันทึกแล้ว
remote        = ประวัติที่ push ไปแล้ว
```

ก่อนย้อน ต้องถามก่อนว่าอยากย้อนชั้นไหน

## แปลเป็นภาษาคนธรรมดา

Git มีคำสั่งย้อนหลายแบบ เพราะ “ทิ้งไฟล์ที่ยังไม่ commit” ไม่เหมือน “ย้อน commit ที่บันทึกแล้ว”

ถ้าใช้ผิดชั้น อาจทิ้งงานที่ยังไม่ได้ commit หรือทำให้ history local กับ remote ไม่ตรงกัน

## แปลเป็น Git

```text
restore          = restore working tree file from index/HEAD
restore --staged = remove changes from index
amend            = replace the latest commit
revert           = create a new commit that undoes another commit
reset            = move branch pointer to another commit
```

## ใช้อะไรตอนไหน

```text
ยังไม่ add และอยากทิ้งไฟล์ที่แก้
-> git restore file

add แล้ว แต่อยากเอาออกจาก staging
-> git restore --staged file

commit ล่าสุดผิด และยังไม่ push
-> git commit --amend

commit ไปแล้ว และอยากย้อนแบบปลอดภัย
-> git revert <commit>

อยากขยับ history กลับ
-> git reset ...
```

## VS Code Source Control

```text
Discard Changes = git restore file
Unstage         = git restore --staged file
Amend Commit    = git commit --amend
Revert Commit   = git revert <commit> (ถ้า VS Code version มีเมนูนี้)
```

ระวัง:

```text
Discard Changes ทิ้งไฟล์ที่ยังไม่ commit จริง ๆ
Unstage ไม่ลบงาน แค่ย้ายกลับไป Changes
```

## Revert ต่างจาก Reset

`git revert`:

```text
สร้าง commit ใหม่เพื่อย้อนผลของ commit เก่า
เก็บ history เดิมไว้
เหมาะกับงานที่ push แล้ว
```

`git reset`:

```text
ขยับ branch pointer กลับไป commit เก่า
เปลี่ยน history ปัจจุบัน
เหมาะกับงาน local ที่ยังไม่ push และต้องเข้าใจผลก่อนใช้
```

ภาพจำ:

```text
revert = เขียนหน้าสมุดใหม่ว่า “ขอยกเลิกผลของหน้านั้น”
reset  = ย้ายที่คั่นหนังสือกลับไปหน้าเก่า
```

## Reset แต่ละแบบ

```text
git reset --soft
= ย้อน commit แต่เก็บ change ไว้ใน staging

git reset --mixed
= ย้อน commit และเก็บ change ไว้ใน working tree

git reset --hard
= ย้อน commit และทิ้ง change ใน working tree
```

`--hard` อันตรายที่สุด เพราะงานที่ยังไม่ commit อาจหายจริง

## จุดที่มักงง

- `git restore file` ทิ้งเนื้อหาที่แก้ใน working tree
- `git restore --staged file` ไม่ทิ้งเนื้อหา แค่เอาออกจาก staging
- `git commit --amend` เขียน commit ล่าสุดใหม่ จึงไม่ควรทำกับ commit ที่ push แล้วโดยไม่เข้าใจ
- `git revert` เพิ่ม commit ใหม่ ไม่ลบ commit เก่า
- `git reset --hard` ไม่ใช่ undo เล่น ๆ เพราะทิ้งงานในไฟล์จริงได้

## ศัพท์ที่เกี่ยวข้อง

- [Working Tree](working-tree.md)
- [Staging Area](staging-area.md)
- [Commit](commit.md)
- [HEAD](head.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- ถ้าไฟล์อยู่ใน Changes และอยากทิ้งทั้งหมด ใช้อะไร
- ถ้าไฟล์อยู่ใน Staged Changes แต่อยากเอาออกมาแก้ต่อ ใช้อะไร
- `commit --amend` เหมาะกับกรณีไหน
- ทำไม `revert` ปลอดภัยกว่า `reset` หลัง push
- `reset --hard` อันตรายเพราะอะไร

## จำสั้น ๆ

```text
restore = ย้อนไฟล์
restore --staged = ย้อน staging
amend = แก้ commit ล่าสุด
revert = ย้อนด้วย commit ใหม่
reset = ย้าย pointer กลับ ต้องระวังมาก
```
