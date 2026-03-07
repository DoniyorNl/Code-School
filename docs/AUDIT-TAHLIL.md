# Code-School — To'liq audit va fikrlar

## Sening tahliling to'g'ri

Barcha uchta kritik muammo repo va kod orqali tasdiqlandi.

---

## 1. Production'dagi Supabase xatosi (eng muhim)

**Nima bo'lyapti:**
- `src/lib/supabase.ts` moduli yuklanganda `NEXT_PUBLIC_SUPABASE_URL` va `NEXT_PUBLIC_SUPABASE_ANON_KEY` yo'q bo'lsa **darhol** `throw new Error('Missing Supabase environment variables')` qiladi.
- `src/pages/index.tsx` (va courses, books, `[type]/index`, `[type]/[slug]`) `getServerSideProps` da bu modulni import qiladi → env bo'lmasa xato, `safeGetServerSideProps` ushlab `fetchError` qaytaradi.
- `src/layout/layout.tsx` har bir sahifada `fetchError` bo'lsa qizil banner ko'rsatadi: *"Server data fetch error: ... Check deployment logs and Supabase env variables."*

**Natija:** Vercel'da env o'rnatilmagan bo'lsa, **bosh sahifa va boshqa SSR sahifalar** ochilganda bu xato barcha foydalanuvchilar (shu jumladan recruiter) uchun ko'rinadi.

**Yechim (faqat sening qilishing kerak):**
1. Vercel → Project → Settings → Environment Variables.
2. Qo'shish: `NEXT_PUBLIC_SUPABASE_URL` va `NEXT_PUBLIC_SUPABASE_ANON_KEY` (qiymatlar Supabase dashboard → Project Settings → API dan).
3. (Ixtiyoriy) `NEXT_PUBLIC_DOMAIN` — production URL.
4. Redeploy.

**.env.local.example** repo'da bor va to'g'ri: aynan shu nomlar kerak.

**Qo'shimcha fikr:** Agar vaqtincha env bo'lmasa ham sayt "sindirmaslik"ni xohlasang, `supabase.ts` da throw o'rniga client ni `null` qaytarib, layout'da faqat development'da banner ko'rsatish mumkin — lekin asosiy yo'l production'da env'ni to'g'ri sozlash.

---

## 2. Hero'dagi Lorem ipsum

**Holat:** `src/page-components/home-page-component/home-page-component.tsx` da hero paragrafi to'liq placeholder:
- "Lorem ipsum dolor sit amet ..."
- H1 da yana bir typo: **"Lern"** → **"Learn"**.

Bu recruiter uchun "loyiha tayyor emas" degan signal.

**Yechim:** Placeholder o'rniga real, loyihaga mos matn (masalan O'zbek tilida dasturlash kurslari, TypeScript, Next.js va boshqalar). Men buni kodda almashtirdim.

---

## 3. README — create-next-app default

**Holat:** Root `README.md` — standart create-next-app matni. Loyiha haqida, stack, screenshot, live link, features yo'q. Pizzeria / TecBlogs bilan solishtirganda zaif.

**Yechim:** `docs/README-PORTFOLIO.md` allaqachon yaxshi baza — tech stack, features, deployment, env nomlari. Root README ni shu asosda yangiladim: CodeSchool haqida, live link (site.config dagi baseURL), Supabase/Vercel bo'yicha qisqa ko'rsatma.

---

## 4. Courses va Books — ma'lumot

**Holat:** `database-scripts/complete-setup.sql` da kurslar, kitoblar, categories, pages bor. Supabase ulangan va bu script ishlatilgan bo'lsa, Courses/Books sahifalari ma'lumot bilan ishlashi kerak.

**Xulosa:** Birinchi qadam — Vercel'da env. Keyin Supabase'da loyiha ochiq bo'lsa, SQL Editor'da `complete-setup.sql` (yoki schema + seed) ni run qilgan bo'lishing yetadi. Agar hali run qilmagan bo'lsa — scriptni ishlatib 3–4 ta emas, allaqachon ko'p kurs qo'shiladi.

---

## 5. Boshqa kuzatishlar

| Narsa | Izoh |
|-------|------|
| **SEO title** | `site.config.ts` da "CodeSchool \| Dasturlash kurslari" — yaxshi. |
| **Navigatsiya** | Home, About, Courses, Books va boshqalar — mavjud. |
| **Commitlar** | 9 ta — kam; keyingi tuzatishlarni alohida commit qilsang tarix aniqroq bo'ladi. |
| **Lighthouse** | `lighthouse-report.report.html` bor — yaxshi. HTML 65%, TS 26% — SSR/static ko'p, bu Next.js uchun odatiy. |
| **Xato ko'rsatish** | `[object Object]` — chunki ba'zi joylarda `String(error)` ishlatiladi; Error ob'ektida `message` yaxshiroq. Tuzatish mumkin (qisqa ish). |

---

## Tuzatish tartibi (mening tavsiyam)

1. **Vercel'da env** (≈30 min) — hech narsa buni sening qilishingni almashtirolmaydi.
2. **Hero matn** (≈10 min) — placeholder va "Lern" typo kodda tuzatildi.
3. **README** (≈20 min) — root README yangilandi, docs/README-PORTFOLIO.md asosida.
4. **Supabase ma'lumot** — env ishlagach, `complete-setup.sql` ni run qilganingni tekshir; kerak bo'lsa qayta run qilish.

Agar xohlasang, keyingi qadamda `fetchError` ko'rsatishda `[object Object]` o'rniga aniq xabar (error.message) chiqarishni ham qilamiz.
