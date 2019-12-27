import { RECEIVE_LATEST_SUBMISSION } from '../constants/index'

export default function receiveLatestSubmission(action) {
  return {
    type: RECEIVE_LATEST_SUBMISSION,
    ...action
  }
}
