import { isProd } from '../configUtils'

// CF.gov host for Production/Development environments
export const CFGOV_HOST = isProd(window.location.host)
  ? 'https://www.consumerfinance.gov'
  : `${import.meta.env.VITE_CFGOV_DEV_DOMAIN}`

// CF.gov endpoint for subscribing to a topic
export const SUBSCRIPTION_ENDPOINT = `${CFGOV_HOST}/subscriptions/new/`

// HMDA topic for Production/Staging
export const HMDA_FILING_TOPIC_ID = isProd(window.location.host)
  ? 'USCFPB_139'
  : 'USCFPB_51'
