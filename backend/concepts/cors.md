# CORS

CORS ช่วยให้ browser ตัดสินว่า JavaScript จากหน้าเว็บหนึ่งอ่าน response ของอีกต้นทางได้หรือไม่

## ภาพจำ

Backend ส่งพัสดุออกมาได้ แต่ browser เป็นด่านหน้าสุดท้ายก่อนส่งพัสดุต่อให้ JavaScript:

```text
Backend ตอบ response
-> browser ตรวจว่าต้นทางของหน้าเว็บได้รับอนุญาตหรือไม่
-> ตรงกัน: JavaScript อ่าน response ได้
-> ไม่ตรงกัน: JavaScript อ่าน response ไม่ได้
```

การที่ API ตอบสำเร็จจึงไม่เท่ากับ JavaScript อ่าน response ได้เสมอ

## Origin คืออะไร

`origin` หรือต้นทางของหน้าเว็บประกอบด้วยสามส่วน:

```text
protocol + host + port
```

ตัวอย่าง:

```text
http://localhost:4200
│      │         │
protocol host     port
```

สอง URL เป็น origin เดียวกันเมื่อทั้งสามส่วนตรงกัน ส่วน path ไม่ได้เป็นส่วนของ origin:

| URL A | URL B | ผล |
|---|---|---|
| `http://localhost:4200/home` | `http://localhost:4200/status` | origin เดียวกัน |
| `http://localhost:4200` | `http://localhost:3000` | คนละ origin เพราะ port ต่างกัน |
| `http://example.com` | `https://example.com` | คนละ origin เพราะ protocol ต่างกัน |
| `https://app.example.com` | `https://api.example.com` | คนละ origin เพราะ host ต่างกัน |

## Same-Origin Policy และ CORS

`same-origin policy` คือกฎความปลอดภัยของ browser ที่จำกัด JavaScript ไม่ให้ปฏิสัมพันธ์กับ resource จาก origin อื่นตามใจชอบ

`CORS` ย่อมาจาก Cross-Origin Resource Sharing คือกลไกผ่าน HTTP headers ที่ให้ backend ระบุว่า origin อื่นใดได้รับอนุญาตให้อ่าน response

```text
หน้าเว็บ origin A
-> ขอ API จาก origin B
-> backend B ส่ง CORS response headers
-> browser เปรียบเทียบ origin A กับสิ่งที่ B อนุญาต
```

## ผู้ทำงานและหน้าที่

| ผู้ทำงาน | หน้าที่ |
|---|---|
| Frontend JavaScript | ขอข้อมูลผ่าน HTTP client |
| Browser | บังคับใช้ same-origin policy และตรวจ CORS headers |
| Backend | ทำ route และส่ง response พร้อม CORS headers |
| `curl` หรือ Postman | ส่ง HTTP request แต่ไม่บังคับใช้ CORS แบบ browser |

## Header หลัก

Request จาก browser อาจมี:

```http
Origin: http://localhost:4200
```

Backend ที่อนุญาต origin นี้ตอบ:

```http
Access-Control-Allow-Origin: http://localhost:4200
```

Browser เปรียบเทียบสองค่า ถ้า origin ของหน้าเว็บไม่ตรงกับค่าที่ backend อนุญาต JavaScript จะอ่าน response ไม่ได้

`Vary: Origin` บอก cache ว่า response อาจต่างกันตาม `Origin` request header จึงไม่ควรนำ response ของ origin หนึ่งไปใช้กับอีก origin โดยไม่ตรวจสอบ

## API ตอบ 200 แต่ CORS ยังไม่ผ่านได้

ตัวอย่าง:

```text
หน้าเว็บจริง:                     http://localhost:4300
Access-Control-Allow-Origin:      http://localhost:4200
HTTP status:                      200
JSON body:                        {"status":"ok"}
```

Backend ทำ route สำเร็จและสร้าง JSON แล้ว แต่ browser เห็นว่า `4300` ไม่ตรงกับ `4200` จึงไม่ส่ง body ต่อให้ JavaScript ของหน้า `4300` อ่าน

```text
HTTP 200          = API ทำ request สำเร็จ
{"status":"ok"}  = ข้อมูลตาม contract ของ API
CORS ผ่าน         = browser ยอมให้ JavaScript อ่าน response
```

