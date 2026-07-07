# Git Commands

ไฟล์นี้รวม command Git กลางที่ใช้ได้ทุก repo ใน workspace

รายละเอียด remote URL หรือ commit message จริงให้ดูใน repo นั้น

## Init And First Status

เริ่ม Git repository ในโฟลเดอร์ปัจจุบัน:

```bash
git init
git status
git status --short
```

ถ้าเห็น:

```text
fatal: not a git repository (or any of the parent directories): .git
```

แปลว่า Git หา `.git/` ไม่เจอ โฟลเดอร์นี้จึงยังไม่เป็น repository

หลัง `git init` ถ้าเห็น:

```text
No commits yet
?? README.md
```

แปลว่า repository ถูกสร้างแล้ว แต่ยังไม่มี commit แรก และไฟล์ `README.md` ยังเป็น untracked file

บทเรียน:

- `.git/` คือ database ประวัติของ Git repository
- `.gitignore` คือรายการไฟล์ที่ Git ควรเมิน ไม่ใช่ตัวสร้าง repository
- `??` ใน `git status --short` แปลว่า untracked
- VS Code Source Control แสดงสถานะเดียวกับ `git status` ในรูปแบบ UI

อ่าน concept: [Git Repository](concepts/git-repository.md)

## Ignore Files

ดู ignored files:

```bash
git status --ignored --short
```

ผลลัพธ์เช่น:

```text
!! node_modules/
!! dist/
```

แปลว่าไฟล์หรือโฟลเดอร์นั้นถูก ignore ด้วย `.gitignore`

ดูว่า path หนึ่งถูก ignore เพราะ rule ไหน:

```bash
git check-ignore -v node_modules
git check-ignore -v dist
```

ผลลัพธ์เช่น:

```text
.gitignore:10:/node_modules     node_modules
```

แปลว่า `node_modules` ถูก ignore เพราะ `.gitignore` บรรทัดที่ 10

บทเรียน:

- `.gitignore` บอก Git ว่าอะไรไม่ต้อง track เข้า history
- `!!` ใน `git status --ignored --short` แปลว่า ignored
- `!` หน้า pattern ใน `.gitignore` แปลว่ายกเลิก ignore สำหรับ path นั้น
- ของที่สร้างใหม่ได้ เช่น `node_modules/`, `dist/`, cache ไม่ควร commit

อ่าน concept: [.gitignore](concepts/gitignore.md)

## Daily Status

```bash
git status --short --branch
git branch --show-current
git log --oneline -5
```

ใช้ดู:

- branch ปัจจุบัน
- ahead/behind จาก remote
- ไฟล์ที่แก้
- ไฟล์ที่ staged แล้ว
- commit ล่าสุด 5 อัน

## Clone And First Setup

```bash
git clone https://github.com/ApoRaviz/Repo_Name.git
cd Repo_Name
git status --short --branch
```

ตั้งชื่อ user ในเครื่อง:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

ดู config ที่ Git ใช้อยู่:

```bash
git config --list
```

บทเรียน:

- `clone` คือดึง repo จาก GitHub ลงเครื่อง
- `config --global` ตั้งค่าทั้งเครื่อง
- ถ้าใช้หลาย GitHub account ต้องเช็ก user/email ก่อน commit

## Review Changes

```bash
git diff
git diff --stat
git diff --name-only
git diff --cached
git diff --cached --stat
git diff --cached --name-only
```

ใช้ก่อน commit เพื่อดูว่ามีไฟล์แปลกปนหรือไม่

```bash
git diff --check
```

ใช้จับ whitespace error ก่อน commit

ดูว่าไฟล์หนึ่งเปลี่ยนอะไร:

```bash
git diff -- path/to/file.md
```

ดู staged diff ของไฟล์เดียว:

```bash
git diff --cached -- path/to/file.md
```

อ่าน concept:

- [Working Tree](concepts/working-tree.md)
- [Staging Area](concepts/staging-area.md)

## Working Tree, Stage, Commit

ดูสถานะพร้อม branch:

```bash
git status --short --branch
```

อ่านรหัสสองคอลัมน์:

```text
?? README.md = untracked file ยังไม่เคยถูก track
 M README.md = modified ใน working tree แต่ยังไม่ staged
M  README.md = modified และ staged แล้ว
```

ถ้า untracked folder ถูกย่อ เช่น `?? src/` แต่ VS Code แสดงไฟล์ลูกหลายไฟล์ ให้ใช้:

```bash
git status --short --untracked-files=all
```

ดู change ที่ยังไม่ staged:

```bash
git diff -- README.md
```

stage ไฟล์เดียว:

```bash
git add README.md
```

stage ทุก change ใต้โฟลเดอร์ปัจจุบัน:

```bash
git add .
```

ควรใช้ `git add .` เมื่อมั่นใจว่า change ทั้งหมดตั้งใจจะ commit รอบเดียวกัน

ดู change ที่ staged แล้ว:

```bash
git diff --cached -- README.md
git diff --cached --stat
```

เอาไฟล์ออกจาก staging area หลังมี commit แรกแล้ว:

```bash
git restore --staged README.md
```

ถ้ายังไม่มี commit แรกและเจอ `fatal: could not resolve HEAD` ให้ใช้:

```bash
git rm --cached README.md
```

commit สิ่งที่ staged แล้ว:

```bash
git commit -m "Describe the change"
```

ดูประวัติ commit แบบสั้น:

```bash
git log --oneline
```

ถ้า output เปิดใน pager แล้วเห็น `END` ให้กด `q` เพื่อออก

