# input() and output()

`input()` และ `output()` คือวิธีสื่อสารระหว่าง component ใน Angular รุ่นใหม่

## ภาพจำง่าย ๆ

```text
input  = ของที่ parent ส่งเข้ามาให้ child
output = เสียงที่ child ส่งกลับไปบอก parent
```

เช่น หน้าใหญ่เลือก customer แล้วส่ง customer เข้า card:

```text
parent component
-> input customer
child component
-> output selected/changed event
```

## Technical Term

```text
input = data boundary จาก parent ไป child
output = event boundary จาก child กลับ parent
required input = input ที่ component ต้องได้รับ
event emitter = ช่องส่ง event ออกจาก component
```

## ตัวอย่าง

```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  template: `
    <button type="button" (click)="selected.emit(customer().id)">
      {{ customer().name }}
    </button>
  `,
})
export class CustomerCardComponent {
  customer = input.required<Customer>();
  selected = output<string>();
}
```

parent ใช้แบบนี้:

```html
<app-customer-card
  [customer]="activeCustomer()"
  (selected)="selectCustomer($event)"
/>
```

## ใช้เมื่อไหร่

- แยก component ใหญ่เป็น component ย่อย
- ส่งข้อมูลจาก container ไป presentation component
- ให้ component ย่อยแจ้ง action กลับ เช่น click, select, remove, submit

## จุดที่มักงง

- `input()` ไม่ใช่ HTML input field
- `output()` ไม่ใช่ return value แต่เป็น event
- child ไม่ควรแก้ state หลักของ parent เอง
- ถ้าเป็นข้อมูลที่ต้องมีเสมอ ใช้ `input.required()`

## อ่านต่อ

- [Component Structure และ Data Flow](../teach/component-structure-data-flow.md)

## สรุปจำสั้น ๆ

```text
input = parent ส่งข้อมูลเข้า
output = child ส่ง event ออก
```

