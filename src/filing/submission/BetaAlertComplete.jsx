import React from 'react'
import Alert from '../../common/Alert'

export const BetaAlertComplete = ({ filingPeriod }) => {
  return (
    <Alert type='warning' heading='[Beta Platform] Filing Simulation Complete!'>
      <div className='beta-signing-alert'>
        <p>
          Your submission simulation on the <strong>Beta Platform</strong> has
          reached the Signing stage. This indicates that your submission file is
          properly formatted and that you have successfully validated all
          Quality and Macro Edits.{' '}
        </p>
        <br />
        <p>
          The Beta Platform is for <strong>TESTING ONLY</strong>. No data
          submitted on the Beta Platform will be considered for compliance with
          HMDA data reporting regulations.
        </p>
        <br />
        <p>
          <strong>
            Note: Official submission of HMDA Data for {filingPeriod} must be
            made through the HMDA Platform at{' '}
            <a href='https://ffiec.cfpb.gov/filing/'>
              https://ffiec.cfpb.gov/filing/
            </a>
          </strong>
        </p>
      </div>
    </Alert>
  )
}
