import React, { useState } from "react"
import './MaintenanceMessage.css'

const MaintenanceMessage = ({ config, closeCallback }) => {
  const { announcement, maintenanceMode } = config
  const [isOpen, setIsOpen] = useState(config.maintenanceMode)
  const cname = announcement.type + (!isOpen ? " closed" : "")

  if(!maintenanceMode) return null

  const closeHandler = e => {
    e.preventDefault()
    setIsOpen(false)
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