import * as types from '../constants'
import { UNINITIALIZED } from '../constants/statusCodes'
import { isStalledUpload } from '../institutions/helpers'

export default function receiveFiling(data) {
  // Check for stalled uploads
  const filing = {
    ...data,
    submissions: data.submissions?.map((sub) => {
      const { start } = sub
      const code = sub.status?.code || UNINITIALIZED

      return {
        ...sub,
        isStalled: isStalledUpload(code, start),
      }
    }),
  }

  return {
    type: types.RECEIVE_FILING,
    filing,
  }
}
