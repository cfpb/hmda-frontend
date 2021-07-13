import React from 'react'
import { getVariables } from '../constants/variables.js'
import DocLink from './DocLink.jsx'

function renderCheckboxes(variable, vars, makeCb, year) {
  const variables = getVariables(year)

  return variables[variable].options.map((v) => {
    // Add a "Select/Unselect all" box that behaves a bit differently
    if(v.id === 'all') { 
      const allChecked =
        Object.keys(vars[variable]).length &&
        Object.keys(vars[variable]).every((x) => vars[variable][x])

        return (
          <button
            className='CheckboxToggleBtn'
            key={v.id}
            onClick={makeCb(variable, v)}
            id={variable + v.id}
          >
            {allChecked ? 'Clear Selected' : 'Select All'}
          </button>
        )
    }

    return (
      <div className='CheckboxWrapper' key={v.id}>
        <input
          checked={!!vars[variable][v.id]}
          onChange={makeCb(variable, v)}
          id={variable + v.id}
          type='checkbox'
        ></input>
        <label htmlFor={variable + v.id}>{v.name}</label>
      </div>
    )
  })
}

const CheckboxContainer = props => {
  const { vars, selectedVar, year, callbackFactory } = props
  const variables = getVariables(year)

  return (
    <div className="CheckboxContainer">
      <div className="border">
        <DocLink year={year} definition={variables[selectedVar].definition}>
          <h3>{variables[selectedVar].label}</h3>
        </DocLink>
        {renderCheckboxes(selectedVar, vars, callbackFactory, year)}
      </div>
    </div>
  )
}
export default CheckboxContainer
