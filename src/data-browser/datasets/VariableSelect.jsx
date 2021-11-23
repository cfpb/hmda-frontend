import React from 'react'
import Select from '../Select.jsx'
import Pills from './Pills.jsx'
import CheckboxContainer from './CheckboxContainer.jsx'
import ExternalLink from '../../common/ExternalLink'
import {
  setVariableSelect,
  removeSelected,
  heightStyleFn
} from './selectUtils.js'


const VariableSelect = ({ options, variables, orderedVariables, year, checkFactory, onChange }) => {
  const variableValues = setVariableSelect(orderedVariables, year)
  return (
    <div className="SelectWrapper">
      <h3>Step 3: Select a filter (optional)</h3>
      <p>
        Narrow down your selection by filtering on up to two{' '}
        <ExternalLink url="/documentation/2018/data-browser-filters/#action_taken">
          popular variables
        </ExternalLink>
      </p>
      <Select id='VariableSelector'
        controlShouldRenderValue={false}
        onChange={onChange}
        placeholder={
          orderedVariables.length >= 2
            ? 'Remove a variable to select another'
            : 'Select a variable'
        }
        isMulti={true}
        searchable={true}
        styles={heightStyleFn}
        openOnFocus
        simpleValue
        value={variableValues}
        options={
          orderedVariables.length >= 2
            ? []
            : removeSelected(variableValues, options)
        }
      />
      <Pills values={variableValues} onChange={onChange} />
      <div className="QuerySummary">
        {orderedVariables.map(variable => {
          return (
            <CheckboxContainer
              key={variable}
              vars={variables}
              selectedVar={variable}
              callbackFactory={checkFactory}
              year={year}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VariableSelect
