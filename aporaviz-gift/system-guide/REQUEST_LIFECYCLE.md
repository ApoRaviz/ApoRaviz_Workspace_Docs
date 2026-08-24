# Request Lifecycle

เอกสารนี้เลือก 6 lifecycle สำคัญและไล่ข้อมูลจาก browserจนกลับ UI. Prefix API ทุกตัวคือ `/v1`

## Pipeline ร่วมของทุก API Request

```text
Angular HttpClient / external caller
→ HTTP + Express adapter
→ global ThrottlerGuard
→ Nest route match
→ parameter pipes (เช่น ParseUUIDPipe)
→ ZodValidationPipe เฉพาะ body ที่ประกาศ
→ Controller method
→ Domain service
→ Prisma / external provider
→ DTO/plain object
→ Nest JSON response
→ HttpClient Observable
→ firstValueFrom Promise
→ component signal/UI
```

ไม่มี auth middleware/guard แทรกกลาง; service methodsตรวจ edit tokenเอง

## 1. POST `/v1/drafts` — Create Draft

### Request shape

```json
{ "occasionKey": "birthday" }
```

`occasionKey` ต้องเป็น `birthday | anniversary | wedding` ตาม `createDraftRequestSchema`

### Lifecycle

1. User click buttonใน `builder.page.html:43-45`
2. `BuilderPage.chooseOccasion(occasionKey)` (`builder.page.ts:105`) เรียก `run()`
3. `GiftApiService.createDraft()` (`gift-api.service.ts:33`) ทำ `HttpClient.post<CreateDraftResponse>`
4. Browserส่ง JSON; endpointนี้ไม่มี Authorization
5. global `ThrottlerGuard`: route override 10 requests/60s
6. `GiftsController.createDraft()` (`gifts.controller.ts:31`) ใช้ `ZodValidationPipe(createDraftRequestSchema)`
7. `GiftsService.createDraft()`:
   - `randomBytes(32).toString('base64url')`
   - SHA-256 tokenผ่าน private `hashToken()`
   - `now`, `draftExpiresAt=now+86,400,000ms`
8. `PrismaService.gift.create({data,include:{media:true}})` INSERT `gifts`
9. `toDraftDto(gift,now)` map Prisma result → JSON-safe values
10. Service merge `{...DraftDto, editToken}`; Nest POST default status 201
11. `firstValueFrom()` resolve; component set token/draft, write localStorage, router navigate replace URL, countdown, step design

### Response shape

```json
{
  "id": "uuid",
  "status": "DRAFT",
  "occasionKey": "birthday",
  "templateKey": null,
  "packageKey": null,
  "title": "",
  "message": "",
  "eventDate": null,
  "finaleMessage": "",
  "draftExpiresAt": "ISO timestamp",
  "giftExpiresAt": null,
  "publicSlug": null,
  "media": [],
  "serverNow": "ISO timestamp",
  "editToken": "43-char base64url secret"
}
```

DB responseไม่ได้คืน `editTokenHash`, snapshots, cleanup fields หรือ timestampsภายในอื่น

## 2. PATCH `/v1/drafts/:giftId` — Edit Design/Message

### Example request

```http
PATCH /v1/drafts/<uuid>
Authorization: Bearer <opaque-edit-token>
Content-Type: application/json

{
  "templateKey": "birthday-pastel",
  "packageKey": "starter-90",
  "title": "สุขสันต์วันเกิด",
  "eventDate": "2026-08-20"
}
```

Frontend `updateDraft()` destructureและส่งเฉพาะ 7 editable fields แม้ parameterเป็น `Partial<DraftDto>`

### Lifecycle

