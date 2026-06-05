# Unit Test และ Regression Safety

บทเรียนนี้สรุป `.spec.ts`, TestBed และวิธีคิดเรื่อง regression test ใน Angular

## .spec.ts คืออะไร

ไฟล์ `.spec.ts` คือไฟล์ test ของ TypeScript/Angular

```text
theme.service.ts       = code จริง
theme.service.spec.ts  = code ที่ตรวจว่า behavior สำคัญยังถูก
```

ไฟล์ test ไม่ถูกโหลดเป็น production app แต่ถูกรันด้วย:

```bash
npm test -- --watch=false
```

## ทำไมต้องมี test

test ช่วยกัน regression

ตัวอย่าง:

```text
แก้ scroll behavior
-> active navbar underline เคยพัง
-> test ช่วยจับถ้าบัคเดิมกลับมา
```

ระบบที่ควรมี test มากเป็นพิเศษ:

- reward/loyalty
- money/price
- auth/permission
- route/navigation สำคัญ
- browser API behavior ที่ผู้ใช้เห็น

## Arrange, Act, Assert

โครง test อ่านง่าย:

```text
Arrange = เตรียมสถานการณ์
Act     = เรียก behavior ที่ต้องการทดสอบ
Assert  = ตรวจผลลัพธ์
```

ตัวอย่าง:

```ts
theme.observeSections(['home', 'projects']);
theme.scrollToSection('projects');

expect(theme.activeSection()).toBe('projects');
```

## TestBed

`TestBed` คือ Angular test environment ขนาดเล็ก

```ts
const theme = TestBed.inject(ThemeService);
```

ใช้เมื่อ class/service มี Angular dependency เช่น:

- `DOCUMENT`
- `PLATFORM_ID`
- service อื่น
- provider configuration

## Mock Browser API

ถ้า code ใช้ `IntersectionObserver` แต่ test environment ไม่มี API นี้ ต้อง mock

```ts
class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
```

หลักคิด:

```text
test ไม่ต้อง scroll browser จริง
แต่ต้องจำลอง signal ที่ browser จะส่งให้ code
```

## Fake Timers

ถ้า code ใช้ timeout เพื่อปลด lock หรือ delay behavior ให้ใช้ fake timers

```ts
vi.useFakeTimers();
vi.advanceTimersByTime(1400);
vi.useRealTimers();
```

เหตุผล:

- test ไม่ต้องรอเวลาจริง
- deterministic กว่า
- จับ behavior หลัง timeout ได้ชัด

## Command ที่ต้องจำ

```bash
npm test -- --watch=false
```

ถ้า project มี script:

```bash
npm run test:ci
```

ก่อน push งานที่แตะ logic ควรรัน test เสมอ

