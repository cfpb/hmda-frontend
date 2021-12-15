import { useEffect, useState } from 'react'

/**
 * Provides the last update date string of an S3 file,
 * displays a loading indicator while fetching.
 * @param {*} url S3 file
 * @param {*} shouldFetch Workaround to skip fetching of file headers
 * @returns Date string or LoadingIcon or null
 */
export const useS3LastUpdated = (url, shouldFetch) => {
  const [dateStr, setDateStr] = useState()

  useEffect(() => {
    setDateStr(null)
    if (!shouldFetch) return
    fetch(url, { method: 'HEAD' }).then(response => {
      const lastMod = response.headers.get('last-modified')
      let date = new Date(lastMod)
      date.setHours(date.getHours() - 5) // Convert GMT to ET

      setDateStr(date.toDateString())
    })
  }, [url])

  if (!shouldFetch) return null

  return dateStr
}
