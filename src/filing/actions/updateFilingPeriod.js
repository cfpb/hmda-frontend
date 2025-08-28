import * as types from '../constants'

export default function updateFilingPeriod(filingPeriod) {
  filingPeriod = String(filingPeriod)

  return {
    type: types.UPDATE_FILING_PERIOD,
    filingPeriod,
  }
}
