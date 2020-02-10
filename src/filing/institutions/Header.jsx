import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import { beforeFilingPeriod, afterFilingPeriod, formattedQtrBoundaryDate } from '../utils/date.js'
import { splitYearQuarter } from '../api/utils.js'
import { isBeta } from '../../common/Beta.jsx'
import { HeaderBeforeOpen } from './HeaderBeforeOpen.jsx'
import { HeaderOpen } from './HeaderOpen'
import { HeaderClosed } from './HeaderClosed'

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
      <HeaderClosed
        filingPeriod={filingPeriod}
        filingQtr={filingQtr}
        filingQuartersLate={filingQuartersLate}
        filingYear={filingYear}
      />
    )
  }

  return (
    <HeaderOpen
      filingQtr={filingQtr}
      filingQuarters={filingQuarters}
      filingYear={filingYear}
      filingQuartersLate={filingQuartersLate}
      filingPeriod={filingPeriod}
    />
  )
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
