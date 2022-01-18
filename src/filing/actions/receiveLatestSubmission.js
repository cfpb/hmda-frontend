import { RECEIVE_LATEST_SUBMISSION } from '../constants/index'
import { isStalledUpload } from '../institutions/helpers'

export default function receiveLatestSubmission(action) {
  const { status: { code }, start } = action
  
  // Check for stalled uploads
  action.isStalled = isStalledUpload(code, start)
  
  return {
    type: RECEIVE_LATEST_SUBMISSION,
    ...action,
  }
}
