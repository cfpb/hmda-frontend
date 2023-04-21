import React, { useState } from 'react'
import { logout } from '../filing/utils/keycloak.js'
import { getKeycloak } from './api/Keycloak.js'

export const ShowUserName = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  let userName = getKeycloak().tokenParsed.name
  console.log('User Logged In = ' + userName)
  
  const handleLogout = e => {
    setIsLoggedIn(false)
    userName = ''
    console.log('User Logged Out')
    e.preventDefault()
    logout()
  }
  
  return (
    <>
      {isLoggedIn ? (
        <div className='user'>Welcome, {userName}! <button onClick={handleLogout}>Logout</button></div>
      ) : null}
    </>
  )
}