import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector, Provider } from 'react-redux'
import ExternalLink from './ExternalLink'
import LoadingIcon from './LoadingIcon'
import { humanFileSize, isBigFile } from './numberServices'
import { saveHeaders } from './s3/S3Headers'
import s3Store from './s3/store'
import './S3Integrations.css'
/**
 * Provides the last update date string of an S3 file
 * @param {String} url S3 file
 * @param {Boolean} shouldFetch Workaround to skip fetching of file headers
 * @returns Date string OR null
 */
export const useS3FileHeaders = (url, shouldFetch) => {
  const [currHeaders, setCurrHeaders] = useState()
  const s3Cache = useSelector((state) => state.s3Headers)
  const dispatch = useDispatch()

  useEffect(() => {
    const cached = (s3Cache || {})[url]
    if (cached) {
      setCurrHeaders(cached)
      return
    }

    setCurrHeaders(null)
    if (!shouldFetch) return

    fetch(url, { method: 'HEAD' }).then((response) => {
      const hdrs = ['last-modified', 'Content-Length']
      const [lastMod, size] = hdrs.map((h) => response.headers.get(h))
      let changeDate

      if (lastMod) {
        const newDate = new Date(lastMod)
        newDate.setHours(newDate.getHours() - 5) // Convert GMT to ET
        changeDate = newDate.toDateString()
      }

      const headers = { changeDate, size }
      dispatch(saveHeaders({ url, headers }))
      setCurrHeaders(headers)
    })
  }, [url])

  if (!shouldFetch) return null
  return currHeaders
}

/**
 * Display a link to an S3 file with last updated date,
 * and opens in a new window.
 * @param {String} url S3 file url
 * @param {Boolean} showLastUpdated Include last update date?
 * @param {String} title appears on HTML element
 * @param {Element} children Anchor body
 * @param {String} label Anchor body
 * @returns Element
 */
export const S3DocLink = ({
  url,
  label,
  title,
  children,
  showLastUpdated = true,
}) => {
  return (
    <li key={url}>
      <ExternalLink url={url} title={title}>
        {children || label}
      </ExternalLink>
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
export const S3DatasetLink = ({
  url,
  children,
  label,
  showLastUpdated,
  isDocs,
}) => {
  return (
    <li key={url} className='dataset'>
      <a download href={url}>
        {children || label}
      </a>
      {showLastUpdated && (
        <Provider store={s3Store}>
          <LastUpdated url={url} isDocs={isDocs} />
        </Provider>
      )}
    </li>
  )
}

const S3LargeFileWarning = ({ show = false }) => {
  if (!show) return null
  return (
    <div className='warning'>
      <span className='marker'>!</span> <span className='label'>Warning:</span>{' '}
      Large File{' '}
      <div className='content'>
        This dataset may be too large to be opened in standard spreadsheet
        applications.
      </div>
    </div>
  )
}
/**
 * Fetches and displays the last updated date of an S3 file
 * @param {String} url S3 file url
 * @returns Element
 */
const LastUpdated = ({ url, isDocs }) => {
  const headers = useS3FileHeaders(url, true)
  let cname = ['s3-modified']
  if (isDocs) cname.push('docs')

  if (!headers) return <LoadingIcon className='LoadingInline' />
  if (!headers.size && !headers.changeDate) {
    cname.push('not-found')
    return <div className={cname.join(' ')}>- File not found -</div>
  }
  const readableSize = humanFileSize(headers.size)

  return (
    <div className={cname.join(' ')}>
      <S3LargeFileWarning show={isBigFile(readableSize)} />
      <div>
        <span className='label'>Size:</span> {readableSize}
      </div>
      <div>
        <span className='label'>Updated:</span> {headers.changeDate}
      </div>
    </div>
  )
}
