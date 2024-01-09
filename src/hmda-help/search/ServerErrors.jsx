import React from 'react'
import Alert from '../Alert'

const ServerErrors = ({ errors }) => {
  if (!errors.length) return null

  return (
    <Alert
      type='error'
      heading='Server Error'
      message='Please try again later.'
    >
      <>
        {errors.map((err, idx) => (
          <p key={idx}>
            {`Unable to get data for ${err.year} (Status ${err.status})`}
          </p>
        ))}
      </>
    </Alert>
  )
}

export default ServerErrors
