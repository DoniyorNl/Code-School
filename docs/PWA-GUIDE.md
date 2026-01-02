# 📱 PWA (Progressive Web App) Guide

Loyihada to'liq PWA funksionalligi amalga oshirilgan.

---

## ✅ Amalga Oshirilgan Funksiyalar

### 1. **Service Worker** ⚙️

**Fayl**: `public/sw.js`

**Xususiyatlari**:

- ✅ Asset caching (precache)
- ✅ Runtime caching (stale-while-revalidate)
- ✅ Offline fallback
- ✅ Background sync (prepared)
- ✅ Push notifications (prepared)
- ✅ Automatic cache updates

**Cache Strategy**:

```javascript
// Precached assets
- Homepage (/)
- Offline page
- Logo files
- Manifest.json

// Runtime cached
- All GET requests from same origin
- Images, fonts, scripts, styles
```

**Offline Behavior**:

- Cached content served when offline
- Fallback to `/offline` page for navigation
- Background cache updates when online

---

### 2. **PWA Manifest** 📄

**Fayl**: `public/manifest.json`

**Sozlamalar**:

```json
{
	"name": "CodeSchool - Dasturlash kurslari",
	"short_name": "CodeSchool",
	"display": "standalone",
	"theme_color": "#7653FC",
	"background_color": "#ffffff",
	"orientation": "portrait-primary"
}
```

**Icons**:

- 192x192 (required)
- 512x512 (required)

**Shortcuts**: Tez kirish uchun

---

### 3. **Service Worker Registration** 🔧

**Fayl**: `src/helpers/pwa.ts`

**Funksiyalar**:

#### `registerServiceWorker()`

Service Worker ni ro'yxatdan o'tkazadi (faqat production):

```tsx
import { registerServiceWorker } from '../helpers/pwa'

useEffect(() => {
	if (process.env.NODE_ENV === 'production') {
		registerServiceWorker()
	}
}, [])
```

#### `isPWA()`

Ilova PWA sifatida ishlab turganini aniqlaydi:

```tsx
import { isPWA } from '../helpers/pwa'

if (isPWA()) {
	console.log('Running as PWA')
}
```

#### `isIOS()` / `isAndroid()`

Device turini aniqlash:

```tsx
import { isIOS, isAndroid } from '../helpers/pwa'

if (isIOS()) {
	// iOS specific code
}

if (isAndroid()) {
	// Android specific code
}
```

---

### 4. **Offline Page** 🔌

**Fayl**: `src/pages/offline.tsx`

**Xususiyatlari**:

- ✅ User-friendly design
- ✅ Troubleshooting tips
- ✅ Retry button
- ✅ Home page link
- ✅ Animated background

**Ko'rinish**: Internet ulanishi yo'q bo'lganda avtomatik ko'rsatiladi

---

### 5. **Install Prompt Component** 💾

**Fayl**: `src/components/install-prompt/install-prompt.tsx`

**Xususiyatlari**:

- ✅ Automatic prompt detection
- ✅ User-friendly UI
- ✅ Dismissible (7 kun eslab qoladi)
- ✅ One-click installation
- ✅ Mobile optimized

**Foydalanish**:

```tsx
import InstallPrompt from '../components/install-prompt/install-prompt'

;<InstallPrompt />
```

Already integrated in `_app.tsx` ✅

---

### 6. **PWA Hooks** 🪝

**Fayl**: `src/hooks/usePWA.ts`

#### `useIsPWA()`

PWA holatini kuzatadi:

```tsx
import { useIsPWA } from '../hooks/usePWA'

const isPWA = useIsPWA()

if (isPWA) {
	// Show PWA-specific UI
}
```

#### `useOnlineStatus()`

Internet ulanishini kuzatadi:

```tsx
import { useOnlineStatus } from '../hooks/usePWA'

const isOnline = useOnlineStatus()

{
	!isOnline && <div>Offline rejimda ishlayapsiz</div>
}
```

#### `useServiceWorkerUpdate()`

Yangi versiya mavjudligini aniqlaydi:

```tsx
import { useServiceWorkerUpdate } from '../hooks/usePWA'

const { updateAvailable, updateServiceWorker } = useServiceWorkerUpdate()

{
	updateAvailable && <button onClick={updateServiceWorker}>Yangi versiya mavjud - Yangilash</button>
}
```

#### `useDeviceType()`

Device turini aniqlaydi:

```tsx
import { useDeviceType } from '../hooks/usePWA'

const { isIOS, isAndroid, isMobile } = useDeviceType()

if (isMobile) {
	// Mobile-specific code
}
```

#### `useNetworkInfo()`

Tarmoq ma'lumotlarini beradi:

```tsx
import { useNetworkInfo } from '../hooks/usePWA'

const { effectiveType, downlink, saveData } = useNetworkInfo()

if (saveData) {
	// Reduce data usage
}
```

