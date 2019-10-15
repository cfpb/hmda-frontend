import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

import './ErrorWarning.css'

export function getHeading(props) {
  if (props.headerText) return props.headerText

  switch (props.error.status) {
    case 401:
      return 'You have been automatically logged out.'

    default:
      return 'Sorry, an error has occurred.'
  }
}

export function getText(props) {
  if (props.bodyText) return props.bodyText

  switch (props.error.status) {
    case 400:
      return 'Your request could not be completed. Please try again.'
    case 401:
      return 'Please log in to complete this request.'

    case 403:
      return "You don't have access to the requested resources. Please ensure you are filing for the correct institution."

    case 500:
      return "We're quickly working on resolving the issue, please refresh the page."

    case 502:
      return "We're having trouble routing your request, please refresh the page or try again later."

    case 503:
      return "We're experiencing some issues on our end, please refresh the page or try again later."

    default:
      return 'Please refresh the page.'
  }
}

const ErrorWarning = props => {
  if (props.error)
    return (
      <div className="ErrorWarning">
        <Alert type="error" heading={getHeading(props)}>
          <p>
            {getText(props)} If the problem persists, contact{' '}
            <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
          </p>
        </Alert>
      </div>
    )

  return null
}

ErrorWarning.propTypes = {
  error: PropTypes.object,
  bodyText: PropTypes.string,
  headerText: PropTypes.string
}

export default ErrorWarning
