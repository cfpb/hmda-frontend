import React from 'react'
import Loading from '../../common/LoadingIcon.jsx'

import './CSVDownload.css'

export function formatPeriod(period) {
  if (typeof period === 'string') return period

  let { quarter, year } = period

  if (!quarter) return `${year}`
  return `${year}/quarter/${quarter.toUpperCase()}`
}

const CSVDownload = props => {
  if (props.submission.id === null) return null
  const { lei, period, sequenceNumber } = props.submission.id

  return (
    <React.Fragment>
      <button
        className="CSVDownload"
        onClick={props.onDownloadClick(lei, formatPeriod(period), sequenceNumber)}
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
