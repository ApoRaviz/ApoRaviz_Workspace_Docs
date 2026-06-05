# Reactive State และ Signals

บทเรียนนี้เป็น concept กลางของ Angular reactive state ที่ใช้ได้ทุกโปรเจกต์ใน workspace

## Reactive คืออะไร

`reactive` คือแนวคิดที่ให้ UI ผูกกับ state แล้วอัปเดตตามเมื่อ state เปลี่ยน

```text
state เปลี่ยน
-> Angular รู้ว่า template ส่วนไหนอ่าน state นี้
-> UI ที่เกี่ยวข้องอัปเดตตาม
```

ข้อดีคือ component ไม่ต้องจับ DOM ด้วย selector ตรง ๆ เช่น `document.querySelector()` เพื่อซ่อน/แสดง element เอง

## signal() คืออะไร

`signal()` คือกล่องเก็บค่าที่ Angular track ได้

```ts
readonly mobileMenuOpen = signal(false);
```

เวลาอ่าน signal ต้องเรียกเหมือน function:

```ts
this.mobileMenuOpen()
```

ใน template ก็อ่านแบบเดียวกัน:

```html
@if (theme.mobileMenuOpen()) {
  <nav>Mobile menu</nav>
}
```

เหตุผลที่มี `()` เพราะ Angular ใช้การเรียกนี้เพื่อรู้ว่า template กำลังพึ่งพา signal ตัวไหน

## set() กับ update()

ใช้ `set()` เมื่อรู้ค่าใหม่แน่นอน:

```ts
this.mobileMenuOpen.set(false);
```

ใช้ `update()` เมื่อค่าใหม่อิงจากค่าเดิม:

```ts
this.mobileMenuOpen.update((open) => !open);
```

จำง่าย:

```text
set    = ตั้งค่าใหม่
update = เปลี่ยนจากค่าเดิม
```

## computed()

`computed()` ใช้สร้างค่าที่คำนวณจาก signal อื่น

```ts
readonly firstName = signal('Tanonchai');
readonly lastName = signal('Promsiri');
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

ใช้เมื่อ:

- ค่าใหม่เป็น derivation จาก state อื่น
- ไม่อยากคำนวณซ้ำใน template หลายจุด
- อยากให้ Angular อัปเดตค่าให้เมื่อ dependency เปลี่ยน

## effect()

`effect()` ใช้กับ side effect ที่ต้องเกิดเมื่อ signal เปลี่ยน เช่น sync localStorage หรือ log

```ts
effect(() => {
  localStorage.setItem('theme', this.themeMode());
});
```

ข้อควรระวัง:

- อย่าใช้ `effect()` แทน business logic หลักถ้าเขียนตรง ๆ ได้ชัดกว่า
- ถ้าแตะ browser API ต้อง guard SSR ก่อน
- ถ้า effect ทำให้ signal อื่นเปลี่ยน ต้องระวัง loop

## ตัวอย่างจาก workspace

`ApoRaviz_Portfolio` ใช้ signal กับ:

- mobile menu open/close
- active section
- profile/nav/project data ใน service

`ApoRaviz_Mooping` ใช้ state เพื่อ:

- เลือกลูกค้า
- ร่างยอดขายก่อน confirm
- pending rewards และ saved rewards

หลักคิดคือ state ที่ UI ต้องตอบสนองควรมี owner ชัดเจน และ template อ่าน state จาก owner นั้น ไม่กระจายตัวแปรซ้ำในหลาย component

