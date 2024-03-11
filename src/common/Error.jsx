import React from 'react'
import Alert from './Alert'

const Error = ({ error }) => {
  if (!error) return null

  const standard = (
    <p>
      Sorry, we were unable to complete your request. Please try again later. If
      the problem persists, please contact{' '}
      <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.{' '}
    </p>
  )
  const rateLimited = (
    <p>
      Sorry, we are currently serving a high volume of requests. Please try
      again later.
    </p>
  )
  return (
    <div style={{ marginTop: '4px' }} className='Error'>
      <Alert type='error'>
        {+error.status === 429 ? rateLimited : standard}
      </Alert>
    </div>
  )
}

export default Error
