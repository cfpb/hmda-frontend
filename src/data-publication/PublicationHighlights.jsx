import React, { useState } from 'react';
import { PRODUCTS, PRODUCT_NAMES } from './constants/publication-changes'

const HEADERS = {
  update: ['Update', 'Date'],
  correction: ['Correction', 'Date'],
  release: ['Release', 'Date'],
  notice: ['Notice', 'Date'],
}

// Organize the change log data into highlights
const collectHighlights = data => {
  const LIMIT = 2

  const result = {
    product: {},
  }

  const addProduct = (product, value) => {
    if (result.product[product] === undefined) result.product[product] = []
    if (result.product[product].length < LIMIT) 
      result.product[product].push(value)
  }

  Object.keys(data).forEach(date => {
    const todaysItems = data[date]
    todaysItems.forEach(item => {
      // Collect changes per Product
      addProduct(item.product, item)

      // Collect changes by Change Type
      if (!result[item.type]) result[item.type] = []
      if (result[item.type].length < LIMIT) {
        result[item.type].push(item)
      }
    })
    
  })

  return result
}

const PublicationHighlights = ({ data, filter }) => {

  const highlights = collectHighlights(data)
  const changeTypes = Object.keys(highlights).filter(key => key !== 'product')

  return (
    <div id='publicationHighlights'>
      <h2>Highlights</h2>
      <div className='split'>
        <div className='product-highlights'>
          <h3 className='header'>
            <span>by Product</span>
          </h3>
          {PRODUCTS.map((productId, idx) => (
            <ProductHighlight
              key={`${productId}-${idx}`}
              items={highlights.product[productId]}
              name={PRODUCT_NAMES[productId]}
            />
          ))}
        </div>
        <div className='change-type-highlights'>
          <h3 className='header'>by Change Type</h3>
          {changeTypes.map((cType) => (
            <ChangeTable changes={highlights[cType]} headers={HEADERS[cType]} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ChangeTable = ({ changes, headers }) => {
  return (
    <table className='change-table'>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={`${header}-${idx}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!changes.length && <tr><td colSpan='2'>No entries</td></tr>}
        {changes.map(({ changeDateOrdinal, headline }, idx) => (
          <tr key={`change-${idx}`}>
            <td className='description'>{headline}</td>
            <td className='date'>{changeDateOrdinal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ProductHighlight = ({ items, name, open, toggle }) => {
  if (!items || !items.length) return null

  const openClass = open ? 'open' : ''

  return (
    <div className={'product ' + openClass}>
      <span className='name' onClick={toggle}>
        <span className='text'> {name}</span>
      </span>
      <div>
        {items.map((item, idx) => (
          <Accordion key={idx} header={item.headline} body={item.description} />
        ))}
      </div>
    </div>
  )
}

const Accordion = ({ header, body }) => {
  const [open, setOpen] = useState(false)
  const openClass = open ? 'open' : ''

  return (
    <div className={'accordion ' + openClass}>
      <span className='title' onClick={() => setOpen(!open)}>
        <span className='icon'>{open ? '▾' : '▸'}</span>
        <span className='text'> {header}</span>
      </span>
      <span className='body'>{body}</span>
    </div>
  )
}


export default PublicationHighlights