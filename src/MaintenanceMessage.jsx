import React from 'react'
import './MaintenanceMessage.css'

let maintenanceClosed = false

const MaintenanceMessage = ({ config, closeCallback }) => {
  const { announcement, maintenanceMode } = config

  if(!maintenanceMode || !announcement) return null

  const isOpen = maintenanceMode && !maintenanceClosed
  const cname = announcement.type + (!isOpen ? ' closed' : '')

  const closeHandler = e => {
    e.preventDefault()
    maintenanceClosed = true
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
