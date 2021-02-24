import * as AccessToken from '../../common/api/AccessToken'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const HEADERS = {
  stream: {
    ...DEFAULT_HEADERS,
    Accept: '*/*'
  },
  json: DEFAULT_HEADERS
}

export const TYPES = {
  STREAM: 'stream',
  JSON: 'json'
}

export const fetchAuthenticated = (url, { type, headers = {} }) => {
  const token = AccessToken.get()
  const defaultHeaders = HEADERS[type] || DEFAULT_HEADERS

  if (token) defaultHeaders['Authorization'] = `Bearer ${token}`
  const combinedHeaders = { ...defaultHeaders, ...headers }

  return fetch(url, { headers: combinedHeaders }).then((response) => ({
    error: response.status > 400,
    response,
  }))
}
