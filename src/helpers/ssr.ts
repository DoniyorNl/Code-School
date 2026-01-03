import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

export function safeGetServerSideProps(fn: GetServerSideProps): GetServerSideProps {
	return async (ctx: GetServerSidePropsContext) => {
		try {
			return await fn(ctx)
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			console.error('safeGetServerSideProps error:', err)
			return {
				props: {
					fetchError: message,
				},
			}
		}
	}
}
