import React, { useState} from 'react'
import './MaintenanceMessage.css'

const MaintenanceMessage = ({ config, closeCallback }) => {
  const [maintenanceClosed, closeMaintenance] = useState(false)
  const { announcement, maintenanceMode } = config

  if(!maintenanceMode) return null

  const isOpen = maintenanceMode && !maintenanceClosed
  const cname = announcement.type + (!isOpen ? ' closed' : '')

  const closeHandler = e => {
    e.preventDefault()
    closeMaintenance(true)
    if(closeCallback) closeCallback()
  }

  return (
    <div id="maintenance-message" className={cname}>
      <p className="closer">
        <button title="Dismiss" onClick={closeHandler}>
          x
        </button>
      </p>
      <p>{announcement.message}</p>
    </div>
  )
}

export default MaintenanceMessage
