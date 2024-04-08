import React from 'react'
import Alert from './Alert.jsx'
import './Beta.css'

const WarningBanner = ({
  alertHeader = 'Default Header',
  alertContent = 'Default content.',
  alertFeatures,
  alertLink = '#',
  alertLinkHeader = 'Default link header',
}) => {
  return (
    <div className='Beta'>
      <Alert heading={alertHeader} type='warning'>
        <>
          <p>
            {alertContent} <br />
          </p>
          {alertFeatures && (
            <ul>
              {alertFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
          <p>
            <a target={'_blank'} href={alertLink}>
              {alertLinkHeader}
            </a>
          </p>
        </>
      </Alert>
    </div>
  )
}

export default WarningBanner
