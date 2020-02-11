import {
  REQUEST_LATEST_SUBMISSION,
  RECEIVE_LATEST_SUBMISSION,
  UPDATE_STATUS,
} from '../constants'
import { defaultSubmission } from './submission'

const defaultLatestSubmissions = {
  latestSubmissions: {},
  isFetching: false,
  fetched: false
}

export default (state = defaultLatestSubmissions, action) => {
  let submission

  switch (action.type) {
    case REQUEST_LATEST_SUBMISSION:
      return {
        ...state,
        latestSubmissions: {
          ...state.latestSubmissions,
          [action.lei]: {
            isFetching: true
          }
        }
      }

    case RECEIVE_LATEST_SUBMISSION:
      return {
        ...state,
        latestSubmissions: {
          ...state.latestSubmissions,
          [action.id.lei]: {
            isFetching: false,
            filename: action.fileName || defaultSubmission.fileName,
            id: action.id || defaultSubmission.id,
            status: action.status || defaultSubmission.status,
            qualityExists: action.qualityExists || defaultSubmission.qualityExists,
            qualityVerified: action.qualityVerified || defaultSubmission.qualityVerified,
            macroExists: action.macroExists || defaultSubmission.macroExists,
            macroVerified: action.macroVerified || defaultSubmission.macroVerified
          }
        }
      }

    case UPDATE_STATUS:
      submission = state.latestSubmissions[action.lei]
      if(!submission) return state

      return {
        ...state,
        latestSubmissions: {
          ...state.latestSubmissions,
          [action.lei]: {
            ...submission,
            status: {...action.status}
          }
        }
      }

    default:
      return state
  }
}
