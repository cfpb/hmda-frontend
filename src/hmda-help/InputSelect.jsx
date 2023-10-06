import React from 'react'
import PropTypes from 'prop-types'

import './InputSelect.css'

const InputSelect = props => {
  const { disabled, id, innerRef, label, name, onChange, options, value } = props

  function handleChange(event) {
    if (onChange) onChange(event)
  }

  return (
    <React.Fragment>
      <label htmlFor={id}>{label}</label>
      <select
        ref={innerRef}
        name={name}
        id={id}
        onChange={handleChange}
        disabled={disabled}
        value={value}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option.id}>
              {option.name}
            </option>
          )
        })}
      </select>
    </React.Fragment>
  )
}

InputSelect.defaultProps = {
  disabled: false
}

InputSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  disabled: PropTypes.bool
}

export default React.forwardRef((props, ref) => {
  return <InputSelect innerRef={ref} {...props} />
})
