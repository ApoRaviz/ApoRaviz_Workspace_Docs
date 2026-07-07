# Working Tree คืออะไร

## ภาพจำง่าย ๆ

ให้นึกว่า Git มี 3 พื้นที่หลัก:

```text
working tree  = โต๊ะทำงานที่มีไฟล์จริง
staging area  = ถาดเตรียมของก่อนถ่ายรูป
commit        = รูปถ่ายที่เก็บเข้าประวัติแล้ว
```

`working tree` คือพื้นที่ที่เราแก้ไฟล์จริงใน editor เช่น VS Code

## แปลเป็นภาษาคนธรรมดา

Working tree คือไฟล์และโฟลเดอร์ที่เราเห็นอยู่ในโปรเจกต์ตอนนี้

ถ้าเปิด `README.md` แล้วพิมพ์เพิ่ม ไฟล์นั้นเปลี่ยนใน working tree ก่อน ยังไม่ได้เข้า commit ทันที

## แปลเป็น Git

```text
working tree = current checked-out files on disk
```

เวลารัน:

```bash
git status --short
```

ถ้าเห็น:

```text
 M README.md
```

แปลว่า `README.md` ถูกแก้ใน working tree แต่ยังไม่ได้ staged

## ตัวอย่างสั้นที่สุด

```bash
git diff -- README.md
```

คำสั่งนี้ดูความต่างของไฟล์ที่ถูกแก้ใน working tree แต่ยังไม่ได้เข้า staging area

## จุดที่มักงง

- `working tree` ไม่ใช่ GitHub แต่คือไฟล์จริงในเครื่อง
- ไฟล์ที่แก้ใน VS Code เริ่มจาก working tree ก่อน
- ` M README.md` กับ `M  README.md` ต่างกันที่ช่องว่างสองคอลัมน์
- `git diff` ปกติดู change ที่ยังไม่ staged

## ศัพท์ที่เกี่ยวข้อง

- [Staging Area](staging-area.md)
- [Commit](commit.md)
- [HEAD](head.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `working tree` คืออะไร
- ` M README.md` แปลว่าอะไร
- `git diff` ดู change ในพื้นที่ไหน

## จำสั้น ๆ

```text
working tree = ไฟล์จริงที่กำลังแก้บนโต๊ะทำงาน
```
