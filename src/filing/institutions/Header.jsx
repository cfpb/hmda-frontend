import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import { beforeFilingPeriod, afterFilingPeriod } from '../utils/date.js'
import { isBeta } from '../../common/Beta.jsx'

const InstitutionsHeader = ({ filingPeriod }) => {
  if (!filingPeriod || isBeta()) return null
  const filingYear = filingPeriod.split('-')[0]

  // TODO: add quarterly messaging
  if (beforeFilingPeriod(filingPeriod)) {
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is not yet open.`}
        type="warning"
      >
        <p>
          The Platform will begin accepting data for the {filingPeriod} filing period on January 1st.
        </p>
      </Alert>
    )
  } else if (afterFilingPeriod(filingPeriod)) {
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is closed.`}
        type="warning"
      >
        <p>
          The HMDA Platform remains available outside of the filing period for
          late submissions and resubmissions of {filingPeriod} HMDA data.
        </p>
      </Alert>
    )
  }

  const lastFilingDay = filingYear === '2019' ? '2nd' : '1st'

  return (
    <Alert>
      <div>
        <h2 style={{ margin: '0 0 0.5em 0' }}>{filingPeriod} filing period</h2>
        <p className="font-lead">
          The filing period is open. March {lastFilingDay}, {+filingYear + 1} is the deadline to
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
