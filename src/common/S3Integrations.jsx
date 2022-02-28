import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector, Provider } from 'react-redux'
import ExternalLink from './ExternalLink'
import LoadingIcon from './LoadingIcon'
import { humanFileSize } from './numberServices'
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
  const s3Cache = useSelector(state => state.s3Headers)
  const dispatch = useDispatch()

  useEffect(() => {
    const cached = (s3Cache || {})[url]
    if (cached) {
      setCurrHeaders(cached)
      return
    }
    setCurrHeaders(null)
    if (!shouldFetch) return
    fetch(url, { method: 'HEAD' }).then(response => {
      const hdrs = ['last-modified', 'Content-Length']
      const [changeDate, size] = hdrs.map(h => response.headers.get(h))

      let date = new Date(changeDate)
      date.setHours(date.getHours() - 5) // Convert GMT to ET
      const headers = { changeDate: date.toDateString(), size }
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
        <ul>
          <li>
            <Provider store={s3Store}>
              <LastUpdated url={url} />
            </Provider>
          </li>
        </ul>
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
  const headers = useS3FileHeaders(url, true)
  if (!headers) return <LoadingIcon className='LoadingInline' />
  // return (
  //   <table className='s3-modified'>
  //     <tr><td className='label'>Size:</td> <td>{humanFileSize(headers.size)}</td></tr>
  //     <tr><td className='label'>Updated:</td> <td>{headers.changeDate}</td></tr>
  //   </table>
  // )
  return (
    <div className='s3-modified'>
      <div><span className='label'>Size:</span> {humanFileSize(headers.size)}</div>
      <div><span className='label'>Updated:</span> {headers.changeDate}</div>
    </div>
  )
}
