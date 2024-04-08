import React from 'react'
import Alert from './Alert.jsx'
import './Beta.css'

export function isBeta(host = window.location.hostname) {
  return host.match('beta')
}

const Beta = (props) => {
  return (
    <div className='Beta'>
      <Alert heading='HMDA Beta' type='warning'>
        <p>
          The beta HMDA Platform is available to upload, test, and validate HMDA
          data. All data uploaded to the beta system is for testing purposes
          only and may be removed at any time. You will need to file your final
          HMDA data to the live system when the filing period is open.
          <br />
          To view the live version of all HMDA applications,{' '}
          <a href='https://ffiec.cfpb.gov'>visit our homepage</a>. If you are
          having issues uploading a file and are receiving errors, please
          refresh the page and clear your browser’s cache. For
          questions/suggestions, contact hmdahelp@cfpb.gov.
        </p>
      </Alert>
    </div>
  )
}

export default Beta
