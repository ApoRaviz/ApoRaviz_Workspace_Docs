# SSR Browser Guard

SSR browser guard คือการกันไม่ให้ code ที่ต้องใช้ browser ไปรันตอน server render

## ภาพจำง่าย ๆ

```text
browser = มี window, document, localStorage, IntersectionObserver
server  = ไม่มีของพวกนี้
```

ถ้า code server ไปแตะ `window` ตรง ๆ อาจพังตอน build/prerender

## Technical Term

```text
SSR = server-side rendering
browser API = API ที่มีเฉพาะใน browser
isPlatformBrowser = function เช็กว่าตอนนี้รันใน browser ไหม
PLATFORM_ID = token ที่บอก platform ปัจจุบัน
DOCUMENT = token สำหรับเข้าถึง document แบบ DI-friendly
```

## ตัวอย่าง

```ts
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-theme',
  template: `...`,
})
export class ThemeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  updateTheme() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.documentElement.classList.toggle('dark');
  }
}
```

## Browser APIs ที่ต้องระวัง

- `window`
- `document`
- `localStorage`
- `sessionStorage`
- `IntersectionObserver`
- `ResizeObserver`
- `requestAnimationFrame`
- scroll APIs

## จุดที่มักงง

- SSR ไม่ได้แปลว่าห้ามใช้ browser API แต่ต้องใช้หลังเช็ก platform
- `DOCUMENT` ช่วยให้ test/SSR-friendly กว่าเรียก global `document` ตรง ๆ
- guard ควรอยู่ใกล้จุดที่แตะ browser API
- ถ้าใช้ observer หรือ timer ต้อง cleanup เมื่อ component ถูก destroy

## อ่านต่อ

- [Browser APIs และ SSR Safety](../teach/browser-apis-ssr-safety.md)

## สรุปจำสั้น ๆ

```text
ก่อนแตะ browser API ใน app ที่มี SSR ให้เช็ก isPlatformBrowser ก่อน
```

