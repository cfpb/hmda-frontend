import React from 'react'
import Loading from '../../common/LoadingIcon.jsx'
import { formatPeriod } from '../api/utils'

import './CSVDownload.css'

function CSVDownload(props) {
  if (props.submission.id === null) return null
  const { lei, period, sequenceNumber } = props.submission.id

  return (
    <>
      <button
        className='CSVDownload'
        onClick={props.onDownloadClick(
          lei,
          formatPeriod(period),
          sequenceNumber,
        )}
        style={props.inline ? { display: 'inline', marginTop: 0 } : null}
      >
        {props.text || 'download the edit report'}
      </button>
      {props.text ? null : '.'}
      {props.isFetching ? <Loading className='LoadingInline' /> : null}
    </>
  )
}

export default CSVDownload
