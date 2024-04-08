import {
  PAGINATION_FADE_IN,
  PAGINATION_FADE_OUT,
  REFRESH_STATE,
} from '../constants'

const defaultFade = {}

export default (state = defaultFade, action) => {
  switch (action.type) {
    case PAGINATION_FADE_IN:
      return {
        ...state,
        [action.target]: 0,
      }
    case PAGINATION_FADE_OUT:
      return {
        ...state,
        [action.target]: 1,
      }
    case REFRESH_STATE:
      return defaultFade
    default:
      return state
  }
}
