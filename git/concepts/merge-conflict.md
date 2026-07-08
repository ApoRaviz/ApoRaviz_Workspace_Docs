# Merge Conflict คืออะไร

## ภาพจำง่าย ๆ

Merge conflict คือจังหวะที่ Git รวมงานให้เองไม่ได้ เพราะสอง branch แก้ตำแหน่งเดียวกันคนละแบบ

```text
main แก้บรรทัดหนึ่งเป็นแบบ A
branch อื่นแก้บรรทัดเดียวกันเป็นแบบ B
Git ไม่กล้าเลือกแทนเรา
```

## แปลเป็นภาษาคนธรรมดา

Git หยุด merge แล้วให้คนตัดสินใจว่าจะเก็บฝั่งไหน หรือรวมทั้งสองฝั่งเข้าด้วยกัน

## แปลเป็น Git

```text
merge conflict = unmerged paths that need manual resolution
```

ถ้าเห็น:

```text
UU README.md
```

แปลว่า `README.md` ยัง unresolved conflict อยู่

## ตัวอย่าง marker

ในไฟล์ที่ conflict อาจเห็น:

```text
<<<<<<< HEAD
Git conflict practice starts from the main branch version.
=======
Git conflict practice starts from the feature branch version.
>>>>>>> docs/conflict-practice
```

ความหมาย:

```text
HEAD    = ฝั่ง branch ที่เรายืนอยู่ตอน merge
======= = เส้นแบ่งสองฝั่ง
>>>>>>> = ฝั่ง branch ที่ merge เข้ามา
```

ถ้าเรายืนอยู่ `main` แล้วรัน:

```bash
git merge docs/conflict-practice
```

`HEAD` คือ `main` และ incoming คือ `docs/conflict-practice`

## Flow ทีละขั้น

1. อ่าน `git status --short --branch`
2. เปิดไฟล์ที่ขึ้น `UU`
3. เลือกว่าจะเก็บ current, incoming, หรือรวมทั้งสองฝั่ง
4. ลบ conflict marker ให้หมด
5. save ไฟล์
6. รัน `git add <file>` เพื่อบอก Git ว่าแก้ conflict แล้ว
7. รัน `git commit` เพื่อปิด merge

จำเป็นต้อง `git add` แม้แก้ marker แล้ว เพราะ Git ต้องการสัญญาณว่าไฟล์นั้น resolved แล้ว

## VS Code Conflict Editor

ใน VS Code จะมีปุ่มช่วยตัดสินใจ:

```text
Accept Current Change  = เก็บฝั่ง branch ที่เรายืนอยู่
Accept Incoming Change = เก็บฝั่ง branch ที่ merge เข้ามา
Accept Both Changes    = เก็บทั้งสองฝั่ง
Compare Changes        = ดูเทียบสองฝั่ง
```

หลังเลือกแล้วควรอ่านผลลัพธ์อีกครั้ง เพราะ `Accept Both Changes` อาจเอาสองบรรทัดมาต่อกันตรง ๆ แต่ภาษาสุดท้ายอาจยังต้องเกลาให้เป็นข้อความเดียวที่ตั้งใจ

## Merge Commit ต่างจาก Fast-forward

Fast-forward:

```text
branch ปลายทางไม่มี commit ใหม่ขวาง
Git เลื่อน pointer ไปข้างหน้าได้เลย
```

Merge commit:

```text
สอง branch มี commit แยกกัน
Git ต้องสร้าง commit ใหม่เพื่อรวมประวัติสองฝั่ง
```

ดู graph:

```bash
git log --oneline --graph --decorate --all -5
```

## จุดที่มักงง

- `UU` ไม่ใช่ config แต่คือ unresolved conflict
- แก้ข้อความในไฟล์แล้วต้อง `git add` เพื่อ mark resolved
- `All conflicts fixed but you are still merging` แปลว่าแก้ conflict แล้ว แต่ยังต้อง commit เพื่อจบ merge
- อย่า switch branch หรือเริ่มงานอื่นระหว่าง merge ค้างอยู่
- ถ้าติด Vim ตอน commit message ให้ใช้ `:wq` เพื่อ save หรือ `:qa!` เพื่อออกแบบทิ้ง buffer

## ศัพท์ที่เกี่ยวข้อง

- [Branch](branch.md)
- [Merge](merge.md)
- [HEAD](head.md)
- [Staging Area](staging-area.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- merge conflict เกิดเมื่อไหร่
- `UU README.md` แปลว่าอะไร
- `HEAD` ใน conflict marker คือฝั่งไหน
- หลังแก้ marker ทำไมต้อง `git add`
- merge commit ต่างจาก fast-forward ยังไง

## จำสั้น ๆ

```text
แก้ conflict -> save -> git add -> git commit
```
