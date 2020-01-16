import { UPDATE_FILING_PERIOD } from '../constants'
/*
 * Set the default current filing period
 */
export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_FILING_PERIOD:
      return action.filingPeriod
    default:
      return state
  }
}
