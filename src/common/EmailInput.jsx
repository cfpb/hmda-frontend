import React from 'react'

// Common email input
export function EmailInput({ emailAddress, onEmailChange }) {
  return (
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
}
