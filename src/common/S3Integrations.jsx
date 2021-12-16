import React from 'react'
import { useEffect, useState } from 'react'
import ExternalLink from './ExternalLink'
import LoadingIcon from './LoadingIcon'

/**
 * Provides the last update date string of an S3 file
 * @param {String} url S3 file
 * @param {Boolean} shouldFetch Workaround to skip fetching of file headers
 * @returns Date string or null
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

/**
 * Display a link to an S3 file with last updated date,
 * and opens in a new window.
 * @param {String} href S3 url
 * @param {Boolean} showLastUpdated Include last update date?
 * @param {Element} children Link text
 * @param {String} label Link text
 * @returns Element
 */
export const S3DocLink = ({ url, label, children, showLastUpdated = true }) => {
  return (
    <li key={url}>
      <ExternalLink url={url}>{children || label}</ExternalLink>
      {showLastUpdated && <LastUpdated url={url} />}
    </li>
  )
}

/**
 * Display a downloadable link with last updated date,
 * 
 * @param {String} href S3 url
 * @param {Boolean} showLastUpdated Include last update date?
 * @param {Element} children Link text
 * @param {String} label Link text
 * @returns Element
 */
 export const S3DatasetLink = ({ url, children, label, showLastUpdated }) => {
  return (
    <li key={url}>
      <a download href={url}>
        {children || label}
      </a>
      {showLastUpdated && <LastUpdated url={url} />}
    </li>
  )
}

/**
 * Fetches and displays the last updated date of an S3 file
 */
const LastUpdated = ({ url }) => {
  const lastUpdated = useS3LastUpdated(url, true)
  if (!lastUpdated) return <LoadingIcon className='LoadingInline' />
  return <span className='s3-modified'> - Updated: {lastUpdated}</span>
}
