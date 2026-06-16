# ViewEncapsulation

`ViewEncapsulation` คือวิธีที่ Angular คุมขอบเขต CSS ของ component

## ภาพจำง่าย ๆ

```text
Emulated = CSS อยู่ในรั้ว component เป็นหลัก
None     = CSS ไม่มีรั้ว กระทบทั้งหน้าได้
```

ค่า default ของ Angular คือ `Emulated` ซึ่งช่วยลดโอกาส style ชนกัน

## Technical Term

```text
encapsulation = การครอบขอบเขต style
Emulated = Angular ทำให้ style ของ component apply เฉพาะ component นั้นเป็นหลัก
None = ไม่ครอบ style ปล่อยให้เป็น global
ShadowDom = ใช้ native Shadow DOM ของ browser
```

## ตัวอย่าง

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

## ใช้ None เมื่อไหร่

ใช้ได้เมื่อมีเหตุผลชัด เช่น:

- root component ต้องคุม layout ทั้งหน้า
- มี CSS global theme ที่ component ย่อยต้องใช้ร่วมกัน
- กำลังย้าย style ไป Tailwind/global แล้วต้องควบคุมเป็นภาพรวม

แต่ต้องระวัง เพราะ style อาจกระทบ component อื่นโดยไม่ตั้งใจ

## กติกาใน workspace

- ใช้ Tailwind utility ใน template เป็นหลัก
- ใช้ global `src/styles.css` สำหรับ theme token, base style, animation กลาง
- ใช้ component CSS เฉพาะ animation หรือ style ที่ Tailwind อ่านยากจริง
- ถ้าใช้ `ViewEncapsulation.None` ให้มีเหตุผลใน code/docs

## จุดที่มักงง

- `ViewEncapsulation.None` ไม่ได้แปลว่าดีกว่า แค่เปิดขอบเขต style
- ถ้า style หลุดกระทบทั้งหน้า ให้ตรวจ encapsulation ก่อน
- Tailwind utility ช่วยลดความจำเป็นในการเขียน CSS global เยอะ ๆ

## สรุปจำสั้น ๆ

```text
ViewEncapsulation = รั้วของ CSS ใน Angular component
```

