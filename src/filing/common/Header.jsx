import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { logout } from '../utils/keycloak.js'
import { getKeycloak } from '../../common/api/Keycloak.js'
import BannerUSA from '../../common/BannerUSA.jsx'

import './Header.css'
import logo from '../images/ffiec-logo.svg'
import { isBeta } from '../../common/Beta'

export const addActiveClass = (selected, current) => {
  if (selected === current) return 'active'
  return null
}

export const getLink = (filingPeriod) => {
  if (getKeycloak().authenticated) return `/filing/${filingPeriod}/institutions`
  return `/filing/${filingPeriod}/`
}

const getDocLink = (filingPeriod) => {
  const year = filingPeriod.split('-')[0]
  return `/documentation/${year}`
}

export const makeNav = (props, page) => {
  const openNewPage = {
    className: 'nav-link',
    target: '_blank',
    rel: 'noopener noreferrer',
  }

  const logOutHandler = (e) => {
    e.preventDefault()
    logout()
  }

  let userHeader = (
    <ul className='nav-primary'>
      <li>
        <a href='/' {...openNewPage}>
          FFIEC Home
        </a>
      </li>
      <li>
        <Link to={getLink(props.filingPeriod)} className='nav-link'>
          Filing Home
        </Link>
      </li>
      <li>
        <a href={getDocLink(props.filingPeriod)} {...openNewPage}>
          Documentation
        </a>
      </li>
      {getKeycloak().authenticated ? (
        <li className='user'>
          {getKeycloak().tokenParsed.name}
          <button className='nav-link' onClick={logOutHandler}>
            Logout
          </button>
        </li>
      ) : null}
    </ul>
  )

  if (page === 'oidc-callback') userHeader = null

  return <nav className='nav'>{userHeader}</nav>
}

const Header = (props) => {
  const page = props.pathname.split('/').slice(-1)[0]
  const platformLabel = isBeta() ? 'Beta' : 'Filing'

  return (
    <header className='Header header header-basic' id='header' role='banner'>
      <BannerUSA />
      <section className='nav-container'>
        <div className='logo' id='logo'>
          <span className='logo-text'>
            <Link
              className='nav-link'
              to={getLink(props.filingPeriod)}
              title='Home'
              aria-label='Home'
            >
              <img src={logo} height='32px' alt='FFIEC' />
              <span>HMDA {platformLabel} Platform</span>
            </Link>
          </span>
        </div>
        {makeNav(props, page)}
      </section>
    </header>
  )
}

Header.propTypes = {
  //user: PropTypes.object,
  pathname: PropTypes.string,
}

export default Header
