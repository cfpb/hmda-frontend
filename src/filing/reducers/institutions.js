import {
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  REQUEST_INSTITUTION,
  RECEIVE_INSTITUTION,
  UPDATE_FILING_PERIOD,
  RECEIVE_INSTITUTION_NOT_FOUND
} from '../constants'

const defaultInstitutions = {
  institutions: {},
  isFetching: false,
  fetched: false
}

/*
 * Set isFetching to true when institutions are being requested
 * Set isFetching to false and populate the institutions key
 *   when data is received
 */
export default (state = defaultInstitutions, action) => {
  switch (action.type) {
    case REQUEST_INSTITUTIONS:
      return {
        ...state,
        isFetching: true
      }
    case REQUEST_INSTITUTION:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.lei]: {
            isFetching: true
          }
        }
      }

    case RECEIVE_INSTITUTION:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.institution.lei]: {
            isFetching: false,
            name: action.institution.respondent.name,
            lei: action.institution.lei,
            quarterlyFiler: action.institution.quarterlyFiler
          }
        }
      }
    case RECEIVE_INSTITUTIONS:
      return {
        ...state,
        isFetching: false,
        fetched: true
      }
    case RECEIVE_INSTITUTION_NOT_FOUND:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.lei]: {
            isFetching: false,
            notFound: true,
            lei: action.lei
          }
        }
      }
    case UPDATE_FILING_PERIOD:
      return defaultInstitutions
    default:
      return state
  }
}
