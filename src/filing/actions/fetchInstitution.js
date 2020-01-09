import fetchCurrentFiling from './fetchCurrentFiling.js'
import receiveInstitution from './receiveInstitution.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getInstitution } from '../api/api.js'
import requestInstitution from './requestInstitution.js'
import receiveInstitutionNotFound from './receiveInstitutionNotFound'
import { error } from '../utils/log.js'
import { login } from '../utils/keycloak.js'
import fetchNonQuarterlyInstitution from './fetchNonQuarterlyInstitution'
import { readResponseBody, splitYearQuarter } from '../api/utils'

export default function fetchInstitution(institution, filingPeriod, fetchFilings = true) {
  return dispatch => {
    dispatch(requestInstitution(institution.lei))
    return getInstitution(institution.lei, filingPeriod)
      .then(json => {
        const [year, isQuarterly] = splitYearQuarter(filingPeriod)
        if(json.status === 403 && isQuarterly) {
          /**
           The quarterly Institutions endpoint, when given a non-quarterly filer, returns a 403 (Forbidden) error.
           The shared api's fetch routine tries to refresh Keycloak in this instance, resulting in a page reload.
           To avoid infinite reloading, we prevent the refresh on 403 if it's a quarterly endpoint.
           Here, we evaluate the httpStatus code from the response body to determine if we need a Keycloak refresh,
           or if this institution should simply be recognized as a non-quarterly filer. 
          */ 
          return readResponseBody(json).then(bodyJson => {
            if (bodyJson.httpStatus === 400)
              return dispatch(fetchNonQuarterlyInstitution(institution, year))

            return login()
          })
        }

        return hasHttpError(json).then(hasError => {
          if (hasError) {
            if(json.status === 404) {
              dispatch(receiveInstitutionNotFound({ lei: institution.lei }))
              throw new Error(
                `${institution.lei} does not exist in ${
                  filingPeriod.split("-")[0]
                }.`
              )
            }
            
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }

          dispatch(receiveInstitution(json))
          if(fetchFilings) return dispatch(fetchCurrentFiling(json))
        })
      })
      .catch(err => {
        error(err)
      })
  }
}