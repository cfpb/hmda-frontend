import React from 'react'
import BannerUSA from './BannerUSA'

import './Header.css'
import logo from './images/ffiec-logo.svg'

const defaultLinks = [
  { name: 'Home', href: '/' },
  { name: 'Filing', href: '/filing/2018/' },
  { name: 'Data Browser', href: '/data-browser/' },
  { name: 'Data Publication', href: '/data-publication/' },
  { name: 'Tools', href: '/tools/' },
  { name: 'Documentation', href: '/documentation/' }
]

const Header = ({pathname='/', links = defaultLinks}) => {
  return (
    <>
      <a className="skipnav" href="#main-content">
        Skip to main content
      </a>
      <header className="hmda-header header header-basic" role="banner">
        <BannerUSA />
        <div className="nav-container">
          <div className="logo" id="logo">
            <span className="logo-text">
              <a className="nav-link" href="/" aria-label="Home">
                <img alt="FFIEC" src={logo} height="32" />
                <span>Home Mortgage Disclosure Act</span>
              </a>
            </span>
          </div>
          <nav className="nav">
            <ul className="nav-primary">
              {links.map(link => {
                let isActive = pathname.match(link.href)
                if(link.href === '/') isActive = link.href === pathname

                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={
                          isActive
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      target={link.name === 'Filing' ? '_blank' : null}
                      rel={
                        link.name === 'Filing' ? 'noopener noreferrer' : null
                      }
                    >
                      {link.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
