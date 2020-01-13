import fetchInstitution from './fetchInstitution.js'

export default function fetchEachInstitution(institutions, filingPeriod, fetchFilings) {
  return dispatch => {
    return Promise.all(
      institutions.map(institution => {
        return dispatch(fetchInstitution(institution, filingPeriod, fetchFilings))
      })
    )
  }
}
