# Reflog คืออะไร

## ภาพจำง่าย ๆ

```text
git log    = ถนนหลักของ branch
git reflog = กล้องวงจรปิดในเครื่องเรา
```

`git log` บอกว่า branch ปัจจุบันเดินผ่าน commit ไหนบ้าง

`git reflog` บอกว่า `HEAD` หรือ branch pointer ในเครื่องเราเคยขยับไปไหนบ้าง เช่น switch branch, commit, reset

## แปลเป็นภาษาคนธรรมดา

ถ้าเรา `reset --hard` แล้ว commit บางตัวหลุดจาก branch ปัจจุบัน เราอาจยังตามหา hash นั้นได้จาก reflog

reflog จึงเป็นเครื่องมือช่วยกู้ “ทางเดินในเครื่องเรา” ไม่ใช่ประวัติ shared บน remote

## แปลเป็น Git

```text
reflog = local log of reference updates
```

มันจำการขยับของ reference เช่น `HEAD`, `main`, หรือ branch อื่นในเครื่องนี้

## ตัวอย่าง Flow

ดู reflog:

```bash
git reflog --oneline -10
```

ตัวอย่าง:

```text
78019fa HEAD@{4}: commit: Revert "Add B line"
5a5e3fc HEAD@{3}: reset: moving to 5a5e3fc
```

ถ้าอยากกู้ commit `78019fa` กลับมาให้มี branch ชี้:

```bash
git branch recovered/from-reflog 78019fa
```

แปลว่า:

```text
สร้าง branch ใหม่ชื่อ recovered/from-reflog
ให้ชี้ commit 78019fa
```

## จุดที่มักงง

- reflog เป็น local history ของเครื่องนี้ ไม่ใช่สิ่งที่ทีมทุกคนเห็นเหมือนกัน
- reflog ไม่ได้ทำให้ branch กลับเอง ต้องเอา hash ไปใช้ต่อ เช่นสร้าง branch หรือ reset
- reflog ช่วยได้มากหลัง reset แต่ไม่ใช่ข้ออ้างให้ใช้ `reset --hard` แบบไม่ตรวจ

## ศัพท์ที่เกี่ยวข้อง

- [HEAD](head.md)
- [Branch](branch.md)
- [Commit](commit.md)
- [Undo In Git](undo-in-git.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `git log` กับ `git reflog` ต่างกันยังไง
- ถ้า reset แล้ว commit หลุดจาก branch จะหา hash ได้จากคำสั่งไหน
- `git branch rescue 78019fa` ทำอะไร

## จำสั้น ๆ

```text
reflog = สมุดบันทึกว่า HEAD/branch pointer เคยขยับไปไหนในเครื่องเรา
```
