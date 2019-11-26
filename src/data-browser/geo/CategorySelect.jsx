import React from 'react'
import Select from 'react-select'

import { categoryStyleFn } from './selectUtils.js'

const categories = [
  {value: 'states', label: 'State'},
  {value: 'counties', label: 'County'},
  {value: 'msamds', label: 'MSA/MD'},
  {value: 'nationwide', label: 'Nationwide'}
]

const CategorySelect = ({ category, onChange }) => {
  const value = categories.reduce((acc, curr) => {
    return acc.value === category ? acc : curr
  })

  return (
    <Select
      onChange={onChange}
      styles={categoryStyleFn}
      openOnFocus
      simpleValue
      value={value}
      options={categories}
    />
  )
}

export default CategorySelect
