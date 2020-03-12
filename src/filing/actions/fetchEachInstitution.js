import fetchInstitution from './fetchInstitution.js'
import receiveInstitutions from './receiveInstitutions.js'

export default function fetchEachInstitution(institutions, filingPeriod, filingQuarters, fetchFilings) {
  return dispatch => {
    return Promise.all(
      institutions.map(institution => {
        return dispatch(fetchInstitution(institution, filingPeriod, filingQuarters, fetchFilings))
      })
    ).then(() => {
      return dispatch(receiveInstitutions())
    })
  }
}
