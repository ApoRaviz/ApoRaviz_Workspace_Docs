# ตั้งค่าและทดสอบ CORS ใน NestJS

หน้านี้ต่อจาก [CORS](../../backend/concepts/cors.md) โดยเน้นจุดตั้งค่าใน NestJS และหลักฐานที่ test ควรตรวจ

## เป้าหมาย

```text
Frontend origin
-> เรียก NestJS API
-> NestJS ส่ง CORS response headers
-> browser ตรวจแล้วอนุญาตให้ JavaScript อ่าน response
```

ก่อนเขียน code ต้องรู้ก่อนว่า CORS เป็นกฎที่ browser บังคับใช้ ไม่ใช่คำสั่งให้ Controller ปฏิเสธ request

## เปิด CORS

Nest application เปิด CORS ผ่าน `enableCors()`:

```ts
app.enableCors({
  origin: 'http://localhost:4200',
});
```

แยกหน้าที่:

```text
app          = Nest application
enableCors() = เปิดและกำหนด CORS
origin       = origin ที่ประกาศว่าอนุญาต
```

Nest ใช้ CORS implementation ของ HTTP platform ที่เลือก เช่น Express หรือ Fastify จึงควรตรวจ behavior ของ adapter และ package version ที่ project ใช้จริงเมื่ออาศัยรายละเอียดเฉพาะ

## วางไว้ที่ Global Configuration ร่วม

ถ้า project มี function กลางที่ทั้ง runtime และ E2E เรียก ให้ตั้ง CORS ที่นั่น:

```ts
export function configureApp(app: INestApplication): void {
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.useGlobalFilters(new HttpExceptionFilter());
}
```

Flow:

```text
Runtime bootstrap -> configureApp(app)
E2E bootstrap     -> configureApp(app)
```

ถ้าเพิ่ม CORS เฉพาะ `main.ts` แต่ E2E ไม่เรียก configuration เดียวกัน test อาจผ่านโดยไม่ครอบ behavior ของ application จริง

## CORS Middleware อยู่ตรงไหน

`enableCors()` ทำให้ Nest ลงทะเบียน CORS middleware ของ platform ให้ ไม่ใช่ custom middleware class ที่ project ต้องเขียนเอง

```text
Custom logging middleware
= project มี class implements NestMiddleware และเรียก next()

CORS middleware
= framework/platform ลงทะเบียนให้เมื่อเรียก enableCors()
```

สำหรับ preflight ค่าเริ่มต้นของ CORS middleware สามารถตอบ `204` และจบ response ก่อนถึง Controller

## Behavior ของ Fixed String Origin บน Express

เมื่อใช้ Nest กับ Express และกำหนด `origin` เป็น string คงที่:

```ts
origin: 'http://localhost:4200'
```

Express CORS ส่งค่าคงที่นั้นใน `Access-Control-Allow-Origin` แม้ request จะระบุ origin อื่น:

```text
Request Origin:                 http://localhost:4300
Access-Control-Allow-Origin:    http://localhost:4200
```

Browser เปรียบเทียบแล้วเห็นว่าค่าไม่ตรง จึงไม่ให้ JavaScript จาก `4300` อ่าน response ส่วน `curl` และ Supertest ยังเห็น status/body เพราะไม่ได้บังคับใช้กฎของ browser

ถ้าใช้ origin array, regular expression หรือ callback รูปแบบการตรวจและสะท้อน header อาจต่างออกไป ต้องเขียน test ตาม configuration จริง ไม่เดาจากรูปแบบ string

## E2E: Allowed Origin

```ts
return request(app.getHttpServer())
  .get('/status')
  .set('Origin', 'http://localhost:4200')
  .expect(200)
  .expect('Access-Control-Allow-Origin', 'http://localhost:4200')
  .expect({ status: 'ok' });
```

หน้าที่:

```text
.set('Origin', value)               = จำลอง Origin request header
.expect(200)                         = ตรวจ HTTP status
.expect(headerName, expectedValue)  = ตรวจ CORS response header
.expect({ status: 'ok' })           = ตรวจ JSON body
```

หนึ่ง test นี้พิสูจน์ route, CORS header สำหรับ origin ที่อนุญาต และ response body แต่ยังไม่ได้เปิด browser จริง

## E2E: Preflight

