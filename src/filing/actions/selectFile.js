import setFile from './setFile.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    const { lei, filingPeriod } = getState().app
    return dispatch(setFile(file, filingPeriod, lei))
  }
}
