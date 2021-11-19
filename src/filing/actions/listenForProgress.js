import fetchEdits from './fetchEdits.js'
import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getLatestSubmission } from '../api/api.js'
import requestProcessingProgress from './requestProcessingProgress'
import receiveProcessingProgress from './receiveProcessingProgress'
import { error } from '../utils/log.js'
import {
  SYNTACTICAL_VALIDITY_EDITS,
  NO_MACRO_EDITS,
  MACRO_EDITS,
  UPLOADED
} from '../constants/statusCodes.js'

// Extract completion percentage
export const parseProgress = string => {
  if (!string.match(/^InProgress/)) return string
  return string.match(/\d{1,}/)[0] 
}

const shouldSkipKey = key => ['done', 'fetched'].indexOf(key) > -1

/* Websocket Listener */
export default function listenForProgress() {
  return (dispatch) => {
    if (!window.location.pathname.match('/upload'))
      return Promise.resolve(null)

    return getLatestSubmission()
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .then((json) => {
        if (!json) return

        const { status, id } = json
        const { lei, period, sequenceNumber } = id
        const { year, quarter } = period
        const { code } = status

        if (code >= UPLOADED) {
          // Open a websocket and listen for updates
          const wsBaseUrl = process.env.REACT_APP_ENVIRONMENT === 'CI'
            ? `${window.location.hostname}:8080`
            : `${window.location.host}/v2/filing`

          const wsProgressUrl = quarter
            ? `/institutions/${lei}/filings/${year}/quarter/${quarter}/submissions/${sequenceNumber}/progress`
            : `/institutions/${lei}/filings/${year}/submissions/${sequenceNumber}/progress`

          let socket = new WebSocket(`ws://${wsBaseUrl}${wsProgressUrl}`)

          socket.onopen = (event) => {
            console.log('>>> Socket open! Listening for Progress...')
            dispatch(requestProcessingProgress())
          }

          // Listen for messages
          socket.onmessage = (event) => {
            const data = event.data && JSON.parse(event.data)[1]

            if (!data) return

            const uploadStatus = {
              syntactical: parseProgress(data.syntactical),
              quality: parseProgress(data.quality),
              macro: parseProgress(data.macro),
            }

            // No Syntactical errors and all others Completed
            uploadStatus.done =
              !!uploadStatus.syntactical.match(/Error/) ||
              Object.keys(uploadStatus).every((key) => {
                if (shouldSkipKey(key)) return true
                return uploadStatus[key].match(/^Completed/)
              })

            console.log('> Progress: ', uploadStatus)

            // Update Submission for status messaging
            getLatestSubmission().then((json) => {
              return hasHttpError(json).then((hasError) => {
                if (hasError) {
                  dispatch(receiveError(json))
                  throw new Error(json && `${json.status}: ${json.statusText}`)
                }
                return dispatch(receiveSubmission(json))
              })
            })

            if (uploadStatus.done) {
              console.log('<<< Closing Socket!')
              socket.close(1000, 'Done Processing')

              // Save status updates
              dispatch(receiveProcessingProgress({ status: uploadStatus }))

              const hasEdits = Object.keys(uploadStatus).some((key) => {
                if (shouldSkipKey(key)) return false
                return uploadStatus[key].match(/Error/)
              })

              if (hasEdits) return dispatch(fetchEdits())
            }
            else {
              dispatch(receiveProcessingProgress({ status: uploadStatus }))
            }
          }

          // TODO: Anything special on close?
          socket.onclose = (event) => {
            if (event.wasClean) {
              console.log(
                `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
              )
            }
            else {
              // e.g. server process killed or network down
              // event.code is usually 1006 in this case
              console.log('[close] Connection died')
            }
          }

          // TODO: What to do on websocket error?
          socket.onerror = function (error) {
            console.log(`[error] ${error.message}`)
          }
        }
        else if (
          // only get edits when we've reached a terminal edit state
          code === SYNTACTICAL_VALIDITY_EDITS ||
          code === NO_MACRO_EDITS ||
          code === MACRO_EDITS) {
          return dispatch(fetchEdits())
        }
      })
      .catch((err) => {
        error(err)
      })
  }
}
