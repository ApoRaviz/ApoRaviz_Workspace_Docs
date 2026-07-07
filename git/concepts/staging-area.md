# Staging Area คืออะไร

## ภาพจำง่าย ๆ

ถ้า commit คือการถ่ายรูปเก็บประวัติ `staging area` คือถาดที่เราวางของก่อนถ่ายรูป

```text
working tree -> git add -> staging area -> git commit -> history
```

## แปลเป็นภาษาคนธรรมดา

Staging area คือพื้นที่เตรียมรายการว่า commit ถัดไปจะเอาไฟล์หรือบรรทัดไหนเข้าไปบ้าง

เราสามารถแก้ไฟล์หลายไฟล์ แต่เลือก stage แค่บางไฟล์ก่อนได้

## แปลเป็น Git

```text
staging area = index
```

คำสั่งที่พา change เข้า staging area คือ:

```bash
git add README.md
```

ถ้าเห็น:

```text
M  README.md
```

แปลว่า `README.md` ถูก staged แล้ว พร้อมเข้า commit ถัดไป

## ตัวอย่างสั้นที่สุด

ดูสิ่งที่ staged แล้ว:

```bash
git diff --cached -- README.md
```

เอาไฟล์ออกจาก staging area หลังมี commit แรกแล้ว:

```bash
git restore --staged README.md
```

ถ้ายังไม่มี commit แรก ให้ใช้:

```bash
git rm --cached README.md
```

## จุดที่มักงง

- `git add` ยังไม่ได้ commit แค่ย้าย change เข้า staging area
- `git diff --cached` ดูของที่อยู่ใน staging area
- ก่อนมี commit แรก `git restore --staged` อาจ error เพราะยังไม่มี `HEAD`
- ใน VS Code กลุ่ม `Staged Changes` คือ staging area

## ศัพท์ที่เกี่ยวข้อง

- [Working Tree](working-tree.md)
- [Commit](commit.md)
- [HEAD](head.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `git add README.md` ทำอะไร
- `M  README.md` แปลว่าอะไร
- `git diff --cached` ต่างจาก `git diff` ยังไง

## จำสั้น ๆ

```text
staging area = ถาดเตรียมของที่จะเข้า commit ถัดไป
```
