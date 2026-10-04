# ApoRaviz Workspace Rules

ไฟล์นี้คือกติกากลางของ workspace `ApoRaviz`

ถ้าไฟล์เก่าใน repo ใดพูดไม่ตรงกับไฟล์นี้ ให้ยึดไฟล์นี้ก่อน แล้วค่อยอัปเดตไฟล์เก่าให้ตรงกันภายหลัง

## North Star

หลักสูงสุดของ workspace — ถ้าเนื้อหาที่ไหน drift ไม่ตรงข้อเหล่านี้ ให้ปรับกลับเข้าหา **topic-first / single-source / machine-agnostic** ไม่ใช่สร้างกฏใหม่ที่ขัดกัน

- `ApoRaviz_Workspace_Docs` คือ **ระบบความจำกลางของ ApoRaviz** ไม่ใช่แค่เว็บ docs — คนใช้เรียน, AI ใช้เป็นกติกา, repo ลูกใช้เป็นเข็มทิศ
- **Topic-first**: จัดความรู้ตาม topic ไม่ใช่ตามโปรเจกต์/เวลา — ไม่มี case study แยกตามโปรเจกต์ บทเรียน reusable จากงานจริงให้ย่อยเป็น concept/flow/command แล้วซึมเข้าหน้า topic เป็นตัวอย่าง
- **Single-source**: ข้อมูลแต่ละอย่างมีที่เดียว ไฟล์อื่นชี้มา ไม่ copy — version → `baseline.md`, ลำดับการอ่าน → `PROJECT_START_HERE.md`, routing ความรู้ → `AI_UPDATE_RULE.md`, กติกาเริ่มโปรเจกต์ → `NEW_PROJECT_GUIDE.md`
- **Machine-agnostic**: เลือก Node ผ่าน `.nvmrc` + `nvm use` (ใช้ได้ทั้ง PC/Mac) ห้าม hardcode path เต็มของ Node ที่ไหนเลย
- **โปรเจกต์ลูก**: `README.md` บังคับ ที่เหลือ optional; ทุก `ApoRaviz_*` มี `AGENTS.md` ที่ชี้ `ApoRaviz_Workspace_Docs` (สแตมป์จาก `templates/project-bootstrap/`)
- **Skill sync**: แก้ skill ใน `ApoRaviz_Workspace_Docs/.codex/skills/` ต้อง sync ไป `~/.codex/skills/` และ verify identical เสมอ
- **No floating knowledge**: ความรู้ใหม่ห้ามค้างในแชท ต้องลงที่ถูก topic หรือ README ของ repo นั้น

## Core Direction

`ApoRaviz_Workspace_Docs` คือ **ความรู้กลางตาม topic แบบ W3Schools ของ ApoRaviz** — เว็บอ้างอิงไว้เรียน/เปิดย้อนหลังเรื่อง Angular, Tailwind, Node.js, backend, database, Git และ command ของตัวเอง

repo นี้ต้องเป็น:

- เอกสารกลางจัด**ตาม topic** ไม่ใช่ตามโปรเจกต์หรือตามเวลา
- เว็บ static สำหรับอ่านและเรียนรู้
- source of truth สำหรับ Angular, Tailwind CSS, Node.js, backend, database, command, workflow และ project startup rule

ความรู้ reusable จากโปรเจกต์จริงให้**ซึมเข้าหน้า topic เป็นตัวอย่าง** (เช่น "เจอตอนทำ Portfolio") ไม่เก็บเป็น case study แยกตามโปรเจกต์

## Project Roles

```text
ApoRaviz_Workspace_Docs = ความรู้กลางตาม topic แบบ W3Schools / source of truth / workspace rules
ApoRaviz_DevEng         = โปรเจกต์หลักที่ใช้เรียน/ฝึก dev จริงจัง (hands-on)
ApoRaviz_Portfolio      = profile / showcase / job site / link hub — โชว์ผลงานอย่างเดียว ไม่ใช่ที่เรียน
ApoRaviz_Mooping        = MooPing Reward app (พักไว้)
ApoRaviz_Tools          = tools/CLI/file processing project
ApoRaviz_*              = future project repos that must follow workspace rules
```

## Portfolio Rule

`ApoRaviz_Portfolio` ไม่ใช่ที่เก็บบทเรียนกลาง

Portfolio มีหน้าที่:

- โชว์ตัวตนและประวัติของ ApoRaviz
- โชว์ผลงานและ case study
- link ไป project demo, GitHub repo และ `ApoRaviz_Workspace_Docs`
- ใช้สมัครงานหรือแนะนำตัว

