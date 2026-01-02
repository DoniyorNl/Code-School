# Form Validation Guide

This document describes the form validation system implemented in the project, including patterns, utilities, and best practices.

## Overview

The validation system provides comprehensive form validation with:

- Pre-built validation patterns for common fields
- Input sanitization to prevent XSS attacks
- Accessible error messages with ARIA attributes
- Integration with react-hook-form

## Validation Patterns

All validation patterns are defined in `src/helpers/validation.ts`.

### Email Validation

```typescript
export const emailPattern: RegisterOptions = {
	required: 'Email manzili talab qilinadi',
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: "Noto'g'ri email formati",
	},
}
```

**Usage:**

```tsx
<Input {...register('email', emailPattern)} placeholder='Email' error={errors.email} />
```

### Phone Validation (Uzbekistan)

```typescript
export const phonePattern: RegisterOptions = {
	required: 'Telefon raqami talab qilinadi',
	pattern: {
		value: /^(\+998)?[0-9]{9}$/,
		message: "Noto'g'ri telefon raqami formati",
	},
}
```

**Format:** Accepts +998XXXXXXXXX or XXXXXXXXX (9 digits)

### URL Validation

```typescript
export const urlPattern: RegisterOptions = {
	required: 'URL manzili talab qilinadi',
	pattern: {
		value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
		message: "Noto'g'ri URL formati",
	},
}
```

### Name Validation

```typescript
export const nameValidation: RegisterOptions = {
	required: 'Ism talab qilinadi',
	minLength: {
		value: 2,
		message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
	},
	maxLength: {
		value: 50,
		message: 'Ism 50 ta belgidan oshmasligi kerak',
	},
	pattern: {
		value: /^[A-Za-zА-Яа-яЁё\s]+$/,
		message: "Ism faqat harflardan iborat bo'lishi kerak",
	},
}
```

**Rules:**

- 2-50 characters
- Letters only (Latin and Cyrillic)

### Title Validation

```typescript
export const titleValidation: RegisterOptions = {
	required: 'Sarlavha talab qilinadi',
	minLength: {
		value: 3,
		message: "Sarlavha kamida 3 ta belgidan iborat bo'lishi kerak",
	},
	maxLength: {
		value: 100,
		message: 'Sarlavha 100 ta belgidan oshmasligi kerak',
	},
}
```

**Rules:**

- 3-100 characters
- Any characters allowed

### Description Validation

```typescript
export const descriptionValidation: RegisterOptions = {
	required: 'Tavsif talab qilinadi',
	minLength: {
		value: 10,
		message: "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak",
	},
	maxLength: {
		value: 500,
		message: 'Tavsif 500 ta belgidan oshmasligi kerak',
	},
}
```

**Rules:**

- 10-500 characters
- Any characters allowed

### Rating Validation

```typescript
export const ratingValidation: RegisterOptions = {
	required: 'Baho talab qilinadi',
	min: {
		value: 1,
		message: "Baho 1 dan kam bo'lmasligi kerak",
	},
	max: {
		value: 5,
		message: 'Baho 5 dan oshmasligi kerak',
	},
}
```

**Rules:**

- Must be between 1 and 5

### Password Validation

```typescript
export const passwordValidation: RegisterOptions = {
	required: 'Parol talab qilinadi',
	minLength: {
		value: 8,
		message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
	},
	pattern: {
		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
		message: "Parol katta va kichik harflar, raqamlar va maxsus belgilarni o'z ichiga olishi kerak",
	},
}
```

**Rules:**

- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character (@$!%\*?&#)

## Utility Functions

### sanitizeInput

Removes HTML tags and trims whitespace to prevent XSS attacks.

```typescript
export const sanitizeInput = (input: string): string => {
	return input.replace(/<[^>]*>/g, '').trim()
}
```

**Usage:**

```typescript
const onSubmit = (data: IReviewForm) => {
	const sanitizedData = {
		name: sanitizeInput(data.name),
		title: sanitizeInput(data.title),
		description: sanitizeInput(data.description),
	}

	// Send sanitizedData to API
}
```

### isNotEmpty

Checks if a string is not empty after trimming.

```typescript
export const isNotEmpty = (value: string): boolean | string => {
	return value.trim() !== '' || "Bu maydon bo'sh bo'lmasligi kerak"
}
```

### validateLength

Validates string length within a range.

```typescript
export const validateLength = (value: string, min: number, max: number): boolean | string => {
	const length = value.trim().length
	if (length < min) {
		return `Kamida ${min} ta belgi kiritish kerak`
	}
	if (length > max) {
		return `Maksimal ${max} ta belgi kiritish mumkin`
	}
	return true
}
```

**Usage:**

```typescript
<Input
	{...register('username', {
		validate: value => validateLength(value, 3, 20),
	})}
/>
```

### escapeHtml

Escapes HTML special characters to prevent XSS attacks.

```typescript
export const escapeHtml = (text: string): string => {
	const map: { [key: string]: string } = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	}
	return text.replace(/[&<>"']/g, m => map[m])
}
```

### createCustomValidation

Creates a custom validation function.

```typescript
export const createCustomValidation = (
	validationFn: (value: string) => boolean,
	errorMessage: string,
): ((value: string) => boolean | string) => {
	return (value: string) => validationFn(value) || errorMessage
}
```

**Example:**

```typescript
const isEvenLength = createCustomValidation(
	value => value.length % 2 === 0,
	"Belgilar soni juft bo'lishi kerak",
)

;<Input
	{...register('field', {
		validate: isEvenLength,
	})}
/>
```

## Implementation Example

Here's a complete example using ReviewForm:

```tsx
import { useForm, Controller } from 'react-hook-form'
import {
	nameValidation,
	titleValidation,
	descriptionValidation,
	ratingValidation,
	sanitizeInput,
} from '@/src/helpers/validation'

interface IReviewForm {
	name: string
	title: string
	description: string
	rating: number
}

export const ReviewForm = ({ productId }: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IReviewForm>()

	const onSubmit = async (data: IReviewForm) => {
		try {
			const sanitizedData = {
				name: sanitizeInput(data.name),
				title: sanitizeInput(data.title),
				description: sanitizeInput(data.description),
				rating: data.rating,
				productId,
			}

			await axios.post('/api/review', sanitizedData)
			reset()
		} catch (error) {
			console.error('Error submitting review:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register('name', nameValidation)}
				placeholder='Ismingiz'
				error={errors.name}
				aria-invalid={!!errors.name}
				aria-describedby={errors.name ? 'name-error' : undefined}
			/>
			{errors.name && (
				<span id='name-error' role='alert'>
					{errors.name.message}
				</span>
			)}

			<Input
				{...register('title', titleValidation)}
				placeholder='Sharh sarlavhasi'
				error={errors.title}
				aria-invalid={!!errors.title}
				aria-describedby={errors.title ? 'title-error' : undefined}
			/>
			{errors.title && (
				<span id='title-error' role='alert'>
					{errors.title.message}
				</span>
			)}

			<TextArea
				{...register('description', descriptionValidation)}
				placeholder='Izohingiz'
				error={errors.description}
				aria-invalid={!!errors.description}
				aria-describedby={errors.description ? 'description-error' : undefined}
			/>
			{errors.description && (
				<span id='description-error' role='alert'>
					{errors.description.message}
				</span>
			)}

			<Controller
				control={control}
				name='rating'
				rules={ratingValidation}
				render={({ field }) => (
					<>
						<Rating
							rating={field.value}
							setRating={field.onChange}
							isEditable
							error={errors.rating}
							aria-invalid={!!errors.rating}
							aria-describedby={errors.rating ? 'rating-error' : undefined}
						/>
						{errors.rating && (
							<span id='rating-error' role='alert'>
								{errors.rating.message}
							</span>
						)}
					</>
				)}
			/>

			<Button type='submit'>Yuborish</Button>
		</form>
	)
}
```

## Best Practices

### 1. Always Sanitize Input

**Never** send user input directly to the API without sanitization:

```typescript
// ❌ Bad
const onSubmit = (data: IReviewForm) => {
	axios.post('/api/review', data)
}

// ✅ Good
const onSubmit = (data: IReviewForm) => {
	const sanitizedData = {
		name: sanitizeInput(data.name),
		title: sanitizeInput(data.title),
		description: sanitizeInput(data.description),
	}
	axios.post('/api/review', sanitizedData)
}
```

### 2. Use ARIA Attributes for Accessibility

Always add ARIA attributes to form fields with validation:

```tsx
;<Input
	{...register('name', nameValidation)}
	aria-invalid={!!errors.name}
	aria-describedby={errors.name ? 'name-error' : undefined}
/>
{
	errors.name && (
		<span id='name-error' role='alert'>
			{errors.name.message}
		</span>
	)
}
```

### 3. Provide Clear Error Messages

Error messages should be:

- In the user's language (Uzbek for this project)
- Specific about what went wrong
- Actionable (tell users how to fix it)

```typescript
// ❌ Bad
minLength: { value: 2, message: 'Too short' }

// ✅ Good
minLength: {
  value: 2,
  message: 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'
}
```

### 4. Style Error Messages Clearly

Error messages should be visually distinct:

```css
.errorMessage {
	color: var(--red);
	font-size: 12px;
	margin-top: 5px;
	display: block;
	line-height: 16px;
}
```

### 5. Validate on Both Client and Server

Client-side validation improves UX, but always validate on the server too:

```typescript
// Client-side (ReviewForm)
const sanitizedData = {
	name: sanitizeInput(data.name),
	title: sanitizeInput(data.title),
}

// Server-side (API route)
if (!isValidName(req.body.name)) {
	return res.status(400).json({ error: 'Invalid name' })
}
```

### 6. Handle Edge Cases

Consider edge cases in validation:

```typescript
// Handle multiple spaces
export const sanitizeInput = (input: string): string => {
	return input
		.replace(/<[^>]*>/g, '')
		.trim()
		.replace(/\s+/g, ' ')
}

// Handle emoji and special characters
export const nameValidation: RegisterOptions = {
	pattern: {
		value: /^[A-Za-zА-Яа-яЁё\s]+$/,
		message: "Ism faqat harflardan iborat bo'lishi kerak",
	},
}
```

### 7. Test Validation Thoroughly

Test all validation scenarios:

- Empty fields
- Minimum/maximum length
- Invalid patterns
- XSS attempts (HTML injection)
- Special characters
- Multiple spaces
- Different languages

## Security Considerations

### XSS Prevention

Always sanitize user input to prevent XSS attacks:

```typescript
// Remove HTML tags
const sanitizedInput = sanitizeInput(userInput)

// Escape HTML entities for display
const displayText = escapeHtml(userInput)
```

### SQL Injection Prevention

Use parameterized queries or ORM (like Supabase):

```typescript
// ❌ Bad - vulnerable to SQL injection
const query = `SELECT * FROM users WHERE name = '${userName}'`

// ✅ Good - parameterized query
const { data } = await supabase.from('users').select('*').eq('name', userName)
```

### Rate Limiting

Implement rate limiting on form submissions:

```typescript
const [isSubmitting, setIsSubmitting] = useState(false)

const onSubmit = async (data: IReviewForm) => {
	if (isSubmitting) return

	setIsSubmitting(true)
	try {
		await axios.post('/api/review', data)
	} finally {
		setTimeout(() => setIsSubmitting(false), 3000) // 3 second cooldown
	}
}
```

## Common Patterns

### Custom Validation with Multiple Conditions

```typescript
const usernameValidation: RegisterOptions = {
	required: 'Username talab qilinadi',
	validate: {
		minLength: value => validateLength(value, 3, 20),
		noSpaces: value => !value.includes(' ') || "Bo'sh joy bo'lmasligi kerak",
		startsWithLetter: value => /^[A-Za-z]/.test(value) || 'Harf bilan boshlanishi kerak',
	},
}
```

### Conditional Validation

```typescript
<Input
	{...register('middleName', {
		validate: value => {
			if (hasMiddleName) {
				return validateLength(value, 2, 50)
			}
			return true
		},
	})}
/>
```

### Password Confirmation

```typescript
const { register, watch } = useForm()
const password = watch('password')

;<Input
	{...register('confirmPassword', {
		validate: value => value === password || 'Parollar mos kelmaydi',
	})}
/>
```

## Troubleshooting

### Error Message Not Showing

Check that:

1. Field is registered with react-hook-form
2. Error message has correct ID matching aria-describedby
3. CSS for error message is applied
4. Error object exists in formState

### Validation Not Triggering

Check that:

1. Form is using handleSubmit
2. Validation rules are correctly defined
3. react-hook-form version is compatible
4. Field name matches interface

### Sanitization Not Working

Check that:

1. sanitizeInput is called before API request
2. All string fields are sanitized
3. Sanitization doesn't remove needed characters
4. Server-side validation is also implemented

## Resources

- [react-hook-form Documentation](https://react-hook-form.com/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## Summary

The validation system provides:

- ✅ 8 pre-built validation patterns
- ✅ Input sanitization utilities
- ✅ Accessible error messages
- ✅ XSS protection
- ✅ Clear documentation
- ✅ Best practices and examples

Use these patterns consistently across all forms in the project to maintain security, accessibility, and user experience standards.
