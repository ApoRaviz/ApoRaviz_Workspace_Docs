# Workspace Baseline (Single Source)

ไฟล์นี้คือ **ที่เดียว** ที่บอก version baseline ของ workspace `ApoRaviz` — ไฟล์อื่นห้าม hardcode เลข version ให้เขียน "ใช้ baseline ปัจจุบัน ดู `baseline.md`" แทน

## Current Baseline

| Tool | Version | หมายเหตุ |
|---|---|---|
| Node.js | 24 (LTS) | runtime กลางของทุก repo |
| Angular | 22 (latest stable) | frontend หลัก |
| Tailwind CSS | v4 | styling system หลัก |
| TypeScript | 6.0.x | strict |
| Package manager | npm | |

> เลขนี้เป็น **คำแนะนำสำหรับโปรเจกต์ใหม่** ส่วน repo เดิมยึด `.nvmrc` / `package.json` ของตัวเอง (อัปเกรดทีละ repo ตามสะดวก ไม่ต้อง bump พร้อมกัน)

## เลือก Node version แบบ machine-agnostic (PC + Mac)

ความจริงเดียวของ Node version ต่อ repo = ไฟล์ `.nvmrc` ที่ root (ใส่แค่เลข major เช่น `24`)

```bash
# macOS (nvm):            nvm use            # อ่าน .nvmrc อัตโนมัติ
# Windows (nvm-windows):  nvm use 24         # nvm-windows ไม่อ่าน .nvmrc ต้องใส่เลขเอง
```

**ห้าม hardcode path เต็มของ Node** (เช่น `/Users/.../v24.16.0/bin` หรือ `C:\Users\...\nvm\v24.16.0`) ในบทเรียน/สคริปต์/กฏ เพราะ PC กับ Mac path ต่างกัน path จะเน่าทันทีที่ย้ายเครื่องหรือขึ้น version ใหม่

> อยากให้อ่าน version file อัตโนมัติทั้ง Windows + Mac โดยไม่ต้องพิมพ์เลขเอง → พิจารณาเปลี่ยนไป **fnm** หรือ **Volta** (อ่าน `.nvmrc`/`package.json` ได้ทั้งสอง OS) — เป็น decision เปลี่ยน tooling

## วิธี bump version (เช่น Node 24 -> 26, Angular 22 -> 24)

1. อัปเดตตาราง baseline ในไฟล์นี้
2. อัปเดต `.nvmrc` + `package.json` (`engines`) + CI (`node-version`) ของ repo ที่จะ bump
3. ถ้าเป็น major ที่มี breaking change ให้เขียน teach note ("อัปเกรดยังไง เจออะไร") ใน `angular/teach/` หรือ `nodejs/`
4. concept ที่ไม่ผูก version (signal, DI, SSR ...) ไม่ต้องแตะ
