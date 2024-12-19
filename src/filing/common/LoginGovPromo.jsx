import React from 'react'
import loginGovWhiteLogo from '../images/login-gov-logo-white.svg'
import './LoginGovPromo.css'

const LoginGovPromo = () => {
  return (
    <div className='login-gov-promo'>
      <div className='login-gov-header'>
        <img
          className='login-gov-icon'
          src={loginGovWhiteLogo}
          alt='Login.Gov Logo (white)'
        />
        Sign in will be mandatory starting January 1, 2025
      </div>
      <div className='login-gov-content'>
        <ul>
          <li>
            <span className='login-gov-bold-font'>
              Beginning January 1, 2025
            </span>
            , users logging into the HMDA Platform to file their data will need to
            login with Login.gov. Users will no longer have the option to sign
            in using the existing processes.
          </li>
          <li>
            The login.gov account created must be associated with a business
            email address of your institution.
          </li>
          <li>
            For assistance on setting up your Login.gov account please utilize
            the{' '}
            <a href='/documentation/faq/login-gov-quick-reference'>
              Quick Reference Guide
            </a>
            .
          </li>
          <li>
            Please note that HMDA Help cannot assist with Login.gov technical
            questions. All Login.gov queries should be directed to Login.gov{' '}
            <a
              href='https://www.login.gov/contact/'
              target='_blank'
              rel='noopener noreferrer'
            >
              contact
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LoginGovPromo
