import * as Sentry from '@sentry/nextjs'

const disbabled = process.env.SENTRY_DISABLED === 'true'

console.log('Sentry disabled:', disbabled)

export async function register() {
	if (disbabled) {
		return
	}
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		await import('./sentry.server.config')
	}

	if (process.env.NEXT_RUNTIME === 'edge') {
		await import('./sentry.edge.config')
	}
}

export const onRequestError = disbabled ? undefined : Sentry.captureRequestError
