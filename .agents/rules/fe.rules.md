# Frontend Rules & Architectural Guardrails

Dokumen ini adalah aturan frontend resmi dan wajib dipatuhi untuk proyek **Quran Ku Web** (`quran-ku-web`).

Tujuan utama:
- Menegakkan arsitektur berlapis yang konsisten (**Clean Architecture & Domain-Driven Design**).
- Memisahkan boundary **Client**, **Server**, dan **Core** secara jelas.
- Menjamin kepatuhan penuh terhadap prinsip **Zero `any`** (Strict Type Safety).
- Standarisasi Dependency Injection client dengan **`@needle-di/core`**.
- Mencegah duplikasi utilitas dengan prinsip **Core-First (`src/core`)**.
- Memastikan semua route halaman dan API endpoint terpusat di **Constants (`src/core/constants`)**.
- Mewajibkan implementasi **Locale Translator (`src/core/translator`)** dengan default bahasa **ID / EN** di setiap view.
- Menetapkan panduan **Do's and Don'ts** serta **Security Guardrails** di sisi Client/Frontend.

---

## 1. Target Struktur Arsitektur

Struktur target proyek:

```text
src/
├── app/                         # Next.js App Router, page dan API route adapter
│   ├── api/v1/                  # API boundary ke server modules
│   ├── quran/                   # /quran dan /quran/[surah]
│   ├── doa/                     # /doa dan /doa/[slug]
│   ├── open/                    # /open (Deep link app gateway)
│   ├── layout.tsx               # Root layout dengan SEO & JSON-LD
│   └── page.tsx                 # Root Landing Page Adapter
├── client/                      # Seluruh kode frontend/client-side application
│   ├── data/                    # API model, data source, mapper, repository implementation
│   ├── domain/                  # Entity, repository interface, use case
│   └── presentation/            # View, hooks, constants, components
├── core/                        # Shared client-safe utilities
│   ├── constants/               # Page routes, API routes, deep link routes, app config
│   ├── di/                      # Client dependency injection container (@needle-di/core)
│   ├── http-client/             # Client/proxy HTTP client (apiClient)
│   ├── theme/                   # Brand & Semantic Color Tokens
│   ├── translator/              # Locale dictionaries and translator helpers
│   └── utils/                   # Shared pure utilities (slug, open-app, arabic)
└── server/                      # Server-only modules, infrastructure, validation, errors
    ├── data/                    # Static datasets (quran.json, doa.json)
    ├── modules/                 # Modular domains (quran, doa, deeplink)
    └── shared/                  # Shared errors, Zod validation, HTTP response helpers
```

---

## 2. Alur Data Resmi (FE to BE Clean Architecture Flow)

Seluruh komunikasi data wajib mengikuti alur berjenjang tanpa memotong layer:

```text
================================================================================
                                FRONTEND (CLIENT) FLOW
================================================================================
  1. View (<Module>View.tsx)
     │  - Layout visual, JSX, styling, responsive design, event binding
     ▼
  2. ViewModel / Hook (hooks/use<Module>.ts)
     │  - State UI lokal, player state, filter state, translator state
     │  - Resolve UseCase via getService(TOKENS.<UseCaseToken>) dari src/core/di
     ▼
  3. UseCase (src/client/domain/<module>/usecase/*-use-case.ts)
     │  - Orchestrasi business logic frontend
     │  - Menggunakan Entity, bukan API Model
     ▼
  4. Repository Interface (src/client/domain/<module>/repository/*-repository.ts)
     │  - Kontrak domain murni
     ▼
  5. Repository Implementation (src/client/data/<module>/repository/*-repository-impl.ts)
     │  - Mengonversi Model (API) <-> Entity (Domain) via Mapper
     ▼
  6. Data Source / API Source (src/client/data/<module>/data_source/*-remote-data-source-impl.ts)
     │  - Menggunakan apiClient dari src/core/http-client/api-client.ts
     │  - Menggunakan API constants dari src/core/constants/api-routes.ts
     ▼
  7. HTTP Request Proxy (/api/v1/*)
     │
================================================================================
                                BACKEND (SERVER) FLOW
================================================================================
  8. Next.js API Route Adapter (src/app/api/v1/**/route.ts)
     │  - Request parsing, Zod schema validation, response mapping
     ▼
  9. Server Use Case (src/server/modules/<module>/application/use-cases/*-use-case.ts)
     │
     ▼
  10. Server Domain Repository Port (src/server/modules/<module>/domain/repositories/*-repository.ts)
     │
     ▼
  11. Server Infrastructure Repository (src/server/modules/<module>/infrastructure/repositories/*-repository.ts)
     │
     ▼
  12. Server JSON DataSource / DB (src/server/modules/<module>/infrastructure/datasource/*-json.data-source.ts)
```

---

## 3. Strict Type Safety: Zero `any` Policy

🚫 **DILARANG MENGGUNAKAN `any` DALAM KONDISI APAPUN.**

