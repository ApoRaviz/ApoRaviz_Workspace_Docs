# LINE OA Webhook And Messaging API

บทนี้อธิบาย LINE OA สำหรับระบบจริง เช่น MooPing Reward ที่ต้องแจ้งเตือนลูกค้าผ่าน LINE แต่ยังต้องปลอดภัยและไม่ทำให้ frontend เก็บ secret

## ภาพจำง่าย ๆ

คิดว่า LINE OA เป็นพนักงานส่งข้อความของร้าน

แต่พนักงานคนนี้ไม่ควรถือกุญแจร้านไว้ในหน้าจอลูกค้า

```text
Angular frontend = หน้าจอที่ staff ใช้
Backend = หลังร้านที่เก็บกุญแจและตัดสินใจส่งข้อความ
LINE Messaging API = ทางส่งข้อความไปหาลูกค้า
```

## ทำไมต้องมี backend

การส่งข้อความผ่าน LINE Messaging API ต้องใช้ `channel access token`

token นี้คือกุญแจสำคัญ ห้ามอยู่ใน Angular frontend เพราะ user สามารถเปิดดูไฟล์ frontend หรือ network request ได้

flow ที่ถูกต้อง:

```text
Angular
-> Backend API
-> LINE Messaging API
-> Customer LINE chat
```

## Webhook คืออะไร

`webhook` คือ endpoint ที่ LINE เรียกกลับมาหา backend ของเราเมื่อมี event เช่น:

- ลูกค้าเพิ่ม LINE OA เป็นเพื่อน
- ลูกค้าส่งข้อความ
- ลูกค้าบล็อกหรือเลิกติดตาม
- ลูกค้ากด postback action
- account link สำเร็จหรือไม่สำเร็จ

สำหรับ MooPing Reward event สำคัญที่สุดตอนเริ่มคือ:

```text
follow event = ลูกค้าเพิ่ม LINE OA เป็นเพื่อน
```

เพราะ backend จะได้ `LINE userId` เพื่อใช้ผูกกับ customer profile

## LINE userId ไม่ใช่ LINE ID

`LINE userId` คือ id ที่ LINE ออกให้สำหรับระบบ API

ไม่ใช่ LINE ID ที่คนใช้ค้นหาเพื่อน

ในระบบจริงให้เก็บ `line_user_id` ไม่ต้องเก็บข้อมูลส่วนตัวเกินจำเป็น

## Signature Validation

ทุก request ที่เข้า `/line/webhook` ต้องตรวจ signature ก่อน process

เหตุผล:

```text
ถ้าไม่ตรวจ signature
คนอื่นอาจยิง request ปลอมเข้ามาให้ระบบเพิ่มแต้ม ส่งข้อความ หรือผูกบัญชีผิดคนได้
```

ขั้นตอนระดับ concept:

```text
1. รับ raw request body
2. อ่าน header `x-line-signature`
3. ใช้ channel secret ตรวจ HMAC ตาม LINE docs
4. ถ้า signature ไม่ถูกต้อง ให้ reject
5. ถ้าถูกต้อง ค่อย process event
```

## Webhook Redelivery และ Idempotency

LINE อาจส่ง webhook event ซ้ำได้เมื่อระบบเราตอบไม่สำเร็จหรือ network มีปัญหา

ดังนั้น backend ต้องกันการ process ซ้ำด้วย `webhookEventId`

```text
webhookEventId เคย process แล้ว -> skip
webhookEventId ยังไม่เคย process -> process และบันทึก log
```

คำว่า `idempotency` แปลแบบง่าย:

```text
ยิงซ้ำกี่ครั้ง ผลลัพธ์สำคัญต้องไม่ซ้ำจนข้อมูลเพี้ยน
```

ตัวอย่างที่ต้องระวัง:

```text
ถ้า follow event ถูกส่งซ้ำ
ระบบต้องไม่สร้าง customer ซ้ำ 2 คน
```

## Push Message

`push message` คือ backend ส่งข้อความไปหาลูกค้าเองเมื่อมีเหตุการณ์ เช่น:

- ซื้อแล้วสะสมเป็น 8/10
- ใกล้ครบ 10 ไม้
- ได้ reward ใหม่
- เลือกของแถมแล้ว
- มี reward ค้างอยู่

