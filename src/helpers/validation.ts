/**
 * Form Validation Utilities
 * Umumiy validation funksiyalari va patternlari
 */

// Email validation
export const emailPattern = {
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: "Email noto'g'ri formatda",
	},
}

// Phone validation (Top 30 countries)
// Supported formats:
// +1 (USA, Canada) - 11 digits
// +7 (Russia) - 11 digits
// +20 (Egypt) - 11-12 digits
// +33 (France) - 11 digits
// +34 (Spain) - 11 digits
// +39 (Italy) - 11-13 digits
// +44 (UK) - 12-13 digits
// +48 (Poland) - 11 digits
// +49 (Germany) - 11-13 digits
// +52 (Mexico) - 12-13 digits
// +54 (Argentina) - 11-13 digits
// +55 (Brazil) - 12-13 digits
// +60 (Malaysia) - 11-12 digits
// +62 (Indonesia) - 11-13 digits
// +63 (Philippines) - 12 digits
// +66 (Thailand) - 11 digits
// +81 (Japan) - 11-12 digits
// +82 (South Korea) - 11-12 digits
// +84 (Vietnam) - 11-12 digits
// +86 (China) - 13 digits
// +90 (Turkey) - 12 digits
// +91 (India) - 12 digits
// +92 (Pakistan) - 12 digits
// +98 (Iran) - 12 digits
// +234 (Nigeria) - 13 digits
// +380 (Ukraine) - 12 digits
// +880 (Bangladesh) - 13 digits
// +966 (Saudi Arabia) - 12 digits
// +998 (Uzbekistan) - 12 digits
export const phonePattern = {
	pattern: {
		value:
			/^(\+1[0-9]{10}|\+7[0-9]{10}|\+20[0-9]{9,10}|\+33[0-9]{9}|\+34[0-9]{9}|\+39[0-9]{9,11}|\+44[0-9]{10,11}|\+48[0-9]{9}|\+49[0-9]{9,11}|\+52[0-9]{10,11}|\+54[0-9]{9,11}|\+55[0-9]{10,11}|\+60[0-9]{9,10}|\+62[0-9]{9,11}|\+63[0-9]{10}|\+66[0-9]{9}|\+81[0-9]{9,10}|\+82[0-9]{9,10}|\+84[0-9]{9,10}|\+86[0-9]{11}|\+90[0-9]{10}|\+91[0-9]{10}|\+92[0-9]{10}|\+98[0-9]{10}|\+234[0-9]{10}|\+380[0-9]{9}|\+880[0-9]{10}|\+966[0-9]{9}|\+998[0-9]{9})$/,
		message: "Telefon raqami noto'g'ri formatda (masalan: +998901234567)",
	},
}

// URL validation
export const urlPattern = {
	pattern: {
		value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/,
		message: "URL noto'g'ri formatda",
	},
}

// Name validation (minimum 2 characters, only letters and spaces)
export const nameValidation = {
	required: { value: true, message: 'Ism kiritish majburiy' },
	minLength: { value: 2, message: "Ism kamida 2 ta harfdan iborat bo'lishi kerak" },
	maxLength: { value: 50, message: 'Ism 50 ta harfdan oshmasligi kerak' },
	pattern: {
		value: /^[a-zA-Zа-яА-ЯўғҳқўҒҲҚ\s]+$/,
		message: "Ism faqat harflardan iborat bo'lishi kerak",
	},
}

// Description validation
export const descriptionValidation = {
	required: { value: true, message: 'Izoh kiritish majburiy' },
	minLength: { value: 10, message: "Izoh kamida 10 ta belgidan iborat bo'lishi kerak" },
	maxLength: { value: 500, message: 'Izoh 500 ta belgidan oshmasligi kerak' },
}

// Title validation
export const titleValidation = {
	required: { value: true, message: 'Sarlavha kiritish majburiy' },
	minLength: { value: 3, message: "Sarlavha kamida 3 ta belgidan iborat bo'lishi kerak" },
	maxLength: { value: 100, message: 'Sarlavha 100 ta belgidan oshmasligi kerak' },
}

// Rating validation
export const ratingValidation = {
	required: { value: true, message: 'Baho tanlang' },
	min: { value: 1, message: 'Minimal baho 1' },
	max: { value: 5, message: 'Maksimal baho 5' },
}

// Password validation
export const passwordValidation = {
	required: { value: true, message: 'Parol kiritish majburiy' },
	minLength: { value: 8, message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" },
	pattern: {
		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
		message: "Parol katta, kichik harf, raqam va maxsus belgidan iborat bo'lishi kerak",
	},
}

// Helper: Check if string is empty or whitespace
export const isNotEmpty = (value: string): boolean => {
	return value.trim().length > 0
}

// Helper: Sanitize input (remove HTML tags)
export const sanitizeInput = (value: string): string => {
	return value.replace(/<[^>]*>/g, '').trim()
}

// Helper: Validate field length
export const validateLength = (value: string, min: number, max: number): string | true => {
	const length = value.trim().length
	if (length < min) return `Kamida ${min} ta belgi bo'lishi kerak`
	if (length > max) return `Maksimum ${max} ta belgi bo'lishi mumkin`
	return true
}

// Helper: Custom validation function generator
export const createCustomValidation = (fn: (value: unknown) => boolean, message: string) => ({
	validate: (value: unknown) => fn(value) || message,
})

// XSS Protection: Escape special characters
export const escapeHtml = (text: string): string => {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	}
	return text.replace(/[&<>"']/g, m => map[m])
}
