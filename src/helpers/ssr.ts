import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/** Extracts a readable message from any thrown value (Error, Supabase object, etc.) to avoid "[object Object]" in UI. */
export function getErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message
	if (
		err &&
		typeof err === 'object' &&
		'message' in err &&
		typeof (err as { message: unknown }).message === 'string'
	) {
		return (err as { message: string }).message
	}
	return String(err)
}

export function safeGetServerSideProps(fn: GetServerSideProps): GetServerSideProps {
	return async (ctx: GetServerSidePropsContext) => {
		try {
			return await fn(ctx)
		} catch (err) {
			const message = getErrorMessage(err)
			console.error('safeGetServerSideProps error:', err)
			return {
				props: {
					fetchError: message,
				},
			}
		}
	}
}
