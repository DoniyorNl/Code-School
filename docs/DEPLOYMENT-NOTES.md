Audit va Deploy Eslatmalari (qisqacha)

Quyida loyihani tekshirish va deploy jarayonida yuzaga kelgan muammolarni bartaraf etish uchun qilingan asosiy ishlar va tavsiyalar qisqacha keltirilgan.

1. Kiritilgan va o'zgartirilgan fayllar

- `src/pages/courses.tsx`, `src/pages/books.tsx` — kurslar/kitoblar sahifalari qo'shildi.
- `src/helpers/ssr.ts` — `safeGetServerSideProps` wrapper qo'shildi (SSR xatolarni ushlash uchun).
- `src/helpers/logger.ts` — `logger.error` yangilandi, server loglarini ko'rsatishni yaxshiladi.
- `src/pages/api/test-connection.ts` — deployda Supabase ulanishini tekshirish uchun diagnostics endpoint qo'shildi.

2. O'chirilgan fayllar

- Lokal fallback va test api fayllari olib tashlandi: `src/pages/api/db.json` va bir nechta mahalliy test fayllari.

3. Muhim tuzatishlar

- `Join for free` tugmasidagi lokal `http://localhost:3000/contact` havolasi `/contact` ga o'zgartirildi.
- Dinamik routing fayllaridagi TypeScript/parse xatoliklari tuzatildi (`src/pages/[type]/index.tsx`, `src/pages/[type]/[slug].tsx`).

4. Topilgan debug/test artefaktlari (tavsiya: deploydan oldin o'chirish yoki shartli qilish)

- `src/pages/api/test-connection.ts` (diagnostics endpoint) — deploy tekshiruvi uchun foydali, lekin productionda kerakmasa olib tashlash mumkin.
- `src/pages/api/contact.ts` — ichida `console.log` yozuvlari mavjud.
- `src/helpers/pwa.ts`, `src/hooks/usePWA.ts` — PWA loglari.
- `coverage/`, `__mocks__/` — test coverage va jest mocks — deployda kerak emas.

5. Aniqlangan muammo: SQL xatosi

- Deployda paydo bo'lgan xato: `ERROR: relation "public.courses" does not exist`.
  - Sabablari: kod yoki eski migrationlar deployda `courses` jadvalini so'ramoqda, yoki Supabase schema da jadval mavjud emas.
  - Amalga oshirilishi kerak:
    1. Vercel deploy loglarini tekshirish va xatolikning to'liq stack trace'ini olish.
    2. Supabase SQL Editor'da quyidagi so'rovlarni bajarish:
       - `SELECT * FROM information_schema.tables WHERE table_schema='public' AND table_name='courses';`
       - `SELECT table_name FROM information_schema.tables WHERE table_schema='public';`
    3. Agar `courses` jadvali kerak bo'lsa, uni yaratish yoki migrations ni tiklash (agar siz migrationlardan foydalanayotgan bo'lsangiz).

6. Deploy qadamlari va tez sinovlar

- Vercel ga quyidagilarni qo'shing (Preview va Production):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Tez sinovlar:
  - `curl https://<YOUR_DEPLOY_URL>/api/test-connection` — deployed server Supabase ulanishini tekshiradi.
  - `npx tsc --noEmit` — TypeScript tekshiruvi.
  - `npm run build --if-present` — build testi.

7. Keyingi takliflar

- Keraksiz `console.log` va diagnostics endpointlarni tozalash yoki ular uchun `NODE_ENV !== 'production'` shartini qo'shish.
- `coverage/` katalogini `.vercelignore` yoki `.gitignore` ga qo'shish, deployga kiritmaslik.
- Agar `courses` jadvali aslida kerak bo'lmasa — kodni moslashtirish va `pages`/`second_categories` jadvallarini ishlatish.

Agar xohlasangiz, men quyidagi ishlarni avtomatik bajarib beraman:

- Keraksiz fayllarni (siyosat bo'yicha ro'yxatlangan) repositorydan o'chirish.
- `README.md` ga qisqacha section qo'shish.
- Vercel uchun `.vercelignore` kiritish.

Tasdiqlang — qaysi avtomatik o'chirishlarni amalga oshirishni xohlaysiz?
