import React, { useEffect } from 'react'

import './Footer.css'
import logo from './images/ffiec-logo.svg'
import MaintenanceMessage from '../MaintenanceMessage'
import ReleaseVersion from './ReleaseVersion'
import { withRouter } from 'react-router-dom'
import { hideHeaderFooter } from './Header'

const Footer = ({ config, location: {pathname} }) => {
  const [maintenance, setMaintenance] = React.useState(null)

  useEffect(() => {
    if(config.maintenanceMode) setMaintenance(true)
  }, [config])

  let cname = 'Footer ' + (maintenance ? 'maintenance ' : '') + hideHeaderFooter(pathname)

  return (
    <footer className={cname} role="contentinfo">
      <div className="return-to-top">
        <button className="button-link" onClick={e=> {
          e.preventDefault()
          e.target.blur()
          window.scrollTo(0,0)
        }}>Return to top</button>
      </div>
      <div className="content-wrapper">
        <div className="grid">
          <div className="item">
            <a className="home-link" href="/" aria-label="Home">
              <img alt="FFIEC" src={logo} height="21" />
              Home Mortgage Disclosure Act
            </a>
            <ReleaseVersion />
          </div>

          <div className="item">
            <h4>Resources</h4>

            <ul className="unstyled-list">
              <li>
                <a href="https://www.ffiec.gov/hmda/">FFIEC HMDA Website</a>
              </li>
              <li>
                <a href="https://www.federalregister.gov/documents/2015/10/28/2015-26607/home-mortgage-disclosure-regulation-c">
                  HMDA Final Rule
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/policy-compliance/guidance/implementation-guidance/hmda-implementation/">
                  Regulatory Implementation Resources
                </a>
              </li>
              <li>
                <a href="mailto:hmdahelp@cfpb.gov">Contact Us</a>
              </li>
            </ul>
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

export default withRouter(Footer)
