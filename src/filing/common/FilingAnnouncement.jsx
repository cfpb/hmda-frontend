import React from 'react'
import ConfiguredAlert from '../../common/ConfiguredAlert'
import { parseTimedGuardDate } from '../../deriveConfig'

export const FilingAnnouncement = ({ data }) => {
  const showAnnouncement =
    !data.endDate || Date.now() < parseTimedGuardDate(data.endDate, true)

  if (!showAnnouncement) return null

  // Announcement wrapper restricts Alert width
  return (
    <div className='Announcement'>
      <ConfiguredAlert {...data} />
    </div>
  )
}
