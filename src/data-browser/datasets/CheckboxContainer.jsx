import React from 'react'
import { getVariables } from '../constants/variables.js'
import DocLink from './DocLink.jsx'

function renderCheckboxes(variable, vars, makeCb, year) {
  const variables = getVariables(year)

  const boxes = variables[variable].options.map((v) => {
    return (
      <div className='CheckboxWrapper' key={v.id}>
        <input
          checked={!!vars[variable][v.id]}
          onChange={makeCb(variable, v)}
          id={variable + v.id}
          type='checkbox'
        ></input>
        <label htmlFor={variable + v.id}>
          {variables[variable].mapping[v.id]}
        </label>
      </div>
    )
  })

  const allChecked =
    Object.keys(vars[variable]).length &&
    Object.keys(vars[variable]).every((x) => vars[variable][x])

  boxes.unshift(
    // Add a button to Select/Clear all options for this variable
    <button
      className='CheckboxToggleBtn'
      key={'all'}
      onClick={makeCb(variable, { id: 'all' })}
      id={variable + '-all'}
    >
      {allChecked ? 'Clear Selected' : 'Select All'}
    </button>,
  )

  return boxes
}

const CheckboxContainer = (props) => {
  const { vars, selectedVar, year, callbackFactory } = props
  const variables = getVariables(year)

  return (
    <div className='CheckboxContainer'>
      <div className='border'>
        <DocLink year={year} definition={variables[selectedVar].definition}>
          <h3>{variables[selectedVar].label}</h3>
        </DocLink>
        {renderCheckboxes(selectedVar, vars, callbackFactory, year)}
      </div>
    </div>
  )
}
export default CheckboxContainer
