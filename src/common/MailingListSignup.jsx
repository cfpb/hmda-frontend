import React from 'react'
import { SUBSCRIPTION_ENDPOINT, HMDA_FILING_TOPIC_ID } from './constants/cfgov'
import { useSubscriptionLogic } from './mailingListServices'
import { EmailInput } from './EmailInput'
import { ExternalLink } from './ExternalLink'
import './MailingListSignupForm.css'

// Common form heading
function Heading() {
  return (
    <h3 className='title'>
      <label htmlFor='email' className='email-label'>
        Join the HMDA Mailing List
      </label>
    </h3>
  )
}

function PrivacyStatement() {
  return (
    <ExternalLink
      url='https://www.consumerfinance.gov/privacy/email-campaign-privacy-act-statement/'
      className='privacy-statement'
    >
      See Privacy Act statement
    </ExternalLink>
  )
}

/** A compact HMDA Mailing List Subscription form */
export function MailingSignupSmall() {
  const { emailAddress, onEmailChange, onSubmit, currentStatus, submitButton } =
    useSubscriptionLogic({
      endpoint: SUBSCRIPTION_ENDPOINT,
      topicId: HMDA_FILING_TOPIC_ID,
    })

  return (
    <form className='MailingListSignupForm small' onSubmit={onSubmit}>
      <Heading />
      <EmailInput {...{ emailAddress, onEmailChange }} />
      {currentStatus}
      <div className='submit-container'>
        {submitButton}
        <PrivacyStatement />
      </div>
    </form>
  )
}

/** A more spacious HMDA Mailing List Subscription form */
export function MailingSignupLarge() {
  const { emailAddress, onEmailChange, onSubmit, currentStatus, submitButton } =
    useSubscriptionLogic({
      endpoint: SUBSCRIPTION_ENDPOINT,
      topicId: HMDA_FILING_TOPIC_ID,
    })

  return (
    <form className='MailingListSignupForm large' onSubmit={onSubmit}>
      <div className='inline'>
        <Heading />
        <EmailInput {...{ emailAddress, onEmailChange }} />
        <div className='submit-container'>{submitButton}</div>
      </div>
      {currentStatus}
      <PrivacyStatement />
    </form>
  )
}
