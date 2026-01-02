import { Input } from '@/src/components'
import {
	emailPattern,
	nameValidation,
	phonePattern,
	titleValidation,
	urlPattern,
} from '@/src/helpers/validation'
import styles from '@/src/styles/test-validation.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface TestForm {
	phone: string
	email: string
	name: string
	title: string
	url: string
}

export default function TestValidation(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TestForm>()

	const [result, setResult] = useState<string>('')

	const onSubmit = (data: TestForm) => {
		setResult(JSON.stringify(data, null, 2))
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Validation Test Page</h1>
			<p className={styles.description}>Bu sahifada barcha validation patternlarni sinab ko'ring</p>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.field}>
					<label htmlFor='phone'>Telefon raqami (30 davlat formati)</label>
					<Input
						{...register('phone', phonePattern)}
						id='phone'
						placeholder='+998901234567'
						aria-invalid={!!errors.phone}
						aria-describedby={errors.phone ? 'phone-error' : undefined}
					/>
					{errors.phone && (
						<span id='phone-error' className={styles.error} role='alert'>
							{errors.phone.message}
						</span>
					)}
					<small className={styles.hint}>
						Misol: +998901234567 (UZ), +12125551234 (USA), +442071234567 (UK)
					</small>
				</div>

				<div className={styles.field}>
					<label htmlFor='email'>Email</label>
					<Input
						{...register('email', emailPattern)}
						id='email'
						placeholder='example@mail.com'
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? 'email-error' : undefined}
					/>
					{errors.email && (
						<span id='email-error' className={styles.error} role='alert'>
							{errors.email.message}
						</span>
					)}
				</div>

				<div className={styles.field}>
					<label htmlFor='name'>Ism (2-50 harf)</label>
					<Input
						{...register('name', nameValidation)}
						id='name'
						placeholder='Jasur Abdurahimov'
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? 'name-error' : undefined}
					/>
					{errors.name && (
						<span id='name-error' className={styles.error} role='alert'>
							{errors.name.message}
						</span>
					)}
				</div>

				<div className={styles.field}>
					<label htmlFor='title'>Sarlavha (3-100 belgi)</label>
					<Input
						{...register('title', titleValidation)}
						id='title'
						placeholder='Ajoyib mahsulot'
						aria-invalid={!!errors.title}
						aria-describedby={errors.title ? 'title-error' : undefined}
					/>
					{errors.title && (
						<span id='title-error' className={styles.error} role='alert'>
							{errors.title.message}
						</span>
					)}
				</div>

				<div className={styles.field}>
					<label htmlFor='url'>URL</label>
					<Input
						{...register('url', urlPattern)}
						id='url'
						placeholder='https://example.com'
						aria-invalid={!!errors.url}
						aria-describedby={errors.url ? 'url-error' : undefined}
					/>
					{errors.url && (
						<span id='url-error' className={styles.error} role='alert'>
							{errors.url.message}
						</span>
					)}
				</div>

				<button type='submit' className={styles.button}>
					Tekshirish
				</button>
			</form>

			{result && (
				<div className={styles.result}>
					<h3>Natija:</h3>
					<pre>{result}</pre>
				</div>
			)}

			<div className={styles.examples}>
				<h3>Telefon raqami misollari:</h3>
				<div className={styles.grid}>
					<div>
						<strong>✅ To'g'ri formatlar:</strong>
						<ul>
							<li>+998901234567 (Uzbekistan)</li>
							<li>+12125551234 (USA)</li>
							<li>+442071234567 (UK)</li>
							<li>+86138123456789 (China)</li>
							<li>+79991234567 (Russia)</li>
							<li>+919876543210 (India)</li>
						</ul>
					</div>
					<div>
						<strong>❌ Noto'g'ri formatlar:</strong>
						<ul>
							<li>998901234567 (+ yo'q)</li>
							<li>+998 90 123 45 67 (bo'shliq bor)</li>
							<li>+123 (juda qisqa)</li>
							<li>+0123456789 (0 bilan boshlangan)</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
