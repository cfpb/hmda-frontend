import React from 'react'
import Select from 'react-select'
import CategorySelect from './CategorySelect.jsx'
import Pills from './Pills.jsx'
import LoadingButton from './LoadingButton.jsx'
import {
  pruneItemOptions,
  makeItemSelectValues,
  makeItemPlaceholder,
  itemStyleFn
} from './selectUtils.js'


const ItemSelect = ({options, category, onCategoryChange, items, isLargeFile, enabled, downloadCallback, onChange }) => {
  const selectedValues = makeItemSelectValues(category, items)

  return (
    <div className="SelectWrapper">
      <h3>Dataset by Item</h3>
      <p>Filter HMDA data by geography levels: <a target="_blank" rel="noopener noreferrer" href="/documentation/2018/data-browser-filters/#Nationwide">nationwide, state, & MSA/MD</a></p>
      <CategorySelect category={category} onChange={onCategoryChange}/>
      <Select
        controlShouldRenderValue={false}
        styles={itemStyleFn}
        onChange={onChange}
        placeholder={makeItemPlaceholder(category, selectedValues)}
        isMulti={true}
        searchable={true}
        isDisabled={category === 'nationwide'}
        autoFocus
        openOnFocus
        simpleValue
        value={selectedValues}
        options={pruneItemOptions(category, options, selectedValues)}
      />
      {category === 'nationwide' ? null : <Pills values={selectedValues} onChange={onChange} />}
      <LoadingButton onClick={downloadCallback} disabled={!enabled}>Download Dataset</LoadingButton>
      {isLargeFile ? <div className="LargeFileWarning"><h4>Warning:</h4> This dataset may be too large to be opened in standard spreadsheet applications</div>: null}
    </div>
  )
}

export default ItemSelect
