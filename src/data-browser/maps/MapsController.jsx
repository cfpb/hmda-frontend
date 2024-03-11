import React from 'react'
import Select from '../Select.jsx'
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
  const filterSelectors = () => {
    const sharedProps = {
      autoFocus: true,
      isClearable: true,
      openOnFocus: true,
      searchable: true,
      simpleValue: true,
      styles: menuStyle,
      filterOption: searchFilter,
      formatGroupLabel: (data) => formatGroupLabel(data),
    }

    return (
      <div className='filter-selectors flex flex-inline columns-2'>
        <div className='flex-column'>
          <h4>Dataset Selection</h4>
          <div className='filter'>
            <span className='filter-clause'>MAP LEVEL</span>
            <Select
              id='level-select'
              placeholder='Select a level (type to search)'
              value={selectedGeography}
              options={geographies}
              onChange={(g) => handleGeographyChange(g.label)}
              autoFocus={false}
              isClearable={false}
              openOnFocus={true}
              searchable={true}
              simpleValue={true}
              styles={menuStyle}
            />
          </div>
          <div className='filter'>
            <span className='filter-clause'>YEAR</span>
            <Select
              id='year-select'
              placeholder='Select a year (type to search)'
              value={{ label: year, value: year }}
              options={years.map((yr) => ({ label: yr, value: yr }))}
              onChange={(o) => handleYearChange(o.label)}
              autoFocus={false}
              isClearable={false}
              openOnFocus={true}
              searchable={true}
              simpleValue={true}
              styles={menuStyle}
            />
          </div>
        </div>
        <div className='flex-column'>
          <h4>Data Filters</h4>
          <div className='filter'>
            <span className='filter-clause'>WHERE</span>
            <Select
              id='map-filter-1'
              {...sharedProps}
              value={combinedFilter1}
              onChange={onFilter1Change}
              options={getCombinedOptions(combinedFilter2, combinedFilter1)}
              placeholder='Select a filter (type to search)'
              menuIsOpen={!combinedFilter1 || undefined}
            />
          </div>
          {combinedFilter1 && (
            <div className='filter'>
              <span
                className={
                  'filter-clause' + (combinedFilter1 ? ' disabled' : '')
                }
              >
                {combinedFilter1 ? 'AND' : '[OPTIONAL]'}
              </span>
              <Select
                id='map-filter-2'
                {...sharedProps}
                isDisabled={!combinedFilter1}
                value={combinedFilter2}
                onChange={onFilter2Change}
                options={getCombinedOptions(combinedFilter1, combinedFilter2)}
                placeholder={
                  '[OPTIONAL] Add a second filter' +
                  (combinedFilter1 ? ' (type to search)' : '')
                }
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={'maps-control-wrapper no-print'}>
      <div className='maps-control-box'>{filterSelectors()}</div>
    </div>
  )
}
