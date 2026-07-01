# Lab 02: Computed Total Price

## เป้าหมาย

ต่อจาก signal counter โดยเพิ่ม `computed()` เพื่อคำนวณยอดรวมจากจำนวนสินค้าและราคาต่อชิ้น

flow ที่ต้องเห็น:

```text
1. user กดเพิ่มจำนวน
2. quantity signal เปลี่ยน
3. computed total คำนวณใหม่
4. template แสดงยอดรวมใหม่
```

## ก่อนเริ่มต้องรู้

- [`signal`](../concepts/signal.md)
- [`computed`](../concepts/computed.md)
- [`Reactive State และ Signals`](../teach/reactive-signals.md)

## ภาพจำง่าย ๆ

นึกถึงร้านขายหมูปิ้ง:

```text
จำนวนไม้       = quantity
ราคาไม้ละ      = pricePerStick
ยอดรวม         = totalPrice
```

ถ้าลูกค้าเพิ่มจาก 1 ไม้เป็น 2 ไม้ ยอดรวมควรเปลี่ยนเองจาก `15` เป็น `30`

## ไฟล์ตัวอย่าง

หมายเหตุ: หน้านี้เป็นบทเรียนแบบอ่าน flow และอ่าน code ใน VitePress ยังไม่ใช่ Angular live demo ที่มีปุ่มให้กดจริง

```ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-total-price',
  template: `
    <section>
      <h1>Total Price</h1>

      <p>จำนวน: {{ quantity() }} ไม้</p>
      <p>ราคาไม้ละ: {{ pricePerStick() }} บาท</p>
      <p>ยอดรวม: {{ totalPrice() }} บาท</p>

      <button type="button" (click)="addOne()">
        เพิ่ม 1 ไม้
      </button>
    </section>
  `
})
export class TotalPriceComponent {
  quantity = signal(1);
  pricePerStick = signal(15);

  totalPrice = computed(() => {
    return this.quantity() * this.pricePerStick();
  });

  addOne(): void {
    this.quantity.update((current) => current + 1);
  }
}
```

## Flow ตอน render ครั้งแรก

```text
1. Angular สร้าง component
2. quantity = signal(1)
3. pricePerStick = signal(15)
4. totalPrice อ่าน quantity() และ pricePerStick()
5. browser เห็นยอดรวม 15 บาท
```

## Flow ตอน user click

```text
1. user กดปุ่ม "เพิ่ม 1 ไม้"
2. Angular เรียก addOne()
3. quantity.update() เปลี่ยน 1 เป็น 2
4. totalPrice รู้ว่า dependency เปลี่ยน
5. totalPrice คำนวณ 2 x 15
6. browser เห็นยอดรวม 30 บาท
```

## ทำไมไม่ใช้ totalPrice เป็น signal อีกตัว

ถ้าเขียนแบบนี้:

```ts
quantity = signal(1);
pricePerStick = signal(15);
totalPrice = signal(15);
```

เราต้องคอย update `totalPrice` เองทุกครั้งที่ `quantity` หรือ `pricePerStick` เปลี่ยน

ถ้าลืม update จุดใดจุดหนึ่ง UI อาจแสดงจำนวนกับยอดรวมไม่ตรงกัน

`computed()` จึงเหมาะกว่า เพราะยอดรวมเป็นค่าที่คำนวณจาก state อื่นได้เสมอ

## Expected Result

เมื่อกดปุ่ม:

```text
จำนวน: 1 ไม้ -> ยอดรวม: 15 บาท
จำนวน: 2 ไม้ -> ยอดรวม: 30 บาท
จำนวน: 3 ไม้ -> ยอดรวม: 45 บาท
```

## ถ้าพังให้เช็ก

- import `computed` จาก `@angular/core` แล้วหรือยัง
- ใน template อ่าน signal ด้วย `()` เช่น `totalPrice()`
- ใน computed อ่าน dependency ด้วย `this.quantity()` และ `this.pricePerStick()`
- อย่าเรียก `this.totalPrice.set()` เพราะ computed เป็นค่าอ่านอย่างเดียว

## คำถามหลังทำ

- ถ้าเปลี่ยน `pricePerStick = signal(20)` ยอดรวมตอนเริ่มควรเป็นเท่าไร
- ถ้ากดเพิ่ม 3 ครั้งจากค่าเริ่มต้น 1 จำนวนสุดท้ายควรเป็นเท่าไร
- ถ้ามีส่วนลดที่คำนวณจากยอดรวม ควรเก็บเป็น signal ใหม่หรือ computed ใหม่

## จำสั้น ๆ

```text
ใช้ signal กับค่าที่เปลี่ยนจาก action
ใช้ computed กับค่าที่คำนวณจาก signal อื่น
ยอดรวมไม่ควรเป็น state ซ้ำถ้าคำนวณใหม่ได้
```
