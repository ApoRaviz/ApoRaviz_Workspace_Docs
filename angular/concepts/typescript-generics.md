# TypeScript Generic

## ภาพจำ

ลองนึกถึงกล่องที่ยังไม่กำหนดชนิดของข้างใน:

```text
กล่อง<T>
```

เมื่อใช้งานจริง ถ้าใส่ `string` เข้าไป กล่องใบนั้นก็ทำงานกับ `string` ถ้าใส่ `number` ก็ทำงานกับ `number` โดยยังรักษาความสัมพันธ์ของ type ไว้

## ความหมายแบบคนธรรมดา

Generic ช่วยเขียน function หรือ class หนึ่งชุดให้ใช้กับหลาย type โดยไม่ทิ้งการตรวจ type

ถ้าเขียนเจาะจง:

```ts
function echo(value: string): string {
  return value;
}
```

function นี้รับและคืนได้เฉพาะ `string`

ถ้าเขียนเป็น Generic:

```ts
function echo<T>(value: T): T {
  return value;
}
```

`T` หมายถึง type ที่จะถูกกำหนดเมื่อเรียกใช้

## Technical Term

- **Generic** คือ code ที่รับ type เป็น parameter
- **type parameter** คือชื่อแทน type เช่น `T`
- **type argument** คือ type ที่ส่งให้ Generic เช่น `string` ใน `echo<string>(...)`
- **type inference** คือการที่ TypeScript อนุมาน type จากค่าที่ส่งเข้าไป

`T` เป็นเพียงชื่อที่นิยมใช้ สามารถตั้งชื่อที่สื่อความหมายกว่าได้ เช่น `TItem` หรือ `TResponse`

## ทำไม `<T>` อยู่หลังชื่อ Function

```ts
function echo<T>(value: T): T {
  return value;
}
```

อ่านตามลำดับ:

```text
echo<T>   = function นี้ประกาศ type parameter ชื่อ T
value: T  = parameter ต้องเป็น type นั้น
): T      = return ต้องเป็น type เดียวกัน
```

ถ้าไม่มี `<T>` TypeScript จะไม่รู้ว่า `T` คือชื่อ type parameter ที่ประกาศไว้

## เรียกใช้ได้สองแบบ

ระบุ type เอง:

```ts
echo<string>('hello');
echo<number>(42);
```

ให้ TypeScript อนุมาน:

```ts
echo('hello'); // T เป็น string
echo(42);      // T เป็น number
```

จึงไม่จำเป็นต้องเขียน `echo<string>(...)` ทุกครั้งเมื่อ compiler อนุมานได้ชัด

## Generic รักษาความสัมพันธ์ของ Type

```ts
function keep<T>(value: T): T {
  return value;
}

const text = keep('hello'); // string
const count = keep(42);     // number
```

Generic ไม่ได้แปลว่า function เปลี่ยน type ได้ตามใจ แต่แปลว่าเมื่อ `T` ถูกกำหนดแล้ว จุดที่ใช้ `T` ต้องสอดคล้องกัน

ตัวอย่างที่ผิด:

```ts
function keep<T>(value: T): T {
  return 123;
}
```

TypeScript เตือนเพราะ `T` อาจเป็น `string`, object หรือ type อื่นที่ไม่ใช่ `number`

## Generic กับ Class

```ts
class Box<T> {
  constructor(public value: T) {}
}

const textBox = new Box<string>('hello');
const numberBox = new Box<number>(42);
```

เมื่อสร้าง `Box<string>` ค่า `value` ต้องเป็น `string` ส่วน `Box<number>` ต้องเป็น `number`

## Generic ไม่ใช่ Runtime Dynamic Type

Generic เป็นเครื่องมือตรวจ type ตอนพัฒนาและ compile:

```text
เขียน TypeScript
-> TypeScript ตรวจความสัมพันธ์ของ T
-> compile เป็น JavaScript
-> type parameter ถูกลบออก
```

ดังนั้น Generic ไม่ได้ตรวจชนิดข้อมูลจาก request หรือ JSON ตอน runtime ถ้าต้องตรวจข้อมูล runtime ต้องใช้ validation เพิ่ม

## ใช้ Generic เมื่อใด

ใช้เมื่อ logic เดียวกันต้องรองรับหลาย type และมีความสัมพันธ์ของ type ที่ควรรักษา เช่น:

- function คืนค่า type เดียวกับค่าที่รับ
- กล่องหรือ collection ที่เก็บข้อมูล type หนึ่ง
- API response wrapper ที่เก็บ payload หลายรูปแบบ

ไม่ควรเพิ่ม Generic ถ้า function รองรับ type เดียวจริง ๆ เพราะ type ตรงไปตรงมาอ่านง่ายกว่า

## จุดที่มักงง

- `<T>` ประกาศ type parameter ไม่ใช่ comparison operator
- `T` ไม่ได้แปลว่า `any`
- TypeScript มักอนุมาน `T` ได้ จึงไม่ต้องส่ง type argument ทุกครั้ง
- Generic รักษาความสัมพันธ์ของ type ไม่ได้อนุญาตให้คืนคนละ type
- Generic ถูกลบตอน compile และไม่ทำ runtime validation
- ชื่อ `T` เปลี่ยนเป็นชื่ออื่นได้

## อ่านต่อ

- [TypeScript](typescript.md)
- [TypeScript Generics — Official Documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## เช็กตัวเอง

- `<T>` หลังชื่อ function ประกาศอะไร?
- เหตุใด `echo('hello')` จึงไม่จำเป็นต้องเขียน `echo<string>('hello')` เสมอไป?
- `T` ต่างจาก `any` อย่างไร?
- Generic ยังอยู่ใน JavaScript หลัง compile หรือไม่?
- เมื่อใดควรใช้ type เจาะจงแทน Generic?

## จำสั้น ๆ

```text
<T>       = ประกาศ type parameter
value: T  = รับค่าชนิด T
): T      = คืนค่าชนิด T
inference = TypeScript เดา T จากค่าที่ส่งเข้าไป
Generic   = ใช้ logic ซ้ำหลาย type โดยยังรักษา type safety
```
