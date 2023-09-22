import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { logout } from "../filing/utils/keycloak.js"
import { getKeycloak } from "./api/Keycloak.js"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../filing/actions/setUserInfo.js"
import ProfileIcon from "../filing/profile/ProfileIcon.jsx"

export const ShowUserName = ({ isLoggedIn }) => {
  const handleLogout = e => {
    e.preventDefault()
    logout()
  }
  if (!isLoggedIn) return null
  const userName = getKeycloak().tokenParsed.name
  const dispatch = useDispatch()

  useEffect(() => {
    // Store user info from keycloak into redux
    dispatch(setUserInfo(getKeycloak()))
  }, [])

  return (
    <div className='user'>
      {userName && (
        <>
          <ProfileIcon iconWidth='18px' iconHeight='18px' />
          <Link
            to='/filing/profile'
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {userName}
          </Link>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
