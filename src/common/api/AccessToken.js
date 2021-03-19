let accessToken = ''

export function set(token) {
  accessToken = token
}

export function get() {
  return accessToken
}