อ่าน concept:

- [Working Tree](concepts/working-tree.md)
- [Staging Area](concepts/staging-area.md)
- [Commit](concepts/commit.md)
- [HEAD](concepts/head.md)

## Fetch And Compare

```bash
git fetch origin
git rev-list --left-right --count HEAD...origin/main
git log --oneline --left-right HEAD...origin/main
```

ผลลัพธ์เช่น:

```text
0 0
```

แปลว่า local กับ remote เท่ากัน

ถ้าเลขซ้ายมากกว่า 0 แปลว่า local ahead  
ถ้าเลขขวามากกว่า 0 แปลว่า remote ahead

## Branch

ดู branch ทั้งหมด:

```bash
git branch
git branch -a
```

สร้าง branch ใหม่:

```bash
git switch -c feature/name
```

สลับ branch:

```bash
git switch main
git switch feature/name
```

อัปเดต `main` จาก remote:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
```

บทเรียน:

- `switch -c` = สร้าง branch ใหม่แล้วเข้า branch นั้น
- `pull --ff-only` = รับเฉพาะกรณีที่เลื่อน commit ไปข้างหน้าได้ตรง ๆ
- ถ้า pull แล้วมี conflict ให้หยุดอ่าน message ก่อน ไม่แก้มั่ว

## Stage And Commit

```bash
git add -A
git add path/to/file.md
git commit -m "Describe the change"
```

ก่อน commit ควรดู:

```bash
git diff --cached --stat
git diff --cached --check
```

เพื่อยืนยันว่า staged เฉพาะไฟล์ที่ตั้งใจ

ดู commit ล่าสุด:

```bash
git show --stat
git show --name-only
```

แก้ commit message ล่าสุด ถ้ายังไม่ได้ push:

```bash
git commit --amend -m "Better commit message"
```

บทเรียน:

- ใช้ `git add path/to/file.md` เมื่อไม่อยาก stage ทุกไฟล์
- ใช้ `git add -A` เฉพาะเมื่อมั่นใจว่าทุก change เกี่ยวกับงานเดียวกัน
- อย่า amend commit ที่ push แล้ว ถ้าไม่ได้คุยกับทีมก่อน

## Push

```bash
git push origin main
git push -u origin feature/name
```

หลัง push ให้เช็ก:

```bash
git status --short --branch
```

ถ้าขึ้น:

```text
## main...origin/main
```

และไม่มีไฟล์ต่อท้าย แปลว่า clean และ sync แล้ว

## Restore And Unstage

ยกเลิก staged แต่ยังเก็บไฟล์ที่แก้ไว้:

```bash
git restore --staged path/to/file.md
```

ทิ้งการแก้ในไฟล์หนึ่ง:

```bash
git restore path/to/file.md
```

ทิ้งทุกไฟล์ที่แก้:

```bash
git restore .
```

ข้อควรระวัง:

```text
git restore path/to/file.md จะลบการแก้ในไฟล์นั้น
ใช้เฉพาะเมื่อแน่ใจว่าไม่ต้องการ change แล้ว
```

ใน workspace นี้ห้ามใช้คำสั่งทำลายงาน เช่น `git reset --hard` ถ้าไม่ได้ตั้งใจจริงและตรวจแล้วว่าไม่มีงานของคนอื่นปน

## Stash

เก็บงานชั่วคราว:

```bash
git stash push -m "Describe temporary work"
```

ดู stash:

```bash
git stash list
```

เอา stash ล่าสุดกลับมา:

```bash
git stash pop
```

เอา stash กลับมาแต่ยังเก็บ stash ไว้:

```bash
git stash apply stash@{0}
```

บทเรียน:

- stash เหมาะเมื่ออยากสลับ branch แต่ยังไม่พร้อม commit
- ก่อน `stash pop` ควรเช็ก `git status --short --branch`
- ถ้ามี conflict หลัง pop ให้แก้เหมือน conflict ปกติ

## Tag

สร้าง tag สำหรับจุดสำคัญ:

```bash
git tag v0.1.0
git push origin v0.1.0
```

ดู tags:

```bash
git tag
```

ลบ tag ใน local:

```bash
git tag -d v0.1.0
```

ลบ tag บน remote:

```bash
git push origin --delete v0.1.0
```

บทเรียน:

- tag เหมาะกับ release หรือจุด deploy สำคัญ
- ถ้ายังเป็นงานทดลอง ใช้ commit ธรรมดาก่อนก็พอ

## Remote

ดู remote:

```bash
git remote -v
```

เปลี่ยน remote:

```bash
git remote set-url origin https://github.com/ApoRaviz/Repo_Name.git
```

ใช้เมื่อ rename repo หรือย้าย repo ปลายทาง

## Troubleshooting

ดูว่าไฟล์หนึ่งถูก track ไหม:

```bash
git ls-files path/to/file.md
```

ดูว่า `.gitignore` rule ไหน ignore ไฟล์:

```bash
git check-ignore -v path/to/file
```

ดูประวัติของไฟล์:

```bash
git log --oneline -- path/to/file.md
```

ดูว่าใครแก้บรรทัดไหน:

```bash
git blame path/to/file.md
```

จำสั้น ๆ:

```text
status = ตอนนี้เกิดอะไรขึ้น
diff = เปลี่ยนอะไร
add = เลือกสิ่งที่จะ commit
commit = บันทึกใน local
push = ส่งขึ้น remote
fetch = ไปดู remote โดยยังไม่รวมเข้า local
```
