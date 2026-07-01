# Hydration

Hydration คือขั้นตอนที่ browser รับ HTML ที่ server render มาแล้วทำให้หน้านั้น interactive ต่อ

## ภาพจำง่าย ๆ

```text
SSR = server จัดจานอาหารไว้ให้ก่อน
hydration = browser เข้ามาทำให้จานนั้นกด ใช้ และโต้ตอบได้
```

ผู้ใช้เห็นหน้าเร็วขึ้น เพราะ HTML มาเร็ว แต่ Angular ยังต้องผูก event/state ให้พร้อมใช้งาน

## Technical Term

```text
SSR = server-side rendering
hydration = browser เชื่อม Angular เข้ากับ HTML ที่ server ส่งมา
event replay = เก็บ event ที่ user กดเร็วมากไว้เล่นซ้ำหลัง hydration พร้อม
provideClientHydration = provider สำหรับเปิด hydration ใน Angular
withEventReplay = option ช่วย replay event
```

## ตัวอย่าง

```ts
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
  ],
};
```

## Flow

```text
server render HTML
-> browser โหลด HTML
-> Angular โหลด JavaScript
-> hydration ผูก component/state/event กับ HTML เดิม
-> หน้า interactive
```

## จุดที่มักงง

- hydration ไม่ใช่ routing
- hydration ไม่ใช่การ fetch data อย่างเดียว
- ถ้า code แตะ browser API โดยไม่ guard อาจพังตอน SSR ก่อนถึง hydration
- event replay ช่วย user ที่กดเร็วมากระหว่าง JS ยังโหลดไม่เสร็จ

## อ่านต่อ

- [App Config, SSR และ Hydration](../teach/app-config-ssr-hydration.md)

## สรุปจำสั้น ๆ

```text
SSR ทำให้เห็นหน้าเร็ว
hydration ทำให้หน้านั้นใช้งานได้จริงใน browser
```

