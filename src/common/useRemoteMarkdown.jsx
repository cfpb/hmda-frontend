import { useEffect, useState } from 'react'

/**
 * Custom hook for fetching markdown data
 * Based on useRemoteMarkdown.jsx
 * @param {String}   sourceUrl
 * @param {Object}   options
 * @param {Function} options.transformReceive    Chance to modify the retrived markdown before it gets saved to Hook state: (data) => ()
 * @param {Object}   options.defaultData  Default markdown returned from URL
 * @param {Boolean}  options.forceFetch   Default data is returned in Dev environments unless this flag is set to `true`
 * @param {String}   options.errorMsg     Customize error Message
 */
export function useRemoteMarkdown(sourceUrl, options = {}) {
  const [data, setData] = useState(options.defaultData)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const { forceFetch } = options

  const shouldFetch =
    forceFetch ||
    (import.meta.env.VITE_ENVIRONMENT !== 'CI' && // Not CI
      window.location.host.indexOf('localhost') < 0) // Not localhost

  useEffect(() => {
    if (!shouldFetch) return
    setIsFetching(true)
    setError(null)

    fetch(sourceUrl)
      .then((response) => {
        if (!response.ok) return Promise.reject(response)
        return response.text()
      })
      .then((text) => {
        if (options.transformReceive) setData(options.transformReceive(text))
        else setData(text)
        setIsFetching(false)
      })
      .catch((response) => {
        const { status, statusText } = response
        setIsFetching(false)
        setError(options.errorMsg || `Error: ${status} - ${statusText}`)
      })
    // eslint-disable-next-line
  }, [])

  return [data, isFetching, error]
}
