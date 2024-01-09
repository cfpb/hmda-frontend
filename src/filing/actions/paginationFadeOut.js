import * as types from '../constants'

export default function paginationFadeOut(target) {
  return {
    type: types.PAGINATION_FADE_OUT,
    target: target,
  }
}
