import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'

const Alert = ({ type = 'info', heading, message, children, id }) => {
  let alertClass = `alert alert-${type}`

  return (
    <div id={id} className={alertClass}>
      <div className='alert-body'>
        <h3 className='alert-heading'>{heading}</h3>
        {message ? <p className='alert-text'>{message}</p> : null}
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { className: 'alert-text' })
        })}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string,
  children: PropTypes.element,
  id: PropTypes.string,
}

export default Alert
