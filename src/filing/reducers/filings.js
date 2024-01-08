import {
  REQUEST_FILING,
  RECEIVE_FILING,
  UPDATE_FILING_PERIOD,
  RECEIVE_FILING_PAGE,
} from '../constants'

const defaultFilings = {}

/**
 * Parse page numbers from query strings
 * @param {Object} originalLinks
 */
function parsePageNumbers(originalLinks) {
  const links = { ...originalLinks }
  Object.keys(links).forEach((key) => {
    if (key !== 'href') links[key] = links[key].split('=')[1]
  })
  return links
}

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
          filing: null,
        },
      }

    case RECEIVE_FILING:
      const links = parsePageNumbers(action.filing._links)

      const prevSubmissionPages = state[action.filing.filing.lei]
        ? state[action.filing.filing.lei].submissionPages
        : {}

      const newSubmissionPage = links.self
        ? { [links.self]: action.filing.submissions }
        : {}

      return {
        ...state,
        [action.filing.filing.lei]: {
          isFetching: false,
          fetched: true,
          filing: { filing: action.filing.filing },
          links,
          submissionPages: {
            ...prevSubmissionPages,
            ...newSubmissionPage,
          },
        },
      }

    case RECEIVE_FILING_PAGE:
      const lei = action.json.filing.lei
      const filingPageLinks = parsePageNumbers(action.json._links)
      const currentPage = filingPageLinks.self

      return {
        ...state,
        [lei]: {
          ...state[lei],
          submissionPages: {
            ...state[lei].submissionPages,
            [currentPage]: [...action.json.submissions],
          },
          links: filingPageLinks,
        },
      }

    case UPDATE_FILING_PERIOD:
      return defaultFilings

    default:
      return state
  }
}
