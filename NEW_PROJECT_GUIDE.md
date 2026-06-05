# New Project Guide

ไฟล์นี้คือ concept กลางก่อนเริ่มโปรเจกต์ใหม่ใน workspace `ApoRaviz` ใช้อ่านคู่กับ `_docs/WORKSPACE_PLAN.md`

## 1. Start Here

โปรเจกต์ใหม่ต้องดู concept จาก 3 จุดนี้:

```text
_docs/README.md                    = บอกว่าเอกสารแต่ละชั้นมีหน้าที่อะไร
_docs/NEW_PROJECT_GUIDE.md         = กติกากลางก่อนเริ่มโปรเจกต์ใหม่
_docs/WORKSPACE_PLAN.md            = แผนรวมแบบ step/substep พร้อม [x]
_docs/angular/README.md            = Angular teach/commands กลาง
```

จากนั้นดูตัวอย่างจริง:

```text
ApoRaviz_Portfolio/                = profile หลักและ project hub
ApoRaviz_Mooping/                  = โปรเจกต์ลูกตัวแรก
```

ตัวอย่าง repo naming:

```text
ApoRaviz_Workspace_Docs            = เอกสารกลางของ workspace
ApoRaviz_Portfolio                 = profile หลัก
ApoRaviz_Mooping                   = repo ของโปรเจกต์ MooPing
```

## 2. Workspace Shape

```text
/Users/aporaviz/ApoRaviz/
├── _docs/                         # กติกากลาง ใช้กับทุกโปรเจกต์
├── ApoRaviz_Portfolio/            # profile หลักและ hub สำหรับ link ไปโปรเจกต์ต่าง ๆ
├── ApoRaviz_Mooping/              # โปรเจกต์ลูก: ระบบขาย/สะสมสิทธิ์หมูปิ้ง
└── New_Project_Name/              # โปรเจกต์ใหม่ในอนาคต เป็น repo แยก
```

กติกาสำคัญ:

- โปรเจกต์ใหม่ต้องเป็น repo แยก ไม่สร้างซ้อนใน `ApoRaviz_Portfolio`
- ชื่อ repo ควรขึ้นต้นด้วย `ApoRaviz_` เพื่อให้อ่านใน GitHub แล้วเห็นว่าเป็น ecosystem เดียวกัน
- `ApoRaviz_Portfolio` ใช้โชว์ project card, demo link, GitHub link และ case study
- Rule ที่ใช้ข้ามโปรเจกต์ให้เก็บใน `_docs/`
- Rule เฉพาะโปรเจกต์ให้เก็บใน docs หรือ skill ของโปรเจกต์นั้น

## 3. Default Stack

- Node 24
- Angular 21
- TypeScript strict
- Standalone components
- Angular Router
- Angular signals และ `computed()`
- `inject()` สำหรับ dependency injection
- Angular control flow: `@if`, `@for`, `@switch`
- SSR/prerender ได้ ถ้าเป็นเว็บ demo หรือ portfolio-facing app
- Browser-only APIs ต้อง guard แบบ SSR-safe เช่น `window`, `document`, `localStorage`, `IntersectionObserver`

สร้าง Angular project ใหม่:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH \
npx -y @angular/cli@21.2.12 new New_Project_Name --routing --style css --ssr --skip-git --package-manager npm
```

## 4. Design Direction

Base identity ของ ecosystem นี้:

```text
Dark premium / friendly builder / orange accent / practical app surface
```

สีหลัก:

| Role | Color |
|---|---|
| Base black | `#0A0A0A` |
| Deep black | `#050505` |
| Card black | `#111111` |
| Border steel | `#2A2A2A` |
| Apo orange | `#FF6B00` |
| Orange light | `#FF8C00` |
| Success green | `#22C55E` |
| Warm text | `#E5E5E5` |
| Muted text | `#A3A3A3` |

Design rules:

- ถ้าเป็น app/tool ให้แสดง usable experience ก่อน ไม่เริ่มด้วย landing page ลอย ๆ
- Orange คือ action/active/highlight หลัก
- Green ใช้กับ success, available, LINE OA หรือสถานะดี
- หลีกเลี่ยง purple/blue เป็นสีหลัก
- หลีกเลี่ยง gradient/orb ล้วนถ้าไม่มี product surface จริง
- Card ใช้กับ panel, item, modal หรือ tool surface เท่านั้น
- Text ต้องไม่ล้นปุ่ม/card บน mobile

## 5. UI/UX Source

โปรเจกต์ใหม่ให้เริ่มจาก design rules ในไฟล์นี้ก่อน ไม่ต้อง copy generic UI/UX skill เข้า repo ตั้งแต่แรก

ลำดับการใช้ UI/UX guidance:

1. ใช้ `_docs/NEW_PROJECT_GUIDE.md` เป็น source กลางสำหรับ brand, color, layout และ app-first rule
2. ใช้ project-specific skill เพื่อเก็บ UX เฉพาะ domain เช่น POS, CRM, invoice, LINE OA
3. ถ้าต้องทำ design research หนัก ๆ ค่อยติดตั้งหรือใช้ shared `ui-ux-pro-max` ชั่วคราวจากแหล่งกลาง ไม่ copy ไว้ในทุกโปรเจกต์
4. ถ้า insight จาก `ui-ux-pro-max` ใช้ได้กับทุกโปรเจกต์ ให้สรุปกลับมาเป็น rule สั้น ๆ ใน `_docs/NEW_PROJECT_GUIDE.md`

