import {
  REQUEST_LATEST_SUBMISSION,
  RECEIVE_LATEST_SUBMISSION
} from '../constants'

const defaultLatestSubmissions = {
  latestSubmissions: {},
  isFetching: false,
  fetched: false
}

export default (state = defaultLatestSubmissions, action) => {
  switch (action.type) {
    case REQUEST_LATEST_SUBMISSION:
      return {
        ...state,
        latestSubmissions: {
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
            filename: action.fileName,
            id: action.id,
            status: action.status,
            qualityExists: action.qualityExists || false,
            qualityVerified: action.qualityVerified || false,
            macroExists: action.macroExists || false,
            macroVerified: action.macroVerified || false
          }
        }
      }
    default:
      return state
  }
}
