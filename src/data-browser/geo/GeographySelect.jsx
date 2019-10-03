import React from 'react'
import Select from 'react-select'
import Pills from './Pills.jsx'
import LoadingButton from './LoadingButton.jsx'
import {
  removeSelected,
  setGeographySelect,
  makeGeograpyPlaceholder,
  geographyStyleFn
} from './selectUtils.js'


const GeographySelect = ({options, geographies, isLargeFile, enabled, downloadCallback, onChange }) => {
  const {states, msamds, nationwide} = geographies
  const geoValues =  setGeographySelect(states, msamds, nationwide)

  return (
    <div className="SelectWrapper">
          <h3>Dataset by Geography</h3>
          <p>Filter HMDA data by geography levels: <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/documentation/2018/data-browser-filters/#Nationwide">nationwide, state, & MSA/MD</a></p>
          <Select
            controlShouldRenderValue={false}
            styles={geographyStyleFn}
            onChange={onChange}
            placeholder={makeGeograpyPlaceholder(nationwide, geoValues)}
            isMulti={true}
            searchable={true}
            autoFocus
            openOnFocus
            simpleValue
            value={geoValues}
            options={nationwide
              ? []
              : geoValues.length
                ? geoValues[0].value.length === 2
                  ? removeSelected(geoValues, options.states)
                  : removeSelected(geoValues, options.msamds)
                : options.combined
            }
          />
          <Pills values={geoValues} onChange={onChange} />
          <LoadingButton onClick={downloadCallback} disabled={!enabled}>Download Dataset</LoadingButton>
          {isLargeFile ? <div className="LargeFileWarning"><h4>Warning:</h4> This dataset may be too large to be opened in standard spreadsheet applications</div>: null}
        </div>
  )
}

export default GeographySelect
