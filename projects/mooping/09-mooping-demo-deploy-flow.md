# 09 MooPing Demo Deploy Flow

ไฟล์นี้สอน deploy flow เฉพาะ `ApoRaviz_Mooping` ว่าทำไมระบบหมูปิ้งต้องมี demo URL ที่เปิดได้จริง, command แต่ละตัวใช้ทำอะไร และต้องตรวจอะไรหลัง push

ถ้าต้องการเรียน concept กลางของ CI/CD และ GitHub Pages ให้อ่าน:

```text
../../angular/teach/07-cicd-github-pages.md
../../angular/commands.md
```

## ทำไม MooPing ต้อง deploy เป็น demo จริง

MooPing เป็นระบบหน้าร้าน ดังนั้น demo ที่เปิดได้จริงสำคัญกว่าสcreenshot เพราะคนดู portfolio ต้องเห็นว่า:

- โปรเจกต์เปิดดูได้จริง
- POS flow กดได้ ไม่ใช่ภาพนิ่ง
- reward logic ผ่าน test ก่อน deploy
- iPad/tablet สามารถเปิด URL เพื่อ simulate หน้าร้านได้
- Portfolio สามารถ link ไป demo ที่มีชีวิตจริง

## Command flow ของโปรเจกต์นี้

ก่อน push หรือหลังแก้ flow สำคัญให้รัน:

```bash
npm test -- --watch=false
npm run build:gh-pages
```

ความหมาย:

```text
npm test -- --watch=false = ตรวจ loyalty behavior ที่มี test รองรับ
npm run build:gh-pages    = build ด้วย base-href ของ GitHub Pages
```

ระบบ loyalty เกี่ยวกับสิทธิ์ลูกค้า ถ้า deploy bug ที่ทำให้ reward หาย ความน่าเชื่อถือของโปรเจกต์จะเสียทันที

## base-href ของ MooPing

repo นี้ deploy เป็น GitHub Pages project site ที่:

```text
https://aporaviz.github.io/ApoRaviz_Mooping/
```

ดังนั้น Angular ต้องรู้ว่า asset ควรถูกโหลดใต้ path:

```text
/ApoRaviz_Mooping/
```

จึงต้อง build ด้วย:

```bash
ng build --configuration production --base-href /ApoRaviz_Mooping/
```

ถ้าไม่ตั้ง `base-href` browser อาจหาไฟล์ CSS/JS ไม่เจอ และหน้าเว็บจะพังหรือสีหายได้

## .nojekyll คืออะไร

GitHub Pages มีระบบ Jekyll อยู่เบื้องหลัง

ไฟล์:

```text
public/.nojekyll
```

ใช้บอก GitHub Pages ว่า:

```text
เสิร์ฟไฟล์ static ตามที่ build มาได้เลย ไม่ต้องประมวลผลด้วย Jekyll
```

เป็นไฟล์เล็ก ๆ แต่ช่วยลดปัญหากับ static artifact ในอนาคต

## Artifact คืออะไร

artifact คือ output ที่ build เสร็จแล้วและพร้อม deploy

สำหรับ Angular SSR/static output ของโปรเจกต์นี้ artifact อยู่ที่:

```text
dist/ApoRaviz_Mooping/browser
```

workflow จึงต้อง upload folder นี้ ไม่ใช่ upload ทั้ง repo

## ตรวจอะไรหลัง deploy

หลัง workflow ผ่าน ให้เปิด:

```text
https://aporaviz.github.io/ApoRaviz_Mooping/
```

แล้วลอง flow:

1. เลือกลูกค้า
2. เพิ่มยอดซื้อ
3. กดยืนยัน
4. ตรวจ reward/pending/saved reward
5. ลอง save reward for later
6. ตรวจ mock LINE message

## สิ่งที่ควรเรียนจากไฟล์นี้

deploy command ไม่ได้มีไว้แค่ส่งไฟล์ขึ้น hosting แต่เป็นส่วนหนึ่งของ system flow:

```text
business logic ถูก test
-> build ด้วย base path ที่ถูก
-> workflow upload artifact ถูก folder
-> demo URL เปิดได้
-> portfolio link น่าเชื่อถือ
```
