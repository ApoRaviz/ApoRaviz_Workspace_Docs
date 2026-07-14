# .gitignore คืออะไร

## ภาพจำง่าย ๆ

ให้นึกว่า Git เป็นคนจดประวัติโปรเจกต์ และ `.gitignore` เป็นกระดาษโน้ตบอกว่า:

```text
ของพวกนี้ไม่ต้องจดนะ
```

เช่น:

```text
node_modules/ = dependency ที่ติดตั้งใหม่ได้
dist/         = output หลัง build
.angular/     = cache ของ Angular
.DS_Store     = ไฟล์ระบบของ macOS
```

## แปลเป็นภาษาคนธรรมดา

`.gitignore` คือไฟล์ที่บอก Git ว่าไฟล์หรือโฟลเดอร์ไหนควรถูกเมิน ไม่ต้องเอาเข้า Git history

มันไม่ได้ลบไฟล์ออกจากเครื่อง และไม่ได้สร้าง repository เอง

## แปลเป็น Git

```text
.gitignore = ignore pattern list
```

Git ใช้ pattern ในไฟล์นี้ตอนคำนวณ `git status`

ถ้า path ตรงกับ rule ใน `.gitignore` ไฟล์นั้นจะไม่โผล่เป็น untracked file ปกติ

## ตัวอย่างสั้นที่สุด

```text
/node_modules
/dist
/.angular/cache
.DS_Store
```

ความหมาย:

```text
/node_modules = ignore node_modules ที่ root ของ repo
/dist         = ignore dist ที่ root ของ repo
.DS_Store     = ignore ไฟล์ .DS_Store
```

เครื่องหมาย `!` แปลว่า "ยกเลิก ignore" หรืออนุญาตไฟล์นั้นกลับมา:

```text
.vscode/*
!.vscode/settings.json
```

แปลว่า:

```text
เมินทุกอย่างใน .vscode/
แต่ไม่เมิน .vscode/settings.json
```

จุดสำคัญ: ถ้า ignore parent directory ทั้งก้อน เช่น `.vscode/` Git อาจไม่เดินเข้าไปดูไฟล์ลูกให้ unignore ดังนั้น scaffold มักใช้ `.vscode/*` แล้วค่อย `!.vscode/settings.json`

อีกตัวอย่างที่เจอบ่อยกับไฟล์ environment:

```text
.env
.env.*
!.env.example
```

แปลว่า:

```text
เมิน .env และ .env.* เพราะอาจมี secret จริง
แต่ไม่เมิน .env.example เพราะเป็น template ที่ไม่มีค่าจริงและควร commit ได้
```

## Flow ทีละขั้น

1. Git อ่านไฟล์ใน working tree
2. Git อ่าน `.gitignore`
3. ถ้าไฟล์ตรงกับ ignore rule Git จะเมิน
4. `git status` จึงไม่แสดงไฟล์นั้นเป็น untracked
5. ถ้าอยากดู ignored files ใช้ `git status --ignored --short`

## คำสั่งตรวจ

ดู ignored files:

```bash
git status --ignored --short
```

ถ้าเห็น:

```text
!! node_modules/
```

แปลว่า `node_modules/` ถูก ignore

ดูว่า path หนึ่งถูก ignore เพราะ rule ไหน:

```bash
git check-ignore -v node_modules
```

ตัวอย่างผลลัพธ์:

```text
.gitignore:10:/node_modules     node_modules
```

แปลว่า:

```text
node_modules ถูก ignore เพราะ .gitignore บรรทัดที่ 10
```

## จุดที่มักงง

- `.gitignore` ไม่ได้แปลว่า "ไม่ push" อย่างเดียว แต่คือ "ไม่ track เข้า Git history"
- ไฟล์ที่ถูก track ไปแล้วก่อนเพิ่ม `.gitignore` จะไม่หลุดออกเอง ต้อง untrack แยก
- ยกเลิก ignore ไฟล์ลูกไม่ได้ง่าย ๆ ถ้า parent directory ถูก ignore ทั้งก้อน จึงควร ignore แบบ `folder/*` เมื่อต้อง unignore บางไฟล์ข้างใน
- `!!` ใน `git status --ignored --short` แปลว่า ignored
- `??` แปลว่า untracked ไม่ใช่ ignored
- ของที่สร้างใหม่ได้ เช่น `node_modules/`, `dist/`, cache ไม่ควร commit

## ศัพท์ที่เกี่ยวข้อง

- [Git Repository](git-repository.md)
- [Node.js .env File](../../nodejs/concepts/dotenv-file.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `.gitignore` มีหน้าที่อะไร
- `!!` กับ `??` ต่างกันยังไง
- `git check-ignore -v` ใช้ตรวจอะไร
- ทำไม `node_modules/` และ `dist/` ไม่ควร commit
- `!` หน้า pattern ใน `.gitignore` แปลว่าอะไร

## จำสั้น ๆ

```text
.gitignore = บอก Git ว่าอะไรไม่ต้อง track
!! = ignored
git check-ignore -v = ดูว่าโดน ignore จาก rule ไหน
```
