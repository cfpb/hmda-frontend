import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'

const Alert = ({ type = 'info', heading, children }) => {
  if (!children) return null

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-body">
        {heading ? (
          <h3 className="alert-heading">
            {type === 'success' ? <span className="alert-check" /> : null}
            {heading}
          </h3>
        ) : null}
        {React.cloneElement(children, { className: 'alert-text' })}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string
}

export default Alert
