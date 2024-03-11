import getPaginationReceiveAction from './getPaginationReceiveAction.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import getPaginationRequestAction from './getPaginationRequestAction.js'
import { error } from '../utils/log.js'

import { fetchData } from '../api/fetch.js'

export default function fetchPage(target, pathname) {
  return (dispatch) => {
    dispatch(getPaginationRequestAction(target))
    return fetchData({ pathname: pathname })
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(getPaginationReceiveAction(target, json))
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
