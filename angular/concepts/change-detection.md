# Change Detection

Change detection คือกระบวนการที่ Angular ตรวจค่าที่ Template พึ่งพา แล้วอัปเดต DOM ให้ตรงกับ state ปัจจุบัน

## ภาพจำ

```text
state เปลี่ยน
→ Angular ตรวจ binding
→ Template ถูกประเมินใหม่ในส่วนที่เกี่ยวข้อง
→ DOM แสดงค่าล่าสุด
```

Signal เก็บข้อมูล ส่วน change detection ทำหน้าที่นำข้อมูลล่าสุดไปสะท้อนบนหน้าจอ ทั้งสองอย่างไม่ใช่สิ่งเดียวกัน

## ใน Component Test

Test มักควบคุมจังหวะ render ด้วย `fixture.detectChanges()`:

```ts
button.click();
fixture.detectChanges();

expect(compiled.textContent).toContain('Loading');
```

ลำดับคือ:

```text
action
→ Component เปลี่ยน state
→ fixture.detectChanges()
→ Angular update DOM
→ expect() ตรวจ DOM ปัจจุบัน
```

ถ้า state เปลี่ยนแล้ว Test อ่าน DOM ก่อน `detectChanges()` ข้อความอาจยังเป็นค่าจากการ render รอบก่อน

`detectChanges()` ไม่ได้เปลี่ยน Signal ให้เอง แต่สั่งให้ Angular นำ state ล่าสุดไปประเมิน binding และ render

อ่าน flow เต็มที่ [Data Binding, UI State และ Component Test](../teach/data-binding-ui-state-and-component-testing.md)

## จำสั้น ๆ

```text
Signal             = เก็บ state
detectChanges()    = สั่ง render รอบใหม่ใน Test
DOM                = ผลที่ผู้ใช้หรือ Test อ่านได้
```

## แหล่งอ้างอิง

- [Angular — Basics of testing components](https://angular.dev/guide/testing/components-basics)
- [Angular — Binding dynamic text, properties and attributes](https://angular.dev/guide/templates/binding)
