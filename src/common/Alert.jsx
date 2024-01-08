import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'
import Icon from './uswds/components/Icon'

const Alert = ({
  type = 'info',
  headingType = 'normal',
  heading,
  children,
  closeAlert, // Flag used to display an X that users can interact with and remove the alert
  setCloseAlert,
}) => {
  if (!children) return null

  let headingClass = 'alert-heading'
  if (headingType === 'small') headingClass += ' heading-small'

  return (
    <div className={`alert alert-${type}`}>
      <div className='alert-body'>
        {heading ? (
          <div className={headingClass}>
            {type === 'success' ? <span className='alert-check' /> : null}
            {heading}
          </div>
        ) : null}
        {React.cloneElement(children, { className: 'alert-text' })}
        {closeAlert && (
          <div className='alert-close' onClick={() => setCloseAlert(false)}>
            <Icon
              iconName='cancel'
              styleIcon={{
                height: '20px',
                width: '20px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string,
}

export default Alert
