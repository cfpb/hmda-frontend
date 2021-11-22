import React from 'react'
import ConfiguredAlert from '../../common/ConfiguredAlert'

export const FilingAnnouncement = ({ data }) => {
  // Announcement wrapper restricts Alert width
  return (
    <div className='Announcement'>
      <ConfiguredAlert {...data} />
    </div>
  )
}
