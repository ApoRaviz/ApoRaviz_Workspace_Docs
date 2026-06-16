# inject()

`inject()` คือวิธีขอ dependency จาก Angular dependency injection โดยไม่ต้องเขียน constructor เอง

## ภาพจำง่าย ๆ

เหมือน component ยื่นมือขอเครื่องมือจากกล่องเครื่องมือกลาง:

```text
component/service
-> inject(SomeService)
-> Angular ส่ง instance ที่เตรียมไว้ให้
```

## Technical Term

```text
dependency = ของที่ class ต้องใช้ เช่น service, DOCUMENT, PLATFORM_ID
dependency injection = ระบบส่ง dependency ให้ class
provider = คนลงทะเบียนว่า dependency นี้สร้างอย่างไร
inject() = function สำหรับขอ dependency
```

## ตัวอย่าง

```ts
import { Component, inject } from '@angular/core';
import { PortfolioDataService } from './services/portfolio-data.service';

@Component({
  selector: 'app-root',
  template: `{{ data.profile().name }}`,
})
export class AppComponent {
  protected readonly data = inject(PortfolioDataService);
}
```

เทียบกับ constructor style:

```ts
constructor(private readonly data: PortfolioDataService) {}
```

ทั้งสองแบบใช้ dependency injection เหมือนกัน แต่ `inject()` อ่านง่ายใน standalone Angular รุ่นใหม่ โดยเฉพาะเมื่อใช้ field initializer

## ใช้เมื่อไหร่

- ใช้ service ใน component หรือ service อื่น
- ขอ token เช่น `DOCUMENT`, `PLATFORM_ID`
- เขียน class แบบ standalone ที่ไม่อยากมี constructor ยาว

## จุดที่มักงง

- `inject()` ใช้ได้ใน injection context เช่น component, directive, service, provider factory
- `inject()` ไม่ใช่การสร้าง object เอง Angular เป็นคนจัด lifecycle ให้
- ถ้า dependency ต้องใช้หลายที่ ให้สร้าง service ไม่ใช่ copy logic

## อ่านต่อ

- [Services และ Dependency Injection](../teach/02-services-dependency-injection.md)

## สรุปจำสั้น ๆ

```text
inject() = ขอของจากระบบ DI ของ Angular
```

