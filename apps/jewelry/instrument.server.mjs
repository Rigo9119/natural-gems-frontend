import * as Sentry from "@sentry/tanstackstart-react"

const dsn = process.env.VITE_SENTRY_DSN

if (dsn) {
	Sentry.init({
		dsn,
		sendDefaultPii: true,
		tracesSampleRate: 1.0,
	})
}
