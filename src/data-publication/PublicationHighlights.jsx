import React, { useState } from 'react';
import { PRODUCTS, PRODUCT_NAMES } from './constants/publication-changes'

const HEADERS = {
  CHANGE: ['Completed', 'Date'],
  UPCOMING: ['Upcoming', 'Date'],
}

// Organize the change log data into highlights
const collectHighlights = data => {
  const LIMIT = 2

  const result = {
    product: {},
    completed: [],
    upcoming: []
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

      // Collect recent updates
      if (item.type !== 'future' && result.completed.length < LIMIT) {
        result.completed.push(item)
      }

      // Collect upcoming updates
      if (item.type === 'future' && result.upcoming.length < LIMIT) {
        result.upcoming.push(item)
      }
    })
    
  })

  return result
}

const DEFAULT_OPEN = true

const PublicationHighlights = ({ data }) => {
  const [expandAll, setExpandAll] = useState(false)
  const [openUpdates, setOpenUpdates] = useState(
    PRODUCTS.reduce((acc, p) => {
      acc[p] = DEFAULT_OPEN
      return acc
    }, {})
  )

  const highlights = collectHighlights(data)

  const toggleOpen = (key) => {
    setOpenUpdates((state) => {
      const nextState = { ...state, [key]: state[key] ? false : true }
      if (Object.keys(nextState).some(key => nextState[key])) setExpandAll(false)
      else setExpandAll(true)

      return { ...state, [key]: state[key] ? false : true }
    })
  }
  
  const toggleExpandAll = () => {
    setOpenUpdates((state) =>
      Object.keys(state).reduce((acc, key) => {
        acc[key] = expandAll
        return acc
      }, {})
    )
    setExpandAll(!expandAll)
  }

  return (
    <div id='publicationHighlights'>
      <h2>Highlights</h2>
      <div className='split'>
        <div className='product-highlights'>
          <h3 className='header'>
            <span>by Product</span>
            <span className='toggle' onClick={toggleExpandAll}>
              {expandAll ? 'Expand' : 'Collapse'}
            </span>
          </h3>
          {PRODUCTS.map((productId, idx) => (
            <UpdateItem
              key={`${productId}-${idx}`}
              data={highlights.product[productId]}
              title={PRODUCT_NAMES[productId]}
              open={openUpdates[productId]}
              toggle={() => toggleOpen(productId)}
            />
          ))}
        </div>
        <div className='change-type-highlights'>
          <h3 className='header'>by Change Type</h3>
          <ChangeTable
            changes={highlights.completed}
            headers={HEADERS.CHANGE}
          />
          <ChangeTable
            changes={highlights.upcoming}
            headers={HEADERS.UPCOMING}
          />
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
        {changes.map(({ changeDateOrdinal, description }, idx) => (
          <tr key={`change-${idx}`}>
            <td className='description'>{description}</td>
            <td className='date'>{changeDateOrdinal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const UpdateItem = ({ data, title, open, toggle }) => {
  if (!data || !data.length) return null

  const openClass = open ? 'open' : ''

  return (
    <div className={'update-item ' + openClass}>
      <span className='title' onClick={toggle}>
        <span className="icon">{open ? '▾' : '▸'}</span>
        <span className="text"> {title}</span>
      </span>
      <ul className={openClass || undefined}>
        {data.map((item, idx) => (
          <li key={idx}>
            {/* <div className='date'>{item.changeDateOrdinal}</div> */}
            {item.description}
          </li>
        ))}
      </ul>
    </div>
  )
}


export default PublicationHighlights