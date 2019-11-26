import React from 'react'
import Select, { createFilter } from 'react-select'
import MenuList from './MenuList.jsx'
import Pills from './Pills.jsx'
import {
  itemStyleFn,
  makeItemPlaceholder,
  makeItemSelectValues,
  pruneItemOptions
} from './selectUtils.js'

const InstitutionSelect = ({ items, onChange, options, nationwide }) => {
  const category = 'leis'
  const selectedValues = makeItemSelectValues(category, items)

  return (
    <div className='SelectWrapper'>
      <h3>Step 2: Select Financial Institution</h3>
      <p>
        You can select one or more financial institutions by entering the
        financial institutions LEI or name. <br />
        <strong>NOTE: Filtering by financial institution is currently only available
        when the geography filter is set to Nationwide.</strong>
      </p>
      <Select
        id='lei-item-select'
        components={{ MenuList }}
        filterOption={createFilter({ ignoreAccents: false })}
        controlShouldRenderValue={false}
        styles={styleFn}
        onChange={onChange}
        placeholder={itemPlaceholder(nationwide, items.length, category, selectedValues)}
        isMulti={true}
        searchable={true}
        autoFocus
        openOnFocus
        simpleValue
        value={selectedValues}
        options={pruneItemOptions(category, options, selectedValues)}
        isDisabled={!nationwide}
      />
      <Pills values={selectedValues} onChange={onChange} />
    </div>
  )
}

const styleFn = {
  ...itemStyleFn,
  container: p => ({ ...p, width: '100%' }),
  control: p => ({ ...p, borderRadius: '4px' })
}

function itemPlaceholder(nationwide, hasItems, category, selectedValues) {
  const messageAll = 'All institutions selected'
  if (!nationwide) return messageAll
  if (!hasItems)
    return (
      messageAll + '. ' +
      makeItemPlaceholder(category, selectedValues) +
      ' to filter'
    )
  return makeItemPlaceholder(category, selectedValues)
}

export default InstitutionSelect
