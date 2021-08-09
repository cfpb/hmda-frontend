import React from 'react'
import { formattedQtrBoundaryDate } from '../utils/date'
import Alert from '../../common/Alert'
import { HeaderDocsLink } from './Header'
import { isBeta } from '../../common/Beta'

export const HeaderOpen = ({
  filingQtr,
  filingQuarters,
  filingYear,
  filingQuartersLate,
  filingPeriod
}) => {
  const filingDeadline = filingQtr
    ? `${formattedQtrBoundaryDate(filingQtr, filingQuarters, 1)}, ${filingYear}`
    : `${formattedQtrBoundaryDate("ANNUAL", filingQuarters, 1)}, ${+filingYear + 1}`

  const officialOrSimulated = isBeta() ? (
    <>
      You may <span className="simulated">simulate filing of HMDA data</span> for
      your authorized institutions below.
    </>
  ) : (
    <>
      You may <span className="official">file official HMDA data</span> for your
      authorized institutions below.
    </>
  );

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
          <br />
          {!isBeta() && (
            <>
              The{" "}
              <a href="https://ffiec.beta.cfpb.gov/filing" target="_blank">
                HMDA Beta Platform
              </a>{" "}
              is available to test your HMDA data prior to official submission.
            </>
          )}
          <br />
          <br />
          {officialOrSimulated}
        </p>
      </div>
    </Alert>
  )
}