เหตุผล:

- repo โปรเจกต์ไม่ต้องแบกฐานข้อมูล UI/UX ซ้ำ
- โปรเจกต์ใหม่ยังมี direction ชัดจาก `_docs`
- ความรู้ที่ใช้ซ้ำได้จะกลับมาอยู่กลาง ไม่กระจายเป็น skill copy หลายที่

## 6. Required Docs Per Project

โปรเจกต์ใหม่ควรมีเท่านี้ก่อน อย่าแตกไฟล์เกินจำเป็น:

```text
README.md
progress.md
docs/
├── implementation-plan.md
├── product-spec.md
├── commands.md
└── teach/
    └── README.md
```

ถ้า `product-spec.md`, `commands.md` หรือ `teach/README.md` เริ่มยาวมาก ค่อยแตกเป็นไฟล์ย่อยภายหลัง

บทบาทของไฟล์:

- `README.md`: โปรเจกต์คืออะไร รันยังไง build/test/deploy ยังไง
- `progress.md`: สิ่งที่ทำไปแล้ว
- `docs/implementation-plan.md`: สิ่งที่จะทำต่อแบบ step/substep พร้อม `[ ]` / `[x]`
- `docs/product-spec.md`: concept, requirements, user flow, data model และ integration plan
- `docs/commands.md`: setup/dev/build/test/deploy/git/CI commands
- `docs/teach/`: บทเรียน ไม่ใช่ changelog

## 7. Planning Rule

ทุกโปรเจกต์ต้องมี `docs/implementation-plan.md`

รูปแบบ:

```md
## Step 1 - Feature Name

- [x] 1.1 ทำสิ่งที่เสร็จแล้ว
- [ ] 1.2 ทำสิ่งถัดไป
- [ ] 1.3 ตรวจ build/test
```

ติ๊ก `[x]` เมื่อ:

- ทำเสร็จจริง
- build/test ผ่านถ้าเกี่ยวกับ code
- เอกสารและ cross-link อัปเดตครบถ้าเป็นงาน docs

แผนรวมทั้ง workspace อยู่ที่:

```text
_docs/WORKSPACE_PLAN.md
```

## 8. Skills

ทุกโปรเจกต์ควรมี project-specific skill:

```text
.codex/skills/<project-name>/SKILL.md
```

ใน skill ควรมี:

- project purpose
- tech defaults
- business rules สำคัญ
- UX direction เฉพาะ domain
- comment style
- docs ที่ต้องอัปเดต
- validation commands

ก่อนทำงานในโปรเจกต์ ให้ดู:

```text
_docs/NEW_PROJECT_GUIDE.md
Project/.codex/skills/<project-name>/SKILL.md
Project/docs/implementation-plan.md
```

## 9. Commenting Style

ใช้ comment ภาษาไทยแบบ `ApoRaviz_Portfolio`

หลักคืออธิบาย intent ไม่ใช่อธิบาย syntax:

- HTML: บอกว่าทำไมใช้ `section`, `nav`, `article`, `aside`, `form`, `button`, `a`
- `div`: บอกเมื่อเป็น layout wrapper, visual layer, grid/flex container หรือ width container
- TypeScript: comment ใกล้ data source, signal/computed, service boundary, SSR guard และ business rule
- CSS: comment เฉพาะ layout section, responsive rule, state สำคัญ หรือ UX decision

## 10. Teach Rule

Teach note ต้องตอบ:

```text
เรื่องนี้สอนอะไร
ทำไมต้องออกแบบแบบนี้
เอาไปใช้โปรเจกต์อื่นได้อย่างไร
```

ถ้าเป็นบทเรียนเฉพาะ domain เช่น POS, reward, LINE OA ให้เก็บในโปรเจกต์นั้น

ถ้าเป็นบทเรียน Angular ที่ใช้ได้ทุกโปรเจกต์ เช่น signals, DI, SSR safety, browser API, component structure, unit test, CI/CD ให้เก็บใน `_docs/angular/teach/`

ถ้าเป็น command ที่ควรเรียนรู้ ให้แยกชั้นแบบนี้:

```text
_docs/angular/commands.md      = Angular command pattern กลาง
_docs/git/commands.md          = Git command pattern กลาง
Project/docs/commands.md       = command เฉพาะ path/repo/port/base-href ของโปรเจกต์
Project/docs/teach/            = อธิบายว่าคำสั่งนั้นสอน concept อะไร ถ้าเป็นบทเรียนเฉพาะโปรเจกต์
```

ตัวอย่าง:

- `npm ci` คือ concept กลางของ CI/CD ให้เก็บใน `_docs/angular/teach/07-cicd-github-pages.md`
- `npm run build:gh-pages` พร้อม `/ApoRaviz_Mooping/` ให้เก็บใน `ApoRaviz_Mooping/docs/commands.md`
- `git remote set-url origin ...` ให้เก็บ pattern ใน `_docs/git/commands.md` และ URL จริงไว้ใน project docs เมื่อจำเป็น

## 11. Validation

ก่อนบอกว่างานเสร็จ:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
```

ถ้าเป็น UI change:

- เปิด dev server
- ตรวจ desktop และ mobile/tablet viewport
- ตรวจ action หลักอย่างน้อย 1 flow
- ตรวจ text ไม่ล้น ไม่ซ้อน ไม่ถูกบัง
