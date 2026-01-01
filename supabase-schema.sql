-- =====================================================
-- CODESCHOOL DATABASE SCHEMA FOR SUPABASE
-- =====================================================
-- Bu SQL kodlarni Supabase SQL Editor'da ishga tushiring
-- =====================================================

-- 1. CATEGORIES TABLE (Courses, Books)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  route VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. SECOND CATEGORIES TABLE (Programming, Design, etc.)
CREATE TABLE IF NOT EXISTS second_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. PAGES TABLE (ReactJS, VueJS, etc.)
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alias VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(300) NOT NULL,
  category VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  second_category_id UUID REFERENCES second_categories(id) ON DELETE CASCADE,
  
  -- HH.uz data (optional)
  hh_count INTEGER,
  hh_junior_salary DECIMAL(10,2),
  hh_middle_salary DECIMAL(10,2),
  hh_senior_salary DECIMAL(10,2),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. ADVANTAGES TABLE (Page advantages)
CREATE TABLE IF NOT EXISTS advantages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. PRODUCTS TABLE (Courses/Books)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alias VARCHAR(200) NOT NULL,
  title VARCHAR(300) NOT NULL,
  product_id VARCHAR(200) NOT NULL UNIQUE,
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  category VARCHAR(200) NOT NULL,
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  credit DECIMAL(10,2) NOT NULL DEFAULT 0,
  old_price DECIMAL(10,2) DEFAULT 0,
  
  -- Content
  images TEXT NOT NULL,
  description TEXT NOT NULL,
  advantages TEXT,
  disadvantages TEXT,
  tags TEXT[] DEFAULT '{}',
  
  -- Ratings
  initial_rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. CHARACTERISTICS TABLE (Product characteristics)
CREATE TABLE IF NOT EXISTS characteristics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. REVIEWS TABLE (Product reviews)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_pages_alias ON pages(alias);
CREATE INDEX IF NOT EXISTS idx_pages_second_category ON pages(second_category_id);
CREATE INDEX IF NOT EXISTS idx_products_page_id ON products(page_id);
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_characteristics_product_id ON characteristics(product_id);
CREATE INDEX IF NOT EXISTS idx_advantages_page_id ON advantages(page_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - Optional
-- =====================================================

-- Enable RLS (hozircha o'chirib qo'yamiz, keyinchalik yoqamiz)
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- SAMPLE DATA - Test uchun
-- =====================================================

-- Categories
INSERT INTO categories (id, name, route) VALUES 
  (0, 'Courses', 'courses'),
  (1, 'Books', 'books')
ON CONFLICT (route) DO NOTHING;

-- Second Categories
INSERT INTO second_categories (name, category_id) VALUES 
  ('Programming', 0),
  ('Design', 0)
ON CONFLICT DO NOTHING;

-- Bu yerda keyinchalik pages, products va boshqa ma'lumotlarni qo'shishingiz mumkin

-- =====================================================
-- TRIGGERS - Automatic updated_at
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to pages table
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add trigger to products table
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- YAKUNLANDI!
-- =====================================================
-- Keyingi qadam: Ma'lumotlarni import qilish
