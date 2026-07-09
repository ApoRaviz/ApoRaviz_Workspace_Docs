# Stash คืออะไร

## ภาพจำง่าย ๆ

```text
stash = กล่องพักงานค้างชั่วคราว
```

เวลายังไม่อยาก commit แต่ต้องทำให้ working tree สะอาดก่อน switch branch หรือทำงานอื่น ให้เก็บงานค้างไว้ใน stash

## แปลเป็นภาษาคนธรรมดา

stash คือการเอา change ที่ยังไม่ commit ออกจาก working tree ไปเก็บไว้ชั่วคราว

หลัง stash แล้ว working tree จะกลับมาสะอาด พอพร้อมค่อยเอา change กลับมา

## แปลเป็น Git

```text
git stash push = save working tree/index changes into stash
git stash apply = apply stash but keep it in stash list
git stash pop = apply stash then drop it if successful
```

## Apply vs Pop

`apply`:

```text
เอา change กลับมา
stash ยังอยู่
apply ซ้ำได้
```

`pop`:

```text
เอา change กลับมา
แล้วลบ stash ออกจาก list ถ้าสำเร็จ
```

ภาพจำ:

```text
apply = หยิบของจากกล่อง แต่กล่องยังอยู่
pop   = หยิบของจากกล่อง แล้วทิ้งกล่อง
```

## ตัวอย่าง Flow

เก็บงานค้าง:

```bash
git stash push -m "Practice stash README line"
```

ดู stash:

```bash
git stash list
```

ดู diff ใน stash:

```bash
git stash show -p stash@{0}
```

เอากลับมาแต่ยังเก็บ stash ไว้:

```bash
git stash apply stash@{0}
```

เอากลับมาและลบ stash:

```bash
git stash pop stash@{0}
```

## จุดที่มักงง

- stash ไม่ใช่ commit ปกติบน branch
- `apply` แล้ว stash ยังอยู่ จึง apply ซ้ำได้
- `pop` แล้ว stash หายจาก list ถ้าสำเร็จ
- ถ้าเอา stash กลับมาแล้วชนกับไฟล์ปัจจุบัน อาจเกิด conflict ได้

## ศัพท์ที่เกี่ยวข้อง

- [Working Tree](working-tree.md)
- [Staging Area](staging-area.md)
- [Commit](commit.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- ทำไมต้อง stash แทน commit
- `apply` ต่างจาก `pop` ยังไง
- ทำไมหลัง `pop` สำเร็จ `git stash list` อาจว่าง

## จำสั้น ๆ

```text
stash = เก็บงานค้างไว้ชั่วคราว
apply = เอากลับมา กล่องยังอยู่
pop = เอากลับมา แล้วทิ้งกล่อง
```
