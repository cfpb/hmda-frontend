import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector, Provider } from 'react-redux'
import ExternalLink from './ExternalLink'
import LoadingIcon from './LoadingIcon'
import { saveDate } from './s3/UpdatedOnSlice'
import s3Store from './s3/store'

/**
 * Provides the last update date string of an S3 file
 * @param {String} url S3 file
 * @param {Boolean} shouldFetch Workaround to skip fetching of file headers
 * @returns Date string OR null
 */
export const useS3LastUpdated = (url, shouldFetch) => {
  const [dateStr, setDateStr] = useState()
  const s3Cache = useSelector(state => state.updatedOn)
  const dispatch = useDispatch()

  useEffect(() => {
    const cachedDate = (s3Cache || {})[url]
    if (cachedDate) {
      setDateStr(cachedDate)
      return 
    }
    setDateStr(null)
    if (!shouldFetch) return
    fetch(url, { method: 'HEAD' }).then(response => {
      const lastMod = response.headers.get('last-modified')
      let date = new Date(lastMod)
      date.setHours(date.getHours() - 5) // Convert GMT to ET
      const result = date.toDateString()
      dispatch(saveDate({ url, date: result }))
      setDateStr(result)
    })
  }, [url])

  if (!shouldFetch) return null

  return dateStr
}

/**
 * Display a link to an S3 file with last updated date,
 * and opens in a new window.
 * @param {String} url S3 file url
 * @param {Boolean} showLastUpdated Include last update date?
 * @param {Element} children Anchor body
 * @param {String} label Anchor body
 * @returns Element
 */
export const S3DocLink = ({ url, label, children, showLastUpdated = true }) => {
  return (
    <li key={url}>
      <ExternalLink url={url}>{children || label}</ExternalLink>
      {showLastUpdated && (
        <Provider store={s3Store}>
          <LastUpdated url={url} />
        </Provider>
      )}
    </li>
  )
}

/**
 * Display a downloadable S3 link with last updated date.
 * 
 * @param {String} url S3 file url
 * @param {Boolean} showLastUpdated Include last update date?
 * @param {Element} children Anchor body
 * @param {String} label Anchor body
 * @returns Element
 */
 export const S3DatasetLink = ({ url, children, label, showLastUpdated }) => {
  return (
    <li key={url}>
      <a download href={url}>
        {children || label}
      </a>
      {showLastUpdated && (
        <Provider store={s3Store}>
          <LastUpdated url={url} />
        </Provider>
      )}
    </li>
  )
}

/**
 * Fetches and displays the last updated date of an S3 file
 * @param {String} url S3 file url
 * @returns Element
 */
const LastUpdated = ({ url }) => {
  const lastUpdated = useS3LastUpdated(url, true)
  if (!lastUpdated) return <LoadingIcon className='LoadingInline' />
  return <span className='s3-modified'> - Updated: {lastUpdated}</span>
}
