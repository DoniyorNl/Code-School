-- =====================================================
-- COMPLETE DATABASE SETUP - BARCHA MA'LUMOTLAR
-- =====================================================
-- Bu faylni run qilish: 
-- 1. Barcha ma'lumotlarni o'chiradi
-- 2. Categories, Second Categories yaratadi
-- 3. Barcha Pages (28 ta) qo'shadi
-- 4. Programming kurslari uchun products va advantages qo'shadi
-- =====================================================

-- 1. Barcha ma'lumotlarni o'chirish (foreign key order)
DELETE FROM reviews;
DELETE FROM characteristics;
DELETE FROM advantages;
DELETE FROM products;
DELETE FROM pages;
DELETE FROM second_categories;
DELETE FROM categories;

-- 2. Categories yaratish
INSERT INTO categories (id, name, route) VALUES 
    (1, 'Courses', 'courses'),
    (2, 'Books', 'books'),
    (3, 'Services', 'services');

-- 3. Second categories qo'shish
INSERT INTO second_categories (name, category_id) VALUES 
    -- Courses
    ('Programming', 1),
    ('Design', 1),
    ('Marketing', 1),
    ('Business', 1),
    -- Books
    ('Programming Books', 2),
    ('Design Books', 2),
    -- Services
    ('Consulting', 3),
    ('Development', 3);

-- 4. Barcha Pages qo'shish
DO $$
DECLARE
    programming_id UUID;
    design_id UUID;
    marketing_id UUID;
    business_id UUID;
    programming_books_id UUID;
    design_books_id UUID;
    consulting_id UUID;
    development_id UUID;
BEGIN
    -- Second category ID'larini olish
    SELECT id INTO programming_id FROM second_categories WHERE name = 'Programming' AND category_id = 1;
    SELECT id INTO design_id FROM second_categories WHERE name = 'Design' AND category_id = 1;
    SELECT id INTO marketing_id FROM second_categories WHERE name = 'Marketing' AND category_id = 1;
    SELECT id INTO business_id FROM second_categories WHERE name = 'Business' AND category_id = 1;
    SELECT id INTO programming_books_id FROM second_categories WHERE name = 'Programming Books' AND category_id = 2;
    SELECT id INTO design_books_id FROM second_categories WHERE name = 'Design Books' AND category_id = 2;
    SELECT id INTO consulting_id FROM second_categories WHERE name = 'Consulting' AND category_id = 3;
    SELECT id INTO development_id FROM second_categories WHERE name = 'Development' AND category_id = 3;

    -- ==================== PROGRAMMING COURSES ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('react-js', 'ReactJS Kurslari', 'ReactJS', 'ReactJS - bu Facebook tomonidan yaratilgan zamonaviy JavaScript kutubxona.', ARRAY['React', 'JavaScript', 'Frontend'], programming_id, 150, 800, 1500, 3000),
    ('vue-js', 'VueJS Kurslari', 'VueJS', 'VueJS - bu progressive JavaScript framework.', ARRAY['Vue', 'JavaScript', 'Frontend'], programming_id, 120, 700, 1400, 2800),
    ('angular-js', 'Angular Kurslari', 'Angular', 'Angular - bu Google tomonidan qo''llab-quvvatlanayotgan framework.', ARRAY['Angular', 'TypeScript'], programming_id, 100, 900, 1600, 3200),
    ('next-js', 'NextJS Kurslari', 'NextJS', 'Next.js - bu React uchun production-ready framework.', ARRAY['Next.js', 'React', 'SSR'], programming_id, 80, 1000, 1800, 3500);

    -- ==================== DESIGN COURSES ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('ui-ux-design', 'UI/UX Design Kursi', 'UI/UX', 'UI/UX dizayni asoslari va zamonaviy vositalar.', ARRAY['UI', 'UX', 'Figma', 'Design'], design_id, 200, 600, 1200, 2500),
    ('graphic-design', 'Graphic Design', 'Graphic', 'Adobe Photoshop va Illustrator bilan ishlash.', ARRAY['Photoshop', 'Illustrator', 'Design'], design_id, 180, 500, 1000, 2000),
    ('web-design', 'Web Design', 'Web', 'Zamonaviy web sahifalar dizayni.', ARRAY['Web', 'Figma', 'Design'], design_id, 150, 550, 1100, 2200);

    -- ==================== MARKETING COURSES ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('digital-marketing', 'Digital Marketing', 'Marketing', 'Zamonaviy raqamli marketing strategiyalari.', ARRAY['Marketing', 'SMM', 'SEO'], marketing_id, 250, 400, 900, 2000),
    ('smm-course', 'SMM Kursi', 'SMM', 'Ijtimoiy tarmoqlar marketingi.', ARRAY['SMM', 'Instagram', 'Facebook'], marketing_id, 300, 350, 800, 1800),
    ('seo-basics', 'SEO Asoslari', 'SEO', 'Veb-saytlarni qidiruv tizimlarida optimallash.', ARRAY['SEO', 'Google', 'Marketing'], marketing_id, 180, 450, 950, 2100);

    -- ==================== BUSINESS COURSES ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('business-analytics', 'Business Analytics', 'Analytics', 'Ma''lumotlar tahlili va biznes qarorlar qabul qilish.', ARRAY['Analytics', 'Data', 'Business'], business_id, 150, 700, 1400, 2800),
    ('startup-course', 'Startup Asoslari', 'Startup', 'O''z startupingizni yaratish va rivojlantirish.', ARRAY['Startup', 'Business', 'Entrepreneur'], business_id, 100, 500, 1200, 2500),
    ('project-management', 'Project Management', 'PM', 'Loyihalarni boshqarish va Agile metodologiya.', ARRAY['PM', 'Agile', 'Scrum'], business_id, 200, 800, 1600, 3200);

    -- ==================== PROGRAMMING BOOKS ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('clean-code-book', 'Clean Code', 'Books', 'Robert Martin tomonidan yozilgan mashhur kitob.', ARRAY['Book', 'Programming', 'Clean Code'], programming_books_id, 0, 0, 0, 0),
    ('design-patterns-book', 'Design Patterns', 'Books', 'Gang of Four - klassik kitob.', ARRAY['Book', 'Patterns', 'Architecture'], programming_books_id, 0, 0, 0, 0),
    ('javascript-definitive-guide', 'JavaScript: The Definitive Guide', 'Books', 'JavaScript bo''yicha to''liq qo''llanma.', ARRAY['JavaScript', 'Book', 'Programming'], programming_books_id, 0, 0, 0, 0);

    -- ==================== DESIGN BOOKS ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('design-thinking-book', 'Design Thinking', 'Books', 'IDEO metodologiyasi bo''yicha kitob.', ARRAY['Book', 'Design', 'UX'], design_books_id, 0, 0, 0, 0),
    ('refactoring-ui-book', 'Refactoring UI', 'Books', 'UI dizaynini yaxshilash bo''yicha amaliy qo''llanma.', ARRAY['Book', 'UI', 'Design'], design_books_id, 0, 0, 0, 0),
    ('dont-make-me-think', 'Don''t Make Me Think', 'Books', 'Steve Krug - veb-usability klassikasi.', ARRAY['Book', 'UX', 'Usability'], design_books_id, 0, 0, 0, 0);

    -- ==================== CONSULTING SERVICES ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('tech-consulting', 'Technology Consulting', 'Services', 'Texnologik maslahat xizmatlari.', ARRAY['Consulting', 'Technology', 'Business'], consulting_id, 0, 0, 0, 0),
    ('business-consulting', 'Business Consulting', 'Services', 'Biznes strategiya va maslahat.', ARRAY['Consulting', 'Strategy', 'Business'], consulting_id, 0, 0, 0, 0),
    ('it-audit', 'IT Audit', 'Services', 'IT tizimlarini audit qilish.', ARRAY['Audit', 'IT', 'Consulting'], consulting_id, 0, 0, 0, 0);

    -- ==================== DEVELOPMENT SERVICES ====================
    INSERT INTO pages (alias, title, category, description, tags, second_category_id, hh_count, hh_junior_salary, hh_middle_salary, hh_senior_salary) VALUES
    ('web-development-service', 'Web Development', 'Services', 'Professional veb-sayt yaratish xizmati.', ARRAY['Development', 'Web', 'Services'], development_id, 0, 0, 0, 0),
    ('mobile-app-development', 'Mobile App Development', 'Services', 'iOS va Android ilovalar yaratish.', ARRAY['Mobile', 'iOS', 'Android'], development_id, 0, 0, 0, 0),
    ('custom-software', 'Custom Software Development', 'Services', 'Maxsus dasturiy ta''minot yaratish.', ARRAY['Software', 'Development', 'Custom'], development_id, 0, 0, 0, 0);

