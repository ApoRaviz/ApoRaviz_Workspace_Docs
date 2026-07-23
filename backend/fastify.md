# Fastify in ApoRaviz Workspace

Fastify เป็น backend web framework บน Node.js ที่เบาและเร็ว เหมาะกับ API หรือ webhook ที่ต้องการโครงไม่ใหญ่

ใน workspace นี้ค่า default ระยะยาวยังเป็น:

```text
Angular + NestJS + PostgreSQL/Supabase
```

แต่ Fastify ใช้ได้เมื่อมีเหตุผลชัด เช่น API เล็ก, webhook แยก, prototype backend หรืออยากเรียน core HTTP แบบตรงกว่า NestJS

## ภาพจำง่าย ๆ

```text
Fastify = เคาน์เตอร์รับ request แบบเบาและตรง
NestJS  = ระบบหลังบ้านที่จัดเป็นแผนก controller/service/module
```

ถ้าโปรเจกต์เริ่มเล็กมาก Fastify ทำให้เห็น HTTP flow ชัด แต่ถ้าระบบเริ่มมีหลาย feature, auth, database, test, module และทีมในอนาคต NestJS จะคุมโครงได้ดีกว่า

## Technical Term

```text
route = endpoint ที่รับ request เช่น POST /transactions
handler = function ที่ทำงานเมื่อ route ถูกเรียก
plugin = วิธีต่อ feature เพิ่มใน Fastify
schema validation = การตรวจ request/response ด้วย schema
adapter = ตัวเชื่อม server engine เข้ากับ framework อื่น
```

## เมื่อไหร่ควรใช้ Fastify

ใช้ Fastify ได้เมื่อ:

- backend scope เล็กและชัด
- ต้องทำ LINE webhook ง่าย ๆ ก่อน
- อยาก prototype API เร็ว
- ต้องการเรียน HTTP request/response แบบไม่ผ่าน abstraction เยอะ
- project ยังไม่ต้องมี module structure ใหญ่

ควรเลือก NestJS เมื่อ:

- มีหลาย domain เช่น customers, transactions, rewards, reports
- ต้องมี auth, role, database, service layer และ test เยอะ
- อยากให้โครง backend คล้าย Angular เพื่อเรียนต่อได้ง่าย
- ต้องการวาง architecture ระยะยาว

## Fastify กับ NestJS ไม่ได้ตัดกันเสมอ

NestJS สามารถใช้ Fastify เป็น HTTP adapter ได้ แต่สำหรับการเรียนเริ่มต้นให้จำแบบนี้ก่อน:

```text
Fastify standalone = เขียน API ตรง ๆ ด้วย Fastify
NestJS default     = เขียน API ด้วย controller/service/module
NestJS + Fastify   = NestJS structure แต่ใช้ Fastify เป็น server engine
```

ยังไม่ต้องเริ่มจาก `NestJS + Fastify` ถ้ายังไม่จำเป็น เพราะจะเพิ่ม concept พร้อมกันหลายชั้น

## ตัวอย่าง Fastify เล็ก ๆ

```ts
import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/health', async () => {
  return { ok: true };
});

app.post('/transactions', async (request) => {
  return {
    received: true,
    body: request.body,
  };
});

await app.listen({ port: 3000, host: '0.0.0.0' });
```

สิ่งที่เห็น:

```text
app.get/app.post = route
async function   = handler
request.body     = ข้อมูลที่ frontend ส่งมา
return object    = response JSON
```

## ใช้กับ MooPing Reward อย่างไร

MooPing Reward มี backend ในอนาคตที่เกี่ยวกับ:

- customer search/create/update
- transaction save
- reward claim
- LINE webhook
- Supabase/PostgreSQL
- secret ที่ห้ามอยู่ใน frontend

แนว default ที่แนะนำ:

```text
NestJS API
-> CustomersController / CustomersService
-> TransactionsController / TransactionsService
-> RewardsController / RewardsService
-> LineWebhookController / LineService
-> PostgreSQL/Supabase
```

Fastify ใช้ได้ถ้าตั้งใจเริ่มเป็น API เล็กก่อน เช่น:

```text
Fastify webhook prototype
-> POST /line/webhook
-> validate signature
-> log event
-> later migrate or wrap into NestJS service
```

## กติกาใน workspace

- NestJS เป็น default backend framework
- Fastify เป็น option ที่ใช้ได้เมื่อ scope เล็กหรือเป็น prototype
- ถ้าเลือก Fastify ให้เขียนเหตุผลใน project docs
- business logic สำคัญควรแยกออกจาก route handler เพื่อย้ายไป NestJS ได้ในอนาคต
- database production ยึด PostgreSQL/Supabase
- secret เช่น LINE token, Supabase service role key ต้องอยู่ฝั่ง backend เท่านั้น

## จุดที่มักงง

- Fastify ไม่ใช่ database
- Fastify ไม่ได้แทน Angular เพราะเป็น backend
- NestJS รันบน Node.js เหมือน Fastify
- เลือก Fastify เพราะ scope และความเรียบง่าย ไม่ใช่เพราะอยากเลี่ยง architecture
- ถ้างานเริ่มใหญ่ ให้ขยับไป NestJS ก่อนโครงกระจัดกระจาย

## Self-check

ลองตอบเอง:

1. Fastify เหมาะกับ backend แบบไหน
2. ทำไม workspace ยังตั้ง NestJS เป็น default
3. LINE token ควรอยู่ frontend หรือ backend
4. ถ้าเริ่ม Fastify แล้วอยากย้ายไป NestJS ควรแยก logic แบบไหน
5. Fastify กับ PostgreSQL ทำหน้าที่ต่างกันอย่างไร

## สรุปจำสั้น ๆ

```text
NestJS = default ระยะยาว
Fastify = option เบา เร็ว เหมาะกับ API/webhook เล็กหรือ prototype
```
