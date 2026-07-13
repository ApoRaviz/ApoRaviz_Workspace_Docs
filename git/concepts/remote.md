# Remote คืออะไร

## ภาพจำง่าย ๆ

```text
main        = บ้านเรา
origin      = ที่อยู่ของบ้าน GitHub
origin/main = รูปถ่ายล่าสุดของบ้าน GitHub ที่เรา fetch มา
ls-remote   = โทรไปถาม GitHub ตอนนี้เลย
```

## แปลเป็นภาษาคนธรรมดา

local repo คือ Git ในเครื่องเรา

remote repo คือ Git ที่อยู่บน server เช่น GitHub

การตั้ง remote คือการบอก Git ว่า:

```text
ถ้าจะ sync กับ GitHub ให้ใช้ URL นี้
```

ชื่อ remote หลักที่นิยมใช้คือ `origin`

## แปลเป็น Git

```text
remote = named URL for another Git repository
origin = default remote name
main = local branch
origin/main = remote-tracking branch after fetch
```

## main ต่างจาก origin/main ยังไง

```text
main
= branch local ในเครื่องเรา

origin/main
= snapshot ของ GitHub main ที่เรา fetch มาเก็บไว้ในเครื่อง
```

สำคัญ:

```text
origin/main ไม่ได้ live update เอง
ถ้า GitHub เปลี่ยน ต้อง git fetch ใหม่
```

Flow:

```bash
git remote add origin <url>
git fetch origin
git log main -5
git log origin/main -5
```

## Fetch ต่างจาก ls-remote

`git fetch origin`:

```text
ไปเอาข้อมูล branch/hash จาก GitHub
มาอัปเดต remote-tracking branch ในเครื่อง เช่น origin/main
```

`git ls-remote <url>`:

```text
ถาม remote โดยตรงว่าตอนนี้มี ref/hash อะไร
ไม่จำเป็นต้องมี origin/main ใน repo นี้ก่อน
```

ใช้เช็กว่า GitHub repo ว่างไหม:

```bash
git ls-remote --heads https://github.com/ApoRaviz/ApoRaviz_DevEng.git
```

ถ้าไม่มี output:

```text
remote ยังไม่มี branch/commit
```

ถ้ามี output:

```text
remote มี branch/commit แล้ว ต้องดูให้ชัดก่อน push
```

## Upstream คืออะไร

หลัง push ครั้งแรกมักใช้:

```bash
git push -u origin main
```

`-u` หรือ `--set-upstream` บอก Git ว่า:

```text
local main ติดตาม origin/main
```

หลังจากนั้น `git status --short --branch` จะเห็น:

```text
## main...origin/main
```

แปลว่า local `main` ผูกกับ remote-tracking branch `origin/main` แล้ว

## Unrelated Histories คืออะไร

ถ้า local repo กับ GitHub repo ถูกสร้างคนละที่ เช่น:

```text
local main เริ่มจาก Angular scaffold
origin/main เริ่มจาก GitHub Initial commit ที่มี LICENSE/.gitignore
```

สอง history ไม่มี ancestor ร่วมกัน Git จะไม่ merge ให้อัตโนมัติ

ถ้าตั้งใจรวมจริง ใช้:

```bash
git merge origin/main --allow-unrelated-histories
```

แล้วแก้ conflict ตามปกติ

## จุดที่มักงง

- `origin` คือชื่อ remote ไม่ใช่ branch
- `origin/main` คือ remote-tracking branch ในเครื่องหลัง fetch
- `origin/main` อาจเก่าได้ ถ้ายังไม่ได้ fetch
- `git ls-remote` ถาม GitHub ตรง ๆ ได้ แม้ยังไม่มี `origin/main`
- `git push -u origin main` ทั้ง push และตั้ง upstream

## ศัพท์ที่เกี่ยวข้อง

- [Branch](branch.md)
- [Merge](merge.md)
- [Merge Conflict](merge-conflict.md)
- [Commit](commit.md)
- คำสั่ง Git: [Git Commands](../commands.md)

## เช็กตัวเอง

- `main` กับ `origin/main` ต่างกันยังไง
- ทำไมต้อง `git fetch origin` ก่อนดู `origin/main`
- `git ls-remote <url>` ต่างจาก `git log origin/main` ยังไง
- `git push -u origin main` ทำอะไรสองอย่าง

## จำสั้น ๆ

```text
origin = remote URL
origin/main = รูปถ่ายของ GitHub main หลัง fetch
fetch = อัปเดตรูปถ่าย
push -u = ส่ง local main และตั้งให้ตาม origin/main
```
