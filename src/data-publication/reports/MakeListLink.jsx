import React from 'react'
import { useS3LastUpdated } from '../../common/useS3LastUpdated'
import LoadingIcon from '../../common/LoadingIcon'

/**
 * Display a downloadable list item with/without last updated date
 * @param {String} href S3 url
 * @param {Boolean} showLastUpdated Include last update date?
 * @param {Element} children Link text
 * @param {String} label Link text
 * @returns Element
 */
export const MakeListLink = ({ href, children, label, showLastUpdated }) => {
  const lastUpdated = useS3LastUpdated(href, showLastUpdated)

  return (
    <li key={href}>
      <a download href={href}>
        {children || label}
      </a>
      {lastUpdated ? (
        <span className='modified'> - Updated: {lastUpdated}</span>
      ) : showLastUpdated ? (
        <LoadingIcon className='LoadingInline' />
      ) : null}
    </li>
  )
}
