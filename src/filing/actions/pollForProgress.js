import fetchEdits from './fetchEdits.js'
import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getLatestSubmission } from '../api/api.js'
import { error } from '../utils/log.js'
import {
  PARSED_WITH_ERRORS,
  SYNTACTICAL_VALIDITY_EDITS,
  NO_MACRO_EDITS,
  MACRO_EDITS,
  VALIDATED
} from '../constants/statusCodes.js'

export const makeDurationGetter = () => {
  let count = 0
  return () => {
    let duration = (Math.pow(1.2, count) * 1000) >> 0
    if (duration > 20000) duration = 20000
    else count++
    return duration
  }
}

let poll = 0

export default function pollForProgress() {
  const getTimeoutDuration = makeDurationGetter()
  let errorCounter = 0
  const currentPoll = ++poll

  const poller = dispatch => {
    if (currentPoll !== poll || !window.location.pathname.match('/upload'))
      return Promise.resolve(null)
    return getLatestSubmission()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            if (++errorCounter >= 3) {
              dispatch(receiveError(json))
              throw new Error(json && `${json.status}: ${json.statusText}`)
            } else {
              setTimeout(poller.bind(null, dispatch), getTimeoutDuration())
              return Promise.resolve()
            }
          }
          errorCounter = 0
          return dispatch(receiveSubmission(json))
        })
      })
      .then(json => {
        if (!json) return
        const { code } = json.status
        if (
          // continue polling until we reach a status that isn't processing
          code !== PARSED_WITH_ERRORS &&
          code !== SYNTACTICAL_VALIDITY_EDITS &&
          code !== NO_MACRO_EDITS &&
          code !== MACRO_EDITS &&
          code < VALIDATED
        ) {
          setTimeout(poller.bind(null, dispatch), getTimeoutDuration())
        } else if (
          // only get edits when we've reached a terminal edit state
          code === SYNTACTICAL_VALIDITY_EDITS ||
          code === NO_MACRO_EDITS ||
          code === MACRO_EDITS
        ) {
          return dispatch(fetchEdits())
        }
      })
      .catch(err => {
        error(err)
      })
  }
  return poller
}
