# Project Start Here

ไฟล์นี้คือ entry point สำหรับเริ่มโปรเจกต์ใหม่ใน workspace `ApoRaviz`

ถ้าไม่แน่ใจว่าต้องอ่านอะไรก่อน ให้เริ่มจากไฟล์นี้เสมอ

## Read Order 1-2-3-4

### 1. อ่านกติกากลางของ workspace

```text
_docs/README.md
_docs/PROJECT_START_HERE.md
_docs/NEW_PROJECT_GUIDE.md
_docs/WORKSPACE_PLAN.md
```

อ่านเพื่อรู้ว่า:

- workspace นี้แบ่งเอกสารกลางกับเอกสารโปรเจกต์อย่างไร
- โปรเจกต์ใหม่ต้องเป็น repo แยก
- docs กลางอยู่ที่ไหน
- แผนระดับ workspace อยู่ที่ไหน

### 2. อ่าน Angular และ command กลาง

```text
_docs/angular/README.md
_docs/angular/commands.md
_docs/angular/teach/README.md
_docs/git/commands.md
```

อ่านเพื่อรู้ว่า:

- ใช้ latest stable Angular + Node LTS + Tailwind CSS v4 อย่างไร
- command setup/build/test/deploy พื้นฐานคืออะไร
- concept กลาง เช่น signals, DI, SSR, browser API, Tailwind, unit test, CI/CD อยู่ที่ไหน
- สิ่งที่ต้องระวังเมื่อขยับจาก Angular 21 ไป Angular 22 อยู่ที่ `_docs/angular/teach/09-angular-22-from-21.md`
- Git command กลางอยู่ที่ไหน

### 3. อ่านตัวอย่างมาตรฐานจาก Portfolio

```text
ApoRaviz_Portfolio/README.md
ApoRaviz_Portfolio/docs/architecture.md
ApoRaviz_Portfolio/docs/design-direction.md
ApoRaviz_Portfolio/docs/commands.md
ApoRaviz_Portfolio/docs/teach/README.md
ApoRaviz_Portfolio/.codex/skills/angular-portfolio-mentor/SKILL.md
```

อ่านเพื่อดู pattern จริง:

- README ต้องบอกว่าโปรเจกต์ทำอะไร
- architecture อธิบาย source structure และ data flow อย่างไร
- design direction คุม visual/copy tone อย่างไร
- commands เฉพาะโปรเจกต์เขียนแบบ learning note อย่างไร
- teach เฉพาะโปรเจกต์แยกจาก Angular concept กลางอย่างไร
- skill เฉพาะโปรเจกต์ต้องบอก defaults/comment style/validation อย่างไร

### 4. สร้างเอกสารของโปรเจกต์ใหม่ก่อนลง code หนัก

ในโปรเจกต์ใหม่ให้สร้างเอกสารชุดนี้ก่อน:

```text
README.md
progress.md
docs/
├── architecture.md
├── commands.md
├── design-direction.md
├── implementation-plan.md
├── product-spec.md
└── teach/
    └── README.md
.codex/
└── skills/
    └── <project-name>/
        └── SKILL.md
```

เป้าหมายคือให้โปรเจกต์มีทิศทางก่อนเขียน UI/logic จำนวนมาก

## Default Project Shape

ใช้โครงนี้เป็น default สำหรับ Angular app ถัดไป:

```text
Project/
├── .codex/skills/<project-name>/SKILL.md
├── .github/workflows/
│   ├── ci.yml
│   └── deploy-pages.yml
├── README.md
├── progress.md
├── docs/
│   ├── architecture.md
│   ├── commands.md
│   ├── design-direction.md
│   ├── implementation-plan.md
│   ├── product-spec.md
│   └── teach/
│       └── README.md
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig*.json
```

หมายเหตุ:

- Angular frontend project ใหม่ต้องติดตั้ง Tailwind CSS v4 เป็น default หลังสร้าง project
- `.github/workflows/` เพิ่มเมื่อเริ่มมี demo/deploy path จริง
- `docs/design-direction.md` จำเป็นสำหรับทุกโปรเจกต์ที่มี UI ให้คนใช้งาน
- `docs/architecture.md` จำเป็นเมื่อเริ่มมี service, route, component หลายส่วน หรือ integration
- `docs/teach/` ห้ามเก็บ Angular/Git concept กลางซ้ำ ให้เก็บเฉพาะบทเรียนของโปรเจกต์นั้น

## Default Frontend Stack

เช็กเวอร์ชันจาก official docs/npm ก่อนเริ่มโปรเจกต์ใหม่เสมอ เพราะ frontend toolchain เปลี่ยนเร็ว

ค่า baseline ณ 2026-06-06:

```text
Angular           = latest stable major, ตอนนี้ v22
Node.js           = latest Active LTS, ตอนนี้ Node 24
TypeScript        = version ที่ Angular compiler รองรับ, ตอนนี้ Angular 22 ใช้ TypeScript 6.0.x
Tailwind CSS      = v4 เป็น default styling system
Angular Router    = default router ของ Angular app
Responsive Design = ต้องคิดตั้งแต่ first usable screen
SEO/SSR           = ใช้ SSR/prerender เมื่อเป็น demo, portfolio-facing app หรือ public page
Testing           = ต้องมี test สำหรับ business logic สำคัญ
```

กติกาเรื่อง CSS:

```text
Tailwind utility classes = layout, spacing, color, typography, responsive, state ส่วนใหญ่
src/styles.css           = @import "tailwindcss", @theme, global base เล็ก ๆ
component .css           = ใช้เฉพาะ animation/keyframes หรือ style ที่ Tailwind อ่านยากจริง
```

Animation:

