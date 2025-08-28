import React from 'react'
import { PropTypes } from 'prop-types'

export function InputErrorMsg({ msg }) {
  if (!msg) return null
  return <span className='input-error-message'>{msg}</span>
}

InputErrorMsg.propTypes = {
  msg: PropTypes.string,
}
