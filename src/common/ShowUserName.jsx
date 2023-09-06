import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { logout } from "../filing/utils/keycloak.js"
import { getKeycloak } from "./api/Keycloak.js"
import { useDispatch } from "react-redux"
import Icon from "./uswds/components/Icon.jsx"
import { setUserInfo } from "../filing/actions/setUserInfo.js"

export const ShowUserName = ({ isLoggedIn }) => {
  const handleLogout = e => {
    e.preventDefault()
    logout()
  }
  if (!isLoggedIn) return null
  const userName = getKeycloak().tokenParsed.name
  console.log(getKeycloak())
  const dispatch = useDispatch()

  useEffect(() => {
    // Store user info from keycloak into redux
    dispatch(setUserInfo(getKeycloak()))
  }, [])

  return (
    <div className='user'>
      {userName && (
        <Link
          to='/filing/profile'
          style={{
            height: "18px",
            width: "18px",
            marginRight: "4px",
            cursor: "pointer",
          }}
        >
          <Icon
            iconName='person'
            styleIcon={{
              height: "18px",
              width: "18px",
              marginRight: "4px",
              cursor: "pointer",
            }}
          />
        </Link>
      )}
      {userName}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
