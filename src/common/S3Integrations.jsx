import React from 'react'
import { useS3LastUpdated } from './useS3LastUpdated'
import ExternalLink from './ExternalLink'
import LoadingIcon from './LoadingIcon'

/**
 * Display a link to an S3 file with last updated date,
 * and opens in a new window.
 */
export const S3DocLink = props => {
  const { url, label, children, showLastUpdated = true } = props

  return (
    <li key={url}>
      <ExternalLink url={url}>{children || label}</ExternalLink>
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
