import React from 'react'
import { useState } from 'react'
import './MailingListSignupForm.css'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const StatusMessage = ({ type, message }) => message && <div className={`status ${type}`}>{message}</div>

/* 
  Provides a Sign Up form for the HMDA Mailing List
*/
export const MailingListSignup = ({ inFooter = false }) => {
  const [emailAddress, setEmail] = useState("")
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleEmailChange = (e) => {
    setError(null)
    setSuccess(null)
    e && setEmail(e.target.value)
  }

  const submitSignup = (e) => {
    e.preventDefault()
    if (!validateEmail(emailAddress)) {
      setError("Invalid email address")
      setSuccess(null)
      return
    } else {
      setError(null)
      setSuccess("You have been subscribed!")
    }
  }

  const placement = inFooter ? 'in-footer' : 'in-body'

  return (
    <form
      className={`MailingListSignupForm ${placement}`}
      onSubmit={submitSignup}
    >
      <h3 className="title">
        <label htmlFor="email" className="email-label">
          Join the HMDA Mailing List
        </label>
      </h3>
      <input
        type="email"
        id="email"
        placeholder="mail@example.com"
        value={emailAddress}
        onChange={handleEmailChange}
        required
      />
      <StatusMessage type="error" message={error} />
      <StatusMessage type="success" message={success} />
      <div className="submit-container">
        <button type="submit">Subscribe</button>
        {inFooter && (
          <a
            href="https://content.consumerfinance.gov/privacy/email-campaign-privacy-act-statement/"
            target="_blank"
            className="privacy-statement"
          >
            See Privacy Act statement
          </a>
        )}
      </div>
    </form>
  )
}

export default MailingListSignup
