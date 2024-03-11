import { SET_USER_INFO } from '../constants/index'

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  }
}
