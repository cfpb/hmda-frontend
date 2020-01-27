import React from 'react'
import Alert from '../../common/Alert'

export const FilingAnnouncement = ({ data }) => {
  const { message, type, heading } = data
  
  return (
    <div className='Announcement'>
      <Alert type={type} heading={heading}>
        <p>{message}</p>
      </Alert>
    </div>
  )
}
