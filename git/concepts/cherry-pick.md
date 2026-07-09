# Cherry-pick คืออะไร

## ภาพจำง่าย ๆ

```text
merge = ยกทั้งกล่องเข้ามา
cherry-pick = หยิบของ 1 ชิ้นจากกล่องนั้น
```

ถ้ามี commit ดี ๆ อยู่ใน branch หนึ่ง แต่เราไม่อยาก merge ทั้ง branch ให้ใช้ cherry-pick เพื่อหยิบเฉพาะ commit นั้น

## แปลเป็นภาษาคนธรรมดา

cherry-pick คือการ copy patch ของ commit ที่เลือก แล้วสร้าง commit ใหม่บน branch ปัจจุบัน

มันไม่ได้ย้าย commit เดิมมาทั้งตัว และ hash มักไม่เหมือนเดิม

## แปลเป็น Git

```text
git cherry-pick <commit> = apply the changes introduced by an existing commit
```

## ทำไม Hash เปลี่ยน

commit hash คำนวณจากหลายอย่าง เช่น:

```text
content
parent commit
author/committer/time
commit message
```

ถึง patch เหมือน commit ต้นทาง แต่ parent commit บน branch ปลายทางต่างกัน hash จึงเปลี่ยนได้

ตัวอย่าง:

```text
source: 2666935 Add cherry-pick practice file
target: 2b05d8e Add cherry-pick practice file
```

message และ content เหมือนกัน แต่เป็น commit คนละตัว

## เลือกหลาย Commit ได้ไหม

ถ้าอีก branch มี commit:

```text
A
B
C
D
E
```

เลือกเฉพาะบาง commit ได้:

```bash
git cherry-pick B
git cherry-pick D
git cherry-pick E
```

ถ้า commit ต่อเนื่องกัน เช่น B ถึง D:

```bash
git cherry-pick B^..D
```

ต้องระวัง dependency ระหว่าง commit:

```text
B = เพิ่ม helper
C = ใช้ helper
```

ถ้า cherry-pick แค่ C โดยไม่เอา B code อาจพังหรือ conflict ได้

## จุดที่มักงง

- cherry-pick ไม่ใช่ merge ทั้ง branch
- cherry-pick สร้าง commit ใหม่บน branch ปัจจุบัน
- hash ใหม่ไม่ใช่เรื่องผิด
- cherry-pick commit ที่พึ่งพา commit อื่นอาจทำให้ build พัง

## ศัพท์ที่เกี่ยวข้อง

- [Commit](commit.md)
- [Branch](branch.md)
- [Merge](merge.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- ทำไม cherry-pick แล้ว hash เปลี่ยน
- cherry-pick เหมาะกว่า merge ตอนไหน
- ถ้าเลือก commit กลางที่พึ่งพา commit ก่อนหน้า อาจเกิดปัญหาอะไร

## จำสั้น ๆ

```text
cherry-pick = copy patch ของ commit ที่เลือก แล้วสร้าง commit ใหม่บน branch ปัจจุบัน
```
