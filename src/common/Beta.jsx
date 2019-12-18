import React from 'react'
import Alert from './Alert.jsx'
import alerts from './constants/betaAlerts'

export function isBeta() {
  return window.location.hostname.match('beta')
}

export function isFiling(){
  return window.location.pathname.match('^/filing/')
}

function pickMessage() {
  if (isFiling()) return alerts.filing
  return alerts.default
}

const Beta = props => {
  const { heading, message } = pickMessage()
  return (
    <div className="Beta">
      <Alert
        heading={heading}
        type="warning"
      >
        <p>
          {message}
          <br />
          To view the live version of all HMDA applications,
          {' '}<a href="https://ffiec.cfpb.gov">visit our homepage</a>.
          {' '}For questions/suggestions, contact hmdahelp@cfpb.gov.
        </p>
      </Alert>
    </div>
  )
}

export default Beta
