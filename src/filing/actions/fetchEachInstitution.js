import { clearInstitutions } from './clearInstitutions.js'
import fetchInstitution from './fetchInstitution.js'
import receiveInstitutions from './receiveInstitutions.js'

export default function fetchEachInstitution(
  institutions,
  selectedPeriod,
  fetchFilings,
) {
  return (dispatch) => {
    // Now that users can update their profile, the institutions in redux become stale and need to be cleared
    // This allows the updated associated institutions that the user selected to become the new institutions to display
    dispatch(clearInstitutions())
    return Promise.all(
      institutions.map((institution) => {
        return dispatch(
          fetchInstitution(institution, selectedPeriod, fetchFilings),
        )
      }),
    ).then(() => {
      return dispatch(receiveInstitutions())
    })
  }
}
