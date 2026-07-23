# Git Learning Hub

Git คือระบบบันทึกประวัติการเปลี่ยนแปลงของโปรเจกต์ ช่วยให้รู้ว่าไฟล์เปลี่ยนอะไร ย้อนกลับได้ และทำงานร่วมกับ GitHub ได้อย่างเป็นขั้นตอน

## ภาพจำง่าย ๆ

```text
working tree = โต๊ะทำงานที่กำลังแก้ไฟล์
staging area = ถาดเลือกของที่จะถ่ายรูป
commit       = รูปถ่ายที่เก็บเข้าประวัติ
remote       = บ้านอีกหลังบน GitHub
```

## Recommended Order

1. [ภาพจำง่าย ๆ](memory-aids.md) — ทบทวนคำสำคัญแบบเร็ว
2. [Git Concepts](concepts/) — อ่านแนวคิดทีละเรื่อง
3. [Git Commands](commands.md) — เปิดใช้ตอนทำงานจริง

## Concepts

### Foundations

- [Git Repository](concepts/git-repository.md)
- [.gitignore](concepts/gitignore.md)
- [Working Tree](concepts/working-tree.md)
- [Staging Area](concepts/staging-area.md)

### Daily Workflow

- [Commit](concepts/commit.md)
- [Commit Message Convention](concepts/commit-message-convention.md)
- [HEAD](concepts/head.md)
- [Branch](concepts/branch.md)

### Collaboration

- [Remote](concepts/remote.md)
- [Merge](concepts/merge.md)
- [Merge Conflict](concepts/merge-conflict.md)
- [Cherry-pick](concepts/cherry-pick.md)

### Recovery

- [Undo in Git](concepts/undo-in-git.md)
- [Reflog](concepts/reflog.md)
- [Stash](concepts/stash.md)

## จำสั้น ๆ

```text
status -> add -> commit -> push
เช็กสถานะ -> เลือกไฟล์ -> บันทึกในเครื่อง -> ส่งขึ้น GitHub
```
