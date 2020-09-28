import FILING_PERIODS from '../constants/dates.js'
import { flattenApiForInstitutionState } from '../utils/convert.js'

// Returns an array of Promises, one for each year for which the institution is being fetched
export const fetchInstitution = (lei, setState, token) => {
  return Object.keys(FILING_PERIODS).map(y => {
    let year = FILING_PERIODS[y].id

    return fetch(`/v2/admin/institutions/${lei}/year/${year}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status > 400) return response.status
        if (response.status < 300) return response.json()
      })
      .then(json => {
        if (typeof json === 'object') {
            addFound(json, setState)
        } else {
          if (json === 404) addNotFound(lei, year, setState)
          else addServerError(lei, year, json, setState)
        }
      })
      .catch(error => {})
  })
}

// Store successfully returned institution data
function addFound(json, updateFn) {
  updateFn(state => ({
    institutions: [...state.institutions, flattenApiForInstitutionState(json)]
  }))
}

// Track actual fetching errors
function addServerError(lei, year, status, updateFn) {
  updateFn(state => ({
    errors: [...state.errors, { lei, year, status }]
  }))
}

// Track years in which institution does not exist
function addNotFound(lei, year, updateFn) {
  updateFn(state => ({
    notFound: [...state.notFound, { lei, year }]
  }))
}
