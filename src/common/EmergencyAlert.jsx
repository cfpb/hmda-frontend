import React from 'react'
import './uswds/css/styles.css'

const EmergencyAlert = ({
  heading,
  messages,
  type = 'info',
  helpEmail = 'hmdahelp@cfpb.gov',
}) => {
  const alertTypes = {
    info: 'usa-alert--info',
    warning: 'usa-alert--warning',
    error: 'usa-alert--error',
    emergency: 'usa-alert--emergency',
  }

  return (
    <section
      className="usa-site-alert"
      aria-label='Site alert'
    >
      <div className={`usa-alert ${alertTypes[type]}`}>
        <div className='usa-alert__body'>
          <h3 className='usa-alert__heading'>{heading}</h3>
          <ul className='usa-list'>
            {messages.map((message, index) => (
              <li key={index}>
                {message.text}{' '}
                {message.link && (
                  <a className='usa-link' href={message.link.url}>
                    {message.link.text}
                  </a>
                )}
              </li>
            ))}
            <li>
              For HMDA Help support, please email{' '}
              <a className='usa-link' href={`mailto:${helpEmail}`}>
                {helpEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default EmergencyAlert
