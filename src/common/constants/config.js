import { FILING_PERIODS } from '../../filing/constants/dates'

export const CONFIG_URL = 'https://raw.githubusercontent.com/cfpb/hmda-platform/master/frontend/config.json'

export const defaultConfig = {
  defaultPeriod: FILING_PERIODS[0],
  filingPeriods: FILING_PERIODS
}
