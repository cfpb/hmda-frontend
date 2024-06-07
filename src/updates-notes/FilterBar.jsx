import React, { useEffect, useState } from 'react'
import { PRODUCT_NAMES } from './constants'
import { FilterResetButton } from './FilterResetButton'
import spyGlass from '../common/images/cf-gov-search.svg'
import iconSprite from '../common/uswds/img/sprite.svg'
import './FilterBar.scss'

/**
 * UI to adjust Filter criteria
 * (default export)
 */
const FilterBar = ({ productOptions, typeOptions, filter }) => {
  const searchValue = filter.filters.keywords
    ? filter.filters.keywords.join(' ')
    : ''

  const [isExpanaded, setIsExpanded] = useState(false)
  const expandFilters = () => {
    setIsExpanded(!isExpanaded)
  }

  return (
    <div id='filter-bar'>
      <div className={`filter-wrapper split ${isExpanaded ? 'expanded' : ''}`}>
        <h4 className='filter-title' onClick={expandFilters}>
          <svg
            className='filterIcon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#filter_alt`}></use>
          </svg>
          <span>Filter by:</span>
        </h4>
        <FilterColumn
          name='type'
          heading='Type'
          options={typeOptions}
          filter={filter}
        />
        <FilterColumn
          name='product'
          heading='Product'
          options={productOptions}
          filter={filter}
        />
        <div className='search-wrapper'>
          <SearchField
            id='search-input'
            value={searchValue}
            label='Description'
            onChange={(e) => {
              filter.add('keywords', e.target.value)
              document.getElementById('ChangeLogTableTop').scrollIntoView()
            }}
            onClear={() => filter.clear('keywords')}
          />
          <FilterResetButton onClick={() => filter.clear()} />
        </div>
      </div>
    </div>
  )
}

const SearchField = ({
  id,
  label,
  value,
  onChange,
  placeholder = 'Search',
  onClear,
}) => (
  <>
    <h3>
      <label htmlFor={id}>{label}</label>
    </h3>
    <div className='text-input'>
      <span className='icon'>
        <img src={spyGlass} alt='Magnifying glass' />
      </span>
      <div className='search-input-wrapper'>
        <input
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button type='button' className='clear-text' onClick={onClear}>
          x
        </button>
      </div>
    </div>
  </>
)

const FilterColumn = ({ name, options, heading, filter }) => (
  <div className={`pills-wrapper ${name}`}>
    <h3>{heading}</h3>
    <div className='pills split columns'>
      {options.map((option, idx) => (
        <FilterPill
          key={`${option.type}-${idx}`}
          option={option}
          filter={filter}
        />
      ))}
    </div>
  </div>
)

/** Option that toggles it's filter when clicked */
const FilterPill = ({ option, filter }) => {
  const { type, value } = option
  const { toggle, filters } = filter
  const id = `pill-${type}-${value}`
  const map = type === 'product' ? PRODUCT_NAMES : null
  const selected =
    filters[option.type].indexOf(option.value) > -1 ? 'selected' : ''
  const [wasClicked, setWasClicked] = useState(false)

  // Scroll to page top on initial load
  useEffect(() => window.scrollTo(0, 0), [])

  // Keep Filter Bar in view on filter change
  useEffect(() => {
    if (wasClicked) {
      document.getElementById('focus-on-filter-bar').scrollIntoView()
      setWasClicked(false)
    }
  }, [wasClicked])

  return (
    <button
      id={id}
      type='button'
      className={`pill ${type} ${value} ${selected}`}
      onClick={() => {
        toggle(type, value)
        setWasClicked(!wasClicked)
      }}
    >
      <span className='icon'>{selected ? '\u2713' : '+'}</span>
      <div className='text'>{map ? map[value] : value}</div>
    </button>
  )
}

export default FilterBar
