# Services และ Dependency Injection

บทนี้อธิบาย service, `inject()` และ dependency injection ใน Angular standalone app

## Service คืออะไร

Service คือ class ที่เก็บ data หรือ logic ที่ component หลายตัวใช้ร่วมกันได้

```ts
@Service()
export class PortfolioDataService {}
```

ใน Angular 22 `@Service()` ทำให้ class เป็น Service ที่ Angular DI สร้างและแจกได้ โดยค่าเริ่มต้นลงทะเบียนระดับ root ของ application

เหมาะกับงานแบบนี้:

- data กลาง เช่น profile, nav links, project list
- UI state กลาง เช่น active section, mobile menu state
- logic ที่หลาย component ใช้ร่วมกัน
- boundary สำหรับอนาคต เช่นเปลี่ยน mock data เป็น API

## เมื่อไหร่ควรใช้ service

ใช้ service เมื่อ:

- ข้อมูลถูกใช้หลาย component
- logic เริ่มซ้ำ
- component เริ่มถือ responsibility มากเกินไป
- ต้องการ mock หรือ test dependency ได้ง่าย
- มีโอกาสเปลี่ยน data source ในอนาคต

ยังไม่ต้องรีบสร้าง service เมื่อ:

- เป็น prototype เล็กมาก
- logic ยังเปลี่ยนเร็ว
- component เดียวเป็น owner ชัดเจน
- abstraction ใหม่ทำให้คนอ่านงงกว่าเดิม

## `@Service()` และ `@Injectable()`

Angular 22 มี `@Service()` สำหรับ class ที่ตั้งใจเป็น Service โดยตรง:

```ts
import { Service } from '@angular/core';

@Service()
export class UserApi {}
```

`@Service()` ลงทะเบียนระดับ root ให้อัตโนมัติโดยค่าเริ่มต้น จึงขอใช้ผ่าน `inject(UserApi)` ได้โดยไม่ต้องเพิ่ม `UserApi` ใน application providers

เอกสารและโปรเจกต์ Angular รุ่นก่อนมักใช้:

```ts
@Injectable({
  providedIn: 'root',
})
export class UserApi {}
```

ทั้งสองรูปแบบทำให้ class เข้าร่วม DI ได้ แต่ควรอ่าน version และ convention ของ project ก่อนคัดลอก syntax ข้ามโปรเจกต์

ถ้าใช้ `@Service({ autoProvided: false })` จะปิดการลงทะเบียนอัตโนมัติ และต้องลงทะเบียน Service ใน provider scope ที่ต้องการเอง เรื่องการกำหนด scope แบบละเอียดควรเรียนเมื่อมี use case จริง

## inject() คืออะไร

`inject()` คือวิธีขอ dependency จาก Angular DI ใน class

```ts
readonly data = inject(PortfolioDataService);
readonly theme = inject(ThemeService);
```

ข้อดีของ `inject()`:

- เห็น dependency ใกล้ field ที่ใช้
- ไม่ต้องเขียน constructor ยาว
- Angular ยังควบคุม lifecycle และ mock ใน test ได้

ตัวอย่าง Service ที่ขอ `HttpClient`:

```ts
@Service()
export class UserApi {
  private readonly http = inject(HttpClient);
}
```

อ่าน flow การเรียก API และ testing backend ต่อใน [HttpClient และ HTTP Unit Test](http-client-and-http-testing.md)

## ทำไมไม่ใช้ new Service()

อย่าสร้าง service เองแบบนี้:

```ts
readonly data = new PortfolioDataService();
```

เพราะจะเสียข้อดีของ Angular DI:

- component อาจได้คนละ instance
- mock ใน test ยาก
- dependency chain ใน service จัดการยาก
- Angular คุม lifecycle ไม่ได้

## Boundary ที่ดีของ service

service ควรมีขอบเขตชัด:

```text
DataService       = source ของข้อมูล
ThemeService      = UI state/navigation behavior
LoyaltyService    = business rule ของ reward
LineService       = integration boundary สำหรับ LINE OA
```

อย่าให้ service ตัวเดียวรู้ทุกอย่างทั้ง UI, API, business rule และ localStorage เว้นแต่โปรเจกต์ยังเล็กและตั้งใจให้เป็น stepping stone

## SSR Safety ใน service

ถ้า service แตะ browser API เช่น `window`, `document`, `localStorage`, `IntersectionObserver` ต้อง guard ก่อน

```ts
if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}
```

เหตุผลที่ต้อง guard:

- SSR/prerender รันบน server ที่ไม่มี browser APIs
- test environment อาจไม่มี API บางตัว
- guard ทำให้ build/test เสถียรกว่า
