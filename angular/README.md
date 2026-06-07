# Angular Learning Hub

## Current Learning Structure

ตั้งแต่วันที่ 2026-06-07 Angular learning ใน repo นี้จะแยกเป็น:

```text
concepts/ = ศัพท์และแนวคิดทีละเรื่อง
lessons/  = บทเรียนแบบ flow ทีละขั้น
labs/     = แบบฝึกหัดเล็ก ๆ ที่ลองทำตามได้
tailwind/ = Tailwind CSS ที่ใช้คู่กับ Angular เสมอ
teach/    = บทเรียนเดิมที่รอค่อย ๆ migrate ให้เข้าระบบใหม่
commands.md = command กลางของ Angular
```

บทเรียนใหม่ต้องทำตาม `../TEACHING_RULES.md` และใช้ template ใน `../templates/`

Angular project ใน ecosystem นี้ใช้ Tailwind CSS เป็น styling system หลักเสมอ ดังนั้นบทเรียน Angular ต้องสอนเรื่อง template + Tailwind utility class + style ownership คู่กัน

โฟลเดอร์นี้คือบทเรียน Angular กลางของ workspace `ApoRaviz` ใช้กับทุกโปรเจกต์ Angular ในอนาคต

## Purpose

```text
_docs/angular/           = concept และ command ที่ใช้ซ้ำได้ทุก Angular project
_docs/projects/<name>/   = ตัวอย่างจริงและ case study จากโปรเจกต์นั้น
Project/docs/commands.md = command ที่มี path, repo, port, base-href หรือ workflow เฉพาะโปรเจกต์
```

หลักคิดคือไม่ย้ายทุกอย่างออกจากโปรเจกต์ เพราะตัวอย่างจริงยังสำคัญต่อการเรียน แต่ concept ที่ใช้ซ้ำต้องมีบ้านกลางเพื่อไม่ต้องอ่านซ้ำหลาย repo

## Recommended Order

1. [Angular Commands](commands.md)
2. [Angular Teach Index](teach/README.md)
3. [Reactive State และ Signals](teach/01-reactive-signals.md)
4. [Services และ Dependency Injection](teach/02-services-dependency-injection.md)
5. [App Config, SSR และ Hydration](teach/03-app-config-ssr-hydration.md)
6. [Browser APIs และ SSR Safety](teach/04-browser-apis-ssr-safety.md)
7. [Component Structure และ Data Flow](teach/05-component-structure-data-flow.md)
8. [Unit Test และ Regression Safety](teach/06-unit-test-regression.md)
9. [CI/CD และ GitHub Pages](teach/07-cicd-github-pages.md)
10. [Tailwind CSS v4 ใน Angular](teach/08-tailwind-css-v4.md)
11. [Angular 22 จาก Angular 21](teach/09-angular-22-from-21.md)

## What Belongs Here

- Angular modern concept ที่ใช้ซ้ำ เช่น `signal`, `computed`, `inject`, `input`, `output`
- Angular latest stable + Node LTS + TypeScript compatibility rules
- Tailwind CSS v4 setup และ style ownership
- Tailwind utility class, responsive layout, grid/flex, spacing, typography, color token, dark mode, animation, และ component styling pattern
- SSR/prerender/hydration rule
- Browser API safety เช่น `window`, `document`, `IntersectionObserver`, `localStorage`
- Component ownership และ one-way data flow
- Unit test concept เช่น `.spec.ts`, `TestBed`, fake timers, mock browser APIs
- CI/CD concept เช่น `npm ci`, GitHub Actions, artifact, GitHub Pages `base-href`
- Command pattern ที่ใช้ได้หลายโปรเจกต์

## What Stays In Project Docs

- Business rule เฉพาะโปรเจกต์ เช่น loyalty reward, POS, saved rewards
- Design direction เฉพาะเว็บ เช่น RPG profile, resume hero, project card copy
- URL เฉพาะโปรเจกต์ เช่น `https://aporaviz.github.io/ApoRaviz_Mooping/`
- Workflow path เฉพาะโปรเจกต์ เช่น `dist/ApoRaviz_Mooping/browser`
- สรุป bug/decision ที่เกิดจากโปรเจกต์นั้นโดยตรง

## Update Rule

ถ้าเรียนเรื่องใหม่จากโปรเจกต์หนึ่ง ให้ตัดสินใจตามนี้:

```text
ใช้ได้โปรเจกต์เดียวและใช้สอนได้ -> เพิ่มใน _docs/projects/<name>/
ใช้ได้ทุก Angular app -> เพิ่ม/ปรับใน _docs/angular/teach/
เป็นคำสั่งเฉพาะ repo -> เพิ่มใน Project/docs/commands.md
เป็น command pattern กลาง -> เพิ่มใน _docs/angular/commands.md
```
