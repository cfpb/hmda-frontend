import {
  REQUEST_EDITS,
  REQUEST_EDIT_TYPE,
  RECEIVE_EDIT_TYPE,
  REQUEST_VERIFY_QUALITY,
  REQUEST_VERIFY_MACRO,
  RECEIVE_EDITS,
  REQUEST_EDIT,
  RECEIVE_EDIT,
  VERIFY_QUALITY,
  VERIFY_MACRO,
  SUPPRESS_EDITS,
  REFRESH_STATE
} from '../constants'

const defaultEdits = {
  isFetching: false,
  suppressEdits: false,
  fetched: false,
  types: {
    syntactical: { edits: [] },
    validity: { edits: [] },
    quality: { edits: [], verified: false },
    macro: { edits: [], verified: false }
  },
  rows: {}
}

export default (state = defaultEdits, action) => {
  switch (action.type) {
    case REQUEST_EDITS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_EDITS:
      return {
        ...state,
        types: action.edits,
        isFetching: false,
        fetched: true
      }
    case REQUEST_EDIT_TYPE:
      return {
        ...state,
        types: {
          ...state.types,
          [action.editType]: {
            ...state.types[action.editType],
            isFetching: true,
            fetched: false
          }
        }
      }
    case RECEIVE_EDIT_TYPE:
      return {
        ...state,
        types: {
          ...state.types,
          [action.editType]: {
            ...state.types[action.editType],
            isFetching: false,
            fetched: true
          }
        }
      }
    case REQUEST_EDIT:
      return {
        ...state,
        rows: {
          ...state.rows,
          [action.edit]: {
            ...state.rows[action.edit],
            isFetching: true
          }
        }
      }
    case RECEIVE_EDIT:
      return {
        ...state,
        rows: {
          ...state.rows,
          [action.edit]: {
            ...state.rows[action.edit],
            isFetching: false,
            rows: action.rows
          }
        }
      }
    case REQUEST_VERIFY_QUALITY: {
      const clonedState = { ...state }
      clonedState.types.quality.isFetching = true
      return clonedState
    }
    case REQUEST_VERIFY_MACRO: {
      const clonedState = { ...state }
      clonedState.types.macro.isFetching = true
      return clonedState
    }
    case VERIFY_QUALITY: {
      const clonedState = { ...state }
      clonedState.types.quality.verified = action.checked
      clonedState.types.quality.isFetching = false
      return clonedState
    }
    case VERIFY_MACRO: {
      const clonedState = { ...state }
      clonedState.types.macro.verified = action.checked
      clonedState.types.macro.isFetching = false
      return clonedState
    }
    case SUPPRESS_EDITS: {
      return { ...state, suppressEdits: true }
    }
    case REFRESH_STATE: {
      return defaultEdits
    }
    default:
      return state
  }
}
