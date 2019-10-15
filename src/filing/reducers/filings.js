import { REQUEST_FILING, RECEIVE_FILING } from '../constants'

const defaultFilings = {}

/*
 * Populate a list with data on every filing period for each institution
 * When an filing data for an institution is received, it is added to the list
 * When clear filings is dispatched, empty the list
 */
export default (state = defaultFilings, action) => {
  switch (action.type) {
    case REQUEST_FILING:
      return {
        ...state,
        [action.lei]: {
          isFetching: true,
          fetched: false,
          filing: null
        }
      }
    case RECEIVE_FILING:
      return {
        ...state,
        [action.filing.filing.lei]: {
          isFetching: false,
          fetched: true,
          filing: action.filing
        }
      }
    default:
      return state
  }
}
