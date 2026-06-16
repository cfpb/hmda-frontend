import { useMemo } from 'react'
import iconSprite from '../common/uswds/img/sprite.svg'
import './ChangeLogTable.scss'
import { PRODUCT_NAMES } from './constants'
import ExpandableDescription from './ExpandableDescription'
import { FilterResetButton } from './FilterResetButton'
/**
 * Display Publication Change Log Entries
 * (default export)
 */
function ChangeLogTable({
  data = {},
  products = PRODUCT_NAMES,
  filter,
  changeLog,
}) {
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
            key={`clt-row-${row}col-${col}`}
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
      <div id='ChangeLogTableTop' />
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

function ResultCount({ count, total, hide }) {
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
          <use href={`${iconSprite}#filters`} />
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

function EmptyState({ clear, isEmpty }) {
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

function Row({ item, filter, products }) {
  const rowClassname = 'change-row split'

  const productClassname = `product ${item.product}${
    filter.filters.product.indexOf(item.product) > -1 ? ' selected' : ''
  }`

  const toggleType = () => filter.toggle('type', item.type)
  const toggleProduct = () => filter.toggle('product', item.product)

  return (
    <div className={rowClassname} id={item.slug}>
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
      <Column className='date'>
        <a href={`#${item.slug}`}>{item.changeDateOrdinal}</a>
      </Column>
      <Column className='description'>
        <ExpandableDescription
          description={item.description}
          highlightWords={filter.filters.keywords}
        />
      </Column>
    </div>
  )
}

function Column({ value, onClick = () => null, className, children }) {
  if (className.indexOf('product') > -1)
    return (
      <button onClick={onClick} className={`column ${className}`} type='button'>
        {value || children}
      </button>
    )

  return (
    <div onClick={onClick} className={`column ${className}`}>
      {value || children}
    </div>
  )
}

export default ChangeLogTable
