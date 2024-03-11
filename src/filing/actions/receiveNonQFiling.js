import receiveLatestSubmission from './receiveLatestSubmission.js'
import receiveFiling from './receiveFiling.js'

function receiveNonQFiling(data) {
  const institution = data.institution

  return (dispatch) => {
    dispatch(receiveFiling({ filing: { lei: institution.lei } }))
    return dispatch(receiveLatestSubmission({ id: { lei: institution.lei } }))
  }
}

export default receiveNonQFiling
