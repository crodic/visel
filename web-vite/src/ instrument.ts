import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://b85fa0d32177d46c8c56798b0d31f355@o4510780550152192.ingest.us.sentry.io/4510781025353728',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
})
