# Error Handling & Loading States

## ✅ Implementation Complete

### Created Components:

#### 1. **ErrorBoundary** (`src/components/error-boundary/`)

Global error boundary that catches React component errors.

**Features:**

- Catches unhandled errors in component tree
- Shows user-friendly error message
- Provides "Refresh" and "Go Home" buttons
- Logs errors to console (can be extended to error tracking service)

**Usage:**

```tsx
import ErrorBoundary from '@/src/components/error-boundary/error-boundary'

;<ErrorBoundary>
	<YourComponent />
</ErrorBoundary>
```

Already integrated in `_app.tsx` - wraps entire application.

---

#### 2. **LoadingSpinner** (`src/components/loading-spinner/`)

Reusable loading spinner component.

**Sizes:** `small` | `medium` | `large`

**Features:**

- Animated CSS spinner
- Accessible with `role="status"` and `aria-label`
- Three size variants
- No external dependencies

**Usage:**

```tsx
import LoadingSpinner from '@/src/components/loading-spinner/loading-spinner'

;<LoadingSpinner size='medium' />
```

---

#### 3. **ErrorMessage** (`src/components/error-message/`)

Display error messages with optional retry action.

**Features:**

- Error icon with shake animation
- Custom title and message
- Optional retry callback
- Accessible with `role="alert"`

**Usage:**

```tsx
import ErrorMessage from '@/src/components/error-message/error-message'

;<ErrorMessage
	title="Ma'lumot topilmadi"
	message="Iltimos, qaytadan urinib ko'ring"
	onRetry={() => refetchData()}
/>
```

---

## 🎯 Implementation Guide

### For API Calls (Server-Side):

```tsx
export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const { data, error } = await supabase.from('table').select('*')

		if (error) throw error

		return { props: { data } }
	} catch (error) {
		logger.error('Error fetching data:', error)
		return {
			props: {
				error: 'Failed to load data',
				data: [],
			},
		}
	}
}
```

### For Client-Side Data Fetching:

```tsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
	const fetchData = async () => {
		try {
			setLoading(true)
			const response = await fetch('/api/data')
			if (!response.ok) throw new Error('Failed to fetch')
			const result = await response.json()
			setData(result)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	fetchData()
}, [])

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />
return <YourComponent data={data} />
```

---

## 📊 Current State

### ✅ Implemented:

- Global ErrorBoundary in `_app.tsx`
- LoadingSpinner component (3 sizes)
- ErrorMessage component with retry
- All components exported in `components/index.ts`
- Proper TypeScript types
- Accessibility features (ARIA labels, roles)

### 🔄 Existing (Already Good):

- Server-side error handling with try-catch
- Logger for error tracking
- NProgress for route changes

---

## 🚀 Next Steps

### High Priority:

1. **Add Error States to Pages**

   - Update `[type]/[slug].tsx` to show ErrorMessage on data fetch failure
   - Update `index.tsx` to handle empty menu gracefully

2. **Loading States**

   - Add LoadingSpinner while fetching products
   - Show skeleton loaders for product cards

3. **Form Validation**
   - Add error handling to ReviewForm
   - Show validation errors

### Medium Priority:

4. **Error Tracking**

   - Integrate Sentry or similar service
   - Send errors from ErrorBoundary to tracking service

5. **Offline Support**
   - Detect network errors
   - Show "No internet connection" message

---

## 💡 Best Practices

### DO:

✅ Use ErrorBoundary for component-level errors  
✅ Show LoadingSpinner while fetching data  
✅ Provide retry actions where applicable  
✅ Log errors for debugging  
✅ Show user-friendly messages (avoid technical jargon)

### DON'T:

❌ Leave errors unhandled  
❌ Show technical error messages to users  
❌ Forget loading states (users need feedback)  
❌ Block UI indefinitely  
❌ Ignore accessibility

---

## 📚 Examples

### Example 1: Product Page with Error Handling

```tsx
const ProductPage = ({ products, error }) => {
	if (error) {
		return (
			<ErrorMessage
				title='Mahsulotlarni yuklashda xatolik'
				message={error}
				onRetry={() => window.location.reload()}
			/>
		)
	}

	if (!products || products.length === 0) {
		return <ErrorMessage title='Mahsulot topilmadi' />
	}

	return <ProductList products={products} />
}
```

### Example 2: Form with Loading State

```tsx
const [submitting, setSubmitting] = useState(false)

const handleSubmit = async () => {
	try {
		setSubmitting(true)
		await submitForm(data)
		// Show success message
	} catch (error) {
		// Show error message
	} finally {
		setSubmitting(false)
	}
}

;<Button disabled={submitting}>{submitting ? <LoadingSpinner size='small' /> : 'Yuborish'}</Button>
```

---

**Created:** January 2026  
**Status:** Production Ready ✅
