# Merge คืออะไร

## ภาพจำง่าย ๆ

Merge คือการเอางานจากทางแยกกลับเข้าถนนที่เรายืนอยู่

```text
ยืนอยู่ที่ main
merge docs/branching-practice
= เอางานจาก docs/branching-practice เข้ามาใน main
```

## แปลเป็นภาษาคนธรรมดา

`git merge X` แปลว่าเอา branch `X` เข้ามาหา branch ที่เรายืนอยู่ตอนนี้

ดังนั้นก่อน merge ต้องเช็กเสมอว่าเรายืนอยู่ branch ปลายทางถูกไหม

## แปลเป็น Git

```text
merge = integrate commits from another branch into current branch
```

รูปแบบ:

```bash
git switch <branch-ปลายทาง>
git merge <branch-ต้นทาง>
```

ตัวอย่าง:

```bash
git switch main
git merge docs/branching-practice
```

แปลว่าเอางานจาก `docs/branching-practice` เข้ามาใน `main`

## Fast-forward คืออะไร

ถ้า `main` ไม่มี commit ใหม่แทรกหลังจาก branch งานแยกออกไป Git สามารถเลื่อน pointer ของ `main` ไปข้างหน้าได้ตรง ๆ

```text
ก่อน merge:
main ---------------- c5ff988
                       \
docs/branching-practice de0c78f

หลัง merge:
main ---------------- de0c78f
docs/branching-practice de0c78f
```

ผลลัพธ์จะเห็น:

```text
Fast-forward
```

## VS Code Source Control

ใน VS Code หลักคิดเหมือน command:

1. ดูชื่อ branch มุมล่างซ้ายก่อน
2. switch ไป branch ปลายทาง เช่น `main`
3. เปิด Source Control
4. กด `...`
5. เลือก `Merge Branch...`
6. ถ้า VS Code ถาม `Select a branch or tag to merge from` ให้เลือก branch ต้นทาง เช่น `docs/branching-practice`

จำทิศทาง:

```text
branch ที่ยืนอยู่ = ปลายทาง
branch ที่เลือกใน "merge from" = ต้นทาง
```

## จุดที่มักงง

- `git merge X` ไม่ได้ merge เข้า `X` แต่เอา `X` เข้ามาหา branch ปัจจุบัน
- คำว่า `merge from` ใน VS Code หมายถึงเลือก branch ต้นทาง
- ถ้า merge แล้วมี conflict ให้หยุดอ่าน message ก่อน ไม่กดมั่ว
- conflict editor ของ VS Code จะเรียนแยกในหัวข้อ merge conflict

## ศัพท์ที่เกี่ยวข้อง

- [Branch](branch.md)
- [Commit](commit.md)
- [HEAD](head.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- ก่อน merge ต้องยืนอยู่ branch ไหน
- `git merge docs/branching-practice` แปลว่าอะไรถ้าเรายืนอยู่ `main`
- `Fast-forward` แปลว่าอะไร
- ใน VS Code `Select a branch or tag to merge from` ให้เลือก branch ต้นทางหรือปลายทาง

## จำสั้น ๆ

```text
git merge X = เอา X เข้ามาหา branch ที่เรายืนอยู่
```
