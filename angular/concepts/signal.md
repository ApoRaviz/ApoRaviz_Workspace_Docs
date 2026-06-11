# Signal

## ภาพจำง่าย ๆ

`signal` เหมือนป้ายตัวเลขหน้าร้าน

ถ้าพนักงานเปลี่ยนเลขบนป้าย คนที่มองป้ายนั้นจะเห็นเลขใหม่ทันที โดยเราไม่ต้องเดินไปบอกทุกคนทีละคน

ใน Angular:

```text
signal = กล่องเก็บค่า
template = คนที่มองกล่องนั้นอยู่
set/update = เปลี่ยนค่าในกล่อง
Angular = คนที่ช่วยประกาศให้หน้าจอวาดใหม่
```

## Technical Term

`signal()` คือ reactive state ของ Angular

คำว่า reactive แปลแบบง่ายคือ "ค่าขยับแล้วส่วนที่ใช้ค่านั้นขยับตาม"

## Code สั้นที่สุด

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <button type="button" (click)="increase()">+1</button>
  `
})
export class CounterComponent {
  count = signal(0);

  increase(): void {
    this.count.update((current) => current + 1);
  }
}
```

## อ่านโค้ดทีละส่วน

```ts
count = signal(0);
```

สร้างกล่องชื่อ `count` และใส่ค่าเริ่มต้นเป็น `0`

```html
{{ count() }}
```

อ่านค่าจาก signal ต้องเรียกเหมือน function เพราะ Angular ต้องรู้ว่า template นี้กำลังติดตามค่าไหนอยู่

```ts
this.count.update((current) => current + 1);
```

ขอค่าเดิมจากกล่อง แล้วคืนค่าใหม่กลับเข้าไป

## จุดที่มักงง

- `signal(0)` ยังไม่ได้แปลว่า UI จะเพิ่มเลขเอง
- `count()` คือการอ่านค่า ไม่ใช่การเพิ่มค่า
- `update()` คือจุดที่เปลี่ยนค่า
- เมื่อ signal เปลี่ยน Angular จะรู้ว่าตรงไหนใน template ต้องวาดใหม่

## ไปต่อ

- [Computed Concept](computed.md)
- [Signal Counter Lab](../labs/01-signal-counter.md)
- [Reactive State และ Signals](../teach/01-reactive-signals.md)
