import { SHOW_CONFIRM, HIDE_CONFIRM } from '../constants'

const defaultConfirmation = {
  showing: false,
}

/*
 * Track confirmation modal for refiling
 */
export default (state = defaultConfirmation, action) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        showing: action.showing,
      }
    case HIDE_CONFIRM:
      return {
        ...state,
        showing: action.showing,
      }
    default:
      return state
  }
}
