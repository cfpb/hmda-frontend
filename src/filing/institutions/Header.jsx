import React from 'react'
import PropTypes from 'prop-types'
import { beforeFilingPeriod, afterFilingPeriod } from '../utils/date.js'
import { splitYearQuarter } from '../api/utils.js'
import { isBeta } from '../../common/Beta.jsx'
import { HeaderBeforeOpen } from './HeaderBeforeOpen.jsx'
import { HeaderOpen } from './HeaderOpen'
import { HeaderClosed } from './HeaderClosed'
import { HeaderLate } from './HeaderLate'

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
        <HeaderLate
          filingPeriod={filingPeriod}
          filingQuarters={filingQuarters}
          filingYear={filingYear}
          filingQuartersLate={filingQuartersLate}
          filingQtr={filingQtr}
        />
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

export const HeaderDocsLink = ({ filingYear, isQuarter }) => {
  const text = isQuarter
    ? "For more information on quarterly filing dates, visit the "
    : "For more information regarding filing, please visit the "
  
  const url = isQuarter
    ? `/documentation/${filingYear}/quarterly-filing-dates/`
    : `/documentation/${filingYear}`
  return (
    <>
      {text}
      <a
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        Documentation
      </a>{" "}
      page.
    </>
  )
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
