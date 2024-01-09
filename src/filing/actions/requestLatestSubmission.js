import { REQUEST_LATEST_SUBMISSION } from '../constants'

export default function requestLatestSubmission(lei) {
  return {
    type: REQUEST_LATEST_SUBMISSION,
    lei,
  }
}
