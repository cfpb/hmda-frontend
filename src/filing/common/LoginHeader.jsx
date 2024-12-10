import React, { lazy } from 'react'
import { login, register } from '../utils/keycloak.js'
import FilingPeriodsCard from './FilingPeriodsCard'
import LoginGovPromo from './LoginGovPromo'

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
    <div className='login-header-container'>
      <div className='login-content'>
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
        <p>
          Financial institutions use the HMDA Platform to upload their
          loan/application registers (LARs), review edits, certify the accuracy
          and completeness of the data, and submit data for the filing year.
        </p>
        {toolAnnouncement && (
          <Alert
            heading={toolAnnouncement.heading}
            type={toolAnnouncement.type}
          >
            <p>{toolAnnouncement.message}</p>
          </Alert>
        )}
        <div className='button-container'>
          <button
            className='button login-button'
            onClick={(e) => {
              e.preventDefault()
              login()
            }}
            disabled={buttonsDisabled}
            title={maintenanceTitle || 'Login'}
          >
            Log in
            {/* Delete "Log in" text and uncomment the below code on December 27th, 2024 */}
            {/* Sign in with{' '}
            <img
              src={loginGovWhiteLogo}
              className='login-gov-icon-button'
              alt='Login.Gov Logo (white)'
            /> */}
          </button>
          <span className='text-small'>or</span>
          {/* Remove the "Create an account" button on December 27th, 2024 */}
          <button
            className='button register-account'
            onClick={(e) => {
              e.preventDefault()
              register()
            }}
            disabled={buttonsDisabled}
            title={maintenanceTitle || 'Register'}
          >
            Create an account
          </button>
        </div>
        <LoginGovPromo />
      </div>
      <div className='filing-periods-container'>
        <FilingPeriodsCard timedGuards={config.timedGuards} />
        {/* <FilingPeriodsCard
          timedGuards={testTimedGuards}
          testDate='2025-04-01'
        /> */}
      </div>
    </div>
  )
}

export default LoginHeader
