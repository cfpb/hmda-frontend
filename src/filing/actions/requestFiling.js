import * as types from '../constants'

export default function requestFiling(filing) {
  return {
    type: types.REQUEST_FILING,
    lei: filing.lei,
  }
}
