import React from 'react'
import PropTypes from 'prop-types'

import './Loading.css'

const LoadingIcon = props => {
  let className = 'LoadingIconWrapper'
  if (props.className) className += ' ' + props.className
  return (
    <div className={className}>
      <div className="LoadingIcon" />
    </div>
  )
}

LoadingIcon.propTypes = {
  className: PropTypes.string
}

export default LoadingIcon
