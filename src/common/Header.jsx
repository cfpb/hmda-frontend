import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BannerUSA from './BannerUSA'
import { defaultLinks } from './constants/links'
import { isBeta } from '../common/Beta'

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

const Header = ({ location: { pathname }, links = defaultLinks, ...props }) => {
  const beta = isBeta()
  // Links used to take users to Docusaurus
  const docusaurusLinks = [
    'FAQs',
    'Developer APIs',
    'Publications',
    'Tools',
    'Filing Instructions Guide',
  ]

  useEffect(() => {
    import('./uswds/js/uswds-init.min.js')
    import('./uswds/js/uswds.min.js')
  }, [])

  // Eliminates Google Lighthouse CLS
  const [usaNavStyles, setUsaNavStyles] = useState({})
  useEffect(() => {
    const handleResize = () => {
      const updatedStyles = {}

      if (window.matchMedia('(min-width: 1024px)').matches) {
        updatedStyles.height = '44px'
        updatedStyles.overflowX = 'visible'
      }
      setUsaNavStyles(updatedStyles)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call the function initially

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const renderLink = (link, isActive) => {
    const className = isActive ? 'usa-nav__link usa-current' : 'usa-nav__link'

    if (beta) {
      return (
        <a href={link.href} className={className}>
          {link.name}
        </a>
      )
    } else {
      return (
        <Link to={link.href} className={className}>
          {link.name}
        </Link>
      )
    }
  }

  return (
    <div id='topBanner' className={hideHeaderFooter(pathname)}>
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
          <nav className='usa-nav' style={usaNavStyles}>
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
                      renderLink(link, isActive)
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
            {!beta && (
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
