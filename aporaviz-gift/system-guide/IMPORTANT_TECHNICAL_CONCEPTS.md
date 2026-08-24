# Important Technical Concepts

หัวข้อนี้เลือกเฉพาะแนวคิดที่มี implementation จริงใน repo

## Standalone Component + Dependency Injection

**คืออะไร:** Angular componentไม่ต้องประกาศใน NgModule; dependencyขอผ่าน `inject()`. NestJSใช้ constructor injectionผ่าน Module providers

**ทำไมใช้:** ลด wiring frontend และแยก backend responsibilities

**อยู่ตรงไหน:** `BuilderPage`, `PublicGiftPage`, `GiftApiService`; `AppModule`, feature modules, services

**Flow:** Router → instantiate component → inject service → HttpClient. Controller → inject domain service → inject Prisma/provider

**ถ้าไม่มี:** ต้อง new dependenciesเอง ทำ test/mocking/lifecycleยากขึ้น

## Angular Signal / Computed

**คืออะไร:** reactive state primitives. `signal` เก็บค่า; `computed` derive โดยอัตโนมัติ

**ใช้ที่:** `builder.page.ts:48-70`, `public-gift.page.ts:30-42`

**ตัวอย่าง:** draftเปลี่ยน → `readyMedia`/`canPay`คำนวณใหม่ → template disable/enable button

**Input/Output:** inputคือ signal dependencies; outputคือ current derived valueที่ templateเรียก

**ถ้าไม่มี:** ต้องจัด state/update UI manuallyหรือใช้ RxJS store

## RxJS Observable และ `firstValueFrom`

`HttpClient` คืน Observable; componentแปลง first emissionเป็น Promiseเพื่อ await. ใช้ในทุก API action เช่น `chooseOccasion()` → `firstValueFrom(api.createDraft())`. HTTP emitsครั้งเดียวจึงเหมาะ; ไม่มี long-lived subscription

## SSR + Hydration

**คืออะไร:** server render HTMLแรก; browser hydrateให้ interactive

**Files:** `main.server.ts`, `server.ts`, `app.config.server.ts`, `provideClientHydration()`

**จุดสำคัญ:** localStorage/location/navigatorไม่มีบน server จึงใช้ `isPlatformBrowser()`. Public gift APIสามารถถูกเรียกระหว่าง SSRผ่าน HttpClient; builder resume intentionallyหยุด server passเพราะ tokenอยู่ browser

## REST API + DTO Contract

`GiftApiService` map methodเป็น HTTP; controllers map HTTPเป็น service; DTO interfacesใน contractsกำหนด JSON shape. TypeScript typesหายตอน runtime จึง body validationใช้ Zod

## Zod Validation Pipe

Controllerสร้าง `new ZodValidationPipe(schema)`. Pipeรับ unknown body → `safeParse` → typed dataหรือ 400 issues. Shared schemaทำให้ APIกับ catalog/typesอยู่ packageเดียวโดยไม่ผูก Nest/Angular

## Prisma Client / Migration / Seed

- schema = data model
- generated client = typed query API
- migration = SQL historyเปลี่ยน DBจริง
- seed = upsert package baseline
- `PrismaService`เชื่อม Nest DIกับ client

Flow: Service → Prisma delegate → pg adapter → PostgreSQL → typed result

## Transaction

**คืออะไร:** กลุ่ม DB operationsสำเร็จ/rollbackด้วยกัน

**ใช้:** reserve slot, package update, order, payment create/complete/cancel/expire

**ตัวอย่าง:** create Paymentและเปลี่ยน Giftเป็น PAYMENT_PENDINGอยู่ transactionเดียว

**ถ้าไม่มี:** อาจมี payment rowแต่ giftยัง DRAFT หรือกลับกัน

## PostgreSQL Advisory Lock

**คืออะไร:** application-defined lockใน DB

**Per gift:** `pg_advisory_xact_lock(hashtext(giftId))` serialize writes giftเดียว

**Cron:** `pg_try_advisory_lock(numericKey)` ให้หลาย replicaมี workerเดียว

**ถ้าไม่มี:** concurrent upload/package/payment/cronอาจแข่งกันแม้แต่ละ queryถูกต้องแยกกัน

## Idempotency

**คืออะไร:** retry requestเดิมไม่สร้างผลซ้ำ

**ใช้:** Payment unique `idempotencyKey`; webhook unique `providerEventId`; complete/cancel/media confirm/deleteมี status/existence checks

**Caller:** browser UUID → header → controller → payment lookup/create

**ถ้าไม่มี:** double click/network retryอาจสร้างหลาย chargeหรือ publishซ้ำ

## Opaque Token + Hash

Tokenเป็น random secretไม่มี payload; SHA-256 hashเก็บ DB. เวลาตรวจ hash receivedแล้ว `timingSafeEqual`. ต่างจาก JWTเพราะ serverต้องอ่าน Gift rowและไม่มี claims/expiryใน token

## Digital Signature / HMAC

- Cloudinary SDK sign canonical upload paramsด้วย secret; browserส่ง params+signature
- Opn webhook HMAC sign `timestamp.rawBody`
- signatureพิสูจน์ integrity/secret possession ไม่ได้ encryptข้อมูล

## Signed Direct Upload

Browser upload binaryตรง providerแต่ serverควบคุมสิทธิ์ด้วย reservation/signatureและ verifyหลัง upload. ลด API loadโดยไม่มอบ secretให้ browser

## Snapshot

Purchase success copy template/package configลง Gift JSON. Template snapshotถูกอ่านใน public rendering. เป้าหมายคือของขวัญเดิมไม่เปลี่ยนเมื่อ catalogเปลี่ยน

## CORS และ Preflight

CORSเป็น browser policy. Custom Authorization/Idempotency headersอาจทำให้ browserส่ง OPTIONSก่อน; API allowed methods/headersรองรับ. CORSไม่กัน curl/server attacker จึงยังต้อง token/validation

## CSP

Content Security Policyจาก SSRจำกัดแหล่ง script/image/font/connect ลด XSS/data injection impact. จำเป็นมากเพราะ edit tokenอยู่ localStorage แต่ไม่ใช่การรับประกันว่า XSSเป็นศูนย์

## Raw Body Webhook

HMACต้อง bytesตรงที่ผู้ส่ง sign. `NestFactory.create({rawBody:true})` เก็บ `request.rawBody`; controllerส่ง Bufferเข้า serviceก่อน parse JSON. หาก stringify objectใหม่ whitespace/orderอาจต่างและ signature fail

## Scheduler / Eventual Cleanup

Cronไม่เกิดจาก user request แต่ทำ reconciliation/expiry/cleanupตามเวลา. External Cloudinaryกับ DBไม่อยู่ transactionเดียว จึงใช้ state `DELETION_PENDING` + retryแทน distributed transaction

## Semantic Template Composition

Contractเก็บ `layoutKey + stylePackKey + decorationPackKey + configVersion + tokens`. Runtimeมี rendererเดียว `story-reveal`; frontendปัจจุบันใช้ tokensในการ renderและ decoration label. Snapshot versionเปิดทาง migrationอนาคตแต่ยังไม่มี multi-layout switch
