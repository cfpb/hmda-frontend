import { combineReducers } from 'redux'
import { getDefaultConfig } from '../../../common/configUtils'
import {
  SELECT_FILE,
  UPDATE_STATUS,
  BEGIN_PARSE,
  END_PARSE,
  SET_PAGE,
  ERRORS_PER_PAGE,
  PAGINATION_FADE_IN,
  PAGINATION_FADE_OUT,
  SET_FILING_PERIOD,
  UPLOAD_ERROR,
} from '../constants'

const config = getDefaultConfig(window.location.host)

const defaultUpload = {
  uploading: false,
  file: null,
  errors: [],
}

const defaultStatus = {
  code: null,
  message: '',
}

const defaultParseErrors = {
  isParsing: false,
  parsed: false,
  transmittalSheetErrors: [],
  larErrors: [],
}

const defaultPagination = {
  page: 1,
  previousPage: 1,
  total: 1,
  fade: 0,
}

const defaultFilingPeriod = config && config.defaultDocsPeriod

//empty action logger, temporary / for debugging
export const empty = (state = {}, action) => {
  return state
}

/*
 * Maintain data on the current upload
 */
export const upload = (state = defaultUpload, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        file: action.file,
        errors: action.errors,
      }
    case SET_FILING_PERIOD:
      return defaultUpload
    case UPLOAD_ERROR:
      return {
        ...state,
        errors: action.errors,
        uploading: false,
      }
    default:
      return state
  }
}

export const filingPeriod = (state = defaultFilingPeriod, action) => {
  switch (action.type) {
    case SET_FILING_PERIOD:
      return action.filingPeriod
    default:
      return state
  }
}

export const status = (state = defaultStatus, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return action.status
    case SET_FILING_PERIOD:
      return defaultStatus
    default:
      return state
  }
}

export const parseErrors = (state = defaultParseErrors, action) => {
  switch (action.type) {
    case BEGIN_PARSE:
      return {
        ...state,
        isParsing: true,
      }

    case END_PARSE:
      return {
        parsed: true,
        isParsing: false,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors,
      }
    case UPLOAD_ERROR:
      return {
        ...state,
        isParsing: false,
        transmittalSheetErrors: [],
        larErrors: [],
      }
    case SET_FILING_PERIOD:
      return defaultParseErrors
    default:
      return state
  }
}

export const pagination = (state = defaultPagination, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
        previousPage: state.page,
      }
    case END_PARSE:
      return {
        page: 1,
        total: Math.ceil(action.larErrors.length / ERRORS_PER_PAGE) || 1,
        fade: 0,
      }
    case PAGINATION_FADE_IN:
      return {
        ...state,
        fade: 0,
      }
    case PAGINATION_FADE_OUT:
      return {
        ...state,
        fade: 1,
      }
    case SET_FILING_PERIOD:
      return defaultPagination
    default:
      return state
  }
}

export default combineReducers({
  empty,
  upload,
  status,
  parseErrors,
  pagination,
  filingPeriod,
})
