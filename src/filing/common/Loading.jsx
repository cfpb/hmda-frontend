import React from 'react'

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

export default LoadingIcon