```ts
return request(app.getHttpServer())
  .options('/status')
  .set('Origin', 'http://localhost:4200')
  .set('Access-Control-Request-Method', 'GET')
  .set('Access-Control-Request-Headers', 'Authorization')
  .expect(204)
  .expect('Access-Control-Allow-Origin', 'http://localhost:4200')
  .expect('Access-Control-Allow-Headers', 'Authorization');
```

Test นี้ถามว่า origin ที่กำหนดส่ง `GET` พร้อม `Authorization` header ได้หรือไม่

มันไม่ควร expect JSON body เพราะ CORS middleware ตอบ preflight ก่อนถึง Controller

## E2E: Origin อื่นไม่ได้รับอนุญาต

```ts
return request(app.getHttpServer())
  .get('/status')
  .set('Origin', 'http://localhost:4300')
  .expect(200)
  .expect((response) => {
    expect(response.headers['access-control-allow-origin']).not.toBe(
      'http://localhost:4300',
    );
  });
```

การคง `.expect(200)` ไว้ตั้งใจแสดงว่า CORS ไม่ได้ทำให้ API ปฏิเสธ request ฝั่ง server ส่วน callback ตรวจว่า response ไม่ได้ประกาศอนุญาต `4300`

Supertest ไม่ได้จำลองการปิดกั้นของ browser test นี้จึงพิสูจน์เฉพาะข้อมูลที่ browser จะนำไปเปรียบเทียบ

## Negative Control

จงใจเปลี่ยน expected header ชั่วคราว:

```text
Request Origin:  http://localhost:4200
Expected header: http://localhost:4300
Actual header:   http://localhost:4200
```

ผลที่ต้องได้คือ named CORS test fail พร้อม Expected/Received จากนั้นคืนค่าเดิมและ rerun ให้ผ่าน

Negative control พิสูจน์ว่า test ตรวจ header จริง ไม่ได้ผ่านเพราะ status `200` หรือ `204` เพียงอย่างเดียว

## Test แต่ละชั้นพิสูจน์อะไร

| หลักฐาน | พิสูจน์ | ไม่พิสูจน์ |
|---|---|---|
| HTTP Unit Test ของ frontend | Service สร้าง request และรับ response จำลอง | network, NestJS, browser CORS |
| Backend E2E + Supertest | Nest app ส่ง status/body/CORS headers ตามที่ตรวจ | browser ปิดกั้น response จริง |
| `curl` พร้อม `Origin` | runtime response และ headers ที่ server ส่ง | browser บังคับใช้ CORS |
| Browser integration | browser และ frontend อ่าน response ได้จริง | สิทธิ์ผู้ใช้ ถ้าไม่มี auth assertion |

## Validation ตามผลกระทบ

เมื่อแก้ global CORS configuration ควรตรวจอย่างน้อย:

```text
lint ของ source/test ที่แก้
TypeScript ของ E2E test
backend build
E2E allowed-origin
E2E preflight
runtime response headers ตามความเสี่ยง
negative control ของ header assertion
```

Unit Test ของ Service ที่ไม่ bootstrap application configuration ไม่ได้พิสูจน์ CORS จึงไม่ควรรันซ้ำโดยไม่มีเหตุผลที่เกี่ยวข้อง

## จุดที่มักงง

- `enableCors()` ลงทะเบียน middleware ภายใน ไม่ใช่ custom middleware class ของ project
- CORS header ตรงจึงสำคัญกว่าเพียงมี header อยู่
- preflight ผ่านไม่ได้แปลว่า route จริงมี method นั้น
- Supertest เห็น response ได้แม้ browser จาก origin นั้นจะอ่านไม่ได้
- CORS ไม่ใช่ Authentication หรือ Authorization

## สรุปจำสั้น ๆ

```text
enableCors()       = ให้ Nest ลงทะเบียน CORS middleware
configureApp()     = จุดร่วมให้ runtime/E2E ใช้ config เดียวกัน
GET E2E            = ตรวจ status + allowed-origin header + body
OPTIONS E2E        = ตรวจ preflight 204 + allow headers
other origin E2E   = ตรวจว่า response ไม่ได้ประกาศอนุญาต origin นั้น
Supertest          = ตรวจ server response แต่ไม่ใช่ browser
```

## References

- [NestJS — CORS](https://docs.nestjs.com/security/cors)
- [MDN — Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
