import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputSubmit.css'

const values = {
  search: 'Search Institutions',
  add: 'Add the Institution',
  update: 'Update the Institution',
  publications: 'Search Publications',
  submissions: 'Search Submissions',
}

class InputSubmit extends Component {
  render() {
    let cname = 'inputSubmit'
    const options = {}
    const { addClass, actionType, disabled, onClick } = this.props

    if (addClass) cname = `${cname} ${addClass}`
    if (onClick) options.onClick = onClick

    return (
      <input
        id={actionType}
        className={cname}
        type='submit'
        value={values[actionType]}
        disabled={disabled}
        {...options}
      />
    )
  }
}

InputSubmit.defaultProps = {
  disabled: false,
  className: 'inputSubmit',
  onClick: () => null,
}

InputSubmit.propTypes = {
  actionType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  addClass: PropTypes.string,
}

export default InputSubmit
