# ApoRaviz Workspace Rules

ไฟล์นี้คือกติกากลางของ workspace `ApoRaviz` ตั้งแต่วันที่ 2026-06-07 เป็นต้นไป

ถ้าไฟล์เก่าใน repo นี้ยังพูดไม่ตรงกับไฟล์นี้ ให้ยึดไฟล์นี้ก่อน แล้วค่อยอัปเดตไฟล์เก่าให้ตรงกันภายหลัง

## Core Direction

`ApoRaviz_Workspace_Docs` คือศูนย์กลางความรู้ การเรียน การสอน และกติกาการเริ่มโปรเจ็คของ `ApoRaviz_*` ทั้งหมด

repo นี้ต้องเป็นได้ทั้ง:

- เอกสารกลางสำหรับตัวเอง
- เว็บ static สำหรับอ่านและเรียนรู้
- ผลงานที่แสดงวิธีคิดและระบบการเรียนรู้ของ ApoRaviz
- source of truth สำหรับ Angular concept, Tailwind CSS, command, workflow, และ project startup rule

## Project Roles

```text
ApoRaviz_Workspace_Docs = learning hub, teaching site, workspace rules, shared knowledge
ApoRaviz_Portfolio      = profile, resume, showcase, job application site, link hub
ApoRaviz_Mooping        = app project for MooPing sales/reward/Line notification, paused for now
ApoRaviz_*              = future project repos that must follow workspace rules
```

## Portfolio Rule

`ApoRaviz_Portfolio` ไม่ใช่ที่เก็บบทเรียนกลางอีกต่อไป

Portfolio มีหน้าที่:

- โชว์ตัวตนและประวัติของ ApoRaviz
- โชว์ผลงานและ case study
- link ไป project demo, GitHub repo, และ `ApoRaviz_Workspace_Docs`
- ใช้สมัครงานหรือแนะนำตัว

Portfolio ไม่ควร:

- เก็บ Angular concept กลางซ้ำ
- เป็นแหล่งอ้างอิงหลักของบทเรียน
- บังคับให้คนเรียนต้องไปดู code ใน Portfolio เพื่อเข้าใจ concept

## Workspace Docs Rule

ทุกความรู้ที่ใช้ซ้ำได้ข้ามโปรเจ็คต้องกลับมาที่ `ApoRaviz_Workspace_Docs`

ตัวอย่าง:

- Angular file anatomy เช่น `main.ts`, `server.ts`, `app.config.ts`, `angular.json`
- Angular API เช่น `signal`, `computed`, `effect`, `inject`, `isPlatformBrowser`
- Tailwind CSS setup, utility class, responsive design, theme token, และ style ownership
- forms, routing, SSR, hydration, browser API safety
- command pattern ที่ใช้ซ้ำได้
- Node.js CLI, stream, file system, และ testing pattern
- NestJS backend architecture, service/controller/module, upload/download flow
- Git workflow ที่ใช้ซ้ำได้
- วิธีเริ่มโปรเจ็คใหม่
- teaching rule และ template

## Project-Specific Rule

โปรเจ็คย่อยเก็บได้เฉพาะความรู้ที่ผูกกับโปรเจ็คนั้นจริง ๆ

ตัวอย่างสิ่งที่อยู่ในโปรเจ็คย่อยได้:

- business rule เฉพาะระบบ
- product requirement
- UI decision เฉพาะแบรนด์หรือโปรเจ็ค
- bug เฉพาะโปรเจ็ค
- deploy URL, port, base href, environment เฉพาะ repo

ถ้าเนื้อหาเริ่มกลายเป็น Angular/Git/general web concept ให้ย้ายหรือสรุปกลับมาที่ `ApoRaviz_Workspace_Docs`

## New Project Rule

ทุก repo ใหม่ที่ขึ้นต้นด้วย `ApoRaviz_` ต้องเริ่มจากเอกสารกลางนี้ก่อน:

```text
README.md
PROJECT_START_HERE.md
NEW_PROJECT_GUIDE.md
WORKSPACE_PLAN.md
WORKSPACE_RULES.md
TEACHING_RULES.md
AI_UPDATE_RULE.md
```

ก่อนเริ่ม code หนัก ต้องตอบให้ได้:

