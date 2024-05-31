import React, { useMemo } from 'react'
import Highlighter from 'react-highlight-words'
import { PRODUCT_NAMES } from './constants'
import { FilterResetButton } from './FilterResetButton'
import iconSprite from '../common/uswds/img/sprite.svg'
import './ChangeLogTable.scss'
/**
 * Display Publication Change Log Entries
 * (default export)
 */
const ChangeLogTable = ({
  data = {},
  products = PRODUCT_NAMES,
  filter,
  changeLog,
}) => {
  const totalEntries = useMemo(
    () =>
      Object.keys(changeLog)
        .map((key) => changeLog[key].length)
        .reduce((acc, curr) => acc + curr, 0),
    [changeLog],
  )

  const hasFilters = Object.keys(filter.filters).some(
    (key) => filter.filters[key].length,
  )

  const dates = Object.keys(data)
  const rows = dates
    .map((date, row) => {
      const todaysItems = data[date]
      if (!todaysItems || !todaysItems.length) return null

      return todaysItems.map((item, col) => {
        return (
          <Row
            key={'clt-row-' + row + 'col-' + col}
            item={item}
            products={products}
            filter={filter}
          />
        )
      })
    })
    .flat()
    .filter((x) => x)

  const isEmpty = !rows.length

  return (
    <div id='ChangeLogTable'>
      <div id='ChangeLogTableTop'></div>
      <ResultCount
        count={rows.length}
        total={totalEntries}
        hide={!hasFilters}
      />
      <EmptyState clear={filter.clear} isEmpty={isEmpty} />
      {rows}
    </div>
  )
}

const ResultCount = ({ count, total, hide }) => {
  if (hide) return null

  return (
    <div className='result-count'>
      <h3 className='header'>
        <svg
          className='filtersIcon'
          aria-hidden='true'
          focusable='false'
          role='img'
        >
          <use href={`${iconSprite}#filters`}></use>
        </svg>
        Filtered results
      </h3>
      <div className='body'>
        Showing <span className='highlight'>{count}</span> out of{' '}
        <span className='highlight'>{total}</span> entries
      </div>
    </div>
  )
}

const EmptyState = ({ clear, isEmpty }) => {
  if (!isEmpty) return null

  return (
    <div className='empty-state'>
      <span role='img' aria-label='warning sign'>
        ⚠️
      </span>{' '}
      No matches found.
      <FilterResetButton onClick={() => clear()} />
    </div>
  )
}

const Row = ({ item, filter, products }) => {
  let rowClassname = 'change-row split'

  let productClassname =
    `product ${item.product}` +
    (filter.filters['product'].indexOf(item.product) > -1 ? ' selected' : '')

  const toggleType = () => filter.toggle('type', item.type)
  const toggleProduct = () => filter.toggle('product', item.product)

  return (
    <div className={rowClassname}>
      <Column
        className={productClassname}
        value={products[item.product]}
        onClick={toggleProduct}
      />
      <Column className='changeType'>
        <button
          className={`pill type ${item.type}`}
          onClick={toggleType}
          type='button'
        >
          <div className='text'>{item.type}</div>
        </button>
      </Column>
      <Column className='date' value={item.changeDateOrdinal} />
      <Column className='description'>
        <Highlighter
          highlightClassName='highlighted'
          searchWords={filter.filters.keywords}
          autoEscape={true}
          textToHighlight={item.description}
        />
        <Links links={item.links} />
      </Column>
    </div>
  )
}

const Links = ({ links }) => {
  if (!links) return null
  return (
    <ul className='links'>
      {links.map((l, l_idx) => (
        <li key={l_idx}>
          <a href={l.url}>{l.text}</a>
        </li>
      ))}
    </ul>
  )
}

const Column = ({ value, onClick = () => null, className, children }) => {
  if (className.indexOf('product') > -1)
    return (
      <button onClick={onClick} className={'column ' + className} type='button'>
        {value || children}
      </button>
    )

  return (
    <div onClick={onClick} className={'column ' + className}>
      {value || children}
    </div>
  )
}

export default ChangeLogTable
