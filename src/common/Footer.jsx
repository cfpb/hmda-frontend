import React, { useEffect } from 'react'

import './Footer.css'
import logo from './images/ffiec-icon-white.svg'
import MaintenanceMessage from '../MaintenanceMessage'
import ReleaseVersion from './ReleaseVersion'
import { withRouter } from 'react-router-dom'
import { hideHeaderFooter } from './Header'
import { MailingSignupSmall } from './MailingListSignup'
import { isFilingHomeOrYear } from '../filing/utils/pages'

const Footer = ({ config, location: { pathname } }) => {
  const [maintenance, setMaintenance] = React.useState(null)

  useEffect(() => {
    if (config.maintenanceMode) setMaintenance(true)
  }, [config])

  let cname =
    'Footer ' + (maintenance ? 'maintenance ' : '') + hideHeaderFooter(pathname)

  let isFilingPage = isFilingHomeOrYear(location)

  return (
    <>
      {!isFilingPage && (
        <div className='return-to-top'>
          <button
            className='button-link'
            onClick={(e) => {
              e.preventDefault()
              e.target.blur()
              window.scrollTo(0, 0)
            }}
          >
            Return to top
          </button>
        </div>
      )}
      <div className='mainFooter'>
        <MailingSignupSmall />
      </div>
      <div className='usa-identifier'>
        <section
          className='usa-identifier__section usa-identifier__section--masthead'
          aria-label='Agency identifier,'
        >
          <div className='usa-identifier__container'>
            <div className='usa-identifier__logos'>
              <a href='' className='usa-identifier__logo'>
                <img
                  className='usa-identifier__logo-img'
                  src={logo}
                  alt='FFIEC logo'
                  role='img'
                />
              </a>
            </div>
            <section
              className='usa-identifier__identity'
              aria-label='Agency description,'
            >
              <p className='usa-identifier__identity-domain'>ffiec.cfpb.gov</p>
              <p className='usa-identifier__identity-disclaimer'>
                An official website of the{' '}
                <a
                  href='https://www.consumerfinance.gov/data-research/hmda/'
                  target='_blank'
                >
                  CFPB's HMDA
                </a>{' '}
                <ReleaseVersion />
              </p>
            </section>
          </div>
        </section>
        <nav
          className='usa-identifier__section usa-identifier__section--required-links'
          aria-label='Important links,'
        >
          <div className='usa-identifier__container'>
            <ul className='usa-identifier__required-links-list'>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  href='https://www.consumerfinance.gov/about-us/'
                  className='usa-identifier__required-link usa-link'
                >
                  About CFPB
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  href='https://www.consumerfinance.gov/accessibility/'
                  className='usa-identifier__required-link usa-link'
                >
                  Accessibility support
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  href='https://www.consumerfinance.gov/foia-requests/'
                  className='usa-identifier__required-link usa-link'
                >
                  FOIA requests
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  href='https://www.consumerfinance.gov/privacy/email-campaign-privacy-act-statement/'
                  className='usa-identifier__required-link usa-link'
                >
                  Privacy policy
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  className='usa-identifier__required-link usa-link'
                  href='https://www.ffiec.gov/hmda/'
                >
                  FFIEC HMDA Website
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  className='usa-identifier__required-link usa-link'
                  href='https://www.federalregister.gov/documents/2015/10/28/2015-26607/home-mortgage-disclosure-regulation-c'
                >
                  HMDA Final Rule
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  className='usa-identifier__required-link usa-link'
                  href='https://www.consumerfinance.gov/policy-compliance/guidance/implementation-guidance/hmda-implementation/'
                >
                  Regulatory Resources
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  className='usa-identifier__required-link usa-link'
                  href='https://www.govinfo.gov/content/pkg/PLAW-104publ13/html/PLAW-104publ13.htm'
                >
                  Paperwork Reduction Act
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  className='usa-identifier__required-link usa-link'
                  href='https://www.consumerfinance.gov/privacy/website-privacy-policy/'
                >
                  CFPB Notice and Consent
                </a>
              </li>
              <li className='usa-identifier__required-links-item'>
                <a
                  target='_blank'
                  className='usa-identifier__required-link usa-link'
                  href='mailto:hmdahelp@cfpb.gov'
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <section
          className='usa-identifier__section usa-identifier__section--usagov'
          aria-label='U.S. government information and services,'
        >
          <div className='usa-identifier__container'>
            <div className='usa-identifier__usagov-description'>
              Looking for U.S. government information and services? &nbsp;
            </div>
            <a target='_blank' href='https://www.usa.gov/' className='usa-link'>
              Visit USA.gov
            </a>
          </div>
          <MaintenanceMessage
            config={config}
            closeCallback={() => setMaintenance(false)}
          />
        </section>
      </div>
    </>
  )
}

export default withRouter(Footer)
