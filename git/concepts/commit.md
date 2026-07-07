# Commit คืออะไร

## ภาพจำง่าย ๆ

Commit คือรูปถ่ายของโปรเจกต์ ณ ช่วงเวลาหนึ่ง

```text
staging area -> git commit -> commit history
```

ถ้ารูปถ่ายดี เราจะย้อนกลับมาอ่านได้ว่าเคยเปลี่ยนอะไรและเพราะอะไร

## แปลเป็นภาษาคนธรรมดา

Commit คือการบันทึก change ที่ staged แล้วลง Git history ในเครื่อง

คำสำคัญ: commit ยังไม่ใช่ push ขึ้น GitHub

## แปลเป็น Git

```text
commit = snapshot object in Git history
```

ตัวอย่าง:

```bash
git commit -m "Document DevEng learning purpose"
```

ถ้าสำเร็จ Git อาจแสดง:

```text
[main c5ff988] Document DevEng learning purpose
 1 file changed, 1 insertion(+)
```

`c5ff988` คือ commit hash แบบสั้น ใช้อ้างอิง commit นี้ได้

## ตัวอย่างสั้นที่สุด

ดู commit history แบบสั้น:

```bash
git log --oneline
```

ผลลัพธ์เช่น:

```text
c5ff988 (HEAD -> main) Document DevEng learning purpose
cf6a04b Initial Angular project setup
```

commit ล่าสุดจะอยู่บนสุด

## จุดที่มักงง

- `git commit` บันทึกลง Git history ในเครื่อง ไม่ใช่ส่งขึ้น GitHub
- `git push` ค่อยส่ง commit ไป remote เช่น GitHub
- `root-commit` คือ commit แรกสุดของ repository
- commit message ควรบอกว่าเปลี่ยนอะไรในภาษาคนอ่านรู้เรื่อง

## ศัพท์ที่เกี่ยวข้อง

- [Staging Area](staging-area.md)
- [HEAD](head.md)
- [Git Repository](git-repository.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `git commit -m "..."` ทำหน้าที่อะไร
- commit ต่างจาก push ยังไง
- `git log --oneline` ใช้ดูอะไร

## จำสั้น ๆ

```text
commit = บันทึก snapshot ลงประวัติ Git ในเครื่อง
```
