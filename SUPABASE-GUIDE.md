# 🚀 SUPABASE INTEGRATSIYA - QADAMMA-QADAM YO'RIQNOMA

## 📋 UMUMIY REJA

Bu loyihada JSON fayldan o'qilayotgan ma'lumotlarni Supabase PostgreSQL database'ga ko'chiramiz.

---

## 1️⃣ SUPABASE PROJECT YARATISH

### Qadamlar:

1. **Supabase.com ga boring**

   - https://supabase.com
   - Sign up / Log in qiling

2. **Yangi project yarating:**

   - "New Project" tugmasini bosing
   - Project nomi: `codeschool` (yoki o'zingiz xohlaganingiz)
   - Database Password: kuchli parol o'ylab toping
   - Region: `Southeast Asia (Singapore)` (yaqinroq server)
   - **CREATE NEW PROJECT** bosing

3. **5-10 daqiqa kuting** - Database tayyor bo'lishini kuting

---

## 2️⃣ DATABASE SCHEMA YARATISH

### Qadamlar:

1. **SQL Editor'ga o'ting:**

   - Supabase Dashboard → chap menuda **SQL Editor**
   - "New query" bosing

2. **Schema yaratish:**

   - `supabase-schema.sql` fayldagi **BARCHA SQL** kodni copy qiling
   - SQL Editor'ga paste qiling
   - **RUN** tugmasini bosing (yoki Cmd/Ctrl + Enter)

3. **Natijani tekshiring:**
   - Chap menuda **Table Editor** ga o'ting
   - 7 ta table ko'rinishi kerak:
     - `categories`
     - `second_categories`
     - `pages`
     - `advantages`
     - `products`
     - `characteristics`
     - `reviews`

---

## 3️⃣ ENVIRONMENT VARIABLES SOZLASH

### Qadamlar:

1. **API Keys ni oling:**

   - Supabase Dashboard → **Settings** → **API**
   - 2 ta narsani copy qiling:
     - `Project URL` (masalan: https://xxxxx.supabase.co)
     - `anon public` key (uzun string)

2. **`.env.local` faylni yangilang:**

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

   # Domain
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   ```

3. **Server'ni restart qiling:**
   ```bash
   # Terminal'da Ctrl+C bosib to'xtating
   # Keyin qayta ishga tushiring:
   npm run dev
   ```

---

## 4️⃣ MA'LUMOTLARNI IMPORT QILISH

### Option 1: SQL orqali (Tez variant)

SQL Editor'da quyidagi kodni run qiling:

```sql
-- Example: ReactJS page qo'shish
INSERT INTO pages (
  alias, title, category, description, tags, second_category_id,
  hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary
) VALUES (
  'react-js',
  'ReactJS Kursi',
  'ReactJS',
  'ReactJS - bu Facebook tomonidan yaratilgan UI kutubxona',
  ARRAY['React', 'JavaScript', 'Frontend'],
  (SELECT id FROM second_categories WHERE name = 'Programming' LIMIT 1),
  120, 500, 1200, 2500
);
```

### Option 2: Supabase Table Editor orqali (Qo'lda)

1. **Table Editor → pages**
2. **Insert → Insert row**
3. Ma'lumotlarni to'ldiring
4. **Save**

### Option 3: Migration script (Kelajakda)

`db.json` fayldagi barcha ma'lumotlarni avtomatik import qilish scripti yozamiz.

---

## 5️⃣ DATABASE STRUKTURA TUSHUNTIRILISHI

### 🗂 Tables va ularning maqsadi:

#### **1. categories**

```
📁 Asosiy kategoriyalar: Courses, Books
├─ id: 0, 1, 2...
├─ name: "Courses"
└─ route: "courses"
```

#### **2. second_categories**

```
📂 Ikkinchi daraja kategoriyalar: Programming, Design
├─ id: UUID
├─ name: "Programming"
└─ category_id: 0 (Courses ga tegishli)
```

#### **3. pages**

```
📄 Har bir texnologiya uchun sahifa: ReactJS, VueJS
├─ id: UUID
├─ alias: "react-js" (URL uchun)
├─ title: "ReactJS Kursi"
├─ description: "Kurs haqida to'liq ma'lumot"
├─ tags: ["React", "JavaScript"]
├─ second_category_id: Programming UUID
└─ hh_* fields: Ish va maosh statistikasi
```

#### **4. advantages**

```
✅ Sahifa advantages: "Qulayliklar"
├─ id: UUID
├─ page_id: pages.id
├─ title: "Kuchli community"
└─ description: "ReactJS katta jamiyatga ega"
```

#### **5. products**

```
🎓 Kurslar (ProductModel)
├─ id: UUID
├─ product_id: "react_pro_2024"
├─ page_id: pages.id (ReactJS sahifasiga bog'langan)
├─ title: "React Pro 2024"
├─ price: 299.99
├─ credit: 29.99
├─ description: "Kurs haqida"
├─ tags: ["Advanced", "React"]
└─ initial_rating: 4.5
```

#### **6. characteristics**

```
📊 Kurs xususiyatlari
├─ id: UUID
├─ product_id: products.id
├─ name: "Duration"
└─ value: "40 hours"
```

#### **7. reviews**

```
💬 Foydalanuvchi sharhlari
├─ id: UUID
├─ product_id: products.id
├─ name: "Ali Valiyev"
├─ title: "Ajoyib kurs!"
├─ description: "Juda yoqdi..."
└─ rating: 5
```

---

## 6️⃣ RELATIONSHIPS (Bog'lanishlar)

```
categories (1) ─────> (many) second_categories
                           │
                           └──> (many) pages
                                    │
                                    ├──> (many) advantages
                                    └──> (many) products
                                              │
                                              ├──> (many) characteristics
                                              └──> (many) reviews
```

**Misol:**

- 1 ta **category** (Courses)
- Ko'p **second_categories** (Programming, Design)
- Har bir **second_category** da ko'p **pages** (ReactJS, VueJS)
- Har bir **page** da ko'p **products** (kurslar)
- Har bir **product** da ko'p **reviews** va **characteristics**

---

## 7️⃣ KEYINGI QADAMLAR

Endi database tayyor! Keyingi bosqichda:

1. ✅ API Routes'larni yangilaymiz (JSON → Supabase)
2. ✅ Ma'lumotlarni to'ldiramiz
3. ✅ Frontend'ni ulaymiz
4. ✅ CRUD operations qo'shamiz

---

## 📞 MUHIM ESLATMALAR

### ⚠️ Security:

- `.env.local` faylni **HECH QACHON** git'ga commit qilmang!
- `.gitignore` da `.env*` borligini tekshiring

### 🔑 API Keys:

- `NEXT_PUBLIC_*` - Frontend'dan ham ko'rinadi
- `anon key` - Public, xavfsiz (RLS bilan himoyalangan)
- `service_role key` - **HECH QACHON** frontend'da ishlatmang!

### 🚀 Production:

- Vercel'ga deploy qilganda Environment Variables qo'shing
- Supabase'da RLS (Row Level Security) yoqing

---

## ✅ TEKSHIRISH

Database to'g'ri yaratilganini tekshiring:

1. **Table Editor'da** barcha 7 ta table bor
2. **SQL Editor'da** query test qiling:
   ```sql
   SELECT * FROM categories;
   SELECT * FROM second_categories;
   ```
3. **Relationships** to'g'ri ishlaydi

---

## 🎉 TAYYOR!

Endi Supabase database to'liq sozlangan. API Routes'ni yangilashga o'tamiz!
