# Lab 01: Signal Counter

## เป้าหมาย

ทำ counter เล็ก ๆ เพื่อเห็น flow นี้ให้ชัด:

```text
1. user กดปุ่ม
2. event click เรียก method
3. method update signal
4. Angular วาดค่าบนหน้าจอใหม่
```

## ภาพจำง่าย ๆ

นึกถึงป้ายคิวร้านอาหาร

- ป้ายเริ่มที่เลข `0`
- กดปุ่ม `+1`
- พนักงานเปลี่ยนเลขในเครื่อง
- ป้ายหน้าร้านแสดงเลขใหม่

ใน Angular:

```text
ป้ายคิว       = template
เลขในเครื่อง = signal
ปุ่ม +1       = button click
พนักงาน       = method increase()
```

## ไฟล์ตัวอย่าง

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-counter',
  template: `
    <section>
      <h1>Signal Counter</h1>

      <p>ค่าปัจจุบัน: {{ count() }}</p>

      <button type="button" (click)="increase()">
        +1
      </button>
    </section>
  `
})
export class SignalCounterComponent {
  count = signal(0);

  increase(): void {
    this.count.update((current) => current + 1);
  }
}
```

## Flow ตอน render ครั้งแรก

```text
1. Angular สร้าง component
2. count = signal(0)
3. template อ่าน count()
4. browser เห็นข้อความ "ค่าปัจจุบัน: 0"
```

สำคัญ: `increase()` ยังไม่ทำงานตอน render

## Flow ตอน user click

```text
1. user กดปุ่ม +1
2. Angular จับ event จาก (click)
3. Angular เรียก increase()
4. increase() เรียก count.update()
5. signal เปลี่ยนจาก 0 เป็น 1
6. Angular วาดส่วนที่อ่าน count() ใหม่
7. browser เห็น "ค่าปัจจุบัน: 1"
```

## อธิบายศัพท์ที่เจอ

### `(click)` คืออะไร

`(click)` คือ Angular event binding

แปลว่า "เมื่อเกิด click ที่ปุ่มนี้ ให้เรียก code ฝั่ง component"

```html
<button type="button" (click)="increase()">+1</button>
```

บรรทัดนี้ไม่ได้เรียก `increase()` ทันทีตอน render

มันแค่บอก Angular ว่า:

```text
ถ้ามีคน click ปุ่มนี้ ค่อยเรียก increase()
```

### `signal` คืออะไร

`signal` คือกล่องเก็บค่าที่ Angular ติดตามได้

ถ้าค่าข้างในเปลี่ยน และ template กำลังอ่านค่านั้นอยู่ Angular จะรู้ว่าต้อง update UI

อ่านเพิ่ม: [Signal Concept](../concepts/signal.md)

### `update()` คืออะไร

`update()` คือการเปลี่ยนค่าโดยอิงจากค่าเดิม

```ts
this.count.update((current) => current + 1);
```

อ่านว่า:

```text
เอาค่าเดิมมาเป็น current
แล้วคืนค่าใหม่เป็น current + 1
```

## Expected Result

เมื่อกดปุ่ม:

```text
0 -> 1 -> 2 -> 3
```

เลขบนหน้าจอต้องเพิ่มทีละ 1

## Self Check

- ถ้าเอา `(click)="increase()"` ออก ปุ่มจะยังเพิ่มเลขไหม
- ถ้าเปลี่ยน `signal(0)` เป็น `signal(10)` ค่าเริ่มต้นบนหน้าจอควรเป็นอะไร
- ถ้าเปลี่ยน `current + 1` เป็น `current + 5` ผลลัพธ์ควรเป็นอย่างไร

## กฎที่ได้จาก lab นี้

```text
event binding ไม่ใช่การสั่งให้ method ทำงานทันที
event binding คือการผูกเหตุการณ์ไว้ก่อน แล้วรอ user ทำ action
```
