import * as types from '../constants'

export default function updatePathname(pathname) {
  console.log('updating pathname to', pathname)
  return {
    type: types.UPDATE_PATHNAME,
    pathname: pathname
  }
}
