import receiveFiling from './receiveFiling.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestFiling from './requestFiling.js'
import { createFiling } from '../api/api.js'
import { error } from '../utils/log.js'
import receiveLatestSubmission from './receiveLatestSubmission'
import receiveNonQFiling from './receiveNonQFiling'
import { FilingNotAllowed } from '../../common/constants/platform-messages.js'

export default function fetchNewFiling(filing) {
  return (dispatch) => {
    dispatch(requestFiling(filing))
    return createFiling(filing.lei, filing.period)
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            if (
              json.status == '400' &&
              json.statusText.match(FilingNotAllowed)
            ) {
              console.log(
                'Ignoring that we are unable to create a Filing for this period...',
                filing.period,
                filing.lei,
              )

              return dispatch(
                receiveNonQFiling({ institution: { lei: filing.lei } }),
              )
            }

            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          if (!hasError) {
            dispatch(receiveFiling(json))
            return dispatch(
              receiveLatestSubmission({ id: { lei: filing.lei } }),
            )
          }
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
