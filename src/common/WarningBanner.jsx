import React from 'react'
import Alert from './Alert.jsx'
import './Beta.css'

function WarningBanner({
  alertHeader = 'Default Header',
  alertContent = 'Default content.',
  alertFeatures,
  alertLink = '#',
  alertLinkHeader = 'Default link header',
}) {
  return (
    <div className='Beta'>
      <Alert heading={alertHeader} type='warning'>
        <>
          <p>
            {alertContent} <br />
          </p>
          {alertFeatures ? (
            <ul>
              {alertFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : null}
          <p>
            <a target='_blank' href={alertLink} rel='noreferrer'>
              {alertLinkHeader}
            </a>
          </p>
        </>
      </Alert>
    </div>
  )
}

export default WarningBanner
