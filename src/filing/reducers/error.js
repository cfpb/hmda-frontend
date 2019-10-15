import {
  RECEIVE_ERROR,
  RECEIVE_UPLOAD_ERROR,
  REFRESH_STATE
} from '../constants'

const defaultError = null

export default (state = defaultError, action) => {
  switch (action.type) {
    case RECEIVE_ERROR:
    case RECEIVE_UPLOAD_ERROR:
      return action.error

    case REFRESH_STATE:
      return defaultError

    case '@@router/LOCATION_CHANGE':
      return defaultError

    default:
      return state
  }
}
