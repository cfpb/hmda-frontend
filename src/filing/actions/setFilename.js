import * as types from '../constants'

export default function setFilename(filename, lei) {
  return {
    type: types.SET_FILENAME,
    filename,
    lei,
  }
}
