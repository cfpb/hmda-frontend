import React from 'react'
import { formattedQtrBoundaryDate } from '../utils/date'
import Alert from '../../common/Alert'

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
              .<br />
              <br />
              For more info on quarterly filing dates, visit the{' '}
              <a
                target='_blank'
                href={`https://ffiec.cfpb.gov/documentation/${filingYear}/quarterly-filing-dates/`}
                rel='noopener noreferrer'
              >
                documentation page.
              </a>
            </>
          ) : (
            <>
              <strong>{filingDeadline}</strong> is the deadline to submit your
              HMDA data.
              <p style={{marginTop: 0, marginBottom: '10px'}}>
                For more info on filing, visit the{' '}
                <a
                  target='_blank'
                  href={`https://ffiec.cfpb.gov/documentation/${filingYear}/`}
                  rel='noopener noreferrer'
                >
                  documentation page.
                </a>
              </p>
            </>
          )}
        </p>
        <p className='font-lead'>
          You may file HMDA data for your authorized institutions below.
        </p>
      </div>
    </Alert>
  )
}
