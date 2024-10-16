import React from 'react'
import './uswds/css/styles.css'

const EmergencyAlert = ({ heading, messages, type = 'info' }) => {
  const alertTypes = {
    info: 'usa-alert--info',
    warning: 'usa-alert--warning',
    error: 'usa-alert--error',
    emergency: 'usa-alert--emergency',
  }

  const renderMessageContent = (content) => {
    if (typeof content === 'string') {
      return content
    }
    if (Array.isArray(content)) {
      return content.map((item, index) => {
        if (typeof item === 'string') {
          return item
        }
        if (item.link) {
          return (
            <a key={index} target={item.external ? "_blank" : ""} className='usa-link' href={item.link.url}>
              {item.link.text}
            </a>
          )
        }
        return null
      })
    }
    return null
  }

  return (
    <section className='usa-site-alert' aria-label='Site alert'>
      <div className={`usa-alert ${alertTypes[type]}`}>
        <div className='usa-alert__body'>
          <h3 className='usa-alert__heading'>{heading}</h3>
          <ul className='usa-list'>
            {messages.map((message, index) => (
              <li key={index}>{renderMessageContent(message.content)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default EmergencyAlert