#### `useAppInstalled()`

Ilovaning o'rnatilganini kuzatadi:

```tsx
import { useAppInstalled } from '../hooks/usePWA'

const installed = useAppInstalled()

{
	installed && <div>Ilova muvaffaqiyatli o'rnatildi!</div>
}
```

---

## 🚀 Production Deployment

### 1. Build va Deploy

```bash
npm run build
npm start
```

### 2. HTTPS majburiy!

PWA faqat HTTPS yoki localhost da ishlaydi.

Vercel, Netlify avtomatik HTTPS beradi ✅

### 3. Service Worker Test

Chrome DevTools:

1. Application tab
2. Service Workers
3. Update on reload (development uchun)
4. Offline checkbox (offline test)

---

## 📱 Installation Instructions

### Android

1. Chrome'da saytni oching
2. Menu → "Add to Home screen"
3. Yoki automatic prompt paydo bo'ladi

### iOS (Safari)

1. Safari'da saytni oching
2. Share button → "Add to Home Screen"
3. Manual installation kerak (automatic prompt yo'q)

### Desktop

1. Chrome address bar'da install icon (⊕)
2. Yoki automatic prompt
3. "Install" tugmasini bosing

---

## 🛠️ Debugging

### Chrome DevTools

**Application Tab**:

- Manifest: manifest.json tekshirish
- Service Workers: SW holati
- Cache Storage: keshlangan fayllar
- Storage: localStorage, indexedDB

**Network Tab**:

- ServiceWorker filter
- Offline mode test

**Lighthouse**:

- PWA audit
- Score: 100/100 maqsad ✅

---

## 📊 PWA Features Checklist

### Core Features ✅

- [x] HTTPS
- [x] Service Worker
- [x] Web App Manifest
- [x] Responsive Design
- [x] Fast Load Times

### Enhanced Features ✅

- [x] Offline Mode
- [x] Install Prompt
- [x] App Shell
- [x] Cache Strategy
- [x] Update Notifications

### Advanced Features 🔄

- [ ] Push Notifications (prepared)
- [ ] Background Sync (prepared)
- [ ] Payment Request API
- [ ] Web Share API
- [ ] File System Access

---

## 🎯 Lighthouse PWA Score

### Target: 100/100

**Requirements**:

- ✅ Installable (manifest + service worker)
- ✅ PWA optimized
- ✅ Redirects HTTP to HTTPS
- ✅ Responsive on mobile
- ✅ Fast load time
- ✅ Works offline
- ✅ Configured for splash screen
- ✅ Address bar matches brand colors

---

## 💡 Best Practices

### 1. **Cache Strategy**

**Precache** (Install time):

- Critical HTML, CSS, JS
- Logo, favicon
- Offline page

**Runtime Cache** (On-demand):

- Images, fonts
- API responses (with TTL)
- Third-party assets

### 2. **Update Strategy**

```typescript
// Check for updates hourly
setInterval(() => {
	registration.update()
}, 60 * 60 * 1000)
```

### 3. **Cache Versioning**

```javascript
const CACHE_NAME = 'codeschool-v1'

// Increment version on major changes
// Old caches automatically deleted
```

### 4. **Offline UX**

- Clear offline indicators
- Cached content warnings
- Retry mechanisms
- Helpful error messages

### 5. **Install Prompt Timing**

```typescript
// Show after user engages (3+ seconds)
setTimeout(() => {
	setShowPrompt(true)
}, 3000)

// Don't annoy: 7 day dismissal
```

---

## 🐛 Common Issues

### Service Worker not registering

**Sabab**: HTTPS yo'q yoki scope noto'g'ri

**Yechim**:

```typescript
// sw.js must be in public/ root
navigator.serviceWorker.register('/sw.js', {
	scope: '/',
})
```

### Cache not updating

**Sabab**: Cache version yangilanmagan

**Yechim**:

```javascript
// Increment version
const CACHE_NAME = 'codeschool-v2'
```

### Install prompt not showing

**Sabab**:

- Already installed
- iOS (manual only)
- PWA criteria not met

**Yechim**: Lighthouse PWA audit tekshiring

---

## 📚 Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Workbox (advanced caching)](https://developers.google.com/web/tools/workbox)

---

## 🎓 Testing PWA

### Desktop

```bash
# Chrome DevTools
Application → Manifest
Application → Service Workers
Lighthouse → PWA audit
```

### Mobile

```bash
# Chrome Remote Debugging
chrome://inspect
```

### Tools

- [PWA Builder](https://www.pwabuilder.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Webhint](https://webhint.io/)

---

**Eslatma**: PWA - kelajak! Foydalanuvchilar ilovalarni yuklamasdan ishlatishlari mumkin, lekin to'liq ilova imkoniyatlariga ega bo'lishadi! 📱✨
