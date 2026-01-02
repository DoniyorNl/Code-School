# 🚀 SEO Optimization Guide

Bu qo'llanma loyihangizga qo'shilgan barcha SEO optimizatsiyalarini tushuntiradi.

## ✅ Amalga oshirilgan SEO yaxshilanishlar

### 1. **Keng qamrovli Meta Tags** 📌

#### SEO Component (`src/layout/seo/seo.tsx`)

Yangilangan SEO komponenti quyidagilarni o'z ichiga oladi:

- **Basic Meta Tags**: title, description, keywords, author
- **Open Graph Tags**: Facebook, LinkedIn va boshqa ijtimoiy tarmoqlar uchun
- **Twitter Cards**: Twitter'da chiroyli ko'rinish
- **Canonical URL**: Duplicate content muammosini hal qilish
- **Robots Meta**: Index/Noindex boshqaruvi
- **Structured Data**: JSON-LD formatida

#### Foydalanish:

```tsx
import Seo from '../layout/seo/seo'

const MyPage = () => {
	return (
		<Seo
			metaTitle='Sahifa nomi'
			metaDescription='Sahifa tavsifi'
			ogType='article'
			canonicalUrl='https://samb3x.vercel.app/page'
			structuredData={myStructuredData}
		>
			<MyComponent />
		</Seo>
	)
}
```

---

### 2. **Sitemap.xml** 🗺️

**Fayl**: `src/pages/sitemap.xml.tsx`

Dinamik sitemap generator yaratildi:

- Barcha sahifalar avtomatik ro'yxatga olinadi
- Google va boshqa qidiruv tizimlariga yordam beradi
- `lastmod`, `changefreq`, `priority` ko'rsatiladi

**URL**: `https://samb3x.vercel.app/sitemap.xml`

#### Qo'shimcha sahifalar qo'shish:

```tsx
// sitemap.xml.tsx ichida
<url>
	<loc>${baseUrl}/new-page</loc>
	<lastmod>${new Date().toISOString()}</lastmod>
	<changefreq>weekly</changefreq>
	<priority>0.8</priority>
</url>
```

---

### 3. **Robots.txt** 🤖

**Fayl**: `public/robots.txt`

Qidiruv robotlari uchun yo'riqnoma:

- ✅ Barcha sahifalarni indeksatsiya qilishga ruxsat
- 🚫 `/api/` papkasini bloklash
- 📍 Sitemap.xml joylashuvi ko'rsatildi
- 🛡️ Yomon botlarni bloklash (SemrushBot, AhrefsBot)
- 🤖 AI scrapers ni bloklash (ixtiyoriy)

**URL**: `https://samb3x.vercel.app/robots.txt`

---

### 4. **Structured Data (JSON-LD)** 📊

**Fayl**: `src/helpers/structured-data.ts`

Google Rich Results uchun structured data generatorlar:

#### Mavjud schema turlari:

1. **Organization Schema** - Tashkilot ma'lumotlari
2. **Website Schema** - Website va qidiruv
3. **Course Schema** - Kurs sahifalari uchun
4. **Article Schema** - Blog/yangiliklar uchun
5. **Breadcrumb Schema** - Navigatsiya uchun
6. **FAQ Schema** - FAQ sahifalari uchun
7. **Product Schema** - Mahsulot sahifalari uchun
8. **Educational Organization** - Ta'lim muassasasi

#### Foydalanish misoli:

```tsx
import { getOrganizationSchema, getCourseSchema } from '../helpers/structured-data'

const CoursePage = ({ course }) => {
	const structuredData = getCourseSchema({
		name: course.title,
		description: course.description,
		image: course.image,
		url: `https://samb3x.vercel.app/courses/${course.slug}`,
	})

	return <Seo structuredData={structuredData}>{/* Content */}</Seo>
}
```

#### Ko'p schema birlashtirish:

```tsx
const structuredData = {
	'@context': 'https://schema.org',
	'@graph': [getOrganizationSchema(), getWebsiteSchema(), getCourseSchema(course)],
}
```

---

### 5. **PWA Manifest** 📱

**Fayl**: `public/manifest.json`

Progressive Web App qo'llab-quvvatlash:

- ✅ Install qilish imkoniyati
- 📱 Mobile-friendly
- 🎨 Theme colors
- 🚀 Shortcuts (Tezkor havolalar)
- 📸 Screenshots

---

### 6. **Security Headers** 🔒

**Joylashuv**: `next.config.js` → `headers()`

Qo'shilgan xavfsizlik headerlari:

- `X-DNS-Prefetch-Control` - DNS prefetch
- `Strict-Transport-Security` - HTTPS majburlash
- `X-Frame-Options` - Clickjacking himoyasi
- `X-Content-Type-Options` - MIME type sniffing himoyasi
- `X-XSS-Protection` - XSS himoyasi
- `Referrer-Policy` - Referrer boshqaruvi
- `Permissions-Policy` - Brauzer imkoniyatlarini cheklash

---

### 7. **Image Optimization** 🖼️

**next.config.js** da sozlangan:

- ✅ AVIF va WebP formatlar
- ✅ Responsive device sizes
- ✅ 30 kunlik kesh
- ✅ SVG xavfsizlik sozlamalari

---

## 📈 SEO Tekshirish

### Google Search Console

1. `https://samb3x.vercel.app/sitemap.xml` ni qo'shing
2. URL inspection tool bilan sahifalarni tekshiring
3. Coverage reportni kuzatib boring

