import React from 'react'
import Alert from '../../common/Alert'

export const FilingAnnouncement = ({ data }) => {
  const { message, type, title } = data
  
  return (
    <div className='Announcement'>
      <Alert type={type} heading={title}>
        <p>{message}</p>
      </Alert>
    </div>
  )
}
