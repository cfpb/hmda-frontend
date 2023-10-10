import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'

const Alert = ({ type = 'info', headingType = 'normal', heading, children }) => {
  if (!children) return null

  let headingClass = 'alert-heading'
  if(headingType === 'small') headingClass += ' heading-small'

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-body">
        {heading ? (
          <div className={headingClass}>
            {type === 'success' ? <span className="alert-check" /> : null}
            {heading}
          </div>
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
