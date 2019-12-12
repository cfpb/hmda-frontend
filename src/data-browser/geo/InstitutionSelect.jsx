import React from 'react'
import Select, { createFilter } from 'react-select'
import MenuList from './MenuList.jsx'
import Pills from './Pills.jsx'
import {
  itemStyleFn,
  makeItemPlaceholder,
  sortByLabel,
  createLEIOption
} from './selectUtils.js'

const InstitutionSelect = ({ items, onChange, leiDetails }) => {
  const category = 'leis'
  const {leis, loading} = leiDetails
  const selectedValues = items.map(lei => createLEIOption(lei, leis))

  return (
    <div className='SelectWrapper'>
      <h3>Step 2: Select Financial Institution (optional)</h3>
      <p>
        You can select one or more financial institutions by entering the
        financial institutions LEI or name. <br />
        <strong>
          NOTE: Only Institutions that operate in the selected geography are available for selection.
        </strong>
      </p>
      <Select
        id='lei-item-select'
        components={{ MenuList }}
        filterOption={createFilter({ ignoreAccents: false })}
        controlShouldRenderValue={false}
        styles={styleFn}
        onChange={onChange}
        placeholder={itemPlaceholder(loading, items.length, category, selectedValues)}
        isMulti={true}
        searchable={true}
        autoFocus
        openOnFocus
        simpleValue
        value={selectedValues}
        options={pruneLeiOptions(leis, selectedValues)}
        isDisabled={loading}
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

export function pruneLeiOptions(data, selected) {
  const selectedLeis = selected.map(s => s.value)
  const institutions = Object.keys(data).map(v => data[v])
  const opts = institutions
    .filter(institution => selectedLeis.indexOf(institution.lei) === -1)
    .map(institution => ({ value: institution.lei, label: `${institution.name.toUpperCase()} - ${institution.lei}` }))
    .sort(sortByLabel)
  opts.unshift({ value: 'all', label: `All Financial Institutions (${institutions.length})` })
  return opts
}

export function itemPlaceholder(loading, hasItems, category, selectedValues) {
  if(loading) return 'Loading...'
  const placeholder = makeItemPlaceholder(category, selectedValues)
  if (!hasItems) return `All institutions selected. ${placeholder} to filter`
  return placeholder
}

InstitutionSelect.defaultProps = {
  items: [],
  leiDetails: { leis: {}, loading: true}
}

export default InstitutionSelect