Tidak ada pengecualian untuk `any`, baik sebagai tipe variabel, parameter fungsi, return type, type assertion (`as any`), maupun generic parameter.

Aturan ini berlaku untuk:
- Production code (`src/**/*.ts`, `src/**/*.tsx`).
- Test code (`tests/**/*.test.ts`, `tests/**/*.test.tsx`).
- Helper, mock, data fixture, mapper, dan configuration code.

Gunakan alternatif:
- `unknown` + type guard / assertion functions
- `Record<string, T>` dengan value type eksplisit
- Generics tertutup & Discriminated Unions

---

## 4. Pemisahan Tegas Model vs Entity

Wajib memisahkan tipe data payload network (**Model**) dengan domain state (**Entity**).

### Data Layer (`src/client/data/**`) -> Model
- Model mencerminkan struktur JSON payload asli dari backend API.
- Model hanya boleh digunakan di data source dan repository implementation.
- Mapping Model -> Entity dilakukan di repository implementation via Mapper.

### Domain Layer (`src/client/domain/**`) -> Entity
- Entity berada di `src/client/domain/<module>/entity/`.
- Repository interface berada di `src/client/domain/<module>/repository/`.
- Use case berada di `src/client/domain/<module>/usecase/`.
- Domain layer tidak boleh import React, JSX, API client, data model, atau server module.

### Presentation Layer (`src/client/presentation/**`) -> Entity
- View, hooks, dan sub-komponen wajib menggunakan Entity dari domain layer.
- Dilarang membuat interface/type baru yang menduplikasi Entity di folder presentation.

---

## 5. Dependency Injection Client (`@needle-di/core`)

Dependency Injection client dikelola secara sentral menggunakan **`@needle-di/core`**.

Lokasi:
- `src/core/di/tokens.ts`
- `src/core/di/register-client-dependencies.ts`
- `src/core/di/container.ts`

Penggunaan di hook:

```typescript
import { useMemo } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";

export function useQuranList() {
  const getSurahListUseCase = useMemo(
    () => getService(TOKENS.GetQuranSurahListUseCase),
    []
  );
  return { getSurahListUseCase };
}
```

🚫 **DILARANG manual wiring / new Repository di Presentation.**

---

## 6. Jaringan & HTTP Client

🚫 **DILARANG membuat HTTP request dari scratch atau `fetch()` langsung di `src/client/data/**` atau presentation.**

Gunakan shared API client:
- `src/core/http-client/api-client.ts`
- Endpoint wajib menggunakan `src/core/constants/api-routes.ts`.

---

## 7. Sentralisasi Constants

Semua string path route, API endpoint, deep links, dan semantic color tokens harus terpusat:
- `src/core/constants/routes.ts`
- `src/core/constants/api-routes.ts`
- `src/core/constants/deep-link-routes.ts`
- `src/core/constants/app-config.ts`
- `src/core/theme/colors.ts`

---

## 8. Struktur Directory Modul Presentation

Setiap modul UI mengikuti struktur:

```text
src/client/presentation/views/<module>/
├── hooks/
│   └── use<Module>.ts
├── constants/
│   ├── SemanticIdConstant.ts
│   └── TextConstant.ts
├── components/
│   ├── <SubComponent>.tsx
│   └── index.ts (opsional)
├── <Module>View.tsx
└── index.ts
```

Modul yang ada di Quran Ku:
- `src/client/presentation/views/landing/`
- `src/client/presentation/views/quran/`
- `src/client/presentation/views/surah/`
- `src/client/presentation/views/doa/`
- `src/client/presentation/views/doa-detail/`
- `src/client/presentation/views/open-gateway/`

---

## 9. Definition of Done (DoD) Frontend

Modul frontend dianggap **Done & Compliant** jika:
1. **Directory Modular**: Memenuhi struktur `hooks/`, `constants/`, `components/`, `<Module>View.tsx`, `index.ts`.
2. **Client Location**: Kode frontend berada di `src/client/**`.
3. **Alur Arsitektur**: `View -> Hook -> UseCase -> Repository Interface -> Repository Impl -> Data Source -> ApiClient -> /api/v1`.
4. **Zero `any`**: 100% bebas dari tipe `any`, cast `as any`, dan loose typing.
5. **Model vs Entity**: Data layer menggunakan Model; Domain dan Presentation menggunakan Entity.
6. **Dependency Injection**: Menggunakan `@needle-di/core` terpusat via `getService(TOKENS.<Name>)`.
7. **Constants Terpusat**: Page route memakai `ROUTES`; API endpoint memakai `API_ROUTES`; Deep link memakai `DEEP_LINK_ROUTES`.
8. **Translator / TextConstant**: Semua text UI memakai translator atau `TextConstant`.
9. **Arabic Typography & Direction**: Teks Arab Quran menggunakan `dir="rtl"` dan `font-arabic`.
10. **Build & Test**: Lulus `pnpm test` dan `pnpm build`.
