import React from 'react'
import { createFilter } from 'react-select'
import Select from '../Select.jsx'
import MenuList from './MenuList.jsx'
import CategorySelect from './CategorySelect.jsx'
import Pills from './Pills.jsx'
import { isNationwide } from './selectUtils'
import {
  pruneItemOptions,
  makeItemSelectValues,
  makeItemPlaceholder,
  itemStyleFn
} from './selectUtils.js'
import ExternalLink from '../../common/ExternalLink'


const ItemSelect = ({
  options,
  category,
  onCategoryChange,
  items,
  onChange,
  year
}) => {
  const selectedValues = makeItemSelectValues(category, items, year)
  const nationwide = isNationwide(category)

  return (
    <div className='SelectWrapper'>
      <h3>Step 1: Select Geography</h3>
      <p>
        Start by selecting a geography filter using the dropdown menu
        below.&nbsp;
        <ExternalLink url='/documentation/2018/data-browser-filters/#Nationwide'>
          View more information on the available filters.
        </ExternalLink>
      </p>
      <div className='inline-selects'>
        <CategorySelect category={category} onChange={onCategoryChange} />
        <Select
          id='ItemSelector'
          components={{ MenuList }}
          filterOption={createFilter({ ignoreAccents: false })}
          controlShouldRenderValue={false}
          styles={itemStyleFn}
          onChange={onChange}
          placeholder={makeItemPlaceholder(category, selectedValues)}
          isMulti={true}
          searchable={true}
          isDisabled={nationwide}
          autoFocus
          openOnFocus
          simpleValue
          value={selectedValues}
          options={pruneItemOptions(category, options, selectedValues)}
        />
      </div>
      {nationwide ? null : (
        <Pills values={selectedValues} onChange={onChange} />
      )}
    </div>
  )
}

export default ItemSelect
