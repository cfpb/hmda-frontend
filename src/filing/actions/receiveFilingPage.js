import { RECEIVE_FILING_PAGE } from '../constants'

export default function receiveFilingPage(json) {
  return {
    type: RECEIVE_FILING_PAGE,
    json,
  }
}
