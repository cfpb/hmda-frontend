import React from 'react'
import { PRODUCT_NAMES } from '../constants/publication-changes'
import { FilterResetButton } from './FilterResetButton'
import './ChangeLogTable.css'
/** 
 * Display Publication Change Log Entries
 * (default export)
 */
const ChangeLogTable = ({ data = {}, products = PRODUCT_NAMES, filter }) => {
  const dates = Object.keys(data)
  const isEmpty = dates.every((key) => !data[key].length)

  return (
    <div id='ChangeLogTable'>
      <Header />
      <EmptyState clear={filter.clear} isEmpty={isEmpty} />
      {dates.map((date, row) => {
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
      })}
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


const Header = () => {
  return (
    <div className='pub-change-item header split'>
      <h4 className='header date'>Change Date</h4>
      <h4 className='header column-type'>Change Type</h4>
      <h4 className='header product'>Product</h4>
      <h4 className='header description'>Change Description</h4>
    </div>
  )
}


const Row = ({ item, filter, products }) => {
  let rowClassname = 'pub-change-item split'

  let productClassname =
    `product ${item.product}` +
    (filter.filters['product'].indexOf(item.product) > -1 ? ' selected' : '')

  const toggleType    = () => filter.toggle('type', item.type)
  const toggleProduct = () => filter.toggle('product', item.product)

  return (
    <div className={rowClassname}>
      <Column className='date' value={item.changeDateOrdinal} />
      <Column className='column-type'>
        <button className={`pill type ${item.type}`} onClick={toggleType} type="button">
          <div className='text'>{item.type}</div>
        </button>
      </Column>
      <Column
        className={productClassname}
        value={products[item.product]}
        onClick={toggleProduct}
      />
      <Column className='description' value={filter.highlightKeywords(item.description)} />
    </div>
  )
}


const Column = ({ value, onClick = () => null, className, children }) => {
  if (className.indexOf('product') > -1)
    return (
      <div>
        <button
          onClick={onClick}
          className={'column ' + className}
          type='button'
        >
          {value || children}
        </button>
      </div>  
    )

  return (
    <div onClick={onClick} className={'column ' + className}>
      {value || children}
    </div>
  )
}

export default ChangeLogTable
