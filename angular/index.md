# Angular Learning Hub

โฟลเดอร์นี้คือบทเรียน Angular กลางของ workspace `ApoRaviz`

ใช้กับทุกโปรเจกต์ Angular เช่น `ApoRaviz_Portfolio`, `ApoRaviz_Mooping` และโปรเจกต์ใหม่ในอนาคต

## Current Learning Structure

```text
concepts/   = ศัพท์และแนวคิดทีละเรื่อง
teach/      = บทเรียนแบบ flow ทีละขั้น
tailwind/   = Tailwind CSS ที่ใช้คู่กับ Angular
commands.md = command กลางของ Angular
```

## Recommended Order

1. [ภาพจำง่าย ๆ](memory-aids.md) — เปิดทบทวนเร็วเมื่อจำศัพท์หรือ flow ไม่ได้
2. [Angular Concepts](concepts/) — อ่านศัพท์และตัวอย่างขนาดเล็กเป็นเรื่อง ๆ
3. [Angular Teach Index](teach/) — อ่านบทเรียนแบบ flow ทีละขั้น (ลำดับเต็ม 01–12 อยู่ที่นี่ที่เดียว)
4. [Angular Commands](commands.md) — เปิดใช้ตอนตั้งต้นหรือดูแลโปรเจกต์

> ลำดับบทเรียนเต็มเก็บไว้ที่ [Angular Teach Index](teach/) ที่เดียว เพื่อไม่ให้เลขบทเรียนซ้ำซ้อนและ drift กันหลายหน้า

เอกสารชุดนี้เน้นการอ่านและใช้อ้างอิงตอนเริ่มหรือดูแลโปรเจกต์ `ApoRaviz_*` ตัวอย่าง code จึงอยู่ใน Concept/Lesson ที่เกี่ยวข้องโดยตรง ไม่แยกเป็นแบบฝึกหัดอีกต่อไป

## What Belongs Here

- Angular modern concept เช่น `signal`, `computed`, `inject`, `input`, `output`
- Angular run/build flow เช่น `package.json`, `angular.json`, `main.ts`, `app.config.ts`
- Angular project config เช่น `tsconfig.app.json`, `tsconfig.spec.json`, `.prettierrc`, `.postcssrc.json`, `.vscode/settings.json`
- Angular latest stable + Node LTS + TypeScript compatibility rules (เลข version ดู `baseline.md`)
- Tailwind CSS setup และ style ownership
- SSR/prerender/hydration rule
- Browser API safety เช่น `window`, `document`, `IntersectionObserver`, `localStorage`
- Component ownership และ one-way data flow
- Unit test concept เช่น `.spec.ts`, `TestBed`, fake timers, mock browser APIs
- CI/CD concept เช่น `npm ci`, GitHub Actions, artifact, GitHub Pages `base-href`
- Command pattern ที่ใช้ได้หลายโปรเจกต์

## What Stays in Project Docs

- business rule เฉพาะโปรเจกต์ เช่น loyalty reward, POS, saved rewards
- design direction เฉพาะเว็บ
- URL, port, base href, output path เฉพาะ repo
- product spec และ implementation plan ของ app นั้น
- bug/decision ที่เกิดจากโปรเจกต์นั้นโดยตรง

## Update Rule

```text
เฉพาะโปรเจกต์เดียว -> README/docs ของ repo นั้น
ใช้ได้ทุก Angular app -> angular/ (ซึมบทเรียนจากงานจริงเป็นตัวอย่างในหน้า topic)
เป็น command เฉพาะ repo -> Project/docs/commands.md
เป็น command pattern กลาง -> angular/commands.md
```
