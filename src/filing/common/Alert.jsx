import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'

const Alert = ({
  type = 'info',
  heading,
  headingType='normal',
  children
}) => {
  if (!children) return null

  let headingClass = 'alert-heading'
  if(headingType === 'small') headingClass += ' heading-small'

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-body">
        {heading ? <h3 className={headingClass}>{heading}</h3> : null}
        {React.cloneElement(children, { className: children.props.className || 'alert-text' })}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string,
  headingType: PropTypes.string
}

export default Alert
