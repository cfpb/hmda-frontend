import { RECEIVE_PARSE_ERRORS, RECEIVE_EDIT, REFRESH_STATE } from '../constants'

const defaultPagination = {}

export default (state = defaultPagination, action) => {
  switch (action.type) {
    case RECEIVE_PARSE_ERRORS:
      return {
        ...state,
        parseErrors: action.pagination
      }
    case RECEIVE_EDIT:
      return {
        ...state,
        [action.edit]: action.pagination
      }
    case REFRESH_STATE:
      return defaultPagination
    default:
      return state
  }
}
