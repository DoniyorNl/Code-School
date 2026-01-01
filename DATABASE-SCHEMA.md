# 🗄️ DATABASE SCHEMA - Vizual Ko'rinish

## TABLES va RELATIONSHIPS

```
┌─────────────────┐
│   categories    │
│─────────────────│
│ id (PK)         │  0 = Courses
│ name            │  1 = Books
│ route           │
└─────────────────┘
        │
        │ (1:many)
        ▼
┌─────────────────────┐
│ second_categories   │
│─────────────────────│
│ id (PK - UUID)      │  Programming, Design, etc.
│ name                │
│ category_id (FK)    │
└─────────────────────┘
        │
        │ (1:many)
        ▼
┌─────────────────────┐         ┌──────────────────┐
│      pages          │◄────────│   advantages     │
│─────────────────────│ (1:many)│──────────────────│
│ id (PK - UUID)      │         │ id (PK - UUID)   │
│ alias               │         │ page_id (FK)     │
│ title               │         │ title            │
│ category            │         │ description      │
│ description         │         └──────────────────┘
│ tags[]              │
│ second_category_id  │
│ hh_count           │
│ hh_*_salary        │
└─────────────────────┘
        │
        │ (1:many)
        ▼
┌─────────────────────┐
│     products        │
│─────────────────────│
│ id (PK - UUID)      │  Kurslar/Books
│ product_id (UNIQUE) │
│ page_id (FK)        │
│ title               │
│ price, credit       │
│ images              │
│ description         │
│ tags[]              │
│ initial_rating      │
└─────────────────────┘
        │
        ├─────────(1:many)────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│ characteristics  │    │     reviews      │
│──────────────────│    │──────────────────│
│ id (PK - UUID)   │    │ id (PK - UUID)   │
│ product_id (FK)  │    │ product_id (FK)  │
│ name             │    │ name             │
│ value            │    │ title            │
└──────────────────┘    │ description      │
                        │ rating (1-5)     │
                        └──────────────────┘
```

## MA'LUMOT OQIMI (Data Flow)

```
1. Foydalanuvchi sahifaga kiradi
   ↓
2. Frontend page id ni yuboradi
   ↓
3. Backend Supabase'dan query qiladi:
   - pages table → page ma'lumotlari
   - advantages table → page advantages
   - products table → page'ga tegishli kurslar
   - characteristics table → har bir kurs xususiyatlari
   - reviews table → har bir kurs sharhlari
   ↓
4. Ma'lumotlar frontend'ga qaytadi
   ↓
5. UI render qilinadi
```

## API ENDPOINTS (Yangilanadi)

```
POST /api/page-find
├─ Body: { firstCategory: 0 }
└─ Returns: second_categories + pages list

GET /api/page-find/[id]
├─ Params: id (page UUID)
└─ Returns: page + advantages

POST /api/product-find
├─ Body: { category: "page-id" }
└─ Returns: products + characteristics + reviews
```

## SAMPLE QUERY

```sql
-- Barcha ReactJS kurslarini olish
SELECT
  p.*,
  json_agg(c.*) as characteristics,
  json_agg(r.*) as reviews
FROM products p
LEFT JOIN characteristics c ON c.product_id = p.id
LEFT JOIN reviews r ON r.product_id = p.id
WHERE p.page_id = 'reactjs-page-uuid'
GROUP BY p.id;
```

## MIGRATION PLAN

### Phase 1: Database Setup ✅

- [x] Supabase project yaratish
- [x] Schema yaratish
- [x] Environment variables

### Phase 2: Data Migration 🔄

- [ ] db.json'dan ma'lumotlarni o'qish
- [ ] Supabase'ga import qilish
- [ ] Test data tekshirish

### Phase 3: API Update 🔜

- [ ] page-find API'ni yangilash
- [ ] product-find API'ni yangilash
- [ ] Error handling qo'shish

### Phase 4: Frontend Update 🔜

- [ ] Interface'larni yangilash (UUID)
- [ ] API responses'ni update qilish
- [ ] Testing

### Phase 5: Advanced Features 🔜

- [ ] CRUD operations
- [ ] Real-time reviews
- [ ] Search optimization
- [ ] Pagination
