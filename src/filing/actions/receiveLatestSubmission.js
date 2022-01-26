import { RECEIVE_LATEST_SUBMISSION } from '../constants/index'
import { isStalledUpload } from '../institutions/helpers'

export default function receiveLatestSubmission(action) {
  const { start } = action
  let code = action.status?.code || -1
  
  // Check for stalled uploads
  action.isStalled = isStalledUpload(code, start)
  
  return {
    type: RECEIVE_LATEST_SUBMISSION,
    ...action,
  }
}
