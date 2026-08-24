# Code Map

## High-Value Tree

```text
ApoRaviz_Gift/
├─ apps/
│  ├─ web/
│  │  ├─ angular.json                 build, SSR, environment replacement
│  │  └─ src/
│  │     ├─ main.ts / main.server.ts  browser/server bootstrap
│  │     ├─ server.ts                 Express SSR + security headers
│  │     └─ app/
│  │        ├─ app.routes.ts          3 routes + fallback
│  │        ├─ builder.page.*         creator wizard/payment polling
│  │        ├─ public-gift.page.*     recipient story/renewal
│  │        ├─ gift-api.service.ts    all frontend HTTP calls
│  │        └─ seo.service.ts         title/meta/OG/Twitter
│  └─ api/
│     ├─ prisma.config.ts             Prisma CLI connection/config
│     ├─ prisma/
│     │  ├─ schema.prisma             5 models + enums/relations/indexes
│     │  ├─ migrations/               SQL history
│     │  └─ seed.ts                   package upsert
│     └─ src/
│        ├─ main.ts                    Nest bootstrap/CORS/raw body
│        ├─ app.module.ts              module graph/global throttle/schedule
│        ├─ common/zod-validation.pipe.ts
│        ├─ config/environment.ts
│        ├─ database/prisma.service.ts
│        ├─ gifts/                     draft/media/public gift
│        ├─ media/cloudinary.service.ts
│        ├─ payments/                  mock/Opn/webhook/payment
│        └─ lifecycle/                 cron/locks/cleanup
├─ packages/contracts/src/index.ts    schemas/types/catalog
├─ e2e/                               Playwright flow + signature-aware mock API
├─ compose.yaml                       local PostgreSQL
└─ spec-summary.md                    product source of truth
```

## Frontend Files

| File / symbol | ทำอะไร | ใครเรียก | Flow |
|---|---|---|---|
| `main.ts` | browser bootstrap | Angular build-generated HTML/runtime | startup |
| `main.server.ts::bootstrap` | SSR bootstrap | Angular SSR engine | SSR |
| `server.ts::reqHandler` | Express/Angular Node request handler | Angular CLI/hosting runtimeผ่าน `ssr.entry` | SSR/static/security |
| `app.config.ts::appConfig` | register HttpClient/Router/hydration/error listeners | bootstrap | all frontend |
| `app.routes.ts::routes` | lazy component routing | Router provider | navigation |
| `App` | root router outlet | browser/server bootstrap | all screens |
| `BuilderPage` | complete creator wizard | routes `/`,`/builder/:id` | draft through publish |
| `GiftApiService` | HTTP adapter + auth headers/FormData | Builder/Public pages | all API/upload |
| `PublicGiftPage` | public story + renewal polling | `/gifts/:slug` | recipient/renewal |
| `SeoService.update()` | page title/meta | both pages ngOnInit | SSR/SEO |
| `builder.page.css::.watermarked::after` | preview watermark | builder template class | preview |

## Backend Files

| File / class | ทำอะไร | ใครเรียก | เรียกต่อ |
|---|---|---|---|
| `main.ts::bootstrap()` | create/listen API | Node/Nest CLI | AppModule, ConfigService |
| `AppModule` | compose global + feature modules | Nest bootstrap | all modules |
| `AppController/AppService` | health | HTTP | plain object |
| `ZodValidationPipe` | runtime body parse | controller parameter decorators | Zod |
| `validateEnvironment()` | config validation | ConfigModule | Zod schema |
| `PrismaService` | DB client/lifecycle | Gifts/Payments/Lifecycle | PrismaPg/PostgreSQL |
| `GiftsController` | draft/media/public routes | Nest router | GiftsService |
| `GiftsService` | gift/media business rules | GiftsController/PaymentsService | Prisma/Cloudinary |
| `CloudinaryService` | sign/verify/url/delete | Gifts/Lifecycle | Cloudinary SDK |
| `PaymentsController` | checkout/payment/renewal/webhook routes | Nest router | PaymentsService |
| `PaymentsService` | payment state/idempotency/webhook | controller/lifecycle | Gifts/Prisma/Opn |
| `OpnService` | Opn HTTP adapter/test-key guard | PaymentsService | Opn REST API |
| `LifecycleService` | cron + advisory locks + cleanup | ScheduleModule | Prisma/Cloudinary/Payments |

## Contracts

`packages/contracts/src/index.ts` มี 4 กลุ่ม:

1. enum arrays/types (`occasionKeys`, statuses)
2. package/template catalogs
3. Zod request schemas
4. response DTO interfaces

Frontendใช้ catalogs/types; backendใช้ schemas/types/catalog template; seedใช้ package catalog. Prisma modelsไม่ถูก exportข้าม boundary

## Tests เป็นหลักฐาน Flow

| Test | ล็อก behavior |
|---|---|
| `gifts.service.spec.ts` | token hash, template reject, package limit under lock, reorder, compact order |
| `cloudinary.service.spec.ts` | exact signed params/secretไม่ออก/fail closed |
| `payments.service.spec.ts` | webhook HMAC/rotation/idempotency, snapshot, states, renewal expiry, cancel/stale |
| `lifecycle.service.spec.ts` | lock winner/skip/retry timestamp |
| `gift-flow.e2e-spec.ts` | PostgreSQL guest/privacy/limits/publish/renew |
| `gift-api.service.spec.ts` | signed FormData parity |
| `builder.page.spec.ts` | pending poll + destroy cleanup |
| `e2e/gift-flow.spec.ts` | browser create/upload/watermark/pay/public reveal desktop/mobile |

## Generated / Operational Files

- `apps/api/src/generated/prisma/`: outputจาก `prisma generate`, ไม่ควรอ่านเป็น business sourceหลักหรือแก้มือ
- `dist/`, coverage, Playwright artifacts: build/test outputs
- `.env`: local secrets, ignoredจาก Git; docsอ้างเฉพาะชื่อ variable

## Start Here — อ่าน Code ลำดับไหน

1. `packages/contracts/src/index.ts` — รู้ศัพท์/JSON/catalogก่อน
2. `apps/web/src/app/app.routes.ts` — รู้ว่ามีหน้าอะไร
3. `apps/web/src/app/builder.page.html` — เห็น journeyและ event
4. `apps/web/src/app/builder.page.ts` — ตาม event/state
5. `apps/web/src/app/gift-api.service.ts` — map frontendไป endpoint
6. `apps/api/src/gifts/gifts.controller.ts` และ `payments.controller.ts` — map HTTPไป service
7. `apps/api/src/gifts/gifts.service.ts` — draft/media/token rules
8. `apps/api/src/payments/payments.service.ts` — state machine/payment/webhook
9. `apps/api/prisma/schema.prisma` — ดู persistence/relation
10. `cloudinary.service.ts`, `opn.service.ts`, `lifecycle.service.ts` — external/lifecycle details
11. Tests — ยืนยัน edge casesและ intended invariants
