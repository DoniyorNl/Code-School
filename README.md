# 🎓 CodeSchool — Dasturlash kurslari

> O'zbek tilida zamonaviy dasturlash kurslari platformasi. Next.js, TypeScript va Supabase asosida qurilgan.

**Live:** [samb3x.vercel.app](https://samb3x.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## Nima bor?

- 📚 **Kurslar va kitoblar** — kategoriyalar bo‘yicha (Programming, Design, Marketing va boshqalar)
- 🔍 **Sidebar navigatsiya** — kurslar/kitoblar bo‘limlari
- ⭐ **Reyting** — 5 yulduzli reyting va fikr-mulohazalar
- 📊 **HH.uz ma’lumotlari** — bo‘sh ish o‘rinlari va maosh statistikasi
- 🎯 **Filtr va tartiblash** — reyting, narx bo‘yicha
- **SSR** — tez yuklanish, SEO qulay

## Texnologiyalar

| Qism        | Texnologiya              |
|------------|---------------------------|
| Frontend   | Next.js, TypeScript, CSS Modules |
| Ma’lumotlar bazasi | Supabase (PostgreSQL) |
| Hosting    | Vercel                    |

## Loyihani ishga tushirish

1. **Reponi clone qiling**
   ```bash
   git clone https://github.com/yourusername/Code-School.git
   cd Code-School
   ```

2. **O‘rnatish**
   ```bash
   npm install
   ```

3. **Supabase**
   - [supabase.com](https://supabase.com) da loyiha yarating
   - `database-scripts/` dagi schema va `complete-setup.sql` ni SQL Editor’da ishga tushiring
   - Project Settings → API dan URL va anon key oling

4. **Environment**
   ```bash
   cp .env.local.example .env.local
   ```
   `.env.local` da qo‘ying:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (ixtiyoriy) `NEXT_PUBLIC_DOMAIN` — production URL

5. **Ishga tushirish**
   ```bash
   npm run dev
   ```
   [http://localhost:3000](http://localhost:3000)

## Production (Vercel)

Vercel’da deploy qilganda **Environment Variables** ga quyidagilarni qo‘shing (Supabase dashboard’dan):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Bular bo‘lmasa bosh sahifada “Server data fetch error” xabari chiqadi. Batafsil: [docs/DEPLOYMENT-NOTES.md](docs/DEPLOYMENT-NOTES.md), [docs/SUPABASE-GUIDE.md](docs/SUPABASE-GUIDE.md).

## Loyiha tuzilishi (qisqacha)

```
src/
├── components/      # UI komponentlar (Card, Rating, Review, …)
├── page-components/ # Sahifa komponentlari (home, course page, …)
├── layout/          # Header, Footer, Sidebar, SEO
├── pages/           # Next.js sahifalar (index, courses, books, [type]/[slug], …)
├── lib/             # Supabase client, database types
├── helpers/         # SSR, logger, validation, constants
└── config/          # site.config (title, description, baseURL)
database-scripts/    # SQL schema va seed (complete-setup.sql)
docs/                # Qo‘llanmalar (deployment, Supabase, testing, …)
```

## Qo‘shimcha hujjatlar

- [Deployment (Vercel, env)](docs/DEPLOYMENT-NOTES.md)
- [Supabase sozlash](docs/SUPABASE-GUIDE.md)
- [Database schema](docs/DATABASE-SCHEMA.md)
- [Portfolio uchun batafsil README](docs/README-PORTFOLIO.md)

---

**CodeSchool** — Doniyor Nasriddiov. Barcha huquqlar himoyalangan.
