import React, { useState, useEffect } from 'react'

import './Footer.css'
import logo from '../images/ffiec-logo.svg'
import MaintenanceMessage from '../../MaintenanceMessage'
import { getKeycloak } from '../../common/api/Keycloak'
import ReleaseVersion from '../../common/ReleaseVersion'

export const getLink = filingPeriod => {
  if (getKeycloak().authenticated) return `/filing/${filingPeriod}/institutions`
  return `/filing/${filingPeriod}/`
}

const Footer = ({ filingPeriod, config}) => {
  const [maintenance, setMaintenance] = useState(null)

  useEffect(() => {
    if(config.maintenanceMode) setMaintenance(true)
  }, [config.maintenanceMode])
  const cname = 'Footer footer footer-slim' + (maintenance ? ' maintenance' : '')

  return (
    <footer className={cname} role="contentinfo">
      <div className="full-width">
        <button className="return-to-top button-link" onClick={e => {
          e.preventDefault()
          window.scrollTo(0,0)
        }}>
          Return to top
        </button>
      </div>
      <div className="footer-primary-section">
        <div className="full-width">
          <nav className="half-width footer-nav">
            <ul className="unstyled-list">
              <li className="footer-primary-content">
                <a
                  className="nav-link"
                  href={getLink(filingPeriod)}
                  title="Home"
                  aria-label="Home"
                >
                  <img src={logo} height="21px" alt="FFIEC" />
                  <span>Home Mortgage Disclosure Act</span>
                </a>
                <ReleaseVersion />
              </li>
            </ul>
          </nav>
          <div className="half-width">
            <a href="mailto:hmdahelp@cfpb.gov">Questions?</a>
          </div>
        </div>
      </div>
      <MaintenanceMessage
        config={config}
        closeCallback={() => setMaintenance(false)}
      />
    </footer>
  )
}

export default Footer
