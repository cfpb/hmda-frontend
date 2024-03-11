import {
  REQUEST_PARSE_ERRORS,
  RECEIVE_PARSE_ERRORS,
  REFRESH_STATE,
} from '../constants'

const defaultParseErrors = {
  isFetching: false,
  fetched: false,
  transmittalSheetErrors: [],
  larErrors: [],
}

export default (state = defaultParseErrors, action) => {
  switch (action.type) {
    case REQUEST_PARSE_ERRORS:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_PARSE_ERRORS:
      return {
        isFetching: false,
        fetched: true,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors,
      }

    case REFRESH_STATE: {
      return defaultParseErrors
    }
    default:
      return state
  }
}
