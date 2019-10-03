import React from 'react'
import Select from 'react-select'
import Pills from './Pills.jsx'
import CheckboxContainer from './CheckboxContainer.jsx'
import LoadingButton from './LoadingButton.jsx'
import {
  setVariableSelect,
  someChecksExist,
  removeSelected
} from './selectUtils.js'


const VariableSelect = ({ options, variables, orderedVariables, loadingDetails, year, checkFactory, requestSubset, onChange }) => {
  const variableValues = setVariableSelect(orderedVariables)
  return (
    <div className="SelectWrapper">
      <h3>Dataset by Pre-selected Filters</h3>
      <p>
        Narrow down your geography selection by filtering on up to two{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/documentation/2018/data-browser-filters/#action_taken"
        >
          popular variables
        </a>
      </p>
      <Select
        controlShouldRenderValue={false}
        onChange={onChange}
        placeholder={
          orderedVariables.length >= 2
            ? 'Remove a variable to select another'
            : 'Select a variable'
        }
        isMulti={true}
        searchable={true}
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
      <LoadingButton
        loading={loadingDetails}
        onClick={requestSubset}
        disabled={!someChecksExist(variables)}
      >
        View Data Summary
      </LoadingButton>
    </div>
  )
}

export default VariableSelect
