import {
  RECEIVE_ERROR,
  RECEIVE_UPLOAD_ERROR,
  REFRESH_STATE,
} from '../constants'

const defaultError = null
const unknownError = { status: 999, statusText: 'Unknown error' }

export default (state = defaultError, action) => {
  const { status, statusText } = action.error || unknownError

  switch (action.type) {
    case RECEIVE_ERROR:
      return { status, statusText }

    case RECEIVE_UPLOAD_ERROR:
      return { status, statusText }

    case REFRESH_STATE:
      return defaultError

    case '@@router/LOCATION_CHANGE':
      return defaultError

    default:
      return state
  }
}
