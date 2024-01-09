import {
  USER_LOADING,
  USER_EXPIRED,
  USER_FOUND,
  USER_SIGNED_OUT,
  SILENT_RENEW_ERROR,
  SESSION_TERMINATED,
  CLEAR_USER_ERROR,
  SET_USER_INFO,
} from '../constants'

const defaultUser = {
  oidc: null,
  isFetching: false,
  userError: false,
  userInfo: null,
}

export default (state = defaultUser, action) => {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_SIGNED_OUT:
    case USER_EXPIRED:
      return {
        ...state,
        oidc: null,
        isFetching: false,
      }
    case USER_FOUND:
      return {
        ...state,
        oidc: action.payload,
        isFetching: false,
      }
    case USER_LOADING:
      return {
        ...state,
        isFetching: true,
      }
    case SILENT_RENEW_ERROR:
      return {
        ...state,
        oidc: null,
        isFetching: false,
        userError: true,
      }
    case CLEAR_USER_ERROR:
      return {
        ...state,
        userError: false,
      }
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      }

    default:
      return state
  }
}