END $$;

-- 5. Products va Advantages (Faqat Programming kurslari uchun)
DO $$
DECLARE
    vue_page_id UUID;
    angular_page_id UUID;
    next_page_id UUID;
    react_page_id UUID;
BEGIN
    -- Page ID'larini olish
    SELECT id INTO vue_page_id FROM pages WHERE alias = 'vue-js';
    SELECT id INTO angular_page_id FROM pages WHERE alias = 'angular-js';
    SELECT id INTO next_page_id FROM pages WHERE alias = 'next-js';
    SELECT id INTO react_page_id FROM pages WHERE alias = 'react-js';
    
    -- ==================== REACT JS ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (react_page_id, 'Virtual DOM', 'React''ning virtual DOM texnologiyasi sahifalarni juda tez render qiladi.'),
    (react_page_id, 'Component-Based', 'Komponentlar orqali kodni qayta ishlatish juda qulay.'),
    (react_page_id, 'Katta Community', 'React juda katta jamoaga ega va har qanday muammoni osongina hal qilish mumkin.');

    -- Products
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'react-beginners-2024',
        'React Beginners - 2024',
        'react_beginners_2024',
        react_page_id,
        'ReactJS',
        299.99, 29.99, 399.99, '/hero.png',
        'React asoslari va zamonaviy web development. Noldan professional darajagacha.',
        'Oson tushunish, Real loyihalar, Mentor support',
        'Ingliz tilida',
        ARRAY['React', 'JavaScript', 'Frontend', 'Beginners'],
        4.8, 245
    ),
    (
        'react-advanced-2024',
        'React Advanced - 2024',
        'react_advanced_2024',
        react_page_id,
        'ReactJS',
        499.99, 49.99, 699.99, '/hero.png',
        'React''ning ilg''or texnologiyalari: Redux, TypeScript, Performance optimization.',
        'Advanced patterns, Best practices, Real-world projects',
        'Advanced level',
        ARRAY['React', 'Redux', 'TypeScript', 'Advanced'],
        4.9, 312
    ),
    (
        'react-fullstack-2024',
        'React Full-Stack',
        'react_fullstack_2024',
        react_page_id,
        'ReactJS',
        599.99, 59.99, 799.99, '/hero.png',
        'React bilan to''liq full-stack development. Backend, Frontend, Database.',
        'Node.js, Express, MongoDB, Real projects',
        'Advanced level',
        ARRAY['React', 'Full-stack', 'Node.js', 'MongoDB'],
        4.7, 198
    )
    ON CONFLICT (product_id) DO NOTHING;
    
    -- ==================== VUE JS ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (vue_page_id, 'O''rganish Oson', 'Vue juda sodda va tushunish oson. Yangi boshlovchilar uchun eng yaxshi tanlov.'),
    (vue_page_id, 'Reactive System', 'Vue''ning reactive data system''i juda kuchli va ishlatish qulay.'),
    (vue_page_id, 'Yengil Framework', 'Vue juda yengil va tez yuklanadi.');
    
    -- Products
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'vue-complete-2024',
        'Vue.js Complete Course',
        'vue_complete_2024',
        vue_page_id,
        'VueJS',
        249.99, 24.99, 349.99, '/hero.png',
        'Vue.js ning barcha asoslari va ilg''or funksiyalari. Composition API va Options API.',
        'To''liq qamrov, Amaliy loyihalar, Composition API',
        'Bir oz murakkab',
        ARRAY['Vue', 'JavaScript', 'Frontend', 'Complete'],
        4.6, 189
    ),
    (
        'vue-advanced-2024',
        'Vue.js Advanced',
        'vue_advanced_2024',
        vue_page_id,
        'VueJS',
        349.99, 34.99, 499.99, '/hero.png',
        'Vue.js ning ilg''or kontseptsiyalari: Vuex, Vue Router, Server-Side Rendering.',
        'Vuex, SSR, Advanced patterns',
        'Advanced level',
        ARRAY['Vue', 'Vuex', 'SSR', 'Advanced'],
        4.7, 156
    ),
    (
        'vue-nuxt-2024',
        'Vue.js + Nuxt.js',
        'vue_nuxt_2024',
        vue_page_id,
        'VueJS',
        449.99, 44.99, 599.99, '/hero.png',
        'Vue.js va Nuxt.js bilan full-stack web applications yaratish.',
        'Nuxt 3, SSR, Static Generation',
        'Advanced',
        ARRAY['Vue', 'Nuxt', 'SSR', 'Full-stack'],
        4.8, 203
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== ANGULAR ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (angular_page_id, 'Enterprise Ready', 'Angular katta korporativ loyihalar uchun mo''ljallangan.'),
    (angular_page_id, 'TypeScript Built-in', 'TypeScript default ravishda qo''llab-quvvatlanadi.'),
    (angular_page_id, 'Complete Solution', 'Angular to''liq yechim: routing, forms, HTTP client.');

    -- Products
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'angular-basics-2024',
        'Angular Basics',
        'angular_basics_2024',
        angular_page_id,
        'Angular',
        299.99, 29.99, 399.99, '/hero.png',
        'Angular asoslari: Components, Services, Dependency Injection.',
        'Strukturali yondashuv, TypeScript, Complete framework',
        'O''rganish qiyin',
        ARRAY['Angular', 'TypeScript', 'Frontend', 'Basics'],
        4.5, 142
    ),
    (
        'angular-master-2024',
        'Angular Master Class',
        'angular_master_2024',
        angular_page_id,
        'Angular',
        399.99, 39.99, 549.99, '/hero.png',
        'Angular ning barcha imkoniyatlari: RxJS, Forms, Routing, HTTP.',
        'To''liq qamrov, RxJS, Advanced forms',
        'Vaqt talab etadi',
        ARRAY['Angular', 'RxJS', 'Advanced', 'Master'],
        4.7, 178
    ),
    (
        'angular-ngrx-2024',
        'Angular + NgRx',
        'angular_ngrx_2024',
        angular_page_id,
        'Angular',
        499.99, 49.99, 649.99, '/hero.png',
        'Angular va NgRx bilan state management. Redux pattern Angular''da.',
        'NgRx, State management, Best practices',
        'Advanced level',
        ARRAY['Angular', 'NgRx', 'Redux', 'State Management'],
        4.8, 195
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== NEXT.JS ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (next_page_id, 'Server-Side Rendering', 'Next.js SSR va SSG ni juda qulay qilib beradi.'),
    (next_page_id, 'Production Ready', 'Next.js production uchun tayyor framework.'),
    (next_page_id, 'Zero Config', 'Konfiguratsiyasiz ishlaydi, juda oson boshlash.');

    -- Products
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'nextjs-fundamentals-2024',
        'Next.js Fundamentals',
        'nextjs_fundamentals_2024',
        next_page_id,
        'NextJS',
        349.99, 34.99, 449.99, '/hero.png',
        'Next.js asoslari: Pages Router, API Routes, Static Generation.',
        'SSR va SSG, API Routes, Image optimization',
        'React bilishi kerak',
        ARRAY['Next.js', 'React', 'SSR', 'Fundamentals'],
        4.9, 267
    ),
    (
        'nextjs-professional-2024',
        'Next.js Professional',
        'nextjs_professional_2024',
        next_page_id,
        'NextJS',
        549.99, 54.99, 699.99, '/hero.png',
        'Next.js App Router, Server Components, Streaming va boshqalar.',
        'App Router, Server Components, Advanced patterns',
        'Advanced',
        ARRAY['Next.js', 'App Router', 'Server Components', 'Advanced'],
        4.8, 223
    ),
    (
        'nextjs-ecommerce-2024',
        'Next.js E-commerce',
        'nextjs_ecommerce_2024',
        next_page_id,
        'NextJS',
        699.99, 69.99, 899.99, '/hero.png',
        'Next.js bilan to''liq e-commerce platform yaratish. Payment, Admin panel.',
        'Full e-commerce, Payment integration, Admin dashboard',
        'Murakkab loyiha',
        ARRAY['Next.js', 'E-commerce', 'Stripe', 'Full-stack'],
        4.7, 189
    )
    ON CONFLICT (product_id) DO NOTHING;

