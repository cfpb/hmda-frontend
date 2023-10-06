import React from 'react'
import PropTypes from 'prop-types'

import InputText from '../InputText'
import InputSelect from '../InputSelect'
import InputRadio from '../InputRadio'

import { otherInputs } from '../constants/inputs'

const OtherFields = props => {
  return otherInputs.map(otherInput => {
    if (otherInput.type === 'select') {
      return (
        <InputSelect
          key={otherInput.id}
          {...otherInput}
          onChange={props.onInputChange}
          value={
            props.institution
              ? props.institution[otherInput.id]
              : otherInput.defaultValue
          }
        />
      )
    }
    if (otherInput.type === 'radio') {
      return (
        <InputRadio
          key={otherInput.id}
          {...otherInput}
          onChange={props.onInputChange}
          value={
            props.institution
              ? props.institution[otherInput.id]
              : otherInput.defaultValue
          }
        />
      )
    }
    return (
      <InputText
        key={otherInput.id}
        {...otherInput}
        value={
          props.institution
            ? props.institution[otherInput.id]
            : otherInput.defaultValue
        }
        onChange={props.onInputChange}
      />
    )
  })
}

OtherFields.propTypes = {
  institution: PropTypes.object,
  onInputChange: PropTypes.func.isRequired
}

export default OtherFields
