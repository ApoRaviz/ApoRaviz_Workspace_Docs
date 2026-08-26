# Data Binding

Data binding คือการเชื่อมข้อมูลของ Component เข้ากับ Template เพื่อให้หน้าจอเปลี่ยนตามข้อมูล และเชื่อม event จากหน้าจอกลับไปเรียก Component

## ภาพจำ

```text
Component state → Template → สิ่งที่ผู้ใช้เห็น
ผู้ใช้กดปุ่ม   → Component method
```

## รูปแบบที่ใช้บ่อย

| รูปแบบ | ทิศทาง | ตัวอย่าง |
|---|---|---|
| Interpolation | Component → ข้อความ | expression ภายใน double curly braces |
| Property binding | Component → DOM property | `[disabled]="loading()"` |
| Event binding | DOM event → Component | `(click)="reload()"` |

ตัวอย่าง:

```html
<button
  type="button"
  (click)="reload()"
  [disabled]="state() === 'loading'"
>
  Reload
</button>

<p>Status: {{ response()?.status }}</p>
```

`?.` คือ optional chaining: อ่าน property ต่อเมื่อค่าด้านหน้าไม่เป็น `null` หรือ `undefined`

## Binding กับ Signal

เมื่อ Template อ่าน Signal ด้วย `status()` Angular จะติดตาม dependency นั้น เมื่อ Signal เปลี่ยน Angular สามารถอัปเดตส่วนของหน้าจอที่เกี่ยวข้องได้

```text
status.set('ready')
→ Angular เห็นว่า Template อ่าน status()
→ render ข้อความใหม่
```

อ่าน flow เต็มที่ [Data Binding, UI State และ Component Test](../teach/data-binding-ui-state-and-component-testing.md)

## จำสั้น ๆ

```text
{{ }}      = แสดงข้อความจาก Component
[property] = ส่งค่าไปกำหนด DOM property
(event)    = รับเหตุการณ์กลับเข้า Component
```

## แหล่งอ้างอิง

- [Angular — Binding dynamic text, properties and attributes](https://angular.dev/guide/templates/binding)
- [Angular — Adding event listeners](https://angular.dev/guide/templates/event-listeners)
