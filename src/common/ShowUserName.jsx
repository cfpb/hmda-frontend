import React, { useState, useEffect } from 'react'
import { logout } from '../filing/utils/keycloak.js'
import { getKeycloak } from './api/Keycloak.js'

export const ShowUserName = (props) => {
  let userName
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn)
  isLoggedIn ? (userName = getKeycloak().tokenParsed.name) : null
  console.log('UserName = ' + userName + '\nLogged In = ' + props.isLoggedIn)
  
  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

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
        <div className='user'>{userName} <button onClick={handleLogout}>Logout</button></div>
      ) : null}
    </>
  )
}