สามเรื่องนี้ต้องตรวจแยกกัน

## Preflight Request

บาง request ต้องให้ browser ถามสิทธิ์ล่วงหน้าก่อนส่ง request จริง การถามนี้เรียกว่า `preflight request`

Browser ใช้ HTTP method `OPTIONS` พร้อมบอกสิ่งที่ request จริงกำลังจะใช้:

```http
OPTIONS /status
Origin: http://localhost:4200
Access-Control-Request-Method: GET
Access-Control-Request-Headers: Authorization
```

Backend อาจตอบ:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET,POST
Access-Control-Allow-Headers: Authorization
```

`204 No Content` หมายถึง request สำเร็จแต่ไม่มี response body ส่วน CORS headers ยังมีได้ตามปกติ

Flow:

```text
OPTIONS preflight
-> backend ตอบสิ่งที่อนุญาต
-> browser ตรวจคำตอบ
-> ผ่าน: ส่ง request จริง
-> ไม่ผ่าน: ไม่ส่ง request จริง
```

GET ธรรมดาที่ไม่มี header พิเศษมักไม่ต้อง preflight ส่วน method หรือ header บางชนิด เช่น `PUT`, `PATCH`, `DELETE` หรือ `Authorization` มักทำให้ browser ต้องถามก่อน

## Preflight กับ Middleware Short-Circuit

CORS middleware สามารถตอบ `OPTIONS` และจบ response เองโดยไม่ส่งต่อถึง Controller:

```text
OPTIONS request
-> CORS middleware
-> ตอบ 204
-> จบ response
```

นี่คือ `short-circuit` หรือการที่ middleware จบ request เองแทนการเรียกขั้นถัดไป

อ่านพื้นฐาน pipeline ต่อที่ [Middleware และ Request Pipeline](../../nestjs/concepts/middleware-and-request-pipeline.md)

## CORS ไม่ใช่ Authentication

CORS ตอบคำถามว่า:

> JavaScript จาก origin ใดอ่าน response ผ่าน browser ได้

Authentication ตอบคำถามว่า:

> ผู้เรียกคือใคร

Authorization ตอบคำถามว่า:

> ผู้เรียกที่รู้ตัวตนแล้วทำอะไรได้บ้าง

CORS ไม่ได้ป้องกันการเรียก API ผ่าน `curl`, Postman หรือ backend อื่น หาก API ต้องปฏิเสธผู้ไม่มีสิทธิ์ด้วย `401` หรือ `403` ต้องใช้ Authentication/Authorization เพิ่ม

## Unit Test ไม่ได้พิสูจน์ CORS เสมอไป

HTTP Unit Test ที่ใช้ testing backend มี flow เช่น:

```text
Service
-> HTTP client
-> testing backend
-> response จำลอง
```

เมื่อไม่มี browser, network และ API server จริง test นี้จึงไม่พิสูจน์ CORS ต้องใช้ browser integration, runtime probe หรือ backend E2E test ที่ตรวจ CORS headers เพิ่ม

## จุดที่มักงง

- `200 OK` ไม่ได้หมายความว่า CORS ผ่าน
- JSON property เช่น `status: "ok"` ไม่ใช่ผลการตรวจ CORS
- `curl` อ่าน body ได้ไม่ได้แปลว่า browser JavaScript อ่านได้
- preflight `204` ไม่ใช่ response จาก Controller ของ request จริง
- CORS ไม่ได้ทำหน้าที่แทน Authentication หรือ Authorization
- `Access-Control-Allow-Methods` ไม่ได้ยืนยันว่าทุก route มีทุก method นั้นจริง

## สรุปจำสั้น ๆ

```text
origin             = protocol + host + port
same-origin policy = กฎของ browser
CORS                = backend บอก browser ว่า origin ใดอ่าน response ได้
preflight           = OPTIONS ถามก่อนส่ง request จริง
200                 = API สำเร็จ ไม่ได้แปลว่า CORS ผ่าน
curl                = ไม่บังคับใช้ CORS แบบ browser
```

## References

- [MDN — Origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)
- [MDN — Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [MDN — Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)
