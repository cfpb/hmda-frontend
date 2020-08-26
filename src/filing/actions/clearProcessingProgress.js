import * as types from '../constants'

export default function clearProcessingProgress() {
  return {
    type: types.CLEAR_PROCESSING_PROGRESS
  }
}