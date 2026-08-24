# Feature Flows

ทุก flow ด้านล่างอิง caller และ implementation จริง

## 1. Create Guest Draft

```text
User click occasion
→ BuilderPage.chooseOccasion()
→ GiftApiService.createDraft()
→ POST /v1/drafts {occasionKey}
→ GiftsController.createDraft() + Zod
→ GiftsService.createDraft()
→ random token + SHA-256 hash
→ Prisma gift.create()
→ DraftDto + one-time editToken
→ localStorage + navigate /builder/:id + countdown
```

Files: `builder.page.ts:105-115`, `gift-api.service.ts:33-35`, `gifts.controller.ts:29-35`, `gifts.service.ts:49-61`

## 2. Resume / Read Draft

Route ID → `BuilderPage.ngOnInit()` → localStorage token → `loadDraft()` → `GiftApiService.getDraft()` → `GiftsController.getDraft()` → `GiftsService.getDraft()` → `gift.findUnique(include media order)` → token compare → `DraftDto`. UI set draft, server-clock-adjusted countdown และ design step

ไม่มี token: frontendหยุดก่อน API. Tokenผิด: 403. Giftไม่พบ: 404. GETไม่ได้บังคับ draft unexpired/status DRAFT; ถือเป็น read-authorized endpointจน cleanupลบ

## 3. Select Template / Package / Edit Message

User event → `chooseTemplate()`/`choosePackage()`/`saveMessage()` → private `patch()` → PATCH endpoint → Zod → `GiftsService.updateDraft()`

Backend transaction+advisory lock:

- templateต้องมีใน catalogและตรง occasion
- เปลี่ยน occasionแล้ว templateเดิมคนละ occasionถูก clear
- packageต้อง activeใน DB; downgradeได้เมื่อ occupied media ≤ maxใหม่
- event dateแปลงเป็น UTC midnight date

Responseแทนที่ draft signal; message inputsก่อน submitแก้ local signalผ่าน `updateField()`

## 4. Upload Image

`uploadFiles()` ทำทีละไฟล์ตามลำดับ:

1. reserve slot ใน DB
2. signed direct upload ไป Cloudinary
3. confirm ผ่าน Admin API
4. หลังครบทุกไฟล์ reload draft

Backendนับ READY + RESERVED ที่ยังไม่หมดอายุและยึด package row. อ่านละเอียดใน [SIGNATURE_AND_UPLOAD_FLOW.md](./SIGNATURE_AND_UPLOAD_FLOW.md)

## 5. Reorder Image

CDK drop หรือ keyboard arrow → copy `readyMedia` → `moveItemInArray()` → `persistOrder()` → PUT `{mediaIds}` → backend lock → compare sorted requested IDs กับ READY IDsทั้งหมด → update `displayOrder` → DraftDto → UI rerender

การส่ง ID ขาด/เกิน/ของ giftอื่น → 400 ก่อน update

## 6. Delete Image

Click delete → `removeMedia()` → DELETE endpoint → backend token/state → Cloudinary delete (`ok` และ `not found` ถือว่าสำเร็จ) → transaction lock → `deleteMany` row + update order 0..N-1 → 204 → frontend GET draft

API idempotentเมื่อ media IDไม่มีใน gift: return 204; แต่ malformed UUIDถูก `ParseUUIDPipe` rejectก่อน service

## 7. Preview

Message submit saveสำเร็จ → `step='preview'`. UI render title/message/media/finaleจาก signals/catalogและ `.watermarked::after` ที่ `builder.page.css:23`. Watermarkเป็น CSS overlay ไม่ได้แก้ไฟล์ Cloudinary. `canPay` เป็น client guard; backend checkoutตรวจ prerequisitesซ้ำ

## 8. Mock Purchase Success / Failure / Retry

Button → `checkout()` สร้าง UUID idempotency key → POST mock:

- flag mock false → 403
- keyเดิม → paymentเดิม
- create payment transaction: validate token/DRAFT/expiry/template/package/media/package DB → Payment PENDING + Gift PAYMENT_PENDING
- outcome failure → Payment FAILED + Gift DRAFT → UI errorและลองใหม่ได้
- outcome success → `completePayment()` → Gift PAID, slug, snapshots, published/expiry; Payment SUCCEEDED → UI success/public link

## 9. Opn PromptPay Purchase

POST Opn checkoutทำ create paymentเหมือน mock แล้ว `OpnService.createPromptPay()` สร้าง source/charge. Response PENDING+QR → Builder pollทุก 3 วินาที. Opn webhookหรือ 10-minute reconciliationตรวจ chargeและเรียก complete. Browser GET paymentเพียงอ่าน state

Cancel/timeout → `POST /payments/:id/cancel` lock gift, mark FAILED และคืน purchase gift DRAFT. Cronทำสิ่งเดียวกันกับ PENDINGเกิน 30 นาทีทุก 5 นาที

## 10. Share / Public Recipient Experience

Payment success → Builderสร้าง `${location.origin}/gifts/${publicSlug}` และ copy/open. Public page GET endpoint query `publicSlug + PAID + unexpired`, parse template snapshot, sign display URLs. UI flow envelope → intro → each media → finale. ไม่มี API callระหว่าง reveal/replay

## 11. Renewal

เฉพาะ browserที่เก็บ renewal tokenจาก purchase successจะแสดงปุ่ม. `renew()` → POST slug + bearer + idempotency/provider:

- backendต้อง PAID/unexpired/tokenตรง
- amountใช้ current `GiftPackage.renewalPriceSatang`
- mock success completeทันที
- Opn pendingแสดง QRและ poll
- completeขยายจาก existing `giftExpiresAt` + current package validity, ไม่ได้นับจากเวลาจ่าย
- renewal fail/cancelไม่เปลี่ยน Giftจาก PAID

Pending renewal IDไม่ได้ persist; reloadหน้าไม่ resume pollingอัตโนมัติ

## 12. Lifecycle / Delete

Scheduler → acquire advisory lock → select batches:

- RESERVEDหมดอายุ: ลบ Cloudinary + media row
- DRAFT/PAYMENT_PENDING draft expiry: `deleteGift()`
- PAID gift expiry: `deleteGift()`
- DELETION_PENDING due retry: `deleteGift()`

`deleteGift()` set status/retry timestampก่อน external delete; successลบ Gift (DB cascade children); failureเก็บ error/attemptและ schedule retry

## Features ที่ไม่มีใน source

ไม่มี Login, account CRUD, search, dashboard, email, password protection, admin, video, export หรือ hard delete endpointที่ userเรียกเพื่อลบ giftทั้งชิ้น
