const defaults = { method: 'GET' }

/**
 * @param {String} url Target URL
 * @param {Object} options fetch options
 */
export const fetchData = (url, options) => {
  const fetchOpts = { ...defaults, ...options }
  return fetch(url, fetchOpts)
    .then((response) => checkError(response))
    .catch((error) => ({ error: true, message: error }))
}

/**
 * @param {Response} response
 * @return {Object} {error, message, status, response}
 */
const checkError = (response) => {
  const result = { error: false, response }
  if (response.status >= 400) {
    result.error = true
    result.message = 'Unable to fetch data'
    result.status = response.status
  }
  return result
}

/**
 * Sequence Number is required for Regeneration
 * @param {String} url
 * @param {Object} options fetch options
 * @param {Function} setResult success callback
 */
export function fetchSequenceNumber(url, options, setResult) {
  return fetchData(url, options)
    .then(({ error, response }) => {
      if (error) return {}
      return response.json()
    })
    .then((json) => {
      const sequenceNumber = json && json.id && json.id.sequenceNumber
      setResult && setResult(sequenceNumber)
      return sequenceNumber
    })
}
