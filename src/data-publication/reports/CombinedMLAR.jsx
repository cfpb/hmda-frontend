import React, { useState } from 'react'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import { humanFileSize } from '../../common/numberServices.js'
import { useS3FileHeaders } from '../../common/S3Integrations.jsx'
import { useEffect } from 'react'

export const CombinedMLAR = ({ year, setHasCombined, hasCombined }) => {
  const [includeHeader, setIncludeHeader] = useState(false)

  const href = formatURL(year, includeHeader)

  // Pre-load both file's headers to avoid UI glitch when switching
  const headers = useS3FileHeaders(href, true)
  useS3FileHeaders(formatURL(year, true), true)

  // Update parent component to display/hide Combined MLAR language
  // based on the existence of the S3 files.
  useEffect(() => {
    if (!headers) return
    if (headers.size && headers.changeDate) return setHasCombined(true)
    setHasCombined(false)
  }, [headers])

  const currentYear = new Date().getFullYear()

  let buttonLabel = 'Download Combined Modified LAR'
  if (includeHeader) buttonLabel += ' with Header'

  // Combined MLAR only produced for 2018+
  if (parseInt(year) <= 2017) return null

  // Show loading indicator while we check if Combined MLAR file exists for this year
  if (!headers)
    return (
      <div className='card'>
        <LoadingIcon className='LoadingInline' />
      </div>
    )

  // Hide this Card if the S3 files do not exist
  if (!hasCombined) return null

  return (
    <div className='card'>
      <h3>
        Combined Modified LAR for <span className='highlight'>ALL</span>{' '}
        Institutions
      </h3>
      <p className='combinedHeader'>
        Include File Header{' '}
        <input
          type='checkbox'
          name='combinedHeader'
          id='combinedHeader'
          checked={includeHeader}
          onChange={() => setIncludeHeader(!includeHeader)}
        />
      </p>
      <div className='alert alert-warning'>
        <h4 className='alert-heading'>
          Warning: Large file - {humanFileSize(headers.size)}
        </h4>
        Special software is required to open this file
      </div>
      <ul className='Results'>
        <li className=''>
          <h4>ALL INSTITUTIONS </h4>
          <a href={href} download>
            {buttonLabel}
          </a>
        </li>
      </ul>
      <p className='updateSchedule'>
        <span className='label'>Update Frequency: </span>
        {year >= currentYear - 3
          ? 'Weekly on Monday, 12am EST'
          : 'Data No Longer Updated'}
      </p>
    </div>
  )
}

const formatURL = (year, withHeader) => {
  let baseFilename = `${year}_combined_mlar`
  let href =
    'https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/combined-mlar/'
  href += `${year}/` // Year sub-folder

  if (withHeader) {
    href += 'header/' // Headered file Sub-folder
    baseFilename += '_header' // Headered Filename adjustment
  }

  href += baseFilename + '.zip'
  return href
}
