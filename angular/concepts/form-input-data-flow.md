# Form Input Data Flow

หน้านี้อธิบาย flow การรับข้อความจาก `<input>` เข้า Angular component ด้วยตัวอย่างอ่านประกอบขนาดเล็ก

## ภาพจำง่าย ๆ

นึกถึงป้ายชื่อลูกค้าในร้าน:

```text
ช่องกรอกชื่อ = input
ชื่อที่จำไว้  = signal
ป้ายแสดงผล   = template
```

เมื่อ user พิมพ์ชื่อใหม่ ค่าใน signal และป้ายบนหน้าจอจะเปลี่ยนตาม

## แปลเป็น Angular

```text
[value] = ส่งค่าจาก component ลงไปแสดงใน input
(input) = รับ event จาก input กลับเข้า component
$event  = เหตุการณ์ที่พาข้อมูลจาก browser เข้ามา
set()   = แทนค่าเดิมด้วยค่าใหม่ที่อ่านได้จาก input
```

## ตัวอย่างอ่านประกอบ

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
  readonly customerName = signal('ลูกค้าใหม่');

  updateCustomerName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerName.set(input.value);
  }
}
```

## Flow ตอน Render ครั้งแรก

```text
1. Angular สร้าง component
2. customerName เริ่มด้วยค่า "ลูกค้าใหม่"
3. [value] นำค่านั้นไปแสดงใน input
4. interpolation นำค่าเดียวกันไปแสดงใน paragraph
5. browser แสดง "สวัสดี ลูกค้าใหม่"
```

## Flow ตอน User พิมพ์

```text
1. user พิมพ์ "คุณเอ"
2. browser ส่ง input event
3. Angular เรียก updateCustomerName($event)
4. method อ่าน event.target.value
5. customerName.set('คุณเอ')
6. template ที่อ่าน customerName() วาดใหม่
7. browser แสดง "สวัสดี คุณเอ"
```

## ทำไมใช้ `set()` แทน `update()`

ตัวอย่างนี้รู้ค่าใหม่ทั้งก้อนจาก `input.value` จึงใช้ `set()`

```text
set()    = รู้ค่าใหม่และนำมาแทนค่าเดิม
update() = คำนวณค่าใหม่จากค่าเดิม
```

## จุดที่มักงง

- `[value]` อย่างเดียวแสดงค่าเริ่มต้นได้ แต่ไม่เก็บสิ่งที่ user พิมพ์กลับเข้า signal
- `(input)` อย่างเดียวรับ event ได้ แต่ input จะไม่ได้ค่าเริ่มต้นจาก component
- ต้องอ่าน signal ด้วย `customerName()`
- ต้องตรวจหรือ cast `event.target` ก่อนอ่าน `.value`

## จำสั้น ๆ

```text
[value] ส่ง state ลง input
(input) ส่ง event กลับเข้า component
set() ใช้เมื่อรู้ค่าใหม่ชัดเจน
```
