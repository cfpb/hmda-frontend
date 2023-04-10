import React from 'react'
import { Link } from 'react-router-dom'
import BannerUSA from './BannerUSA'
import { defaultLinks } from './constants/links'

import './uswds/css/styles.css'
import './uswds/js/uswds-init.min.js'
import './uswds/js/uswds.min.js'
import logo from './images/ffiec-logo.svg'
import closeBtn from './uswds/img/usa-icons/close.svg'

export const hideHeaderFooter = (path) => {
  const parts = path && path.split('/')
  let section = parts[1]
  if (parts[2] && !parts[2].match(/^(\d){4}/)) {
    section = parts[2]
  }
  return section === 'maps' ? 'no-print' : ''
}

const Header = ({location: {pathname}, links = defaultLinks, ...others}) => {
  return (
    <div className={hideHeaderFooter(pathname)}>
      <a className="skipnav" href="#main-content">
        Skip to main content
      </a>
      <BannerUSA />
      <div className="usa-overlay"></div>
      <header className="usa-header usa-header--basic" role="banner">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <div className="usa-logo" id="logo">
              <a className="nav-link" href="/" aria-label="Home">
                <img alt="FFIEC" src={logo} height="32" />
                <span className="usa-logo__text">Home Mortgage Disclosure Act</span>
              </a>
            </div>
            <button type="button" className="usa-menu-btn">Menu</button>
          </div>
          <nav className="usa-nav">
            <button type="button" className="usa-nav__close">
              <img src={closeBtn} role="img" alt="Close" />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              {links.map(link => {
                let isActive = pathname.match(new RegExp('^' + link.href))
                if(link.href === '/') isActive = link.href === pathname

                return (
                  <li key={link.name} className="usa-nav__primary-item">
                    {!link.submenu ? 
                      <Link
                        to={link.href}
                        className={
                            isActive
                            ? 'usa-nav__link usa-current'
                            : 'usa-nav__link'
                        }
                        //target={link.name === 'Filing' ? '_blank' : null}
                        rel={
                          link.name === 'Filing' ? 'noopener noreferrer' : null
                        }
                      >
                        {link.name}
                      </Link> :
                      <>
                        <button
                          type="button"
                          className="usa-accordion__button usa-nav__link"
                          aria-expanded="false"
                          aria-controls={link.name}
                        >
                          <span>{link.name}</span>
                        </button>
                        <ul id={link.name} className="usa-nav__submenu">
                          {link.submenu.map(sublink => (<li key={sublink.name} className="usa-nav__submenu-item">
                            {sublink.name == "Developer APIs" ?
                              <a href={sublink.href} target="_blank">
                                {sublink.name}
                              </a> :
                              !sublink.href ? 
                                <div className="subMenuHeading">{sublink.name}</div> :
                                <Link
                                  to={sublink.href}
                                >
                                  {sublink.name}
                                </Link>
                            }
                          </li>)
                          )}
                        </ul>
                      </>
                    }
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