- ใช้ Tailwind/CSS animation ก่อนสำหรับ motion ทั่วไป
- ใช้ Angular animations หรือ Web Animations API เมื่อผูกกับ Angular state
- `Framer Motion` เป็น React-first; ใน Angular ถ้าต้องใช้ motion library ให้พิจารณา `motion` JavaScript package เฉพาะงานที่ซับซ้อน ไม่ใส่เป็น default ทุกโปรเจกต์

## Default Source Ownership

```text
src/app/models/      = TypeScript interfaces และ domain contracts
src/app/services/    = data source, shared state, business/integration boundary
src/app/components/  = shared หรือ section components ที่ใช้หลายจุด
src/app/pages/       = route-level pages และ feature-local components
```

กติกาจาก Portfolio:

- ข้อมูลที่แก้บ่อยหรือถูกใช้หลาย component ให้เริ่มจาก service/data file ไม่ hardcode ใน HTML
- UI state ที่หลาย component ใช้ร่วมกันให้มี owner ชัด เช่น `ThemeService` หรือ `<Project>StoreService`
- component ที่ใช้เฉพาะ page เดียวให้วางใต้ `src/app/pages/<page>/components/`
- component ที่ใช้หลายหน้าเท่านั้นค่อยวาง `src/app/components/`
- browser-only APIs ต้อง guard SSR-safe

## Default Docs Purpose

```text
README.md                 = โปรเจกต์ทำอะไร, ใครใช้, รัน/ตรวจยังไง
progress.md               = สิ่งที่ทำเสร็จแล้ว
docs/product-spec.md      = problem, users, user flow, data model, integration plan
docs/design-direction.md  = visual/copy/UX direction ของโปรเจกต์
docs/architecture.md      = runtime, source structure, data flow, state flow, deploy flow
docs/commands.md          = command เฉพาะโปรเจกต์แบบมี purpose/verify/caution
docs/implementation-plan.md = step/substep checklist พร้อม [ ] / [x]
docs/teach/README.md      = learning path เฉพาะโปรเจกต์
```

## Default Skill Purpose

ทุกโปรเจกต์ควรมี:

```text
.codex/skills/<project-name>/SKILL.md
```

skill ต้องมี:

- project purpose
- stack defaults
- source ownership
- business rules สำคัญ
- UX direction เฉพาะ domain
- Thai comment style
- docs update rule
- validation commands

## New Project Checklist

### Step 1 - Intake

- [ ] 1.1 ตั้งชื่อ repo เป็น `ApoRaviz_<ProjectName>`
- [ ] 1.2 เขียน problem statement
- [ ] 1.3 ระบุ user หลัก
- [ ] 1.4 ระบุ workflow หลัก
- [ ] 1.5 ระบุว่าจะโชว์ใน Portfolio อย่างไร

### Step 2 - Foundation Docs

- [ ] 2.1 เพิ่ม `README.md`
- [ ] 2.2 เพิ่ม `progress.md`
- [ ] 2.3 เพิ่ม `docs/product-spec.md`
- [ ] 2.4 เพิ่ม `docs/design-direction.md`
- [ ] 2.5 เพิ่ม `docs/architecture.md`
- [ ] 2.6 เพิ่ม `docs/commands.md`
- [ ] 2.7 เพิ่ม `docs/implementation-plan.md`
- [ ] 2.8 เพิ่ม `docs/teach/README.md`
- [ ] 2.9 เพิ่ม `.codex/skills/<project-name>/SKILL.md`

### Step 3 - Angular Foundation

- [ ] 3.1 สร้าง Angular latest stable project ด้วย Node LTS
- [ ] 3.2 ติดตั้ง Tailwind CSS v4 และตั้ง `src/styles.css` / `.postcssrc.json`
- [ ] 3.3 ตั้ง scripts: `start`, `build`, `test`, `test:ci`
- [ ] 3.4 ตรวจ `.gitignore` ว่ามี `dist`, `node_modules`, `.angular/cache`, `.env`, `.DS_Store`
- [ ] 3.5 ตั้ง `src/app/models`, `services`, `components`, `pages`
- [ ] 3.6 รัน build/test ครั้งแรก

### Step 4 - First Usable Flow

- [ ] 4.1 ทำ first usable screen ไม่ใช่ landing page เปล่า
- [ ] 4.2 ทำ core workflow ให้กดได้จริง
- [ ] 4.3 เพิ่ม empty/error/loading/success state ที่จำเป็น
- [ ] 4.4 เพิ่ม Thai comments เฉพาะจุดที่สอน intent
- [ ] 4.5 อัปเดต `progress.md` และติ๊ก `implementation-plan.md`

### Step 5 - Portfolio Integration

- [ ] 5.1 เพิ่ม project card ใน `ApoRaviz_Portfolio`
- [ ] 5.2 เพิ่ม GitHub URL
- [ ] 5.3 เพิ่ม live demo URL เมื่อ deploy แล้ว
- [ ] 5.4 เพิ่ม case study/teach note เฉพาะโปรเจกต์เมื่อมี flow ที่สอนอะไรได้จริง

## Definition Of Done For New Project Baseline

โปรเจกต์ใหม่ถือว่าตั้ง baseline พร้อมเริ่มทำงานจริงเมื่อ:

- [ ] อ่าน `_docs/PROJECT_START_HERE.md` แล้ว
- [ ] docs ชุด default มีครบ
- [ ] skill เฉพาะโปรเจกต์มีครบ
- [ ] Angular project build/test ผ่าน
- [ ] README อ่านแล้วรู้ว่าโปรเจกต์ทำอะไร
- [ ] `docs/implementation-plan.md` มี step/substep พร้อม `[ ]`
- [ ] `docs/commands.md` มี purpose/verify/caution
- [ ] `docs/teach/README.md` บอกชัดว่า teach ของโปรเจกต์นี้สอนอะไร
