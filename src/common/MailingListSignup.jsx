import React from "react"
import { useSubscriptionLogic } from "./mailingListServices"
import { isProd } from "./configUtils"
import "./MailingListSignupForm.css"

// CF.gov host for Production/Development environments
const CFGOV_HOST = isProd(window.location.host)
  ? "https://www.consumerfinance.gov"
  : `${process.env.REACT_APP_CFGOV_DEV_DOMAIN}`

// CF.gov endpoint for subscribing to a topic
const SUBSCRIPTION_ENDPOINT = `${CFGOV_HOST}/subscriptions/new/`

// HMDA topic for Production/Staging
const HMDA_FILING_TOPIC_ID = isProd(window.location.host)
  ? "USCFPB_139"
  : "USCFPB_51"

// Common form heading
const Heading = () => (
  <h3 className="title">
    <label htmlFor="email" className="email-label">
      Join the HMDA Mailing List
    </label>
  </h3>
)

// Common email input 
const EmailInput = ({ emailAddress, onEmailChange }) => (
  <input
    type="email"
    id="email"
    placeholder="mail@example.com"
    autoComplete="off"
    value={emailAddress}
    onChange={onEmailChange}
    required
  />
)

/** A compact HMDA Mailing List Subscription form */
export const MailingSignupSmall = () => {
  const { emailAddress, onEmailChange, onSubmit, currentStatus, submitButton } =
    useSubscriptionLogic({
      endpoint: SUBSCRIPTION_ENDPOINT,
      topicId: HMDA_FILING_TOPIC_ID,
    })

  return (
    <form className={"MailingListSignupForm small"} onSubmit={onSubmit}>
      <Heading />
      <EmailInput {...{ emailAddress, onEmailChange }} />
      {currentStatus}
      <div className="submit-container">
        {submitButton}
        <a
          href="https://content.consumerfinance.gov/privacy/email-campaign-privacy-act-statement/"
          target="_blank"
          className="privacy-statement"
        >
          See Privacy Act statement
        </a>
      </div>
    </form>
  )
}

/** A more spacious HMDA Mailing List Subscription form */
export const MailingSignupLarge = () => {
  const { emailAddress, onEmailChange, onSubmit, currentStatus, submitButton } =
    useSubscriptionLogic({
      endpoint: SUBSCRIPTION_ENDPOINT,
      topicId: HMDA_FILING_TOPIC_ID,
    })

  return (
    <form className={"MailingListSignupForm large"} onSubmit={onSubmit}>
      <div className="inline">
        <Heading />
        <EmailInput {...{ emailAddress, onEmailChange }} />
        <div className="submit-container">{submitButton}</div>
      </div>
      {currentStatus}
    </form>
  )
}
