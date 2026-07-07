# HEAD คืออะไร

## ภาพจำง่าย ๆ

ให้นึกว่า commit history เป็นแถวรูปถ่าย และ `HEAD` คือป้ายบอกว่าเรายืนอยู่ที่รูปไหน

```text
cf6a04b -> c5ff988
            ^
          HEAD
```

## แปลเป็นภาษาคนธรรมดา

`HEAD` คือจุดอ้างอิง commit ปัจจุบันที่ working tree ของเรากำลังยืนอยู่

โดยปกติบน branch `main` เราจะเห็น:

```text
c5ff988 (HEAD -> main) Document DevEng learning purpose
```

แปลว่า `HEAD` และ branch `main` ชี้มาที่ commit เดียวกัน

## แปลเป็น Git

```text
HEAD = symbolic reference to the current commit
```

ถ้า repository ยังไม่มี commit แรก Git จะยังไม่มี commit ให้ `HEAD` ชี้ได้

## ตัวอย่างสั้นที่สุด

ก่อนมี commit แรก คำสั่งนี้อาจ error:

```bash
git restore --staged README.md
```

ผลลัพธ์:

```text
fatal: could not resolve HEAD
```

เพราะยังไม่มี commit ล่าสุดให้ Git ใช้เป็นฐานอ้างอิง

หลังมี commit แรกแล้ว คำสั่งเดิมใช้ unstage ได้ตามปกติ

## จุดที่มักงง

- `HEAD` ไม่ใช่ GitHub
- `HEAD` ไม่ใช่ branch เอง แต่เป็นตำแหน่งที่เรายืนอยู่
- ก่อน commit แรก คำสั่งบางตัวที่ต้องอ้าง commit ล่าสุดอาจใช้ไม่ได้
- `HEAD -> main` ใน `git log --oneline` แปลว่าเรายืนอยู่บน commit ล่าสุดของ branch `main`

## ศัพท์ที่เกี่ยวข้อง

- [Commit](commit.md)
- [Staging Area](staging-area.md)
- [Git Repository](git-repository.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `HEAD` คืออะไร
- ทำไมก่อน commit แรก `git restore --staged` ถึงอาจ error
- `HEAD -> main` แปลว่าอะไร

## จำสั้น ๆ

```text
HEAD = ป้ายบอกว่าเรายืนอยู่ที่ commit ไหน
```