Portfolio ไม่ควร:

- เก็บ Angular/Node/backend concept กลางซ้ำ
- เป็นแหล่งอ้างอิงหลักของบทเรียน
- บังคับให้คนเรียนต้องอ่าน code ใน Portfolio เพื่อเข้าใจ concept กลาง

การเรียน/ฝึก dev จริงจังย้ายไปทำที่ `ApoRaviz_DevEng` แล้ว Portfolio เหลือหน้าที่โชว์ผลงานอย่างเดียว

## Workspace Docs Rule

ทุกความรู้ที่ใช้ซ้ำได้ข้ามโปรเจกต์ต้องกลับมาที่ `ApoRaviz_Workspace_Docs`

ตัวอย่าง:

- Angular file anatomy เช่น `main.ts`, `server.ts`, `app.config.ts`, `angular.json`
- Angular API เช่น `signal`, `computed`, `effect`, `inject`, `input`, `output`, `isPlatformBrowser`
- Tailwind CSS setup, utility class, responsive design, theme token และ style ownership
- forms, routing, SSR, hydration, browser API safety
- Node.js CLI, stream, file system, backup safety และ testing pattern
- NestJS backend architecture, service/controller/module, upload/download flow
- Fastify decision หรือ API/webhook prototype pattern
- PostgreSQL/Supabase schema, relationship, transaction และ migration concept
- Git workflow ที่ใช้ซ้ำได้
- วิธีเริ่มโปรเจกต์ใหม่
- teaching rule และ template

## Project-Specific Rule

โปรเจกต์ย่อยเก็บได้เฉพาะความรู้ที่ผูกกับโปรเจกต์นั้นจริง ๆ

ตัวอย่างสิ่งที่อยู่ในโปรเจกต์ย่อยได้:

- business rule เฉพาะระบบ
- product requirement
- UI decision เฉพาะแบรนด์หรือโปรเจกต์
- bug เฉพาะโปรเจกต์
- deploy URL, port, base href, environment เฉพาะ repo

ถ้าเนื้อหาเริ่มกลายเป็น Angular, Node.js, backend, database, Git หรือ general web concept ให้สรุปกลับมาที่ `ApoRaviz_Workspace_Docs`

## New Project Rule

ทุก repo ใหม่ที่ขึ้นต้นด้วย `ApoRaviz_` ใช้ [Project Start Here](./PROJECT_START_HERE.md) เป็นลำดับอ่านและ checklist กลาง ก่อนลงมือให้ระบุปัญหา ผู้ใช้ และ flow แรกที่ใช้งานได้ แล้วเลือก stack ตาม [New Project Guide](./NEW_PROJECT_GUIDE.md)

## Default Frontend Stack Rule

ค่า default และเงื่อนไขการใช้ Angular / Tailwind / SSR อยู่ที่ [New Project Guide — Default Frontend Stack](./NEW_PROJECT_GUIDE.md#default-frontend-stack) ส่วนเลขเวอร์ชันอ้างอิง [Baseline](./baseline.md)

## Default Full Stack Rule

ค่า default ของ backend/database และเงื่อนไขเลือก NestJS, Fastify, PostgreSQL หรือ Supabase อยู่ที่ [New Project Guide — Default Backend Stack](./NEW_PROJECT_GUIDE.md#default-backend-stack)

งาน CLI หรือ file processing ใช้ [CLI/File Processing Rule](./NEW_PROJECT_GUIDE.md#cli-file-processing-rule) เพื่อแยก core logic ออกจากวิธีเรียกใช้งาน

## Node Rule

ใช้ `.nvmrc` ของ repo คู่กับ [Workspace Baseline](./baseline.md) เป็นแหล่งอ้างอิงเวอร์ชันและวิธีเลือก Node บน PC/Mac ห้าม hardcode path เต็มของ Node ลงในกฎ บทเรียน หรือสคริปต์

## Learning Capture Rule

เมื่อพบคำศัพท์ flow หรือคำสั่งใหม่ ให้จัดเก็บตาม [AI Update Rule — Decision Table](./AI_UPDATE_RULE.md#decision-table) และใช้รูปแบบบทเรียนตาม [Teaching Rules](./TEACHING_RULES.md)

## No Floating Knowledge

ห้ามปล่อยความรู้ไว้แค่ในแชทกับ AI

```text
คุยแล้วหาย = ความรู้หาย
คุยแล้วจดเป็นระบบ = ความรู้กลายเป็น asset
```

