import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import { beforeFilingPeriod, afterFilingPeriod } from '../utils/date.js'
import { isBeta } from '../../common/Beta.jsx'
import { formattedQtrBoundaryDate } from '../utils/dateQuarterly.js'

const InstitutionsHeader = ({ filingPeriod }) => {
  if (!filingPeriod || isBeta()) return null
  const [filingYear, filingQtr] = filingPeriod.split('-')

  if (beforeFilingPeriod(filingPeriod)) {
    const openingDay = filingQtr ? formattedQtrBoundaryDate(filingQtr, 1) : 'January 1st'
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is not yet open.`}
        type="warning"
      >
        <p>
          The Platform will begin accepting data for the {filingPeriod} filing period on {openingDay}.
        </p>
      </Alert>
    )
  } else if (afterFilingPeriod(filingPeriod)) {
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
    ? `${formattedQtrBoundaryDate(filingQtr)}, ${filingYear}`
    : `March ${lastFilingDay}, ${+filingYear + 1}`

  return (
    <Alert>
      <div>
        <h2 style={{ margin: '0 0 0.5em 0' }}>{filingPeriod} filing period</h2>
        <p className="font-lead">
          The filing period is open. {filingDeadline} is the deadline to
          submit your HMDA data.
        </p>
        <p className="font-lead">
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
