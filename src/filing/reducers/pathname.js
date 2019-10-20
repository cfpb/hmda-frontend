import { UPDATE_PATHNAME } from '../constants'
/*
 * Set the pathname so Links get tied to redux state
 */
export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATHNAME:
      return action.pathname
    default:
      return state
  }
}
