import { flattenApiForInstitutionState } from '../utils/convert.js'
import * as AccessToken from '../../common/api/AccessToken'

// Returns an array of Promises, one for each year for which the institution is being fetched
export const fetchInstitution = (lei, setState, availableYears) => {
  return availableYears.map((year) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    const token = AccessToken.get()
    if (token) headers['Authorization'] = `Bearer ${token}`

    return fetch(`/v2/admin/institutions/${lei}/year/${year}`, { headers })
      .then((response) => {
        if (response.status > 400) return response.status
        if (response.status < 300) return response.json()
      })
      .then((json) => {
        if (typeof json === 'object') {
          addFound(json, setState)
        } else {
          if (json === 404) addNotFound(lei, year, setState)
          else addServerError(lei, year, json, setState)
        }
      })
      .catch((error) => {})
  })
}

export const fetchSingleInstitutionByYear = (lei, year) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const token = AccessToken.get()
  if (token) headers['Authorization'] = `Bearer ${token}`

  return fetch(`/v2/admin/institutions/${lei}/year/${year}`, { headers })
    .then((response) => {
      if (response.status > 400) return null
      if (response.status < 300) return response.json()
    })
    .catch((error) => {
      console.error('Error fetching institution data:', error)
      return null
    })
}

// Store successfully returned institution data
function addFound(json, updateFn) {
  updateFn((state) => ({
    institutions: [...state.institutions, flattenApiForInstitutionState(json)],
  }))
}

// Track actual fetching errors
function addServerError(lei, year, status, updateFn) {
  updateFn((state) => ({
    errors: [...state.errors, { lei, year, status }],
  }))
}

// Track years in which institution does not exist
function addNotFound(lei, year, updateFn) {
  updateFn((state) => ({
    notFound: [...state.notFound, { lei, year }],
  }))
}
