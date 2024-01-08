import fetchCurrentFiling from './fetchCurrentFiling.js'
import receiveInstitution from './receiveInstitution.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getInstitution } from '../api/api.js'
import requestInstitution from './requestInstitution.js'
import receiveInstitutionNotFound from './receiveInstitutionNotFound'
import { error } from '../utils/log.js'
import receiveNonQFiling from './receiveNonQFiling'
import { splitYearQuarter } from '../api/utils'

export default function fetchInstitution(
  institution,
  selectedPeriod,
  fetchFilings = true,
) {
  return (dispatch) => {
    dispatch(requestInstitution(institution.lei))
    return getInstitution(institution.lei, selectedPeriod.period)
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            if (json.status === 404) {
              dispatch(receiveInstitutionNotFound({ lei: institution.lei }))
              throw new Error(
                `${institution.lei} does not exist in ${
                  splitYearQuarter(selectedPeriod.period)[0]
                }.`,
              )
            }

            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }

          dispatch(receiveInstitution(json))

          if (fetchFilings) {
            return selectedPeriod.isQuarterly &&
              !json.institution.quarterlyFiler
              ? dispatch(receiveNonQFiling(json))
              : dispatch(fetchCurrentFiling(json, selectedPeriod))
          }
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
