import { START_REFILE, REFILE_READY } from '../constants'
/*
 * Show that a refile has been triggered to differentiate
 * between empty state on a refile vs first load
 */

export default (state = 0, action) => {
  switch (action.type) {
    case START_REFILE:
      return 1
    case REFILE_READY:
      return 0
    default:
      return state
  }
}
