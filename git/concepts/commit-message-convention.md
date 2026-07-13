# Commit Message Convention คืออะไร

## ภาพจำง่าย ๆ

```text
commit = หน้าหนึ่งในสมุดประวัติ
commit message = หัวข้อของหน้านั้น
```

ถ้าหัวข้อชัด อนาคตเราจะอ่าน history ได้เร็วขึ้น ไม่ต้องเปิด diff ทุก commit

## แปลเป็นภาษาคนธรรมดา

commit message convention คือรูปแบบการตั้งชื่อ commit ให้สม่ำเสมอ

ใน workspace นี้ใช้รูปแบบเบา ๆ:

```text
type(scope): summary
```

ตัวอย่าง:

```text
docs(git): add commit message practice note
fix(login): redirect after successful login
feat(login-form): add login form component
chore(gitignore): ignore dist output
```

## แต่ละส่วนคืออะไร

```text
type    = ประเภทงานที่ทำ
scope   = พื้นที่/ส่วนที่แก้
summary = คำอธิบายสั้น ๆ ว่าทำอะไร
```

ตัวอย่าง:

```text
docs(git): add commit message practice note
```

อ่านได้ว่า:

```text
docs = งานเอกสาร
git = หัวข้อ/พื้นที่ที่แก้
add commit message practice note = เพิ่ม note สำหรับฝึก commit message
```

## Type ที่ใช้บ่อย

```text
docs     = เอกสาร
feat     = feature ใหม่
fix      = แก้ bug
chore    = งานดูแล repo/tooling/config
test     = test
refactor = ปรับโครง code โดย behavior เดิม
```

## ตัวอย่างที่ควรเลี่ยง

```text
update
fix
test
final
แก้
```

ปัญหาคือคนอ่านไม่รู้ว่าแก้อะไร หรือทำไปเพื่ออะไร

หมายเหตุ: คำว่า `fix` / `test` ที่อยู่**เดี่ยว ๆ ทั้งข้อความ** คือแบบที่ควรเลี่ยง แต่ `fix` / `test` **ใช้ได้เมื่อเป็น type prefix** เช่น `fix(login): redirect after successful login` หรือ `test(app): cover title rendering`

## ตัวอย่างที่อ่านง่ายกว่า

```text
docs(readme): add setup instructions
chore(gitignore): ignore dist output
feat(auth): add login form
fix(login): redirect after successful login
test(app): cover title rendering
refactor(portfolio): split hero component
```

## จุดที่มักงง

- `type` คือชนิดงาน ไม่ใช่ชื่อไฟล์ เช่นใช้ `docs`, `fix`, `feat`
- `scope` คือพื้นที่ที่แก้ เช่น `readme`, `git`, `login`, `gitignore`
- ไม่มี space ก่อน `:`
- summary ควรเป็นคำกริยาสั้น ๆ เช่น `add`, `fix`, `ignore`, `update`
- ไม่ต้องใส่จุดท้ายประโยค

## ศัพท์ที่เกี่ยวข้อง

- [Commit](commit.md)
- [Git Commands](../commands.md)

## เช็กตัวเอง

- `type`, `scope`, `summary` ต่างกันยังไง
- ทำไม `docs(git): add commit message practice note` ดีกว่า `update`
- ถ้าแก้ bug login ควรใช้ type อะไร

## จำสั้น ๆ

```text
type(scope): summary
= ประเภทงาน(พื้นที่ที่แก้): ทำอะไร
```