1. Template/package clickหรือ message submit → component private `patch(changes)`
2. `GiftApiService.updateDraft()` → HttpClient PATCH + `auth(token)`
3. `ParseUUIDPipe` validate giftId
4. `ZodValidationPipe(updateDraftRequestSchema)` trim strings/max lengths/date enum
5. `GiftsController.updateDraft()` parse bearerด้วย `bearerToken()`
6. `GiftsService.updateDraft()` เปิด Prisma transaction Serializable
7. transaction acquire `pg_advisory_xact_lock(hashtext(giftId))`
8. query Gift + media ordered; no row → 404
9. `assertToken`; `assertEditable` (DRAFT/unexpired)
10. Build `Prisma.GiftUpdateInput` เฉพาะ fieldsที่ inputไม่ใช่ undefined
11. Template flow: `findTemplate`; verify occasion; occasion changeอาจ clear template
12. Package flow: query `packages`; active; count current READYหรือ reservationที่ยังไม่หมดอายุ; over new max → 409
13. Date string → `new Date('<date>T00:00:00.000Z')`
14. `tx.gift.update(include ordered media)`; commitและปล่อย xact lock
15. `toDraftDto()` สร้าง signed thumbnail URLsสำหรับ READY
16. 200 JSON → component replace `draft` signal; message submitเปลี่ยน step preview

### Concurrency meaning

Package downgradeและ media reservationของ giftเดียวกันใช้ lock keyเดียวกัน ดังนั้นไม่สามารถ downgradeผ่าน countก่อน reservation concurrent commitแบบ race

## 3. Upload Lifecycle — Reserve → Cloudinary → Confirm

นี่ไม่ใช่ HTTP requestเดียว แต่เป็น transactionทางธุรกิจ 3 request

### A. Reserve

```json
{ "fileName": "memory.png", "mimeType": "image/png", "bytes": 123456 }
```

Flow: `BuilderPage.uploadFiles()` → `GiftApiService.reserveMedia()` → POST → controller UUID/bearer/Zod → `GiftsService.reserveMedia()` → Serializable lock → Gift/Package/count/order reads → INSERT RESERVED → `CloudinaryService.createUploadSignature()` → 201

Response:

```json
{
  "mediaId": "uuid",
  "reservationExpiresAt": "ISO +10 minutes",
  "upload": {
    "uploadUrl": "https://api.cloudinary.com/v1_1/<cloud>/image/upload",
    "cloudName": "public identifier",
    "apiKey": "public key",
    "timestamp": 1787200000,
    "signature": "sha256 signature",
    "publicId": "aporaviz-gift/drafts/<giftId>/<mediaId>",
    "type": "authenticated",
    "eager": "...two transformations...",
    "overwrite": false
  }
}
```

### B. Direct upload

`GiftApiService.uploadToCloudinary()` POST multipartไป `uploadUrl`. Form contains binary + api_key + signed fields. NestJSไม่เห็น requestนี้. Cloudinary recompute signature; mismatchตอบ provider error. Angularawait responseแต่ไม่ใช้ provider asset metadata

### C. Confirm

```http
POST /v1/drafts/<giftId>/media/<mediaId>/confirm
Authorization: Bearer <token>
Content-Type: application/json

{}
```

`GiftsService.confirmMedia()` โหลด Gift+media, auth/state/expiry, returnเดิมถ้า READY, reject reservationหมดอายุ, `CloudinaryService.verifyAsset(publicId)`, validate actual public ID/size/format, update READY/metadata. Response `GiftMediaDto`; componentสุดท้าย reloadทั้ง draft

ข้อมูล trustedสุดท้ายมาจาก Cloudinary Admin API ไม่ใช่ reserve bodyหรือ upload responseใน browser

## 4. POST `/v1/drafts/:giftId/checkouts/mock` — Publish Synchronously

### Request

```http
Idempotency-Key: <crypto.randomUUID()>
Authorization: Bearer <edit-token>

{ "outcome": "success" }
```

### Lifecycle

1. Preview button → `BuilderPage.checkout('mock-success')`
2. `GiftApiService.mockCheckout()` POST typed `PaymentDto`
3. Throttle 10/min, UUID pipe, mock Zod, controller extracts two headers
4. `PaymentsService.mockCheckout()` ตรวจ feature flagและ key length
5. query payment by idempotency key:
   - found same gift + token valid → returnเดิม
   - found other gift → 409
6. private `createPayment()` transaction Serializable + gift lock
7. read Gift + READY media; auth; state/expiry/template/package/media prerequisites
8. read active package row; validate media count
9. create `payments` PENDING with DB price; update Gift PAYMENT_PENDING; commit
10. failure branch: transaction Payment FAILED/Gift DRAFT → return status FAILED
11. success branch: private `completePayment(paymentId)` transaction + lock
12. reread Payment+Gift+READY mediaและ package; enforce PENDING + Gift PAYMENT_PENDING
13. find template; construct status PAID, publishedAt, expiry, random publicSlug, template/package snapshots
14. update Giftแล้ว Payment SUCCEEDED
15. `toPaymentDto()` → 201 JSON
16. component `handlePayment()` → success step/public URL หรือ failure alert/local draft DRAFT

