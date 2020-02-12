import React from 'react'
import { formattedQtrBoundaryDate } from '../utils/date'
import Alert from '../../common/Alert'
import { HeaderDocsLink } from './Header'

export const HeaderOpen = ({
  filingQtr,
  filingQuarters,
  filingYear,
  filingQuartersLate,
  filingPeriod
}) => {
  const lastFilingDay = filingYear === '2019' ? '2nd' : '1st'

  const filingDeadline = filingQtr
    ? `${formattedQtrBoundaryDate(filingQtr, filingQuarters, 1)}, ${filingYear}`
    : `March ${lastFilingDay}, ${+filingYear + 1}`

  return (
    <Alert>
      <div>
        <h2 style={{ margin: '0 0 0.5em 0' }}>
          The {filingPeriod} filing period is open.
        </h2>
        <p className='font-lead'>
          {filingQtr ? (
            <>
              Submission of {filingPeriod} HMDA data will be considered timely
              if completed by <strong>{filingDeadline}</strong>.<br />
              Late submissions will not be accepted after{' '}
              <strong>
                {formattedQtrBoundaryDate(filingQtr, filingQuartersLate, 1)},{' '}
                {filingYear}
              </strong>
              .
            </>
          ) : (
            <>
              Submission of {filingPeriod} HMDA data will be considered timely
              if completed by <strong>{filingDeadline}</strong>.
            </>
          )}
        </p>
        <br />
        <p className="font-lead">
          <HeaderDocsLink filingYear={filingYear} isQuarter={filingQtr} />
          <br />
          You may file HMDA data for your authorized institutions below.
        </p>
      </div>
    </Alert>
  )
}
