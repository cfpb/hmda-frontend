import PropTypes from 'prop-types'

import './SlimAlert.css'

function SlimAlert({ emoji, children }) {
  return (
    <div className='slim-alert'>
      <span className='slim-alert-emoji' aria-hidden="true">
        {emoji}
      </span>
      <span className='slim-alert-text'>
        {children}
      </span>
    </div>
  )
}

SlimAlert.propTypes = {
  emoji: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default SlimAlert
