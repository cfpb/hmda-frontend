import { REDIRECTING } from '../constants'

export default (state = false, action) => {
  switch (action.type) {
    case REDIRECTING:
      return action.redirecting

    default:
      return state
  }
}
