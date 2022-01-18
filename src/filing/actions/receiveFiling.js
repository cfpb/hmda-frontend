import * as types from '../constants'
import { isStalledUpload } from '../institutions/helpers'


export default function receiveFiling(data) {
  // Check for stalled uploads
  data.submissions = data.submissions.map((sub) => {
    const { status: { code }, start } = sub
    
    return {
      ...sub,
      isStalled: isStalledUpload(code, start),
    }
  })
  
  return {
    type: types.RECEIVE_FILING,
    filing: data
  }
}
