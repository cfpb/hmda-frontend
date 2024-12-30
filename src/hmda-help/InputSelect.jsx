import React from 'react'
import PropTypes from 'prop-types'

import './InputSelect.css'
import Icon from '../common/uswds/components/Icon'
import Tooltip from '../common/Tooltip'

const InputSelect = ({
  disabled = false,
  id,
  innerRef,
  label,
  name,
  onChange,
  options,
  value,
}) => {
  function handleChange(event) {
    if (onChange) onChange(event)
  }

  const isQuarterlyFiler = id === 'quarterlyFiler'

  return (
    <React.Fragment>
      {isQuarterlyFiler ? (
        <div className='input-select-label-container'>
          <label htmlFor={id}>{label}</label>
          <span
            data-tip
            data-for='quarterly-filer-info-tooltip'
            className='info-icon-wrapper'
          >
            <Icon
              iconName='info'
              styleIcon={{
                height: '20px',
                width: '20px',
              }}
            />
          </span>
          <Tooltip
            id='quarterly-filer-info-tooltip'
            place='right'
            effect='solid'
            offset={{ top: -17 }}
          >
            Institutions cannot self-identify as a quarterly filer, that is
            managed by HMDA to determine.
          </Tooltip>
        </div>
      ) : (
        <label htmlFor={id}>{label}</label>
      )}
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

InputSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  disabled: PropTypes.bool,
}

export default React.forwardRef((props, ref) => {
  return <InputSelect innerRef={ref} {...props} />
})
