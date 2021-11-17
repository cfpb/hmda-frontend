import React from 'react'

// Common email input
export const EmailInput = ({ emailAddress, onEmailChange }) => (
  <input
    type='email'
    id='email'
    placeholder='mail@example.com'
    autoComplete='off'
    value={emailAddress}
    onChange={onEmailChange}
    required
  />
)
