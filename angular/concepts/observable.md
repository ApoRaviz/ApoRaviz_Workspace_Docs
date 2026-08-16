# Observable

`Observable` คือสิ่งที่เก็บขั้นตอนการทำงานและสามารถส่งค่าให้คนที่สมัครรอรับได้

## ภาพจำ

คิดว่า Observable เป็นใบงานที่ยังไม่เริ่มทำ:

```text
สร้างใบงาน
-> ฝาก function สำหรับรับผลด้วย subscribe()
-> เริ่มทำงาน
-> เมื่อมีผล Observable เรียก function ที่ฝากไว้
```

function ที่ฝากให้อีกฝ่ายเรียกภายหลังเรียกว่า `callback`

## ตัวอย่างสั้น

```ts
const status$ = http.get<StatusResponse>('/api/status');

status$.subscribe((response) => {
  console.log(response.status);
});
```

แยกหน้าที่:

```text
http.get(...)       = สร้าง Observable ที่อธิบาย request
subscribe(...)      = เริ่ม request และฝาก callback ไว้
response            = ค่าที่ Observable ส่งให้ callback
```

## Cold Observable ของ HttpClient

Observable ที่ได้จาก `HttpClient` เป็น `cold Observable` แปลแบบง่ายว่าแต่ละ `subscribe()` เริ่มงานของตัวเอง

```ts
const status$ = http.get('/api/status');

status$.subscribe(); // request ครั้งที่ 1
status$.subscribe(); // request ครั้งที่ 2
```

แค่สร้าง `status$` ยังไม่ส่ง request จนกว่าจะมีคน subscribe

## ตอนทดสอบ HTTP

ใน HTTP Unit Test testing backend จะดัก request ไว้ แล้ว test ใช้ `flush()` ส่ง response จำลอง:

```text
subscribe()
-> request ถูกดักไว้
-> flush(fakeResponse)
-> Observable ได้ response
-> Observable เรียก callback
```

สำหรับ `HttpTestingController` การ `flush()` จะส่งค่าผ่าน callback ให้เสร็จก่อนลงบรรทัดถัดไปใน test จึงสามารถเก็บค่าใน callback แล้วตรวจหลัง `flush()` ได้

## จุดที่มักงง

- Observable ไม่ใช่ response และไม่ใช่ Promise
- `subscribe()` รับ function ไปเก็บไว้ ไม่ได้เรียก function เพราะเห็น arrow function อย่างเดียว
- network จริงตอบภายหลัง จึงห้ามสมมติว่า response พร้อมทันทีหลัง `subscribe()`
- `<ResponseType>` บอก type ที่คาด แต่ไม่ตรวจข้อมูล runtime

## อ่านต่อ

- [HttpClient](http-client.md)
- [TypeScript Generic](typescript-generics.md)
- [HttpClient และ HTTP Unit Test](../teach/http-client-and-http-testing.md)

## จำสั้น ๆ

```text
Observable = งานที่ส่งค่าให้ผู้สมัครรอรับ
subscribe  = เริ่มงานและฝาก callback
callback   = function ที่ถูกเรียกเมื่อมีค่า
cold       = subscribe แต่ละครั้งเริ่มงานใหม่
```
