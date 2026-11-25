import { lazy } from 'react'
import loginGovWhiteLogo from '../images/login-gov-logo-white.svg'
import { login } from '../utils/keycloak.js'
import FilingPeriodsCard from './FilingPeriodsCard'

import './LoginHeader.css'

const Alert = lazy(() => import('../../common/Alert.jsx'))

const LoginHeader = ({
  maintenanceMode,
  config,
  sessionExpired,
  toolAnnouncement,
}) => {
  const maintenanceTitle = maintenanceMode && 'Unavailable during maintenance'
  const buttonsDisabled = !!maintenanceMode

  return (
    <div className='login-header-container grid-container-widescreen'>
      {sessionExpired && (
        <Alert type='success' heading='Session Expired'>
          <p>
            Please log in. If you are having trouble accessing the Filing
            application please contact{' '}
            <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
          </p>
        </Alert>
      )}
      <h1>File your HMDA Data</h1>
      <p className='login-subtitle'>
        Use the HMDA Platform to upload, review, certify, and submit your
        financial institution&rsquo;s loan/application registers (LARs).
      </p>
      {toolAnnouncement && (
        <Alert heading={toolAnnouncement.heading} type={toolAnnouncement.type}>
          <p>{toolAnnouncement.message}</p>
        </Alert>
      )}

      <div className='login-cards grid-row grid-gap tablet:grid-gap-6'>
        <div className='grid-col-12 desktop:grid-col'>
          <section className='login-card usa-card'>
            <div className='usa-card__container'>
              <header className='usa-card__header'>
                <h2 className='usa-card__heading'>Sign in or create account</h2>
              </header>
              <div className='usa-card__body'>
                <p>
                  Sign in with Login.gov using a{' '}
                  <strong>business email address</strong> associated with your
                  financial institution.
                </p>
                <button
                  className='usa-button login-button'
                  onClick={(e) => {
                    e.preventDefault()
                    login()
                  }}
                  disabled={buttonsDisabled}
                  title={maintenanceTitle || 'Login'}
                >
                  Sign in with{' '}
                  <img
                    src={loginGovWhiteLogo}
                    className='login-gov-icon-button'
                    alt='Login.Gov Logo (white)'
                  />
                </button>
                <a
                  className='usa-button usa-button--outline create-account-button'
                  href='/documentation/faq/login-gov-quick-reference'
                  target='_blank'
                  rel='noopener noreferrer'
                  title='Create an account'
                >
                  Create an account
                </a>
                <div className='login-help'>
                  <hr />
                  <h3>Need help?</h3>
                  <p>
                    View the{' '}
                    <a href='/documentation/faq/login-gov-quick-reference'>
                      Quick Reference Guide
                    </a>{' '}
                    or contact{' '}
                    <a
                      href='https://www.login.gov/contact/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Login.gov
                    </a>{' '}
                    for sign-in assistance. Please note that HMDA Help cannot
                    assist with Login.gov technical questions.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className='grid-col-12 desktop:grid-col'>
          <FilingPeriodsCard timedGuards={config.timedGuards} />
        </div>
      </div>
    </div>
  )
}

export default LoginHeader