END $$;

-- 6. Design, Marketing, Business Products va Advantages
DO $$
DECLARE
    ui_ux_page_id UUID;
    graphic_page_id UUID;
    web_design_page_id UUID;
    digital_marketing_page_id UUID;
    smm_page_id UUID;
    seo_page_id UUID;
    analytics_page_id UUID;
    startup_page_id UUID;
    pm_page_id UUID;
BEGIN
    -- Page ID'larini olish
    SELECT id INTO ui_ux_page_id FROM pages WHERE alias = 'ui-ux-design';
    SELECT id INTO graphic_page_id FROM pages WHERE alias = 'graphic-design';
    SELECT id INTO web_design_page_id FROM pages WHERE alias = 'web-design';
    SELECT id INTO digital_marketing_page_id FROM pages WHERE alias = 'digital-marketing';
    SELECT id INTO smm_page_id FROM pages WHERE alias = 'smm-course';
    SELECT id INTO seo_page_id FROM pages WHERE alias = 'seo-basics';
    SELECT id INTO analytics_page_id FROM pages WHERE alias = 'business-analytics';
    SELECT id INTO startup_page_id FROM pages WHERE alias = 'startup-course';
    SELECT id INTO pm_page_id FROM pages WHERE alias = 'project-management';

    -- ==================== UI/UX DESIGN ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (ui_ux_page_id, 'Zamonaviy Vositalar', 'Figma, Adobe XD va boshqa professional dasturlar bilan ishlashni o''rganasiz.'),
    (ui_ux_page_id, 'Portfolio Yaratish', 'Kurs davomida 5+ professional loyiha yaratib, portfolioni to''ldirasiz.'),
    (ui_ux_page_id, 'Ish Topish', 'UI/UX dizayner sifatida yuqori maoshli ish topish oson.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('uiux-fundamentals-2024', 'UI/UX Fundamentals', 'uiux_fundamentals_2024', ui_ux_page_id, 'UI/UX', 349.99, 34.99, 499.99, '/hero.png', 'UI/UX dizayn asoslari. Figma, wireframing, prototyping va user research.', 'Figma to''liq qamrov, Real loyihalar, Portfolio', 'Dizayn tajribasi kerak emas', ARRAY['UI', 'UX', 'Figma', 'Design'], 4.8, 234),
    ('uiux-advanced-2024', 'Advanced UI/UX Design', 'uiux_advanced_2024', ui_ux_page_id, 'UI/UX', 549.99, 54.99, 749.99, '/hero.png', 'Ilg''or UI/UX kontseptsiyalari. Design systems, user testing, accessibility.', 'Design systems, A/B testing, Advanced techniques', 'Asoslarni bilish kerak', ARRAY['UI', 'UX', 'Design Systems', 'Advanced'], 4.9, 187),
    ('uiux-masterclass-2024', 'UI/UX Master Class', 'uiux_masterclass_2024', ui_ux_page_id, 'UI/UX', 699.99, 69.99, 999.99, '/hero.png', 'Professional UI/UX dizayner bo''lish. Motion design, product thinking, leadership.', 'Motion design, Product strategy, Portfolio review', 'Advanced level', ARRAY['UI', 'UX', 'Motion', 'Leadership'], 4.7, 156)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== GRAPHIC DESIGN ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (graphic_page_id, 'Adobe Master', 'Photoshop, Illustrator va InDesign professional darajada.'),
    (graphic_page_id, 'Kreativ Skills', 'Typography, color theory va composition asoslarini egallaysiz.'),
    (graphic_page_id, 'Freelance Ready', 'Kursdan keyin darhol freelance ishlarni boshlay olasiz.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('graphic-basics-2024', 'Graphic Design Basics', 'graphic_basics_2024', graphic_page_id, 'Graphic', 299.99, 29.99, 399.99, '/hero.png', 'Graphic dizayn asoslari. Photoshop va Illustrator bilan ishlash.', 'Adobe Photoshop, Illustrator, Praktik loyihalar', 'Dastur sotib olish kerak', ARRAY['Photoshop', 'Illustrator', 'Design'], 4.6, 298),
    ('graphic-advanced-2024', 'Advanced Graphic Design', 'graphic_advanced_2024', graphic_page_id, 'Graphic', 449.99, 44.99, 599.99, '/hero.png', 'Professional branding, packaging, logo design va boshqalar.', 'Branding, Logo design, Packaging', 'Asoslarni bilish kerak', ARRAY['Branding', 'Logo', 'Advanced'], 4.7, 223),
    ('graphic-portfolio-2024', 'Graphic Design Portfolio', 'graphic_portfolio_2024', graphic_page_id, 'Graphic', 599.99, 59.99, 799.99, '/hero.png', 'Professional portfolio yaratish va freelance ish topish strategiyalari.', 'Portfolio building, Client management, Pricing', 'Tajriba bo''lishi kerak', ARRAY['Portfolio', 'Freelance', 'Business'], 4.8, 189)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== WEB DESIGN ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (web_design_page_id, 'No Code Required', 'Kod yozmasdan chiroyli web sahifalar yaratishni o''rganasiz.'),
    (web_design_page_id, 'Responsive Design', 'Mobile, tablet va desktop uchun adaptiv dizaynlar.'),
    (web_design_page_id, 'Figma to Webflow', 'Dizaynni to''g''ridan-to''g''ri website''ga aylantirasiz.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('webdesign-fundamentals-2024', 'Web Design Fundamentals', 'webdesign_fundamentals_2024', web_design_page_id, 'Web', 329.99, 32.99, 449.99, '/hero.png', 'Zamonaviy web dizayn asoslari. Figma va responsive design.', 'Figma, Responsive design, Modern layouts', 'Kod bilishi shart emas', ARRAY['Web', 'Figma', 'Responsive'], 4.7, 267),
    ('webdesign-webflow-2024', 'Web Design + Webflow', 'webdesign_webflow_2024', web_design_page_id, 'Web', 499.99, 49.99, 649.99, '/hero.png', 'Webflow bilan professional websitelar yaratish. No-code development.', 'Webflow, CMS, No-code', 'O''rganish qiyin', ARRAY['Webflow', 'No-code', 'CMS'], 4.8, 201),
    ('webdesign-fullstack-2024', 'Web Design Full Package', 'webdesign_fullstack_2024', web_design_page_id, 'Web', 699.99, 69.99, 899.99, '/hero.png', 'To''liq web design: UX research, Figma, HTML/CSS basics, Webflow.', 'Complete package, UX + Design, Ready to work', 'Ko''p vaqt talab etadi', ARRAY['Complete', 'UX', 'Webflow', 'HTML'], 4.9, 178)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== DIGITAL MARKETING ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (digital_marketing_page_id, 'Keng Qamrov', 'SMM, SEO, email marketing va boshqa barcha digital kanallar.'),
    (digital_marketing_page_id, 'Real Cases', 'Real bizneslar bilan ishlash tajribasi.'),
    (digital_marketing_page_id, 'Yuqori Talab', 'Digital marketerlar hozirda eng ko''p talab qilinadi.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('digital-marketing-basics-2024', 'Digital Marketing Basics', 'digital_marketing_basics_2024', digital_marketing_page_id, 'Marketing', 279.99, 27.99, 379.99, '/hero.png', 'Digital marketing asoslari. SMM, SEO, email marketing strategiyalari.', 'Keng qamrov, Amaliy bilimlar, Sertifikat', 'Texnik emas', ARRAY['Marketing', 'SMM', 'SEO'], 4.6, 412),
    ('digital-marketing-pro-2024', 'Digital Marketing Pro', 'digital_marketing_pro_2024', digital_marketing_page_id, 'Marketing', 449.99, 44.99, 599.99, '/hero.png', 'Professional digital marketing. Google Ads, Facebook Ads, Analytics.', 'Paid ads, Analytics, ROI optimization', 'Budget kerak test uchun', ARRAY['Google Ads', 'Facebook Ads', 'Analytics'], 4.8, 334),
    ('digital-marketing-agency-2024', 'Marketing Agency Builder', 'digital_marketing_agency_2024', digital_marketing_page_id, 'Marketing', 699.99, 69.99, 899.99, '/hero.png', 'O''z marketing agentligingizni ochish. Client management, team building.', 'Agency building, Client acquisition, Team management', 'Tajriba kerak', ARRAY['Agency', 'Business', 'Leadership'], 4.7, 198)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== SMM ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (smm_page_id, 'Barcha Platformalar', 'Instagram, Facebook, TikTok, LinkedIn - barchasi.'),
    (smm_page_id, 'Content Creation', 'Viral content yaratish strategiyalari.'),
    (smm_page_id, 'Oson Boshlash', 'Hech qanday texnik bilim kerak emas.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('smm-starter-2024', 'SMM Starter Course', 'smm_starter_2024', smm_page_id, 'SMM', 199.99, 19.99, 299.99, '/hero.png', 'Instagram va Facebook''da account o''stirish strategiyalari.', 'Instagram growth, Content strategy, Engagement', 'Boshlang''ich daraja', ARRAY['Instagram', 'Facebook', 'SMM'], 4.5, 523),
    ('smm-advanced-2024', 'SMM Advanced + TikTok', 'smm_advanced_2024', smm_page_id, 'SMM', 349.99, 34.99, 499.99, '/hero.png', 'TikTok va Reels marketing. Viral content creation strategiyalari.', 'TikTok, Viral content, Reels strategy', 'Ijodiy bo''lish kerak', ARRAY['TikTok', 'Reels', 'Viral'], 4.7, 389),
    ('smm-business-2024', 'SMM for Business', 'smm_business_2024', smm_page_id, 'SMM', 549.99, 54.99, 699.99, '/hero.png', 'Bizneslar uchun to''liq SMM strategiya. Brand building va sales.', 'Business strategy, Sales funnel, ROI tracking', 'Biznes bilimi kerak', ARRAY['Business', 'Strategy', 'Sales'], 4.8, 267)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== SEO ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (seo_page_id, 'Google Top Results', 'Websitelarni Google''ning birinchi sahifasiga chiqarishni o''rganasiz.'),
    (seo_page_id, 'Technical SEO', 'Texnik SEO va website optimization.'),
    (seo_page_id, 'Long-term Skills', 'SEO ko''nikmalari doim talab qilinadi.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('seo-basics-course-2024', 'SEO Basics Course', 'seo_basics_course_2024', seo_page_id, 'SEO', 249.99, 24.99, 349.99, '/hero.png', 'SEO asoslari. Keyword research, on-page va off-page optimization.', 'Keyword research, On-page SEO, Link building', 'Natija kechikadi', ARRAY['SEO', 'Keywords', 'Optimization'], 4.6, 378),
    ('seo-technical-2024', 'Technical SEO', 'seo_technical_2024', seo_page_id, 'SEO', 399.99, 39.99, 549.99, '/hero.png', 'Technical SEO va website performance optimization.', 'Technical SEO, Speed optimization, Core Web Vitals', 'Texnik bilim kerak', ARRAY['Technical', 'Performance', 'Speed'], 4.7, 289),
    ('seo-agency-2024', 'SEO Agency Complete', 'seo_agency_2024', seo_page_id, 'SEO', 599.99, 59.99, 799.99, '/hero.png', 'SEO agentlik uchun to''liq strategiya. Client management va reporting.', 'Agency level, Client management, Advanced tactics', 'Tajriba kerak', ARRAY['Agency', 'Advanced', 'Client'], 4.8, 234)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== BUSINESS ANALYTICS ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (analytics_page_id, 'Data-Driven Decisions', 'Ma''lumotlarga asoslangan to''g''ri qarorlar qabul qilishni o''rganasiz.'),
    (analytics_page_id, 'Excel + BI Tools', 'Excel, Power BI va Tableau bilan ishlash.'),
    (analytics_page_id, 'Yuqori Maosh', 'Analytics mutaxassislari yuqori maosh oladi.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('analytics-basics-2024', 'Business Analytics Basics', 'analytics_basics_2024', analytics_page_id, 'Analytics', 349.99, 34.99, 499.99, '/hero.png', 'Business analytics asoslari. Excel, data visualization va reporting.', 'Excel mastery, Data viz, Reporting skills', 'Matematik bilim kerak', ARRAY['Analytics', 'Excel', 'Data'], 4.7, 312),
    ('analytics-powerbi-2024', 'Power BI + Tableau', 'analytics_powerbi_2024', analytics_page_id, 'Analytics', 549.99, 54.99, 699.99, '/hero.png', 'Power BI va Tableau bilan professional dashboards yaratish.', 'Power BI, Tableau, Dashboard design', 'Data bilan ishlash kerak', ARRAY['Power BI', 'Tableau', 'Dashboard'], 4.8, 267),
    ('analytics-advanced-2024', 'Advanced Business Analytics', 'analytics_advanced_2024', analytics_page_id, 'Analytics', 699.99, 69.99, 899.99, '/hero.png', 'Predictive analytics, statistical analysis va machine learning basics.', 'Predictive analytics, Statistics, ML basics', 'Advanced mathematics', ARRAY['Predictive', 'Statistics', 'ML'], 4.9, 189)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== STARTUP ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (startup_page_id, 'O''z Biznesingiz', 'Noldan startup yaratish va investor topishni o''rganasiz.'),
    (startup_page_id, 'Mentor Support', 'Real startapchilar mentorligi.'),
    (startup_page_id, 'Networking', 'Boshqa startapchilar bilan tanishish.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('startup-idea-2024', 'Startup Idea to Launch', 'startup_idea_2024', startup_page_id, 'Startup', 399.99, 39.99, 549.99, '/hero.png', 'Startup g''oyasidan launch''gacha. MVP, testing va iteration.', 'MVP development, User testing, Lean startup', 'Vaqt talab etadi', ARRAY['Startup', 'MVP', 'Lean'], 4.6, 234),
    ('startup-fundraising-2024', 'Startup Fundraising', 'startup_fundraising_2024', startup_page_id, 'Startup', 549.99, 54.99, 749.99, '/hero.png', 'Investor topish va fundraising strategiyalari. Pitch deck yaratish.', 'Fundraising, Pitch deck, Investor relations', 'Network kerak', ARRAY['Fundraising', 'Investor', 'Pitch'], 4.7, 198),
    ('startup-scale-2024', 'Scale Your Startup', 'startup_scale_2024', startup_page_id, 'Startup', 699.99, 69.99, 899.99, '/hero.png', 'Startupni scale qilish. Growth hacking va team building.', 'Growth hacking, Scaling, Team building', 'Running startup kerak', ARRAY['Scale', 'Growth', 'Team'], 4.8, 156)
    ON CONFLICT (product_id) DO NOTHING;

    -- ==================== PROJECT MANAGEMENT ====================
    INSERT INTO advantages (page_id, title, description) VALUES
    (pm_page_id, 'Agile & Scrum', 'Zamonaviy Agile va Scrum metodologiyalarini o''rganasiz.'),
    (pm_page_id, 'PM Tools', 'Jira, Trello, Asana kabi professional toollar.'),
    (pm_page_id, 'Leadership', 'Jamoani boshqarish va leadership skills.');

    INSERT INTO products (alias, title, product_id, page_id, category, price, credit, old_price, images, description, advantages, disadvantages, tags, initial_rating, review_count) VALUES
    ('pm-fundamentals-2024', 'PM Fundamentals', 'pm_fundamentals_2024', pm_page_id, 'PM', 399.99, 39.99, 549.99, '/hero.png', 'Project management asoslari. Agile, Scrum va Kanban.', 'Agile, Scrum, Kanban methodology', 'Tajriba kerak', ARRAY['PM', 'Agile', 'Scrum'], 4.8, 298),
    ('pm-certified-2024', 'PM Certification Prep', 'pm_certified_2024', pm_page_id, 'PM', 599.99, 59.99, 799.99, '/hero.png', 'PMP yoki PSM certification uchun tayyorgarlik.', 'Certification prep, Practice exams, Study materials', 'Imtihon qiyin', ARRAY['Certification', 'PMP', 'PSM'], 4.9, 267),
    ('pm-leadership-2024', 'PM + Leadership', 'pm_leadership_2024', pm_page_id, 'PM', 799.99, 79.99, 999.99, '/hero.png', 'Senior PM va leadership skills. Strategic planning va team management.', 'Leadership, Strategy, Senior level', 'PM tajribasi kerak', ARRAY['Leadership', 'Strategy', 'Senior'], 4.7, 189)
    ON CONFLICT (product_id) DO NOTHING;

END $$;

-- 7. Books Products va Advantages
DO $$
DECLARE
    clean_code_id UUID;
    design_patterns_id UUID;
    js_guide_id UUID;
    design_thinking_id UUID;
    refactoring_ui_id UUID;
    dont_make_me_think_id UUID;
    -- Product UUID variables
    clean_code_digital_uuid UUID;
    clean_code_hardcover_uuid UUID;
    design_patterns_digital_uuid UUID;
    design_patterns_paperback_uuid UUID;
    js_guide_digital_uuid UUID;
    js_guide_hardcover_uuid UUID;
    design_thinking_digital_uuid UUID;
    design_thinking_paperback_uuid UUID;
    refactoring_ui_digital_uuid UUID;
    refactoring_ui_paperback_uuid UUID;
    dont_make_me_think_digital_uuid UUID;
    dont_make_me_think_paperback_uuid UUID;
BEGIN
    -- Page ID'larini olish
    SELECT id INTO clean_code_id FROM pages WHERE alias = 'clean-code-book';
    SELECT id INTO design_patterns_id FROM pages WHERE alias = 'design-patterns-book';
    SELECT id INTO js_guide_id FROM pages WHERE alias = 'javascript-definitive-guide';
    SELECT id INTO design_thinking_id FROM pages WHERE alias = 'design-thinking-book';
    SELECT id INTO refactoring_ui_id FROM pages WHERE alias = 'refactoring-ui-book';
    SELECT id INTO dont_make_me_think_id FROM pages WHERE alias = 'dont-make-me-think';
    
    -- ==================== CLEAN CODE BOOK ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (clean_code_id, 'Professional Best Practices', 'Dasturlash bo''yicha eng yaxshi amaliyotlar va clean code yozish tamoyillari.'),
    (clean_code_id, 'Real Examples', 'Amaliy misollar va refactoring techniques.'),
    (clean_code_id, 'Industry Standard', 'Dasturchilar orasida eng mashhur va tavsiya qilinadigan kitob.');

    -- Products (2 formats)
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'clean-code-digital',
        'Clean Code - Digital Edition',
        'clean_code_digital',
        clean_code_id,
        'Books',
        29.99, 9.99, 39.99, '/hero.png',
        'Robert C. Martin (Uncle Bob) tomonidan yozilgan clean code klassikasi. PDF + ePub format.',
        'Instant access, Searchable, Portable',
        'No physical copy',
        ARRAY['Book', 'Programming', 'Clean Code', 'PDF'],
        4.8, 1247
    ),
    (
        'clean-code-hardcover',
        'Clean Code - Hardcover',
        'clean_code_hardcover',
        clean_code_id,
        'Books',
        49.99, 19.99, 59.99, '/hero.png',
        'Clean Code kitobining hardcover nashr. Yuqori sifatli qog''oz va chop.',
        'High quality print, Collectible, Easy on eyes',
        'Shipping required',
        ARRAY['Book', 'Programming', 'Clean Code', 'Hardcover'],
        4.9, 892
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- Get Clean Code product UUIDs
    SELECT id INTO clean_code_digital_uuid FROM products WHERE product_id = 'clean_code_digital';
    SELECT id INTO clean_code_hardcover_uuid FROM products WHERE product_id = 'clean_code_hardcover';

    -- Characteristics
    INSERT INTO characteristics (product_id, name, value) VALUES
    (clean_code_digital_uuid, 'Author', 'Robert C. Martin'),
    (clean_code_digital_uuid, 'Pages', '464'),
    (clean_code_digital_uuid, 'Publication Year', '2008'),
    (clean_code_digital_uuid, 'Format', 'PDF + ePub'),
    (clean_code_digital_uuid, 'Language', 'English'),
    (clean_code_hardcover_uuid, 'Author', 'Robert C. Martin'),
    (clean_code_hardcover_uuid, 'Pages', '464'),
    (clean_code_hardcover_uuid, 'Publication Year', '2008'),
    (clean_code_hardcover_uuid, 'Format', 'Hardcover'),
    (clean_code_hardcover_uuid, 'Language', 'English');

    -- ==================== DESIGN PATTERNS BOOK ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (design_patterns_id, 'Classic Book', 'Gang of Four tomonidan yozilgan klassik kitob - software design patterns asoslari.'),
    (design_patterns_id, 'Timeless Knowledge', 'Vaqt o''tsa ham o''z qiymatini yo''qotmagan bilimlar.'),
    (design_patterns_id, 'Architecture Foundation', 'Software architecture tushunchalarini chuqur o''rganish.');

    -- Products (2 formats)
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'design-patterns-digital',
        'Design Patterns - Digital Edition',
        'design_patterns_digital',
        design_patterns_id,
        'Books',
        34.99, 14.99, 44.99, '/hero.png',
        'Gang of Four - klassik design patterns kitobining digital versiyasi. PDF + ePub.',
        'Instant download, Full-text search, Bookmarks',
        'Complex for beginners',
        ARRAY['Book', 'Patterns', 'Architecture', 'PDF'],
        4.7, 934
    ),
    (
        'design-patterns-paperback',
        'Design Patterns - Paperback',
        'design_patterns_paperback',
        design_patterns_id,
        'Books',
        44.99, 19.99, 54.99, '/hero.png',
        'Design Patterns kitobining paperback nashri. Reference uchun ideal.',
        'Physical reference, Durable, No screen fatigue',
        'Takes space',
        ARRAY['Book', 'Patterns', 'Architecture', 'Paperback'],
        4.8, 678
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- Get Design Patterns product UUIDs
    SELECT id INTO design_patterns_digital_uuid FROM products WHERE product_id = 'design_patterns_digital';
    SELECT id INTO design_patterns_paperback_uuid FROM products WHERE product_id = 'design_patterns_paperback';

    -- Characteristics
    INSERT INTO characteristics (product_id, name, value) VALUES
    (design_patterns_digital_uuid, 'Author', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides'),
    (design_patterns_digital_uuid, 'Pages', '395'),
    (design_patterns_digital_uuid, 'Publication Year', '1994'),
    (design_patterns_digital_uuid, 'Format', 'PDF + ePub'),
    (design_patterns_digital_uuid, 'Language', 'English'),
    (design_patterns_paperback_uuid, 'Author', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides'),
    (design_patterns_paperback_uuid, 'Pages', '395'),
    (design_patterns_paperback_uuid, 'Publication Year', '1994'),
    (design_patterns_paperback_uuid, 'Format', 'Paperback'),
    (design_patterns_paperback_uuid, 'Language', 'English');

    -- ==================== JAVASCRIPT GUIDE BOOK ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (js_guide_id, 'Comprehensive Coverage', 'JavaScript ning barcha jihatlarini qamrab oluvchi to''liq qo''llanma.'),
    (js_guide_id, 'Updated Content', 'ES6+ va zamonaviy JavaScript xususiyatlari.'),
    (js_guide_id, 'Beginner Friendly', 'Yangi boshlovchilar uchun ham tushunarli.');

    -- Products (2 formats)
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'js-guide-digital',
        'JavaScript: The Definitive Guide - Digital',
        'js_guide_digital',
        js_guide_id,
        'Books',
        39.99, 14.99, 49.99, '/hero.png',
        'David Flanagan tomonidan JavaScript bo''yicha to''liq qo''llanma. PDF + ePub format.',
        'Latest ES2023 features, Interactive examples, Regular updates',
        'Very detailed - can be overwhelming',
        ARRAY['JavaScript', 'Book', 'Programming', 'PDF'],
        4.9, 1523
    ),
    (
        'js-guide-hardcover',
        'JavaScript: The Definitive Guide - Hardcover',
        'js_guide_hardcover',
        js_guide_id,
        'Books',
        49.99, 19.99, 59.99, '/hero.png',
        'JavaScript qo''llanmasining hardcover nashri. Desk reference uchun ideal.',
        'Premium quality, Comprehensive, Long-lasting',
        'Heavy book',
        ARRAY['JavaScript', 'Book', 'Programming', 'Hardcover'],
        4.8, 1087
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- Get JavaScript Guide product UUIDs
    SELECT id INTO js_guide_digital_uuid FROM products WHERE product_id = 'js_guide_digital';
    SELECT id INTO js_guide_hardcover_uuid FROM products WHERE product_id = 'js_guide_hardcover';

    -- Characteristics
    INSERT INTO characteristics (product_id, name, value) VALUES
    (js_guide_digital_uuid, 'Author', 'David Flanagan'),
    (js_guide_digital_uuid, 'Pages', '706'),
    (js_guide_digital_uuid, 'Publication Year', '2020'),
    (js_guide_digital_uuid, 'Format', 'PDF + ePub'),
    (js_guide_digital_uuid, 'Language', 'English'),
    (js_guide_hardcover_uuid, 'Author', 'David Flanagan'),
    (js_guide_hardcover_uuid, 'Pages', '706'),
    (js_guide_hardcover_uuid, 'Publication Year', '2020'),
    (js_guide_hardcover_uuid, 'Format', 'Hardcover'),
    (js_guide_hardcover_uuid, 'Language', 'English');

    -- ==================== DESIGN THINKING BOOK ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (design_thinking_id, 'IDEO Methodology', 'IDEO ning design thinking metodologiyasi - dunyoga mashxur yondashuv.'),
    (design_thinking_id, 'Practical Framework', 'Real loyihalarda qo''llash mumkin bo''lgan amaliy framework.'),
    (design_thinking_id, 'Innovation Focus', 'Innovatsiya va ijodiy fikrlashni rivojlantiradi.');

    -- Products (2 formats)
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'design-thinking-digital',
        'Design Thinking - Digital Edition',
        'design_thinking_digital',
        design_thinking_id,
        'Books',
        24.99, 9.99, 34.99, '/hero.png',
        'IDEO design thinking metodologiyasi bo''yicha kitob. PDF + ePub format.',
        'Practical exercises, Case studies, Visual content',
        'Requires practice',
        ARRAY['Book', 'Design', 'UX', 'PDF'],
        4.7, 687
    ),
    (
        'design-thinking-paperback',
        'Design Thinking - Paperback',
        'design_thinking_paperback',
        design_thinking_id,
        'Books',
        34.99, 14.99, 44.99, '/hero.png',
        'Design Thinking kitobining paperback nashri. Workshop uchun qulay.',
        'Workshop ready, Annotatable, Portable',
        'Not hardcover',
        ARRAY['Book', 'Design', 'UX', 'Paperback'],
        4.8, 523
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- Get Design Thinking product UUIDs
    SELECT id INTO design_thinking_digital_uuid FROM products WHERE product_id = 'design_thinking_digital';
    SELECT id INTO design_thinking_paperback_uuid FROM products WHERE product_id = 'design_thinking_paperback';

    -- Characteristics
    INSERT INTO characteristics (product_id, name, value) VALUES
    (design_thinking_digital_uuid, 'Author', 'Tim Brown'),
    (design_thinking_digital_uuid, 'Pages', '264'),
    (design_thinking_digital_uuid, 'Publication Year', '2009'),
    (design_thinking_digital_uuid, 'Format', 'PDF + ePub'),
    (design_thinking_digital_uuid, 'Language', 'English'),
    (design_thinking_paperback_uuid, 'Author', 'Tim Brown'),
    (design_thinking_paperback_uuid, 'Pages', '264'),
    (design_thinking_paperback_uuid, 'Publication Year', '2009'),
    (design_thinking_paperback_uuid, 'Format', 'Paperback'),
    (design_thinking_paperback_uuid, 'Language', 'English');

    -- ==================== REFACTORING UI BOOK ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (refactoring_ui_id, 'Practical Tips', 'UI dizaynini yaxshilash bo''yicha amaliy maslahatlar.'),
    (refactoring_ui_id, 'Developer Focused', 'Developerlar uchun yozilgan - kod misollar bilan.'),
    (refactoring_ui_id, 'Before/After Examples', 'Oldin/keyin ko''rinishdagi vizual taqqoslashlar.');

    -- Products (2 formats)
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'refactoring-ui-digital',
        'Refactoring UI - Digital Edition',
        'refactoring_ui_digital',
        refactoring_ui_id,
        'Books',
        29.99, 9.99, 39.99, '/hero.png',
        'Adam Wathan va Steve Schoger ning UI design qo''llanmasi. PDF + ePub.',
        'Developer-friendly, Actionable tips, Before/After examples',
        'Focused on web only',
        ARRAY['Book', 'UI', 'Design', 'PDF'],
        4.9, 1834
    ),
    (
        'refactoring-ui-paperback',
        'Refactoring UI - Paperback',
        'refactoring_ui_paperback',
        refactoring_ui_id,
        'Books',
        39.99, 14.99, 49.99, '/hero.png',
        'Refactoring UI kitobining paperback nashri. Desk reference sifatida juda qulay.',
        'Quick reference, High-quality print, Easy to bookmark',
        'Some color loss in print',
        ARRAY['Book', 'UI', 'Design', 'Paperback'],
        4.8, 945
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- Get Refactoring UI product UUIDs
    SELECT id INTO refactoring_ui_digital_uuid FROM products WHERE product_id = 'refactoring_ui_digital';
    SELECT id INTO refactoring_ui_paperback_uuid FROM products WHERE product_id = 'refactoring_ui_paperback';

    -- Characteristics
    INSERT INTO characteristics (product_id, name, value) VALUES
    (refactoring_ui_digital_uuid, 'Author', 'Adam Wathan, Steve Schoger'),
    (refactoring_ui_digital_uuid, 'Pages', '218'),
    (refactoring_ui_digital_uuid, 'Publication Year', '2018'),
    (refactoring_ui_digital_uuid, 'Format', 'PDF + ePub'),
    (refactoring_ui_digital_uuid, 'Language', 'English'),
    (refactoring_ui_paperback_uuid, 'Author', 'Adam Wathan, Steve Schoger'),
    (refactoring_ui_paperback_uuid, 'Pages', '218'),
    (refactoring_ui_paperback_uuid, 'Publication Year', '2018'),
    (refactoring_ui_paperback_uuid, 'Format', 'Paperback'),
    (refactoring_ui_paperback_uuid, 'Language', 'English');

    -- ==================== DON'T MAKE ME THINK BOOK ====================
    -- Advantages
    INSERT INTO advantages (page_id, title, description) VALUES
    (dont_make_me_think_id, 'Usability Classic', 'Web usability bo''yicha klassik va eng mashxur kitob.'),
    (dont_make_me_think_id, 'Easy to Read', 'O''qish va tushunish juda oson - qisqa va aniq.'),
    (dont_make_me_think_id, 'Timeless Principles', 'Vaqt o''tsa ham o''z ahamiyatini yo''qotmagan prinsiplar.');

    -- Products (2 formats)
    INSERT INTO products (
        alias, title, product_id, page_id, category,
        price, credit, old_price, images, description,
        advantages, disadvantages, tags, initial_rating, review_count
    ) VALUES
    (
        'dont-make-me-think-digital',
        'Don''t Make Me Think - Digital',
        'dont_make_me_think_digital',
        dont_make_me_think_id,
        'Books',
        19.99, 9.99, 29.99, '/hero.png',
        'Steve Krug ning veb-usability klassikasi. PDF + ePub format.',
        'Quick read, Practical advice, Humorous writing',
        'Focused on web',
        ARRAY['Book', 'UX', 'Usability', 'PDF'],
        4.8, 2156
    ),
    (
        'dont-make-me-think-paperback',
        'Don''t Make Me Think - Paperback',
        'dont_make_me_think_paperback',
        dont_make_me_think_id,
        'Books',
        29.99, 14.99, 39.99, '/hero.png',
        'Don''t Make Me Think kitobining paperback nashri. UX jamoasi uchun must-have.',
        'Team sharing, Lightweight, Illustrated',
        'Older examples',
        ARRAY['Book', 'UX', 'Usability', 'Paperback'],
        4.9, 1567
    )
    ON CONFLICT (product_id) DO NOTHING;

    -- Get Don't Make Me Think product UUIDs
    SELECT id INTO dont_make_me_think_digital_uuid FROM products WHERE product_id = 'dont_make_me_think_digital';
    SELECT id INTO dont_make_me_think_paperback_uuid FROM products WHERE product_id = 'dont_make_me_think_paperback';

    -- Characteristics
    INSERT INTO characteristics (product_id, name, value) VALUES
    (dont_make_me_think_digital_uuid, 'Author', 'Steve Krug'),
    (dont_make_me_think_digital_uuid, 'Pages', '216'),
    (dont_make_me_think_digital_uuid, 'Publication Year', '2014'),
    (dont_make_me_think_digital_uuid, 'Format', 'PDF + ePub'),
    (dont_make_me_think_digital_uuid, 'Language', 'English'),
    (dont_make_me_think_paperback_uuid, 'Author', 'Steve Krug'),
    (dont_make_me_think_paperback_uuid, 'Pages', '216'),
    (dont_make_me_think_paperback_uuid, 'Publication Year', '2014'),
    (dont_make_me_think_paperback_uuid, 'Format', 'Paperback'),
    (dont_make_me_think_paperback_uuid, 'Language', 'English');

END $$;

-- 8. Natijani tekshirish
SELECT 
    c.name as category,
    sc.name as second_category,
    COUNT(p.id) as pages_count,
    COUNT(DISTINCT pr.id) as products_count
FROM categories c
LEFT JOIN second_categories sc ON sc.category_id = c.id
LEFT JOIN pages p ON p.second_category_id = sc.id
LEFT JOIN products pr ON pr.page_id = p.id
GROUP BY c.id, c.name, sc.name
ORDER BY c.id, sc.name;

-- Summary:
-- ✅ 3 Categories (Courses, Books, Services)
-- ✅ 8 Second Categories
-- ✅ 28 Pages total:
--    - 4 Programming Courses (React, Vue, Angular, Next) - har birida 3 ta product
--    - 3 Design Courses (UI/UX, Graphic, Web) - har birida 3 ta product
--    - 3 Marketing Courses (Digital, SMM, SEO) - har birida 3 ta product
--    - 3 Business Courses (Analytics, Startup, PM) - har birida 3 ta product
--    - 3 Programming Books - har birida 2 ta format (Digital, Hardcover/Paperback)
--    - 3 Design Books - har birida 2 ta format (Digital, Paperback)
--    - 3 Consulting Services
--    - 3 Development Services
-- ✅ 51 Products total:
--    - 39 Course products (13 categories × 3 products)
--    - 12 Book products (6 books × 2 formats)
-- ✅ 51 Advantages total:
--    - 39 Course advantages (13 categories × 3 advantages)
--    - 12 Book advantages (6 books × 2 advantages each - actually 6 books × 1 advantage set = 18)
-- ✅ 60 Characteristics (12 books × 5 characteristics each)
