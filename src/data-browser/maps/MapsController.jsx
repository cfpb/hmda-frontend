import React from 'react'
import Select from '../Select.jsx'
import TextSelector from './TextSelector'
import {
  getCombinedOptions,
  formatGroupLabel,
  searchFilter,
} from './selectUtils.jsx'

const menuStyle = {
  menu: (provided) => ({
    ...provided,
    zIndex: 3,
    fontSize: '1.2em',
  }),
  control: (p) => ({
    ...p,
    fontSize: '1.2em',
  }),
}

export const MapsController = ({
  selectedGeography,
  geographies,
  handleGeographyChange,
  handleYearChange,
  year,
  combinedFilter1,
  combinedFilter2,
  onFilter1Change,
  onFilter2Change,
  years,
}) => {
  const textSelectors = () => (
    <div className='text-selectors'>
      <TextSelector
        selected={selectedGeography}
        options={geographies.map((g) => g.label)}
        onChange={handleGeographyChange}
        label='Map Level'
      />
      <TextSelector
        selected={year}
        options={years}
        onChange={handleYearChange}
        label='Year'
      />
    </div>
  )

  const filterSelectors = () => {
    const sharedProps = {
      autoFocus: true,
      isClearable: true,
      openOnFocus: true,
      searchable: true,
      simpleValue: true,
      styles: menuStyle,
      filterOption: searchFilter,
      formatGroupLabel: (data) => formatGroupLabel(data, year),
    }

    return (
      <div className='filter-selectors'>
        <div className='filter'>
          <span className='filter-clause'>WHERE</span>
          <Select
            {...sharedProps}
            value={combinedFilter1}
            onChange={onFilter1Change}
            options={getCombinedOptions(combinedFilter2, combinedFilter1)}
            placeholder='Select a filter (type to search)'
            menuIsOpen={!combinedFilter1 || undefined}
          />
        </div>
        <div className='filter'>
          <span
            className={'filter-clause' + (combinedFilter1 ? ' disabled' : '')}
          >
            {combinedFilter1 ? 'AND' : '[OPTIONAL]'}
          </span>
          <Select
            {...sharedProps}
            isDisabled={!combinedFilter1}
            value={combinedFilter2}
            onChange={onFilter2Change}
            options={getCombinedOptions(combinedFilter1, combinedFilter2)}
            placeholder={
              'Add a second filter' +
              (combinedFilter1 ? ' (type to search)' : '')
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className={'maps-control-wrapper no-print'}>
      <div className='maps-control-box'>
        {textSelectors()}
        {filterSelectors()}
      </div>
    </div>
  )
}
