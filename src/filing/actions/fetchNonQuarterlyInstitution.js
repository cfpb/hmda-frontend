import receiveLatestSubmission from './receiveLatestSubmission.js'
import receiveFiling from './receiveFiling.js'
import fetchInstitution from './fetchInstitution'

function fetchNonQuarterlyInstitution(institution, year, getFilings = false) {
  return dispatch => {
    dispatch(fetchInstitution(institution, year, getFilings)).then(() => {
      dispatch(receiveFiling({ filing: { lei: institution.lei } }))
      return dispatch(receiveLatestSubmission({ id: { lei: institution.lei } }))
    })
  }
}

export default fetchNonQuarterlyInstitution