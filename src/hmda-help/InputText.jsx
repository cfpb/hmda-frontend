import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { InputErrorMsg } from './InputErrorMsg'
import { validateInput } from './utils/validate'

import './InputText.css'

class InputText extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event) {
    if (this.props.onChange) this.props.onChange(event)
  }

  handleBlur(event) {
    if (this.props.validation) {
      this.setState({
        error: validateInput(this.props.validation, event.target.value),
      })
    }

    if (this.props.onBlur) this.props.onBlur()
  }

  render() {
    const {
      disabled = false,
      id,
      innerRef,
      label,
      maxLength,
      placeholder,
      value,
    } = this.props
    const { error } = this.state

    return (
      <React.Fragment>
        <label htmlFor={id}>{label}</label>
        <InputErrorMsg msg={error} />
        <input
          ref={innerRef}
          type='text'
          className={error ? 'input-error' : null}
          name={id}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={disabled}
          maxLength={maxLength || ''}
          size={maxLength || 75}
        />
      </React.Fragment>
    )
  }
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  validation: PropTypes.array,
}

export default React.forwardRef((props, ref) => {
  return <InputText innerRef={ref} {...props} />
})
