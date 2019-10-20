import * as types from '../constants'

export default function updatePathname(pathname) {
  return {
    type: types.UPDATE_PATHNAME,
    pathname: pathname
  }
}
