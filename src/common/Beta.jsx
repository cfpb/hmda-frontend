import React from 'react'
import Alert from './Alert.jsx'

const Beta = props => {
  return (
    <div className="Beta">
      <Alert
        heading={'HMDA Beta'}
        type="warning"
      >
        <p>
          Welcome to the portal for HMDA beta applications,
          where you can test upcoming features and releases.
          <br />
          Data included is for testing purposes only.
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
