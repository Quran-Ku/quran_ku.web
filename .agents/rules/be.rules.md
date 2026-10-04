# Backend Rules & Guardrails

Dokumen ini adalah aturan backend resmi yang **wajib** diikuti untuk proyek **Quran Ku Web** (`quran-ku-web`).

Tujuan utama:
- Menjadikan `src/app/api/v1/**` sebagai **BFF / backend proxy resmi**.
- Memisahkan boundary Next.js App Router, application use cases, domain repository ports, dan infrastructure data sources.
- Menerapkan arsitektur server terinspirasi **NestJS** (Modules, Application Use Cases, Domain Repositories, DTOs, Mappers, Zod Validation).
- Memastikan static seed datasets (`quran.json`, `doa.json`) hanya diakses di sisi server (Server-Only).
- Meningkatkan security, maintainability, validasi input, dan testability.

---

## 1. Prinsip Inti Backend

1. **Frontend tidak boleh mengakses persistence / filesystem JSON langsung**
   - Semua akses dataset Quran dan Doa wajib terjadi di server melalui backend modules pada `src/server/modules/**`.
   - FE data source hanya boleh memanggil HTTP API internal `/api/v1/**` via `apiClient`.

2. **Server-Side Data Sources adalah server-only**
   - File data `src/server/data/quran.json` dan `src/server/data/doa.json` hanya boleh dibaca dari server infrastructure datasource.
   - Dilarang mengimport dataset JSON besar secara langsung ke client bundle / komponen React.

3. **`src/app/api/**` adalah entry point backend (Thin Controller Adapter)**
   - Route handler hanya menerima request, validasi input dengan Zod, memanggil server use case, lalu mengembalikan response JSON standar.
   - Parsing JSON, mapping record, dan business rule tidak boleh menumpuk di `route.ts`.

4. **Setiap module backend harus terpisah**
   - Modul utama: `quran`, `doa`, `deeplink`.
   - Masing-masing modul memiliki domain, application, infrastructure, dan module factory (`*.module.ts`).

5. **Fail closed, bukan fail open**
   - Jika data tidak ditemukan, validasi gagal, atau terjadi error, request harus gagal dengan status code & error code yang jelas (`400`, `404`, `422`, `500`).
   - Dilarang membuat fallback “success palsu” saat request tidak valid.

---

## 2. Struktur Folder Backend Wajib

Struktur target yang harus diikuti:

```text
src/
├── app/
│   └── api/
│       └── v1/
│           ├── quran/
│           │   ├── route.ts                 # GET /api/v1/quran
│           │   ├── [surah]/
│           │   │   ├── route.ts             # GET /api/v1/quran/:surah
│           │   │   └── [ayah]/
│           │   │       └── route.ts         # GET /api/v1/quran/:surah/:ayah
│           ├── doa/
│           │   ├── route.ts                 # GET /api/v1/doa
│           │   └── [slug]/
│           │       └── route.ts             # GET /api/v1/doa/:slug
│           └── deeplink/
│               └── resolve/
│                   └── route.ts             # POST /api/v1/deeplink/resolve
│
└── server/
    ├── data/
    │   ├── quran.json
    │   └── doa.json
    ├── shared/
    │   ├── errors/                          # AppError, NotFoundError, ValidationError, InvalidDeepLinkError
    │   ├── validation/                      # Zod validation schemas
    │   └── http/                            # createSuccessResponse, createErrorResponse
    └── modules/
        ├── quran/
        │   ├── domain/
        │   │   ├── entities/                # quran-surah.entity.ts, quran-ayah.entity.ts
        │   │   └── repositories/            # quran.repository.ts (port interface)
        │   ├── application/
        │   │   ├── dto/                     # quran-response.dto.ts
        │   │   └── use-cases/               # get-surah-list, get-surah-detail, get-ayah
        │   ├── infrastructure/
        │   │   ├── datasource/              # quran-json.data-source.ts
        │   │   ├── mappers/                 # quran.mapper.ts
        │   │   └── repositories/            # quran-json.repository.ts
        │   └── quran.module.ts              # createQuranModule() factory
        ├── doa/
        │   ├── domain/
        │   ├── application/
        │   ├── infrastructure/
        │   └── doa.module.ts
        └── deeplink/
            ├── domain/
            ├── application/
            ├── infrastructure/
            └── deeplink.module.ts
```

---

## 3. Boundary Wajib Antar Layer

### A. Client / Presentation
**Boleh:**
- Memanggil `apiClient.get('/api/v1/...')`
- Memakai `RemoteDataSource`
- Memakai DTO / Response model yang didesain untuk client

**Dilarang:**
- Import module `src/server/**`
- Import data JSON dari server
- Menjalankan business logic server di browser

### B. `src/app/api/**` (Route Adapter)
**Boleh:**
- Parsing request query, params, atau body
- Validasi schema menggunakan Zod
- Memanggil Server Module factory / Use Case
- Mapping hasil ke response HTTP standar

**Dilarang:**
- Query/baca file JSON langsung di `route.ts`
- Menulis business rule panjang di `route.ts`
- Memanggil module `'use client'`

### C. `src/server/modules/**/application` (Use Case)
**Boleh:**
- Orkestrasi business flow domain
- Memanggil domain repository port interface
- Melempar domain errors (`NotFoundError`, `ValidationError`, dll.)

**Dilarang:**
- Mengandung detail HTTP (`NextRequest`, `NextResponse`)
- Mengandung JSX / React

### D. `src/server/modules/**/infrastructure`
**Boleh:**
- Implementasi repository interface port
- Akses data source (JSON filesystem, memori cache, remote database)
- Mapping data mentah ke domain entity via Mapper

---

## 4. Aturan Validasi Server (Zod)

1. Validasi server adalah sumber kebenaran utama (Authoritative).
2. Semua field parameter wajib divalidasi:
   - `surah`: integer antara `1` sampai `114`
   - `ayah`: positive integer `> 0`
   - `slug`: safe string regex `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`
   - `target`: string path terdaftar dan host yang diizinkan (`quran-ku.com` / localhost).
3. Tolak input berbahaya:
   - `javascript:` URL
   - `data:` URL
   - Path traversal (`../`)
   - Domain external asing (pencegahan *Open Redirect*).

---

## 5. Standard Error & Response Envelope

### Success Response:
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response:
```json
{
  "success": false,
  "error": {
    "code": "SURAH_NOT_FOUND",
    "message": "Surah with number 999 not found"
  }
}
```

HTTP Status Codes:
- `200` OK
- `400` BAD REQUEST / INVALID DEEP LINK
- `404` NOT FOUND
- `422` VALIDATION ERROR
- `500` INTERNAL SERVER ERROR

---

## 6. Definition of Done (DoD) Backend

1. Route handlers di `src/app/api/v1/**` hanya berupa thin adapter.
2. Semua input request tervalidasi menggunakan Zod schema.
3. Seluruh business logic berada di server application use cases.
4. Data JSON tersimpan di server dan diakses melalui server repository implementation.
5. Unit tests mencakup use case, validation, mapper, dan deep link resolver.
6. Build `pnpm build` dan test `pnpm test` lulus 100%.