### Payment response

```json
{
  "id": "payment uuid",
  "giftId": "gift uuid",
  "provider": "mock",
  "purpose": "PURCHASE",
  "status": "SUCCEEDED",
  "amountSatang": 12900,
  "currency": "THB",
  "qrCodeUrl": null,
  "failureReason": null,
  "publicSlug": "random base64url",
  "giftExpiresAt": "ISO timestamp"
}
```

## 5. POST `/v1/webhooks/opn` — Verified Asynchronous Completion

### Request inputs

- exact raw body Buffer เช่น event `{id,key,data:{id:chargeId}}`
- `Omise-Signature`: comma-separated hex HMAC(s)
- `Omise-Signature-Timestamp`: Unix seconds string

### Lifecycle

1. Nest raw-body optionเก็บ original bytes
2. `PaymentsController.opnWebhook()` รับ `RawBodyRequest<Request>`; raw bodyหาย → raw `Error` 500
3. `PaymentsService.handleOpnWebhook()` เรียก private `verifyWebhook()` **ก่อน JSON.parse/DB**
4. โหลด comma-separated base64 secrets; validate headers/replay ±300s
5. HMAC expectedจาก `${timestampHeader}.${rawBody utf8}`; timing-safe compareกับ signatures
6. parse JSON; require event.id/key
7. `paymentEvent.create()` unique ID:
   - success: event audit row
   - Prisma P2002: mark duplicateแต่ทำต่อ
8. เฉพาะ `charge.complete` + data.id → `OpnService.getCharge()` ด้วย secret key
9. private `completeVerifiedCharge(charge)` query Payment by providerReference
10. reject/ignoreหาก not found/not pending/not paid/status/currency/amount/metadata/gift stateไม่ตรง
11. valid → private `completePayment()` transaction publish/renew
12. return `{accepted:true}` หรือ `{accepted:true,duplicate:true}`; POST default 201

Browserไม่อยู่ใน lifecycleนี้และ redirectไม่ใช่ input

## 6. GET `/v1/gifts/:slug` — Public Gift

### Lifecycle

1. Router `/gifts/:slug` → `PublicGiftPage.ngOnInit()`
2. `GiftApiService.getPublicGift(encodeURIComponent(slug))`; ไม่มี Authorization
3. global throttle 120/min; controllerไม่มี body pipe
4. `GiftsService.getPublicGift(slug)` query:

```text
where publicSlug = slug
and status = PAID
and giftExpiresAt > now
include media where READY orderBy displayOrder asc
```

5. no row/expiry/snapshot → 404
6. `templateConfigSchema.parse(templateSnapshot)` runtime-check snapshot; parse failปัจจุบันเป็น uncaught ZodError → 500
7. map media; each `CloudinaryService.signedDisplayUrl()`; null → 503
8. return `PublicGiftDto`; ไม่คืน Gift ID/token/package/payment
9. component set signals/SEO; render envelope. HTTP errorใด ๆถูก UIรวมเป็น not found/expired message

### Response shape

```json
{
  "title": "...",
  "message": "...",
  "eventDate": "YYYY-MM-DD or null",
  "finaleMessage": "...",
  "template": {
    "key": "birthday-pastel",
    "layoutKey": "story-reveal",
    "stylePackKey": "birthday-pastel",
    "decorationPackKey": "confetti",
    "configVersion": 1,
    "tokens": { "background": "...", "surface": "...", "primary": "...", "accent": "...", "text": "..." }
  },
  "giftExpiresAt": "ISO timestamp",
  "media": [{ "id": "uuid", "width": 100, "height": 100, "displayOrder": 0, "url": "signed URL" }]
}
```

## Response Status Summary

| Operation | Normal status |
|---|---|
| GET | 200 |
| PATCH/PUT | 200 |
| POST | 201 ตาม Nest default |
| DELETE media | 204 explicit `@HttpCode(204)` |
| validation/token/state/not found | 400/401/403/409/404 |
| throttle | 429 |
| provider/config | 502/503 |
