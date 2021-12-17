import fetchInstitution from './fetchInstitution.js'
import receiveInstitutions from './receiveInstitutions.js'

export default function fetchEachInstitution(institutions, selectedPeriod, fetchFilings) {
  return dispatch => {
    return Promise.all(
      institutions.map(institution => {
        return dispatch(fetchInstitution(institution, selectedPeriod, fetchFilings))
      })
    ).then(() => {
      return dispatch(receiveInstitutions())
    })
  }
}
