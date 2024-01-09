import { REQUEST_SUMMARY, RECEIVE_SUMMARY, REFRESH_STATE } from '../constants'

const defaultSummary = {
  isFetching: false,
  submission: {},
  ts: {},
}

export default (state = defaultSummary, action) => {
  switch (action.type) {
    case REQUEST_SUMMARY:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_SUMMARY:
      return {
        ...state,
        isFetching: false,
        submission: action.submission,
        ts: action.ts,
      }
    case REFRESH_STATE: {
      return defaultSummary
    }

    default:
      return state
  }
}
