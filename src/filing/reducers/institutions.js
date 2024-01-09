import {
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  REQUEST_INSTITUTION,
  RECEIVE_INSTITUTION,
  UPDATE_FILING_PERIOD,
  RECEIVE_INSTITUTION_NOT_FOUND,
  SHOULD_FETCH_INSTITUTIONS,
  CLEAR_INSTITUTIONS,
} from '../constants'

const defaultInstitutions = {
  institutions: {},
  isFetching: false,
  fetched: false,
  shouldFetchInstitutions: false,
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
        isFetching: true,
      }
    case REQUEST_INSTITUTION:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.lei]: {
            isFetching: true,
          },
        },
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
            activityYear: action.institution.activityYear,
            quarterlyFiler: action.institution.quarterlyFiler,
            agency: action.institution.agency,
            institutionType: action.institution.institutionType,
            institutionId2017: action.institution.institutionId2017,
            taxId: action.institution.taxId,
            rssd: action.institution.rssd,
            emailDomains: action.institution.emailDomains
              ? [...action.institution.emailDomains]
              : [],
            respondent: action.institution.respondent
              ? { ...action.institution.respondent }
              : {},
            parent: action.institution.parent
              ? { ...action.institution.parent }
              : {},
            assets: action.institution.assets,
            otherLenderCode: action.institution.otherLenderCode,
            topHolder: action.institution.topHolder
              ? { ...action.institution.topHolder }
              : {},
            hmdaFiler: action.institution.hmdaFiler,
            quarterlyFilerHasFiledQ1:
              action.institution.quarterlyFilerHasFiledQ1,
            quarterlyFilerHasFiledQ2:
              action.institution.quarterlyFilerHasFiledQ2,
            quarterlyFilerHasFiledQ3:
              action.institution.quarterlyFilerHasFiledQ3,
          },
        },
      }
    case RECEIVE_INSTITUTIONS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case RECEIVE_INSTITUTION_NOT_FOUND:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.lei]: {
            isFetching: false,
            notFound: true,
            lei: action.lei,
          },
        },
      }
    case UPDATE_FILING_PERIOD:
      return defaultInstitutions
    case SHOULD_FETCH_INSTITUTIONS:
      return {
        ...state,
        shouldFetchInstitutions: action.payload,
      }
    case CLEAR_INSTITUTIONS:
      return {
        ...state,
        institutions: {},
      }
    default:
      return state
  }
}
