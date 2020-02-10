import React from 'react'
import Alert from '../../common/Alert'
import { splitYearQuarter } from '../api/utils'
import { FILING_START, FILING_DEADLINE } from '../constants/dates'
import { formattedBoundaryDate, formattedQtrBoundaryDate } from '../utils/date'

export const HeaderBeforeOpen = ({ filingQtr, filingPeriod, filingQuarters, filingYear }) => {
    let openingDay, timelyEnd

    if (filingQtr && splitYearQuarter(filingPeriod)[1]) {
      openingDay = `${formattedQtrBoundaryDate(filingQtr, filingQuarters, 0)}, ${filingYear}`
      timelyEnd = `${formattedQtrBoundaryDate(filingQtr, filingQuarters, 1)}, ${filingYear}`
    } else {
      openingDay = `${formattedBoundaryDate(FILING_START)}, ${+filingYear + 1}`
      timelyEnd = `${formattedBoundaryDate(FILING_DEADLINE)}, ${+filingYear + 1}`
    }
    
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is not yet open.`}
        type='warning'
      >
        <>
          <p style={{ marginBottom: 0 }}>
            The Platform will be accepting timely submissions from{' '}
            <strong>{openingDay}</strong> until <strong>{timelyEnd}</strong>.
          </p>
          <p style={{ margin: 0 }}>
            For further questions regarding filing, please visit the{' '}
            <a
              href={`/documentation/${filingYear}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              Documentation
            </a>{' '}
            page.
          </p>
        </>
      </Alert>
    )
}