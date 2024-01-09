import React, { useState } from 'react'
import Alert from './Alert'

/**
 * Test that an email address is in a valid format
 * @param {string} email
 * @returns boolean
 */
function validateEmailFormat(email) {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(String(email).toLowerCase())
}

/**
 * Component used to display feedback about the outcome of a subscription request
 * @param {string} invalid
 * @param {string} error
 * @param {string} success
 */
const StatusMessage = ({ invalid, error, success }) => {
  /**
   * Wrapper for displaying status alert
   * @param {string} type Determines the Alert color scheme
   * @param {string} message Text content
   */
  const Status = ({ type, message }) => {
    if (!message) return
    // Note: Alert's child must be an element, hence the use of a Fragment below
    return (
      <Alert type={type}>
        <>{message}</>
      </Alert>
    )
  }

  if (invalid) return <Status type='error' message={invalid} />
  if (error)
    return (
      <Status
        type='warning'
        message='Subscription failed.  Please try again later.'
      />
    )
  if (success) return <Status type='info' message='You have been subscribed!' />
  return null
}

/**
 * Submit button that displays processing status
 * @param {boolean} processing
 */
const SubmitButton = ({ processing }) => (
  <button className='submitButton' type='submit' disabled={processing}>
    {processing ? 'Processing...' : 'Subscribe'}
  </button>
)

/**
 * Logic for subscribing an email address to a GovDelivery topic,
 * leveraging consumerfinance.gov's /subscriptions/new endpoint.
 * @param {string} endpoint API endpoint
 * @param {string} topicId GovDelivery Topic ID
 * @returns {Object} Page elements, setters, and event handlers
 */
export const useSubscriptionLogic = ({ endpoint, topicId }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [invalid, setInvalid] = useState(false)
  const [processing, setProcessing] = useState(false)

  /**
   * Submit a topic subscription request to the subscription endpoint
   * @param {string} url API endpoint
   * @param {string} content URL encoded request body
   */
  const requestSubscription = (url, content) => {
    const request = new XMLHttpRequest()

    request.onreadystatechange = function () {
      if (request.readyState == XMLHttpRequest.DONE) {
        if (request.status == 200) setSuccess(request.responseText)
        else if (request.status == 400) setError('Error (400): Bad Request')
        else setError(`Error (${request.status}): ${request.responseText}`)

        setTimeout(() => setProcessing(false), 250)
      }
    }

    request.open('POST', url)
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded',
    )
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // Required for cf.gov to send JSON response
    request.send(content)
  }

  /** Handle user input */
  const onEmailChange = (e) => {
    setError(null)
    setSuccess(null)
    setInvalid(null)
    e && setEmailAddress(e.target.value)
  }

  /** Handle form submission */
  const onSubmit = (event) => {
    event.preventDefault()
    if (!validateEmailFormat(emailAddress)) {
      setInvalid('Invalid email address')
      setError(null)
      setSuccess(null)
      return
    } else {
      const content = `email=${emailAddress}&code=${topicId}`
      setSuccess(null)
      setError(null)
      setProcessing(true)
      requestSubscription(endpoint, content)
    }
  }

  const currentStatus = <StatusMessage {...{ invalid, error, success }} />

  const submitButton = <SubmitButton {...{ processing }} />

  return {
    emailAddress,
    onEmailChange,
    onSubmit,
    currentStatus,
    submitButton,
  }
}
