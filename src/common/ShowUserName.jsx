import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../filing/utils/keycloak.js'
import { getKeycloak } from './api/Keycloak.js'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../filing/actions/setUserInfo.js'
import ProfileIcon from '../filing/profile/ProfileIcon.jsx'

export const ShowUserName = ({ isLoggedIn, userNameWasUpdated }) => {
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }
  if (!isLoggedIn) return null

  const { name, family_name, given_name, email } = getKeycloak().tokenParsed

  const emailAddress = email
  const userName = name
    ? name
    : given_name && family_name
      ? given_name + ' ' + family_name
      : ''
  const dispatch = useDispatch()

  useEffect(() => {
    // Store user info from keycloak into redux
    dispatch(setUserInfo(getKeycloak()))
  }, [])

  return (
    <div className='user'>
      {emailAddress && (
        <>
          <ProfileIcon iconWidth='18px' iconHeight='18px' />
          <Link
            to='/filing/profile'
            style={{
              color: 'black',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {userName.length > 0 ? userName : 'User'}
          </Link>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
