# Computed

## ภาพจำง่าย ๆ

`computed` เหมือนเครื่องคิดเลขที่วางอยู่ข้างกล่องตัวเลข

ถ้าเลขในกล่องเปลี่ยน เครื่องคิดเลขจะคำนวณคำตอบใหม่ให้เอง

ใน Angular:

```text
signal     = กล่องเก็บค่าต้นทาง
computed   = ค่าที่คำนวณจาก signal อื่น
template   = จุดที่อ่านผลลัพธ์ไปแสดงบนหน้า
```

## แปลเป็นภาษาคนธรรมดา

ใช้ `computed()` เมื่อค่าหนึ่งไม่ได้ถูกกรอกตรง ๆ แต่เกิดจากการเอาค่าอื่นมาคำนวณ

ตัวอย่าง:

```text
จำนวนสินค้า x ราคาต่อชิ้น = ยอดรวม
```

เราไม่ควรเก็บยอดรวมแยกอีกตัวถ้ามันคำนวณจากจำนวนและราคาได้ เพราะอาจทำให้ข้อมูลไม่ตรงกัน

## แปลเป็น Angular

`computed()` คือ signal แบบอ่านอย่างเดียวที่สร้างจาก signal อื่น

```ts
readonly quantity = signal(1);
readonly price = signal(25);
readonly total = computed(() => this.quantity() * this.price());
```

เมื่อ `quantity` หรือ `price` เปลี่ยน `total()` จะได้ค่าใหม่ตาม

## ตัวอย่างอ่านประกอบ: ยอดรวมร้านหมูปิ้ง

```ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-total-price',
  template: `
    <p>จำนวน: {{ quantity() }} ไม้</p>
    <p>ราคาไม้ละ: {{ pricePerStick() }} บาท</p>
    <p>ยอดรวม: {{ totalPrice() }} บาท</p>

    <button type="button" (click)="addOne()">เพิ่ม 1 ไม้</button>
  `
})
export class TotalPriceComponent {
  readonly quantity = signal(1);
  readonly pricePerStick = signal(15);
  readonly totalPrice = computed(
    () => this.quantity() * this.pricePerStick()
  );

  addOne(): void {
    this.quantity.update((current) => current + 1);
  }
}
```

ภาพจำของตัวอย่าง:

```text
จำนวนไม้  = quantity
ราคาไม้ละ = pricePerStick
ยอดรวม    = totalPrice
```

## Flow ทีละขั้น

1. component สร้าง `quantity` และ `pricePerStick`
2. `computed()` อ่าน `quantity()` และ `pricePerStick()`
3. Angular จำว่า `total` พึ่งพา signal สองตัวนี้
4. ตอนเริ่ม `1 × 15` ทำให้ `totalPrice()` เป็น `15`
5. เมื่อ user กดเพิ่มจำนวน `quantity` เปลี่ยนเป็น `2`
6. `totalPrice()` คำนวณใหม่เป็น `30`
7. template ที่อ่าน `totalPrice()` แสดงผลใหม่

## ทำไมไม่เก็บยอดรวมเป็น Signal อีกตัว

ถ้าเก็บ `quantity`, `pricePerStick` และ `totalPrice` เป็น signal แยกกัน เราต้องอัปเดตยอดรวมเองทุกครั้งที่ค่าต้นทางเปลี่ยน

ถ้าลืมเพียงจุดเดียว จำนวนกับยอดรวมอาจไม่ตรงกัน จึงควรใช้ `computed()` กับค่าที่คำนวณใหม่ได้เสมอ

## จุดที่มักงง

- `computed()` ไม่ใช่ที่เก็บค่าต้นทาง
- ไม่ควรใช้ `set()` หรือ `update()` กับ computed
- ถ้าค่าคำนวณได้จาก signal อื่น ให้ใช้ computed แทนการเก็บ state ซ้ำ

## ศัพท์ที่เกี่ยวข้อง

- [`signal`](signal.md)
- [`Reactive State และ Signals`](../teach/reactive-signals.md)
- [`Form Input Data Flow`](form-input-data-flow.md)

## เช็กตัวเอง

- ถ้า `quantity` เปลี่ยนจาก 1 เป็น 2 แล้ว `price` ยังเป็น 25 `total()` ควรเป็นเท่าไร
- ทำไมไม่ควรมี `total = signal(25)` แยกอีกตัว
- `computed()` เหมาะกับค่าที่ user กรอกตรง ๆ หรือค่าที่คำนวณจาก state อื่น

## จำสั้น ๆ

```text
signal = ค่าต้นทาง
computed = ค่าที่คำนวณจาก signal อื่น
อย่าเก็บ state ซ้ำถ้าคำนวณใหม่ได้
```