สำหรับร้านหมูปิ้ง ห้ามส่งเยอะจนรบกวน

ควรส่งเฉพาะ message ที่ช่วยลูกค้าจริง:

```text
วันนี้สะสมแล้ว 8/10 ไม้ อีก 2 ไม้รับของแถมได้ครับ
```

## Account Linking

ปัญหาสำคัญ:

```text
ลูกค้าแอด LINE แล้ว backend รู้ LINE userId
แต่ยังไม่รู้ว่ายอดสะสมหน้าร้านของคนนี้คือ customer profile ไหน
```

จึงต้องมี flow ผูกบัญชี

ทางเลือกเริ่มต้น:

```text
Staff-assisted link code
```

เช่น iPad แสดง code สั้น ๆ แล้ว staff หรือลูกค้าใช้ code นั้นเพื่อผูก LINE กับ customer profile

ทางเลือกมาตรฐานกว่าในอนาคต:

```text
LINE account linking
```

ข้อดีคือ LINE มี flow ช่วยป้องกันการผูกบัญชีผิดคน แต่ implementation ซับซ้อนขึ้น

## Privacy Rule

เก็บข้อมูลเท่าที่จำเป็น:

- `line_user_id`
- ชื่อแสดงผลหรือชื่อเล่น
- เบอร์ท้าย 4 หลักถ้าจำเป็น
- ยอดสะสม
- ประวัติซื้อ/แลก reward

หลีกเลี่ยง:

- ที่อยู่
- เลขบัตร
- วันเกิด
- ข้อมูลจ่ายเงินละเอียด
- ข้อมูลที่ไม่ช่วย reward flow

ข้อความ LINE ควรสั้นและไม่เปิดเผยข้อมูลส่วนตัวเกินจำเป็น

## MooPing Reward Flow

```text
1. ลูกค้าแอด LINE OA
2. LINE ส่ง follow webhook ไป backend
3. Backend ตรวจ signature
4. Backend เก็บ line_user_id
5. Staff ผูก line_user_id กับ customer profile ผ่าน iPad
6. Staff บันทึกยอดซื้อ
7. Backend คำนวณ reward
8. Backend บันทึก transaction/reward
9. Backend ส่ง LINE message ถ้าควรส่ง
10. Backend บันทึก notification log
```

## จุดที่มักงง

- แอด LINE OA อย่างเดียวไม่ได้แปลว่าระบบรู้ยอดสะสมของลูกค้าคนนั้นแล้ว
- LINE userId ต้องมาจาก webhook หรือ API ที่ถูกต้อง ไม่ใช่ให้ลูกค้ากรอกเอง
- Access token ต้องอยู่ backend ไม่ใช่ Angular
- Webhook อาจถูกส่งซ้ำได้ ต้องกัน duplicate
- Push message มีต้นทุน/โควตา/ความรำคาญ ต้องมี policy

## Self-check

ลองตอบเอง:

1. ทำไม LINE token ห้ามอยู่ใน frontend
2. ถ้าลูกค้าแอด LINE แล้ว ระบบรู้ทันทีไหมว่าเขามียอดสะสมเท่าไร
3. `webhookEventId` ช่วยกันปัญหาอะไร
4. `follow event` ใช้ทำอะไรในระบบ MooPing Reward
5. ทำไมควรส่ง notification เฉพาะข้อความที่มีประโยชน์

## References

- LINE Developers: Receive messages webhook - `https://developers.line.biz/en/docs/messaging-api/receiving-messages/`
- LINE Developers: Send messages - `https://developers.line.biz/en/docs/messaging-api/sending-messages/`
- LINE Developers: Get user IDs - `https://developers.line.biz/en/docs/messaging-api/getting-user-ids/`
- LINE Developers: User account linking - `https://developers.line.biz/en/docs/messaging-api/linking-accounts/`

## สรุปจำสั้น ๆ

```text
LINE OA = ช่องทางคุยกับลูกค้า
Webhook = LINE เรียกกลับมาหา backend
Push message = backend ส่งข้อความไปหาลูกค้า
Secret/token = อยู่ backend เท่านั้น
```

