import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import { beforeFilingPeriod, afterFilingPeriod, formattedQtrBoundaryDate } from '../utils/date.js'
import { splitYearQuarter } from '../api/utils.js'
import { isBeta } from '../../common/Beta.jsx'
import { HeaderBeforeOpen } from './HeaderBeforeOpen.jsx'

const InstitutionsHeader = ({ filingPeriodOrig, filingQuarters, filingQuartersLate, hasQuarterlyFilers }) => {
  if (!filingPeriodOrig || isBeta()) return null

  // Adjust displayed filing period when a non-quarterly user accesses an open quarterly period
  const [origYear, origQtr] = splitYearQuarter(filingPeriodOrig)
  const filingPeriod = origQtr && !hasQuarterlyFilers ? origYear : filingPeriodOrig

  const [filingYear, filingQtr] = splitYearQuarter(filingPeriod)

  if (beforeFilingPeriod(filingPeriod, filingQuarters)) {
    return (
      <HeaderBeforeOpen
        filingQtr={filingQtr}
        filingPeriod={filingPeriod}
        filingQuarters={filingQuarters}
        filingYear={filingYear}
      />
    )
  } else if (afterFilingPeriod(filingPeriod, filingQuarters)) {
    // Quarterly - Late
    if(filingQtr && !afterFilingPeriod(filingPeriod, filingQuartersLate))
      return (
        <Alert
          heading={`The ${filingPeriod} filing deadline has passed.`}
          type='warning'
        >
          <>
            <p>
              Submissions of {filingPeriod} data are no longer considered
              timely, as of{' '}
              <strong>
                {formattedQtrBoundaryDate(filingQtr, filingQuarters, 1)}, {filingYear}
              </strong>
              .
              <br />
              The platform will continue to accept late submissions until{' '}
              <strong>
                {formattedQtrBoundaryDate(filingQtr, filingQuartersLate, 1)}, {filingYear}
              </strong>
              .
            </p>
            <p>
              For more info on quarterly filing dates, visit the{' '}
              <a
                target='_blank'
                href={`https://ffiec.cfpb.gov/documentation/${filingYear}/quarterly-filing-dates/`}
                rel='noopener noreferrer'
              >
                documentation page.
              </a>
              <br />
              You may file HMDA data for your authorized institutions below.
            </p>
          </>
        </Alert>
      )

    return (
      <Alert
        heading={`The ${filingPeriod} filing period is closed.`}
        type='warning'
      >
        {!filingQtr ? (
          <p>
            The HMDA Platform remains available outside of the filing period for
            late submissions and resubmissions of {filingPeriod} HMDA data.
          </p>
        ) : (
          <p>
            The filing deadline for the period has passed. The HMDA Platform is
            no longer accepting submissions of {filingPeriod} HMDA data.
          </p>
        )}
      </Alert>
    )
  }

  const lastFilingDay = filingYear === '2019' ? '2nd' : '1st'
  const filingDeadline = filingQtr
    ? `${formattedQtrBoundaryDate(filingQtr, filingQuarters, 1)}, ${filingYear}`
    : `March ${lastFilingDay}, ${+filingYear + 1}`

  return (
    <Alert>
      <div>
        <h2 style={{ margin: '0 0 0.5em 0' }}>The {filingPeriod} filing period is open.</h2>
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
            <>{filingDeadline} is the deadline to submit your HMDA data.</>
          )}
        </p>
        <p className='font-lead'>
          You may file HMDA data for your authorized institutions below.
        </p>
      </div>
    </Alert>
  )
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
