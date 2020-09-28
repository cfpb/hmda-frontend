import React from 'react'

const Message = ({ isError, message }) => {
  if (!message) return null
  const className = isError ? 'error' : 'success'
  
  return <span className={`message ${className}`}>{message}</span>
}

export default Message