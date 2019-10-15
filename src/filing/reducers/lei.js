import { SET_LEI } from '../constants'

export default (state = null, action) => {
  switch (action.type) {
    case SET_LEI:
      return action.lei
    default:
      return state
  }
}
