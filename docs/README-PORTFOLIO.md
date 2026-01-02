# 🎓 CodeSchool - Online Learning Platform

> Modern educational platform built with Next.js 15, TypeScript, and Supabase

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🌟 Features

### ✨ Core Functionality

- 📚 **Dynamic Course & Book Management** - Browse courses and books by categories
- 🎨 **Smooth Animations** - Framer Motion powered transitions
- 🔍 **Smart Navigation** - Sidebar with collapsible categories
- ⭐ **Rating System** - Interactive 5-star rating with validation
- 💬 **Review System** - User reviews with form validation
- 📊 **Job Statistics** - HH.uz salary data integration
- 🎯 **Advanced Filtering** - Sort by rating or price

### 🚀 Technical Highlights

- **Server-Side Rendering** - Fast page loads with Next.js SSR
- **Type-Safe Database** - Supabase with generated TypeScript types
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Form Validation** - React Hook Form with error handling
- **Progress Indication** - Animated loading bar with NProgress
- **SEO Optimized** - Dynamic meta tags for better search ranking

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 (React 18)
- **Language:** TypeScript 4.9
- **Styling:** Tailwind CSS + CSS Modules
- **Animation:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** React Icons

### Backend

- **Database:** Supabase (PostgreSQL)
- **Authentication:** Ready for Supabase Auth
- **API:** Next.js API Routes

### DevOps

- **Hosting:** Vercel (recommended)
- **Database:** Supabase Cloud
- **Version Control:** Git

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### Steps

1. **Clone repository**

```bash
git clone https://github.com/yourusername/codeschool.git
cd codeschool
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Supabase**

- Create a new project at [supabase.com](https://supabase.com)
- Run SQL schema from `database-scripts/supabase-schema.sql`
- Copy your project URL and anon key

4. **Configure environment variables**

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

5. **Import sample data** (optional)

```bash
# Run complete-setup.sql in Supabase SQL Editor
```

6. **Start development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
samB3x-main/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── product/       # Course/Book cards
│   │   ├── rating/        # Star rating
│   │   ├── review-form/   # Review submission
│   │   └── ...
│   ├── page-components/   # Page-level components
│   ├── layout/            # Layout wrapper (header, footer, sidebar)
│   ├── pages/             # Next.js pages & API routes
│   │   ├── index.tsx      # Home page
│   │   ├── [type]/        # Dynamic routes (courses/books)
│   │   └── api/           # API endpoints
│   ├── lib/               # Supabase client
│   ├── helpers/           # Utility functions
│   ├── interfaces/        # TypeScript types
│   └── styles/            # Global styles
├── database-scripts/      # SQL schemas
├── public/                # Static assets
└── ...config files
```

## 🎨 Key Features Demo

### Animated Product Cards

```tsx
<Product
	layout // Auto-animate on sort
	transition={spring} // Spring physics
	initial={{ opacity: 0, scale: 0.8 }}
	animate={{ opacity: 1, scale: 1 }}
	exit={{ opacity: 0, scale: 0.8 }}
/>
```

### Dynamic Routing

- `/courses` - All courses
- `/books` - All books
- `/courses/react-js` - Specific course
- `/books/clean-code-book` - Specific book

### Database Schema

7 interconnected tables:

- `categories` - Course/Book distinction
- `second_categories` - Programming, Design, etc.
- `pages` - Individual course/book pages
- `products` - Pricing & details
- `advantages` - Feature highlights
- `characteristics` - Product specs
- `reviews` - User feedback

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
NEXT_PUBLIC_DOMAIN=https://yourdomain.com
```

## 📈 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ SSR for initial page load
- ✅ Database indexing for fast queries
- ✅ Lazy loading for animations

## 🎯 Future Enhancements

- [ ] User authentication (Supabase Auth)
- [ ] Shopping cart & checkout
- [ ] Real-time notifications
- [ ] Search functionality
- [ ] Pagination for large datasets
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)

## 📄 License

MIT License - feel free to use for learning & portfolio

## 👨‍💻 Author

**Your Name**

- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Design inspired by modern e-learning platforms
- Icons from React Icons
- Animations powered by Framer Motion
- Database by Supabase

---

⭐ **Star this repo if you found it helpful!**
