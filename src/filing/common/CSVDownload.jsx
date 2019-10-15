import React from 'react'
import Loading from './Loading.jsx'

import './CSVDownload.css'

const CSVDownload = props => {
  if (props.submission.id === null) return null
  const { lei, period, sequenceNumber } = props.submission.id

  return (
    <React.Fragment>
      <button
        className="CSVDownload"
        onClick={props.onDownloadClick(lei, period, sequenceNumber)}
        style={props.inline ? { display: 'inline', marginTop: 0 } : null}
      >
        {props.text || 'download the edit report'}
      </button>
      {props.text ? null : '.'}
      {props.isFetching ? <Loading className="LoadingInline" /> : null}
    </React.Fragment>
  )
}

export default CSVDownload
