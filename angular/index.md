# Angular Learning Hub

โฟลเดอร์นี้คือบทเรียน Angular กลางของ workspace `ApoRaviz`

ใช้กับทุกโปรเจกต์ Angular เช่น `ApoRaviz_Portfolio`, `ApoRaviz_Mooping` และโปรเจกต์ใหม่ในอนาคต

## Current Learning Structure

```text
concepts/   = ศัพท์และแนวคิดทีละเรื่อง
teach/      = บทเรียนแบบ flow ทีละขั้น
labs/       = แบบฝึกหัดเล็ก ๆ ที่ลองทำตามได้
tailwind/   = Tailwind CSS ที่ใช้คู่กับ Angular
commands.md = command กลางของ Angular
```

## Recommended Order

1. [Angular Commands](commands.md)
2. [Angular Teach Index](teach/)
3. [Angular Concepts](concepts/)
4. [Reactive State และ Signals](teach/01-reactive-signals.md)
5. [Services และ Dependency Injection](teach/02-services-dependency-injection.md)
6. [App Config, SSR และ Hydration](teach/03-app-config-ssr-hydration.md)
7. [Browser APIs และ SSR Safety](teach/04-browser-apis-ssr-safety.md)
8. [Component Structure และ Data Flow](teach/05-component-structure-data-flow.md)
9. [Unit Test และ Regression Safety](teach/06-unit-test-regression.md)
10. [CI/CD และ GitHub Pages](teach/07-cicd-github-pages.md)
11. [Tailwind CSS v4 ใน Angular](teach/08-tailwind-css-v4.md)
12. [Angular 22 Baseline](teach/09-angular-22-baseline.md)
13. [Angular Run Flow And angular.json](teach/10-angular-run-flow-and-angular-json.md)
14. [Angular Config Files](teach/11-angular-config-files.md)

## What Belongs Here

- Angular modern concept เช่น `signal`, `computed`, `inject`, `input`, `output`
- Angular run/build flow เช่น `package.json`, `angular.json`, `main.ts`, `app.config.ts`
- Angular project config เช่น `tsconfig.app.json`, `tsconfig.spec.json`, `.prettierrc`, `.postcssrc.json`, `.vscode/settings.json`
- Angular latest stable + Node LTS + TypeScript compatibility rules
- Tailwind CSS v4 setup และ style ownership
- SSR/prerender/hydration rule
- Browser API safety เช่น `window`, `document`, `IntersectionObserver`, `localStorage`
- Component ownership และ one-way data flow
- Unit test concept เช่น `.spec.ts`, `TestBed`, fake timers, mock browser APIs
- CI/CD concept เช่น `npm ci`, GitHub Actions, artifact, GitHub Pages `base-href`
- Command pattern ที่ใช้ได้หลายโปรเจกต์

## What Stays In Project Docs

- business rule เฉพาะโปรเจกต์ เช่น loyalty reward, POS, saved rewards
- design direction เฉพาะเว็บ
- URL, port, base href, output path เฉพาะ repo
- product spec และ implementation plan ของ app นั้น
- bug/decision ที่เกิดจากโปรเจกต์นั้นโดยตรง

## Update Rule

```text
ใช้ได้โปรเจกต์เดียวและเป็น case study -> projects/<name>/
ใช้ได้ทุก Angular app -> angular/
เป็น command เฉพาะ repo -> Project/docs/commands.md
เป็น command pattern กลาง -> angular/commands.md
```
