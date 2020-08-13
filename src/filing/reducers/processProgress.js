import * as types from '../constants'

const defaultState = {
  syntactical: 'Waiting',
  quality: 'Waiting',
  macro: 'Waiting',
  done: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.REQUEST_PROCESSING_PROGRESS:
      return { ...defaultState, fetched: true }
      case types.RECEIVE_PROCESSING_PROGRESS:
      return { ...state, ...action.status }
    default:
      return state
  }
}