- โปรเจ็คนี้ทำอะไร
- ใช้ stack อะไร
- ถ้าเป็น Angular app ต้องใช้ Tailwind CSS เป็น styling system หลัก
- มีความรู้ใหม่อะไรที่ต้องเพิ่มกลับมาที่ docs กลาง
- อะไรเป็น project-specific และอะไรเป็น shared knowledge

## Default Frontend Stack Rule

สำหรับ frontend project ใน ecosystem นี้ ค่า default คือ:

```text
Angular latest stable
Tailwind CSS latest stable
Standalone components
Angular Router
Angular signals
SSR/prerender เมื่อเหมาะกับงาน
```

Angular กับ Tailwind ต้องเรียนคู่กัน เพราะโปรเจ็คจริงของ ApoRaviz จะใช้ Tailwind CSS เป็น styling system หลักเสมอ

ถ้าเจอความรู้ใหม่เกี่ยวกับ Tailwind เช่น responsive class, layout utility, theme color, CSS variable, animation, container, grid, flex, dark mode หรือ style ownership ให้เพิ่มกลับมาที่ docs กลาง

## Default Full Stack Rule

ถ้าโปรเจ็ค `ApoRaviz_*` ต้องมี backend หรือ database ให้ใช้ stack นี้เป็นค่า default ระยะยาว:

```text
Frontend = Angular + Tailwind CSS
Backend  = NestJS
Database = PostgreSQL หรือ Supabase
Runtime  = Node.js 24+
```

เหตุผล:

- Angular เป็น frontend หลักของ workspace
- NestJS ใช้ TypeScript และโครงสร้างคล้าย Angular เช่น module, service, dependency injection
- PostgreSQL เป็น relational database ที่ใช้ได้จริงในโปรดักชัน
- Supabase เป็นทางเลือกที่ได้ PostgreSQL พร้อม auth/storage/API ที่เริ่มงานเร็ว

ถ้างานเป็น CLI หรือ file processing เช่น `ApoRaviz_Tools/split-order-txt` ให้เริ่มจาก Node.js ก่อน แล้วค่อยแยก core logic ให้ NestJS เรียกใช้ในอนาคต

## Node Rule

ทุก Angular/VitePress command ใน workspace นี้ต้องใช้ Node 24+ เป็นค่า default

สำหรับเครื่อง Windows นี้ ถ้า shell ยังชี้ไป Node เก่า ให้ prepend path ของ Node 24 ก่อนรันคำสั่ง:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
```

เหตุผลคือ Angular 22 ต้องการ Node `22.22.3+` หรือ `24.15+` และ workspace นี้ล็อกแนวทางไว้ที่ Node 24 LTS

## Learning Capture Rule

ถ้าระหว่างทำโปรเจ็คเจอคำใหม่ flow ใหม่ หรือ command ใหม่ ให้ตัดสินใจทันทีว่าจะเก็บไว้ที่ไหน

```text
ศัพท์/แนวคิดที่ใช้ซ้ำได้      -> ApoRaviz_Workspace_Docs
flow การทำงานที่ใช้สอนได้      -> ApoRaviz_Workspace_Docs
lab หรือตัวอย่างทดลองกลาง     -> ApoRaviz_Workspace_Docs
command pattern กลาง            -> ApoRaviz_Workspace_Docs
Tailwind pattern กลาง            -> ApoRaviz_Workspace_Docs
business rule เฉพาะโปรเจ็คที่ใช้สอนได้ -> ApoRaviz_Workspace_Docs/projects/
bug/decision เฉพาะโปรเจ็คที่ใช้สอนได้  -> ApoRaviz_Workspace_Docs/projects/
product spec/plan/command เฉพาะ app     -> repo ของโปรเจ็คนั้น
portfolio showcase              -> ApoRaviz_Portfolio
```

## No Floating Knowledge

ห้ามปล่อยความรู้ไว้แค่ในแชทกับ AI

ถ้าเรียนอะไรใหม่จากการแก้ code หรือจากการคุยกับ AI แล้วเป็นเรื่องที่ควรจำ ต้องมีไฟล์รองรับใน docs กลางหรือ docs ของโปรเจ็คย่อย

จำสั้น ๆ:

```text
คุยแล้วหาย = ความรู้หาย
คุยแล้วจดเป็นระบบ = ความรู้กลายเป็น asset
```
