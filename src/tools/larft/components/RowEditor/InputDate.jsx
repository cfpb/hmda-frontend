import React from 'react'

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

const formatDateString = str => {
  if (!str) return ''
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`
}

const buildDateChangeHandler = changeHandler => e => {
  changeHandler({
    target: {
      id: e.target.id,
      value: e.target.value?.replaceAll('-', ''),
    },
  })
}
