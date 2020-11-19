import React from 'react'
import { PRODUCT_NAMES } from '../constants/publication-changes'

/** 
 * Display Publication Change Log Entries
 * (default export)
 */
const ChangeLogTable = ({ data = {}, products = PRODUCT_NAMES, filter }) => {
  const dates = Object.keys(data)
  const isEmpty = dates.every((key) => !data[key].length)
  let pubItemCount = -1

  return (
    <div id='ChangeLogTable'>
      <Header />
      <EmptyState clear={filter.clear} isEmpty={isEmpty} />
      {dates.map((date, row) => {
        const todaysItems = data[date]
        if (!todaysItems || !todaysItems.length) return null

        return (
          <div key={'cl-day-group-' + row} className='pub-change-day'>
            {todaysItems.map((item, col) => {
              pubItemCount += 1
              return (
                <Row
                  key={'clt-row-' + row + 'col-' + col}
                  item={item}
                  isOdd={pubItemCount % 2 !== 0}
                  products={products}
                  filter={filter}
                />
              )
            })}
          </div>
        )
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
      <div>
        <span className='reset-filters' onClick={() => clear()}>
          Reset All Filters
        </span>
      </div>
    </div>
  )
}


const Header = () => {
  return (
    <>
      <div className='pub-change-item header split'>
        <h4 className='date header'>Change Date</h4>
        <h4 className='header column-type'>Change Type</h4>
        <h4 className='product header'>Product</h4>
        <h4 className='description header'>Change Description</h4>
      </div>
    </>
  )
}


const Row = ({ item, isOdd, filter, products }) => {
  let rowClassname = 'pub-change-item split' + (isOdd ? ' odd' : ' even')

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
