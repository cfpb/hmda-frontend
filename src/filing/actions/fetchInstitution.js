import fetchCurrentFiling from './fetchCurrentFiling.js'
import receiveInstitution from './receiveInstitution.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getInstitution } from '../api/api.js'
import requestInstitution from './requestInstitution.js'
import receiveInstitutionNotFound from './receiveInstitutionNotFound'
import receiveLatestSubmission from './receiveLatestSubmission.js'
import receiveFiling from './receiveFiling.js'
import { error } from '../utils/log.js'
import { login } from '../utils/keycloak.js'

export default function fetchInstitution(institution, filingPeriod, fetchFilings = true) {
  return (dispatch, getState) => {
    dispatch(requestInstitution(institution.lei))
    return getInstitution(institution.lei, filingPeriod)
      .then(json => {
        if(json.status === 403 && filingPeriod.indexOf('-Q') > -1){
          // For the quarterly institutions endpoint, trying to read a non-quarterly filer will result in a 403 (Forbidden) error.
          // The shared api fetch routine automatically try to refresh Keycloak in this instance, resulting in a page reload.
          // To avoid infinite reloading, we prevent the login() call on 403 if it's a quarterly endpoint.
          // Here, we validate the httpStatus code from the response body to determine if the 403 actually requires a Keycloak refresh,
          // or if this institution should simply be recognized as a non-quarterly filer.  
          return function(){
            const reader = json.body.getReader()
            reader.read().then(({ value }) => {
              const bodyJson = JSON.parse(new TextDecoder("utf-8").decode(value))
              if(bodyJson.httpStatus === 400){
                // Non-quarterly filer
                return treatAsReceived(dispatch, institution, filingPeriod)
              } else {
                // Keycloak refresh
                login()
                dispatch(receiveError(json))
                throw new Error(json && `${json.status}: ${json.statusText}`)
              }
            })
          }()
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

function treatAsReceived(dispatch, institution, filingPeriod) {
  dispatch(
    receiveInstitution({
      institution: {
        activityYear: +filingPeriod.split('-')[0],
        lei: institution.lei,
        respondent: { name: '' },
        quarterlyFiler: false
      }
    })
  )
  dispatch(receiveFiling({ filing: { lei: institution.lei } }))
  return dispatch(receiveLatestSubmission({ id: { lei: institution.lei } }))
}