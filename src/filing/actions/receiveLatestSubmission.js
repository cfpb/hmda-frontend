import { RECEIVE_LATEST_SUBMISSION } from '../constants/index'
import { UNINITIALIZED } from '../constants/statusCodes'
import { isStalledUpload } from '../institutions/helpers'

export default function receiveLatestSubmission(action) {
  const { start } = action
  const code = action.status?.code || UNINITIALIZED

  action.isStalled = isStalledUpload(code, start)

  return {
    type: RECEIVE_LATEST_SUBMISSION,
    ...action,
  }
}
