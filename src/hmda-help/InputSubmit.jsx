import React from 'react'
import PropTypes from 'prop-types'

import './InputSubmit.css'

const values = {
  search: 'Search Institutions',
  add: 'Add the Institution',
  update: 'Update the Institution',
  publications: 'Search Publications',
  submissions: 'Search Submissions',
}

const InputSubmit = ({
  addClass,
  actionType,
  disabled = false,
  onClick = () => null,
}) => {
  let cname = 'inputSubmit'
  if (addClass) cname = `${cname} ${addClass}`

  return (
    <input
      id={actionType}
      className={cname}
      type='submit'
      value={values[actionType]}
      disabled={disabled}
      onClick={onClick}
    />
  )
}

InputSubmit.propTypes = {
  actionType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  addClass: PropTypes.string,
}

export default InputSubmit
