import { useEffect, useState } from 'react'

/**
 * Custom hook to reuse logic for fetching remote JSON data
 * @param {String}   sourceUrl
 * @param {Object}   options
 * @param {Function} options.beforeUpdate Chance to modify the retrived JSON before it gets saved to Hook state: (data) => ()
 * @param {Object}   options.defaultData  Default JSON returned from URL
 * @param {Boolean}  options.forceFetch   Default data is returned in Dev environments unless this flag is set to `true`
 * @param {String}   options.msgReject    Message to use in error logging of `options.onCatch`
 * @param {Function} options.onCatch      Handle error fetching JSON: (sourceUrl, options, error?) => ()
 */
export function useRemoteJSON(sourceUrl, options = {}) {
  const [data, setData] = useState(options.defaultContent)
  const [isFetching, setIsFetching] = useState(false)
  const defaultErrorMsg = `Unable to fetch URL: ${sourceUrl}`

  const shouldFetch =
    options.forceFetch ||
    (process.env.REACT_APP_ENVIRONMENT &&
      process.env.REACT_APP_ENVIRONMENT !== 'CI') || // Not CI
    window.location.host.indexOf('localhost') < 0 // Not localhost

  useEffect(() => {
    if (!shouldFetch) return
    setIsFetching(true)

    // Verify file exists
    checkFileExists(sourceUrl)
      .then((status) => {
        if (!status.success) throw Error(status.message)

        // Fetch data
        fetch(sourceUrl)
          .then((response) => {
            if (response.ok) return response.json()

            setIsFetching(false)
            return Promise.reject(options.msgReject || defaultErrorMsg)
          })
          .then((result) => {
            // Apply user provided transformations and save fetched data
            if (options.beforeUpdate) setData(options.beforeUpdate(result))
            else setData(result)

            setIsFetching(false)
          })
          .catch((err) => {
            // Handle fetch errors
            if (options.onCatch) options.onCatch(sourceUrl, options, err)
            setIsFetching(false)
          })
      })
      .catch((err) => {
        // Handle file existence errors
        if (options.onCatch) options.onCatch(sourceUrl, options, err)
        setIsFetching(false)
      })
    // eslint-disable-next-line
  }, [])

  return [data, isFetching]
}

const checkFileExists = (url) =>
  fetch(url, { method: 'head' }).then((res) => ({
    success: res.status === 200,
    message: res.statusText,
  }))
