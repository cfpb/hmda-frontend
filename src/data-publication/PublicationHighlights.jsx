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
  const LIMIT_CHANGE_TYPES = 3

  const result = {
    product: {},
    visibleChangeTypes: []
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
        // Restrict number of Change Type tables shown
        if (
          result.visibleChangeTypes.indexOf(item.type) < 0 &&
          result.visibleChangeTypes.length < LIMIT_CHANGE_TYPES
        )
          result.visibleChangeTypes.unshift(item.type)
      }
    })
  })

  return result
}

const PublicationHighlights = ({ data, filter }) => {

  const highlights = collectHighlights(data)

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
              filter={filter}
            />
          ))}
        </div>
        <div className='change-type-highlights'>
          <h3 className='header'>by Change Type</h3>
          {highlights.visibleChangeTypes.map((cType) => (
            <ChangeTable
              changes={highlights[cType]}
              headers={HEADERS[cType]}
              filter={filter}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ChangeTable = ({ changes, headers, filter }) => {
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
        {changes.map(({ changeDateOrdinal, headline, tags }, idx) => (
          <tr key={`change-${idx}`}>
            {/* <td className='description'>{headline}</td> */}
            <td className='description'>{addFilterLinks(headline, tags, filter)}</td>
            <td className='date'>{changeDateOrdinal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ProductHighlight = ({ items, name, filter }) => {
  if (!items || !items.length) return null

  return (
    <div className='product'>
      <span className='name'>
        <span className='text'> {name}</span>
      </span>
      <div>
        {items.map((item, idx) => (
          <Accordion key={idx} 
            header={item.headline} 
            body={addFilterLinks(item.description, item.tags, filter)} 
            />
        ))}
      </div>
    </div>
  )
}


function addFilterLinks(content, tags, filter) {
  let jsxContent = <>{content}</>
  tags.forEach(tag => {
    let parts = content
      .replace(tag, '$_INJECT')
      .split(' ')
      .map((part) => {
        // TODO: Fix fragile logic and unit test. 
        if (part.indexOf('$_INJECT') > -1) {
          const tagged_parts = part.split('$_INJECT').filter((x) => x)
          let combined = []

          if (tagged_parts.length < 2)
            combined.push(<Linked text={tag} filter={filter} />)
          else {
            combined = tagged_parts.reduce((acc, curr, currIdx) => {
              acc.push(curr)
              if (currIdx !== tagged_parts.length - 1)
                acc.push(<Linked text={tag} filter={filter} />)
              return acc
            }, [])
          }

          combined.push(' ')
          return combined
        }

        return part + ' '
      })
    jsxContent = <>{parts}</>
  })
  return jsxContent
}


const Linked = ({ text, filter }) => {
  const handleClick = () => {
    filter.add('keywords', text)
    document
      .getElementById('pub-whats-new')
      .scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => document.getElementById('keyword-input').focus(), 500)
  }

  return (
    <button className='search-link link' onClick={handleClick}>
      {text}
    </button>
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