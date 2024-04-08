import * as types from '../constants'

export default function setFile(file, filingPeriod, lei) {
  localStorage.setItem(`HMDA_FILE_SIZE/${filingPeriod}/${lei}`, file.size)
  return {
    type: types.SELECT_FILE,
    file,
    lei,
  }
}
