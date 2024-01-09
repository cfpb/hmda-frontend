import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BannerUSA from './BannerUSA'
import { defaultLinks } from './constants/links'
import { isBeta } from '../common/Beta'
import { logout } from '../filing/utils/keycloak.js'
import { getKeycloak } from './api/Keycloak.js'

import './uswds/css/styles.css'
import logo from './images/ffiec-logo.svg'
import closeBtn from './uswds/img/usa-icons/close.svg'

import { DocSearch } from '@docsearch/react'
import '@docsearch/css'

export const hideHeaderFooter = (path) => {
  const parts = path && path.split('/')
  let section = parts[1]
  if (parts[2] && !parts[2].match(/^(\d){4}/)) {
    section = parts[2]
  }
  return section === 'maps' ? 'no-print' : ''
}

export const logOutHandler = (e) => {
  e.preventDefault()
  logout()
}

const Header = ({ location: { pathname }, links = defaultLinks, ...props }) => {
  // Links used to take users to Docusaurus
  const docusaurusLinks = [
    'FAQs',
    'Developer APIs',
    'Publications',
    'Tools',
    'Filing Instructions Guide',
  ]

  useEffect(() => {
    import('./uswds/js/uswds.min.js')
    import('./uswds/js/uswds-init.min.js')
  }, [])

  return (
    <div className={hideHeaderFooter(pathname)}>
      <a className='skipnav' href='#main-content'>
        Skip to main content
      </a>
      <BannerUSA />
      <div className='usa-overlay'></div>
      <header className='usa-header usa-header--basic' role='banner'>
        <div className='usa-nav-container'>
          <div className='usa-navbar'>
            <div className='usa-logo' id='logo'>
              <a className='nav-link' href='/' aria-label='Home'>
                <img alt='FFIEC' src={logo} height='32' />
                <span className='usa-logo__text'>
                  Home Mortgage Disclosure Act
                </span>
              </a>
            </div>
            <button type='button' className='usa-menu-btn'>
              Menu
            </button>
          </div>
          <nav className='usa-nav'>
            <button type='button' className='usa-nav__close'>
              <img src={closeBtn} role='img' alt='Close' />
            </button>
            <ul className='usa-nav__primary usa-accordion'>
              {links.map((link) => {
                let filingPath =
                  props.history.location.pathname.includes('/filing')
                let isActive = false

                if (link.href === '/') {
                  isActive = pathname === link.href
                } else if (filingPath) {
                  isActive = true
                }

                return (
                  <li key={link.name} className='usa-nav__primary-item'>
                    {!link.submenu ? (
                      <Link
                        to={link.href}
                        className={
                          isActive
                            ? 'usa-nav__link usa-current'
                            : 'usa-nav__link'
                        }
                        rel={
                          link.name === 'Filing' ? 'noopener noreferrer' : null
                        }
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <>
                        <button
                          type='button'
                          className='usa-accordion__button usa-nav__link'
                          aria-expanded='false'
                          aria-controls={link.name}
                        >
                          <span>{link.name}</span>
                        </button>
                        <ul id={link.name} className='usa-nav__submenu'>
                          {link.submenu.map((sublink) => (
                            <li
                              key={sublink.name}
                              className='usa-nav__submenu-item'
                            >
                              {docusaurusLinks.includes(sublink.name) ? (
                                <a href={sublink.href}>{sublink.name}</a>
                              ) : !sublink.href ? (
                                <div className='subMenuHeading'>
                                  {sublink.name}
                                </div>
                              ) : (
                                <Link to={sublink.href}>{sublink.name}</Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
            {!isBeta() && (
              <DocSearch
                appId='69RTFLDVTR'
                indexName='ffiec-beta-cfpb'
                apiKey='5c0ed9de237607b9a9cbb0ce5e136996'
              />
            )}
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
