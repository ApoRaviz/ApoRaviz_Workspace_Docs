# ภาพจำง่าย ๆ — Git

หน้านี้รวมเฉพาะภาพจำสั้น ๆ สำหรับทบทวน Git โดยไม่ต้องอ่านบทเต็ม

เมื่อเพิ่มภาพจำใหม่ในเนื้อหา Git ให้เพิ่มสรุปและลิงก์กลับมาที่หน้านี้ด้วย

## [Git Repository](concepts/git-repository.md)

```text
โฟลเดอร์โปรเจกต์ = โต๊ะทำงาน
.git/            = สมุดประวัติของ Git
commit           = รูปถ่ายที่เก็บเข้าประวัติ
```

## [.gitignore](concepts/gitignore.md)

```text
Git        = คนจดประวัติโปรเจกต์
.gitignore = กระดาษโน้ตว่า "ของพวกนี้ไม่ต้องจด"
```

## [Working Tree](concepts/working-tree.md)

```text
working tree = โต๊ะทำงานที่มีไฟล์จริง
staging area = ถาดเตรียมของก่อนถ่ายรูป
commit       = รูปถ่ายที่เก็บเข้าประวัติแล้ว
```

## [Staging Area](concepts/staging-area.md)

```text
working tree -> git add -> staging area -> git commit -> history
```

## [Commit](concepts/commit.md)

```text
commit = รูปถ่ายของโปรเจกต์ ณ ช่วงเวลาหนึ่ง
```

## [Commit Message](concepts/commit-message-convention.md)

```text
commit         = หน้าหนึ่งในสมุดประวัติ
commit message = หัวข้อของหน้านั้น
```

## [HEAD](concepts/head.md)

```text
commit history = แถวรูปถ่าย
HEAD           = ป้ายบอกว่าเรายืนอยู่ที่รูปไหน
```

## [Branch](concepts/branch.md)

```text
main      = ถนนหลัก
feature/* = ทางแยกสำหรับทำงานหนึ่งเรื่อง
```

## [Remote](concepts/remote.md)

```text
main        = บ้านเรา
origin      = ที่อยู่ของบ้าน GitHub
origin/main = รูปถ่ายล่าสุดของบ้าน GitHub ที่เรา fetch มา
```

## [Merge](concepts/merge.md)

```text
merge = เอางานจากทางแยกกลับเข้าถนนที่เรายืนอยู่
```

## [Merge Conflict](concepts/merge-conflict.md)

```text
สอง branch แก้ตำแหน่งเดียวกันคนละแบบ
Git ไม่กล้าเลือกแทนเรา จึงให้เราเป็นคนตัดสิน
```

## [Cherry-pick](concepts/cherry-pick.md)

```text
merge       = ยกทั้งกล่องเข้ามา
cherry-pick = หยิบของหนึ่งชิ้นจากกล่องนั้น
```

## [Undo in Git](concepts/undo-in-git.md)

```text
undo ไม่มีปุ่มเดียว
ต้องถามก่อนว่างานอยู่ที่ working tree, staging, commit หรือ remote
```

## [Reflog](concepts/reflog.md)

```text
git log    = ถนนหลักของ branch
git reflog = กล้องวงจรปิดที่จำว่า HEAD เคยขยับไปไหน
```

## [Stash](concepts/stash.md)

```text
stash = กล่องพักงานค้างชั่วคราวก่อนสลับไปทำเรื่องอื่น
```
