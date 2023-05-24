import React from 'react'
import { logout } from '../filing/utils/keycloak.js'
import { getKeycloak } from './api/Keycloak.js'
export const ShowUserName = ({ isLoggedIn }) => {
  const handleLogout = e => {
    e.preventDefault()
    logout()
  }
  if (!isLoggedIn) return null
  const userName = getKeycloak().tokenParsed.name
  return (
    <div className='user'>
      {userName} <button onClick={handleLogout}>Logout</button>
    </div>
  )
}