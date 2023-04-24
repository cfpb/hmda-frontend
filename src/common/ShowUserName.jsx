import React, { useState, useEffect } from 'react'
import { logout } from '../filing/utils/keycloak.js'
import { getKeycloak } from './api/Keycloak.js'

export const ShowUserName = (props) => {
  let userName
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn)
  isLoggedIn ? (userName = getKeycloak().tokenParsed.name) : null
  
  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  const handleLogout = e => {
    setIsLoggedIn(false)
    userName = ''
    e.preventDefault()
    logout()
  }
  
  return (
    <>
      {isLoggedIn ? (
        <div className='user'>{userName} <button onClick={handleLogout}>Logout</button></div>
      ) : null}
    </>
  )
}