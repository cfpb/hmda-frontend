import React from 'react'
import { formatDateString } from '../../utils/input'

export const InputDate = ({ onChange, value, ...common }) => {
  const adjustedValue = formatDateString(value)
  const changeHandler = buildDateChangeHandler(onChange)

  return (
    <input
      className='date-input'
      {...common}
      type='date'
      onChange={changeHandler}
      value={adjustedValue}
    />
  )
}

const buildDateChangeHandler = changeHandler => e => {
  changeHandler({
    target: {
      id: e.target.id,
      value: e.target.value?.replaceAll('-', ''),
    },
  })
}
