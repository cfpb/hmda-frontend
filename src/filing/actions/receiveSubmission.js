import * as types from '../constants'
import { isStalledUpload } from '../institutions/helpers'

export default function receiveSubmission(data) {
  const {
    status: { code },
    start,
  } = data

  return {
    type: types.RECEIVE_SUBMISSION,
    // Check for stalled uploads
    isStalled: isStalledUpload(code, start),
    ...data,
  }
}
