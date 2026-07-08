# Branch คืออะไร

## ภาพจำง่าย ๆ

ให้นึกว่า `main` คือถนนหลัก และ branch คือทางแยกสำหรับทำงานหนึ่งเรื่อง

```text
main       = ถนนหลักที่ควรสะอาด
feature/*  = ทางแยกทำฟีเจอร์
fix/*      = ทางแยกแก้ bug
docs/*     = ทางแยกแก้เอกสาร
```

ทำงานบน branch ช่วยให้ทดลองได้โดยไม่ไปรบกวนถนนหลักทันที

## แปลเป็นภาษาคนธรรมดา

Branch คือชื่อที่ชี้ไปยัง commit หนึ่ง และขยับไปข้างหน้าเมื่อเราสร้าง commit ใหม่บน branch นั้น

ถ้าเราอยู่บน `docs/branching-practice` แล้ว commit งานใหม่ งานนั้นจะอยู่บน branch นี้ก่อน จนกว่าจะ merge กลับเข้า `main`

## แปลเป็น Git

```text
branch = movable pointer to a commit
```

ดู branch ทั้งหมด:

```bash
git branch
```

ผลลัพธ์เช่น:

```text
* main
```

`*` แปลว่า branch ที่เรายืนอยู่ตอนนี้

## ตัวอย่างสั้นที่สุด

สร้าง branch ใหม่แล้ว switch ไปทันที:

```bash
git switch -c docs/branching-practice
```

เช็ก branch ปัจจุบัน:

```bash
git status --short --branch
```

ผลลัพธ์เช่น:

```text
## docs/branching-practice
```

## Flow ทีละขั้น

1. เริ่มจาก `main` ที่สะอาด
2. สร้าง branch ใหม่ด้วย `git switch -c docs/branching-practice`
3. แก้ไฟล์และ commit บน branch ใหม่
4. switch กลับ `main`
5. merge branch งานกลับเข้า `main`
6. ลบ branch local ที่ merge แล้วด้วย `git branch -d docs/branching-practice`

## จุดที่มักงง

- branch ไม่ได้ copy ทั้งโปรเจกต์เป็นอีกโฟลเดอร์ แต่เป็น pointer ใน Git history
- เวลา switch branch ไฟล์ใน working tree อาจเปลี่ยนตาม commit ของ branch นั้น
- ลบ branch ที่ merge แล้วไม่ได้แปลว่าลบ commit เพราะ commit ยังถูก `main` อ้างถึงอยู่
- สำหรับ solo dev ใช้ชื่อ branch แบบ `feature/...`, `fix/...`, `docs/...` ก็พออ่านง่ายแล้ว

## ศัพท์ที่เกี่ยวข้อง

- [Commit](commit.md)
- [HEAD](head.md)
- [Merge](merge.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- branch มีหน้าที่อะไร
- `git switch -c docs/branching-practice` ทำอะไร
- ทำไม switch กลับ `main` แล้วไฟล์อาจเปลี่ยน
- `git branch -d` ลบอะไร

## จำสั้น ๆ

```text
branch = ทางแยกของประวัติ Git สำหรับทำงานหนึ่งเรื่อง
```
