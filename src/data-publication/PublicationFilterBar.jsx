import React, { useEffect, useState } from 'react'
import { PRODUCT_NAMES } from './constants/publication-changes'

/**
 * UI to adjust Filter criteria
 * (default export)
 */
const PublicationFilterBar = ({
  productOptions,
  typeOptions,
  filter,
}) => {
  return (
    <div className='filter-bar'>
      <div className='filter-wrapper split'>
        <OptionColumn
          name='type'
          heading='by Change Type'
          options={typeOptions}
          filter={filter}
        />
        <OptionColumn
          name='product'
          heading='by Product'
          options={productOptions}
          filter={filter}
        />
        <div className='search-wrapper'>
          <h3><label htmlFor='keyword-input'>by Keyword</label></h3>
          <div className='text-input'>
            <input
              id='keyword-input'
              type='text'
              value={filter.filters.keywords}
              onChange={(e) => filter.add('keywords', e.target.value)}
            ></input>
            <span
              className='reset-filters'
              onClick={() => filter.clear()}
            >
              Reset Filters
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


const OptionColumn = ({ name, options, heading, filter }) => (
  <div className={`pills-wrapper ${name}`}>
    <h3>{heading}</h3>
    <div className='pills split columns'>
      {options.map((option, idx) => (
        <Option
          key={`${option.type}-${idx}`}
          option={option}
          filter={filter}
        />
      ))}
    </div>
  </div>
)


/** Option that toggles it's filter when clicked */
const Option = ({ option, filter }) => {
  const { type, value } = option
  const { toggle, filters } = filter
  const id = `pill-${type}-${value}`
  const map = type === 'product' ? PRODUCT_NAMES : null
  const mappedVal = map ? map[value] : value
  const selected = filters[option.type].indexOf(option.value) > -1 
    ? 'selected' 
    : ''
  const [wasClicked, setWasClicked] = useState(false)

  // Scroll to page top on initial load
  useEffect(() => window.scrollTo(0, 0), [])

  // Keep Filter Bar in view on filter change
  useEffect(() => {
    if (wasClicked) {
      document.getElementById('pub-whats-new').scrollIntoView()
      setWasClicked(false)
    }
  }, [wasClicked])

  return (
    <div
      id={id}
      className={`pill ${type} ${value} ${selected}`}
      onClick={() => {
        toggle(type, value)
        setWasClicked(!wasClicked)
      }}
    >
      <div className='text'>{mappedVal}</div>
    </div>
  )
}


export default PublicationFilterBar
