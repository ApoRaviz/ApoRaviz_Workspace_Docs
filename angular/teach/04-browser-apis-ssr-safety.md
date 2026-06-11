# Browser APIs และ SSR Safety

บทนี้สรุปวิธีคิดเมื่อ Angular code ต้องใช้ browser APIs

## Browser API คืออะไร

Browser API คือความสามารถที่ browser ให้ JavaScript ใช้:

- `window`
- `document`
- `localStorage`
- `IntersectionObserver`
- `requestAnimationFrame`
- scroll APIs

API เหล่านี้มีเฉพาะใน browser จริง แต่ SSR/prerender รันบน server ได้ด้วย

## ทำไมต้อง guard

ถ้าเขียนแบบนี้ใน app ที่เปิด SSR:

```ts
window.scrollTo({ top: 0 });
```

ตอน build/prerender อาจพัง เพราะ server ไม่มี `window`

ควรมี guard:

```ts
if (!this.isBrowser) {
  return;
}
```

และถ้า API อาจไม่มีใน test environment:

```ts
if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}
```

## IntersectionObserver

`IntersectionObserver` ใช้เฝ้าดูว่า element เข้ามาใน viewport หรือยัง

ใช้ได้กับ:

- active navbar ตาม section
- reveal animation
- lazy load image
- infinite scroll

รูปแบบพื้นฐาน:

```ts
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log(entry.target);
    }
  }
});

observer.observe(section);
```

## threshold และ rootMargin

`threshold` คือสัดส่วนที่ element ต้องถูกเห็นก่อน callback ทำงาน

```ts
threshold: [0.15, 0.4, 0.65]
```

`rootMargin` ใช้ขยายหรือหดพื้นที่ตรวจจับ

```ts
rootMargin: '-35% 0px -45% 0px'
```

ค่าติดลบช่วยให้ active section เปลี่ยนเมื่อ section เข้าใกล้กลางจอ ไม่ใช่เพิ่งแตะขอบจอ

## Cleanup

ถ้าสร้าง observer ต้อง cleanup เมื่อไม่ใช้แล้ว

```ts
this.sectionObserver?.disconnect();
```

หรือถ้าต้องหยุดเฉพาะ element:

```ts
this.revealObserver?.unobserve(entry.target);
```

เหตุผลที่ต้อง cleanup:

- กัน callback ซ้ำ
- กัน observer เก่าค้าง
- ลด memory leak

## Checklist

- [ ] ใช้ `isPlatformBrowser()` หรือ guard เทียบเท่าก่อนแตะ browser API
- [ ] เช็ก `typeof ApiName !== 'undefined'` เมื่อ API อาจไม่มีใน test
- [ ] cleanup observer/timer/listener
- [ ] มี test ถ้า browser API คุม behavior สำคัญ
- [ ] อย่าเขียน DOM selector แทน Angular state ถ้าใช้ reactive template ได้