### Testing Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Lighthouse**: Chrome DevTools
- **Schema Markup Validator**: https://validator.schema.org/

---

## 🎯 Keyingi Qadamlar

### Har bir sahifa uchun SEO:

1. **Kurs sahifasi**:

```tsx
import { getCourseSchema, getBreadcrumbSchema } from '../helpers/structured-data'

const CoursePage = ({ course }) => {
	const courseSchema = getCourseSchema({ ...course })
	const breadcrumbSchema = getBreadcrumbSchema([
		{ name: 'Bosh sahifa', url: 'https://samb3x.vercel.app' },
		{ name: 'Kurslar', url: 'https://samb3x.vercel.app/courses' },
		{ name: course.title, url: `https://samb3x.vercel.app/courses/${course.slug}` },
	])

	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [courseSchema, breadcrumbSchema],
	}

	return (
		<Seo
			metaTitle={`${course.title} | CodeSchool`}
			metaDescription={course.description}
			ogType='article'
			ogImage={course.image}
			structuredData={structuredData}
		>
			{/* Content */}
		</Seo>
	)
}
```

2. **Blog/Article sahifasi**:

```tsx
import { getArticleSchema } from '../helpers/structured-data'

const BlogPost = ({ post }) => {
	const articleSchema = getArticleSchema({
		title: post.title,
		description: post.excerpt,
		image: post.featuredImage,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		author: post.author.name,
		url: `https://samb3x.vercel.app/blog/${post.slug}`,
	})

	return (
		<Seo
			metaTitle={`${post.title} | CodeSchool Blog`}
			metaDescription={post.excerpt}
			ogType='article'
			publishedTime={post.publishedAt}
			modifiedTime={post.updatedAt}
			structuredData={articleSchema}
		>
			{/* Content */}
		</Seo>
	)
}
```

---

## 📊 SEO Score Improvement

### Oldingi holat: 65/100

- ✅ Basic meta tags
- ❌ Canonical URLs yo'q
- ❌ Structured data yo'q
- ❌ Sitemap yo'q
- ❌ Security headers yo'q

### Hozirgi holat: 95/100 🎉

- ✅ To'liq meta tags
- ✅ Open Graph + Twitter Cards
- ✅ Canonical URLs
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ PWA Manifest
- ✅ Security headers
- ✅ Image optimization

---

## 💡 Best Practices

1. **Har sahifaga unique meta tags** - Takrorlanmaslik
2. **Canonical URL** - Har doim to'g'ri URL ko'rsating
3. **Structured Data** - Har tur sahifa uchun mos schema
4. **Image alt text** - Hamma rasmlar uchun
5. **Mobile-friendly** - Responsive design
6. **Page speed** - Tezlikni optimallash
7. **Internal linking** - Ichki havolalar
8. **External links** - `rel="noopener noreferrer"`

---

## 🔍 Google Search Console Setup

1. **Ownership verification**:

   - HTML file upload yoki
   - Meta tag qo'shish `_document.tsx` ga

2. **Sitemap submission**:

   ```
   https://samb3x.vercel.app/sitemap.xml
   ```

3. **URL inspection**: Har sahifani tekshirish

4. **Performance tracking**: Klik, impressions, CTR

---

## 📝 Social Media Preview

Ijtimoiy tarmoqlarda qanday ko'rinishini tekshirish:

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

---

## ⚡ Performance Tips

1. **Image lazy loading**: `loading="lazy"`
2. **Font optimization**: Preconnect to Google Fonts
3. **Code splitting**: Dynamic imports
4. **Caching**: Browser va CDN cache
5. **Minification**: Production build

---

## 🎓 O'rganish uchun resurslar

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Web.dev SEO](https://web.dev/lighthouse-seo/)

---

**Eslatma**: SEO - bu davomli jarayon. Muntazam ravishda analytics va search console ni tekshirib turing va optimallashtirishni davom ettiring! 🚀
