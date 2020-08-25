import * as types from '../constants'

const defaultState = {
  syntactical: 'Waiting',
  quality: 'Waiting',
  macro: 'Waiting',
  done: false
}

const errorState = {
  syntactical: '0',
  quality: '0',
  macro: '0',
  done: true,
  fetched: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.REQUEST_PROCESSING_PROGRESS:
      return { ...defaultState, fetched: true }
    case types.RECEIVE_PROCESSING_PROGRESS:
      return { ...state, ...action.status }
    case types.CLEAR_PROCESSING_PROGRESS:
      return errorState
    default:
      return state
  }
}