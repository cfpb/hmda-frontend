import React from 'react'
import Alert from './Alert'

const ConfiguredAlert = ({ message, heading, type }) => {
  return (
    <Alert heading={heading} type={type}>
      <p>{message}</p>
    </Alert>
  )
}

export default ConfiguredAlert
