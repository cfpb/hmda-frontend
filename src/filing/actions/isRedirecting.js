import * as types from '../constants'

export default function isRedirecting(redirecting) {
  return {
    type: types.REDIRECTING,
    redirecting
  }
}
