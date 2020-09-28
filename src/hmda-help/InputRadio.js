import React from 'react'
import PropTypes from 'prop-types'

import './InputRadio.css'

const InputRadio = props => {
  const { id, label, onChange, options, value } = props

  function handleChange(event) {
    if (onChange) onChange(event)
  }

  return (
    <React.Fragment>
      <label htmlFor={id}>{label}</label>
      <ul className="unstyled-list">
        {options.map((option, i) => {
          return (
            <li key={i}>
              <input
                type="radio"
                id={`radio${i}`}
                name={id}
                value={option.id}
                onChange={handleChange}
                checked={
                  parseInt(value, 10) === parseInt(option.id, 10)
                    ? true
                    : false
                }
              />
              <label htmlFor={`radio${i}`}>
                {option.id} - {option.name}
              </label>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

InputRadio.defaultProps = {
  disabled: false
}

InputRadio.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool
}

export default React.forwardRef((props, ref) => {
  return <InputRadio innerRef={ref} {...props} />
})
