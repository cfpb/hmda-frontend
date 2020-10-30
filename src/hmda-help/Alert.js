import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'

const Alert = props => {
  let alertClass = `alert alert-${props.type}`

  return (
    <div id={props.id} className={alertClass}>
      <div className="alert-body">
        <h3 className="alert-heading">{props.heading}</h3>
        {props.message ? <p className="alert-text">{props.message}</p> : null}
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, { className: 'alert-text' })
        })}
      </div>
    </div>
  )
}

Alert.defaultProps = {
  type: 'info'
}

Alert.propTypes = {
  type: PropTypes.string,
  heading: PropTypes.string.isRequired,
  // use for simple messages
  message: PropTypes.string,
  // can be used with the `message` prop or by itself
  // useful for multiple paragraph (or other element(s)) content
  children: PropTypes.element
}

export default Alert
