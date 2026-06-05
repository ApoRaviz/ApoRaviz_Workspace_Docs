# Services และ Dependency Injection

บทเรียนนี้อธิบาย service, `inject()` และ dependency injection ใน Angular standalone app

## Service คืออะไร

Service คือ class ที่เก็บ data หรือ logic ที่ component หลายตัวใช้ร่วมกันได้

```ts
@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {}
```

`providedIn: 'root'` แปลว่า Angular สร้าง service instance เดียวระดับ app

เหมาะกับ:

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

## inject() คืออะไร

`inject()` คือวิธีขอ dependency จาก Angular DI ใน class

```ts
readonly data = inject(PortfolioDataService);
readonly theme = inject(ThemeService);
```

ข้อดี:

- เห็น dependency ใกล้ field ที่ใช้
- ไม่ต้องเขียน constructor ยาว
- Angular ยังควบคุม lifecycle และ mock ใน test ได้

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

service ที่ดีควรมีขอบเขตชัด:

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

เหตุผล:

- SSR/prerender รันบน server ที่ไม่มี browser APIs
- test environment อาจไม่มี API บางตัว
- guard ทำให้ build/test เสถียรกว่า

