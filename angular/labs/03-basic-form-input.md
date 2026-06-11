# Lab 03: Basic Form Input

## เป้าหมาย

ต่อจาก `signal` และ `computed` โดยให้ user พิมพ์ข้อความในช่อง input แล้วเก็บค่านั้นไว้ใน signal

flow ที่ต้องเห็น:

```text
1. user พิมพ์ใน input
2. input event ทำงาน
3. method อ่านค่าจาก event
4. signal ถูก set เป็นค่าใหม่
5. template แสดงข้อความใหม่
```

## ก่อนเริ่มต้องรู้

- [`signal`](../concepts/signal.md)
- [`computed`](../concepts/computed.md)
- [`Reactive State และ Signals`](../teach/01-reactive-signals.md)

## ภาพจำง่าย ๆ

นึกถึงป้ายชื่อลูกค้าในร้าน

```text
ช่องกรอกชื่อ    = input
ชื่อที่จำไว้     = signal
ป้ายแสดงผล      = template
```

เมื่อพิมพ์ชื่อใหม่ ป้ายบนหน้าจอต้องเปลี่ยนตามทันที

## ไฟล์ตัวอย่าง

หมายเหตุ: หน้านี้เป็นบทเรียนแบบอ่าน flow และอ่าน code ใน VitePress ยังไม่ใช่ Angular live demo ที่มีช่องให้พิมพ์จริง

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-basic-form-input',
  template: `
    <section>
      <h1>Basic Form Input</h1>

      <label for="customerName">ชื่อลูกค้า</label>
      <input
        id="customerName"
        type="text"
        [value]="customerName()"
        (input)="updateCustomerName($event)"
      />

      <p>สวัสดี {{ customerName() }}</p>
    </section>
  `
})
export class BasicFormInputComponent {
  customerName = signal('ลูกค้าใหม่');

  updateCustomerName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerName.set(input.value);
  }
}
```

## Flow ตอน render ครั้งแรก

```text
1. Angular สร้าง component
2. customerName = signal('ลูกค้าใหม่')
3. input อ่านค่า customerName()
4. paragraph อ่านค่า customerName()
5. browser เห็น "สวัสดี ลูกค้าใหม่"
```

## Flow ตอน user พิมพ์

```text
1. user พิมพ์ "คุณเอ"
2. browser ส่ง input event
3. Angular เรียก updateCustomerName($event)
4. method อ่าน event.target.value
5. customerName.set('คุณเอ')
6. template ที่อ่าน customerName() วาดใหม่
7. browser เห็น "สวัสดี คุณเอ"
```

## `[value]` กับ `(input)` ต่างกันยังไง

`[value]` ส่งค่าจาก component ลงไปที่ input

```html
[value]="customerName()"
```

`(input)` รับ event จาก input กลับขึ้นมาที่ component

```html
(input)="updateCustomerName($event)"
```

จำเป็นต้องมีทั้งสองทิศทาง:

```text
component -> input  = แสดงค่าเริ่มต้น
input -> component  = เก็บค่าที่ user พิมพ์
```

## ทำไมใช้ set() ไม่ใช้ update()

ใน lab นี้ user พิมพ์ค่าใหม่ทั้งก้อน เรารู้ค่าใหม่แน่นอนจาก `input.value`

จึงใช้:

```ts
this.customerName.set(input.value);
```

ถ้าต้องคำนวณจากค่าเดิม เช่น เพิ่มเลขทีละ 1 ค่อยใช้ `update()`

## Expected Result

เมื่อพิมพ์:

```text
ช่อง input: คุณเอ
ข้อความ: สวัสดี คุณเอ
```

ถ้าลบข้อความจนว่าง:

```text
ข้อความ: สวัสดี
```

## ถ้าพังให้เช็ก

- อ่าน signal ใน template ด้วย `customerName()`
- ส่ง `$event` เข้า method แล้วหรือยัง
- cast `event.target` เป็น `HTMLInputElement` ก่อนอ่าน `.value`
- ใช้ `set()` เมื่อมีค่าใหม่จาก input แล้ว

## คำถามหลังทำ

- ถ้าเปลี่ยนค่าเริ่มต้นเป็น `signal('Apo')` หน้าแรกควรแสดงอะไร
- ถ้าเอา `[value]="customerName()"` ออก input ยังมีค่าเริ่มต้นไหม
- ถ้าเอา `(input)="updateCustomerName($event)"` ออก ข้อความด้านล่างจะเปลี่ยนตามไหม

## จำสั้น ๆ

```text
[value] ส่ง state ลง input
(input) ส่ง event กลับขึ้น component
set() ใช้เมื่อรู้ค่าใหม่ชัดเจน
```
