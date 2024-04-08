import * as types from '../constants'

export default function updateFilingPeriod(filingPeriod) {
  filingPeriod = filingPeriod + ''

  return {
    type: types.UPDATE_FILING_PERIOD,
    filingPeriod: filingPeriod,
  }
}
