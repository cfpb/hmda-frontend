import React from 'react'
import Select, { createFilter } from 'react-select'
import MenuList from './MenuList.jsx'
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
    <div className='SelectWrapper'>
      <h3>How would you like to filter HMDA Data?</h3>
      <p>
        You can select the type of filter using the dropdown menu below.&nbsp;
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://ffiec.cfpb.gov/documentation/2018/data-browser-filters/#Nationwide'
        >
          View more information on the available filters.
        </a>
      </p>
      <CategorySelect category={category} onChange={onCategoryChange} />
      <Select
        components={{ MenuList }}
        filterOption={createFilter({ ignoreAccents: false })}
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
      {category === 'nationwide' ? null : (
        <Pills values={selectedValues} onChange={onChange} />
      )}
      <LoadingButton onClick={downloadCallback} disabled={!enabled}>
        Download Dataset
      </LoadingButton>
      {isLargeFile ? (
        <div className='LargeFileWarning'>
          <h4>Warning:</h4> This dataset may be too large to be opened in
          standard spreadsheet applications
        </div>
      ) : null}
    </div>
  )
}

export default ItemSelect
