import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingIcon from '../common/LoadingIcon'
import { ordinal } from '../filing/utils/date'
import defaultData from './constants/publication-changes.json'
import './PublicationChanges.css'

// const HEADERS = {
//   CHANGE: ['Completed', 'Date'],
//   UPCOMING: ['Upcoming', 'Date'],
// }

const PRODUCTS = ['mlar', 'datasets', 'aggregate', 'disclosure']

const PRODUCT_NAMES = {
  mlar: 'Modified LAR',
  datasets: 'Datasets',
  aggregate: 'Aggregate Reports',
  disclosure: 'Disclosure Reports',
}

const CATEGORIES = {
  correction: { order: 1 },
  update: { order: 2 },
  release: { order: 3 },
  notice: { order: 4 },
}

// const OPEN_PRODUCT_UPDATES = PRODUCTS.reduce((acc, key) => {
//   acc[key] = true // Open by default?
//   return acc
// }, {})

// const PRODUCT_TITLES = {
//   mlar: 'Modified LAR',
//   datasets: 'National Loan Level Datasets',
//   aggregate: 'Aggregate Reports',
//   disclosure: 'Disclosure Reports',
// }

const FILE_URL =
  'https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/data-publication/constants/publication-changes.json'

const shouldFetch =
  window.location.host.indexOf('localhost') < 0 ||
  process.env.REACT_APP_ENVIRONMENT !== 'CI'

const PublicationChanges = () => {
  const [changes, setChanges] = useState(organizeChangeData(defaultData))
  const [loading, setLoading] = useState(false)
  // const [openUpdates, setOpenUpdates] = useState(OPEN_PRODUCT_UPDATES)
  const [filters, setFilters] = useState({
    type: [],
    product: [],
    keywords: '',
  })

  const addFilter = (key, value) => {
    console.log('Add filter: ', { key, value })
    if (key === 'keywords') setFilters((state) => ({ ...state, [key]: value }))
    else setFilters((state) => ({ ...state, [key]: [...state[key], value] }))
  }

  const removeFilter = (key, value) => {
    console.log('Remove filter: ', { key, value })
    if (key === 'keywords') setFilters((state) => ({ ...state, [key]: value }))
    else
      setFilters((state) => ({
        ...state,
        [key]: [...state[key].filter((val) => val !== value)],
      }))
  }

  const clearFilters = () => setFilters({ type: [], product: [], keywords: '' })

  const toggleFilter = (key, value) => {
    console.log('Toggle filter: ', { key, value })
    if (filters[key].indexOf(value) > -1) return removeFilter(key, value)
    addFilter(key, value)
  }

  // const toggleOpen = (key) => {
  //   setOpenUpdates((state) => ({ ...state, [key]: state[key] ? false : true }))
  // }

  useEffect(() => {
    if (!shouldFetch) return

    // TODO
    // Check if file exists
    // If not, return
    // If so, setLoading(true)
    //        fetch(FILE_URL).then(() => setLoading(false))
    //
    fetch(FILE_URL)
      .then((response) => {
        setLoading(true)
        if (response.ok) {
          return response.json()
        } else {
          setLoading(false)
          return Promise.reject('Unable to fetch remote publication notes!')
        }
      })
      .then((result) => {
        setChanges(organizeChangeData(result))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />

  return (
    <div id='publication-changes' className='full-width'>
      <div className='BackLink'>
        <Link to='/data-publication/'>
          {'\u2b05'} Back to HMDA Data Publications
        </Link>
      </div>
      <h1>Data Publication: Updates and Notes</h1>
      <p className='intro'>
        The HMDA data and reports are the most comprehensive publicly available
        information on mortgage market activity. This page includes all updates
        related to data products for the HDMA data collected in or after 2017.
        This includes header changes, data product differences over the years,
        release notes, and information on which product may be best for you.
      </p>
      <a id='#pub-whats-new' />
      {/* <h2>Publications Change Log</h2> */}
      <PubChangeLog
        data={applyFilters(changes, filters)}
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
        clearFilters={clearFilters}
        toggleFilter={toggleFilter}
      />
    </div>
  )
}

const LoadingState = () => (
  <div id='publication-changes' className='full-width'>
    <h1>Data Publication: Updates and Notes</h1>
    <LoadingIcon />
  </div>
)

const PubChangeLog = ({
  data = {},
  filters,
  addFilter,
  removeFilter,
  clearFilters,
  toggleFilter,
}) => {
  const keys = Object.keys(data)

  return (
    <div className='pub-change-log'>
      <h3 className='filter header'>Filter Change Log</h3>
      <FilterBar
        productOptions={[
          ...PRODUCTS.map((product) => ({ value: product, type: 'product' })),
        ]}
        typeOptions={[
          ...Object.keys(CATEGORIES).map((type) => ({
            value: type,
            type: 'type',
          })),
        ]}
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
        clearFilters={clearFilters}
        toggleFilter={toggleFilter}
      />
      <h3 className='filter header'>Publication Change Log</h3>
      <div className='pub-change-item split'>
        <h4 class='date header'>Change Date</h4>
        <h4 class='header column-type'>Change Type</h4>
        <h4 class='product header'>Product</h4>
        <h4 class='description header'>Change Description</h4>
      </div>
      {keys.every((key) => !data[key].length) && (
        <div className='empty-state'>
          ⚠️ No matches found.
          <div>
            <span className='reset-filters' onClick={() => clearFilters()}>
              Reset Filters
            </span>
          </div>
        </div>
      )}
      {keys.map((key) => {
        const todaysItems = data[key]
        if (!todaysItems || !todaysItems.length) return null
        console.log("Today's Items: ", todaysItems)

        return (
          <div className='pub-change-day'>
            {todaysItems.map((item, idx) => {
              console.log('Item: ', item)
              return (
                <div className='pub-change-item split'>
                  <div className='date'>
                    <span class='icon'>📆</span>
                    {item.changeDateOrdinal}
                  </div>
                  <div class='column-type'>
                    <div
                      className={`pill type ${item.type}`}
                      onClick={() => toggleFilter('type', item.type)}
                    >
                      <div className='text'>{item.type}</div>
                    </div>
                  </div>
                  <div
                    className={`product ${item.product} ${
                      filters['product'].indexOf(item.product) > -1
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => toggleFilter('product', item.product)}
                  >
                    {PRODUCT_NAMES[item.product]}
                  </div>
                  <div className={`description`}>{item.description}</div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// Groups data by changeDate
export const organizeChangeData = (input) => {
  const data = input && input.log ? input.log : {}
  const result = {}

  // Group by date
  // results['02/01/2020'] => [
  //   {
  //     "date": "03/02/22",
  //     "changeDate": "02/01/21",
  //     "type": "update",
  //     "product": "disclosure",
  //     "productYear": "2019",
  //     "description": "Disclosure reports are coming soon!",
  //     "tags": ["tag-one"]
  //   },
  // ...
  // ]
  data.forEach((item) => {
    if (!item || !item.changeDate) return
    if (!item.changeDateOrdinal)
      item.changeDateOrdinal = ordinal(new Date(item.changeDate || 0))
    if (!result[item.changeDate]) result[item.changeDate] = []
    result[item.changeDate].push({ ...item })
  })

  Object.keys(result).forEach((date) => {
    result[date] = result[date].sort(byChangeType)
  })

  return result
}

const byChangeType = (a, b) => {
  if (!a.type || !b.type || CATEGORIES[a.type] > CATEGORIES[b.type]) return 0
  if (CATEGORIES[a.type].order > CATEGORIES[b.type].order) return 1
  if (CATEGORIES[a.type].order < CATEGORIES[b.type].order) return -1
  return -1
}

const applyFilters = (sourceData = {}, filterLists = {}) => {
  let result = { ...JSON.parse(JSON.stringify(sourceData)) }

  Object.keys(result).forEach((date) => {
    // Array of Changes on this date
    if (result[date] && result[date].length) {
      // Type filter
      if (filterLists.type && filterLists.type.length > 0) {
        console.log('Applying Type filter')
        result[date] = result[date].filter(
          (item) => filterLists.type.indexOf(item.type) > -1
        )
      }

      // Product filter
      if (filterLists.product && filterLists.product.length > 0) {
        console.log('Applying Product filter')

        result[date] = result[date].filter(
          (item) => filterLists.product.indexOf(item.product) > -1
        )
      }

      // Keyword filter
      // TODO: Offer case sensitive option?
      if (filterLists.keywords && filterLists.keywords.length > 0) {
        console.log('Applying Keyword filter')

        const words = filterLists.keywords
          .split(' ')
          .filter((wrd) => wrd)
          .map((wrd) => wrd.toLowerCase())
        console.log('Words: ', words)
        console.log('result: ', result)
        console.log('result[date]: ', result[date])
        result[date] = result[date].filter(
          (item) =>
            words.indexOf(item.type.toLowerCase()) > -1 || // Matches on type
            words.some((word) => item.type.toLowerCase().indexOf(word) > -1) || // Matches part of type
            words.indexOf(item.product.toLowerCase()) > -1 || // Matches a product
            words.some(
              (word) => item.product.toLowerCase().indexOf(word) > -1
            ) || // Matches part of product
            words.some(
              (word) =>
                item.description.toLowerCase().indexOf(word.toLowerCase()) > -1
            ) // Matches one of the description words
        )
      }
    }
  })

  return result
}

const FilterBar = ({
  productOptions,
  typeOptions,
  filters,
  addFilter,
  removeFilter,
  clearFilters,
  toggleFilter,
}) => {
  return (
    <div className='filter-bar'>
      <div className='filter-wrapper split'>
        <div className='pills-wrapper type'>
          <h4>by Change Type</h4>
          <div className='pills split columns'>
            {console.log('typeOptions: ', typeOptions)}
            {typeOptions &&
              typeOptions.map((option, idx) => (
                <OptionPill
                  key={`${option.type}-${idx}`}
                  type={option.type}
                  value={option.value}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                  selected={
                    filters[option.type].indexOf(option.value) > -1
                      ? 'selected'
                      : ''
                  }
                  toggleFilter={toggleFilter}
                />
              ))}
          </div>
        </div>
        <div className='pills-wrapper product'>
          <h4>by Product</h4>
          <div className='pills split columns'>
            {productOptions.map((option, idx) => (
              <OptionPill
                key={`${option.type}-${idx}`}
                type={option.type}
                value={option.value}
                addFilter={addFilter}
                removeFilter={removeFilter}
                selected={
                  filters[option.type].indexOf(option.value) > -1
                    ? 'selected'
                    : ''
                }
                toggleFilter={toggleFilter}
              />
            ))}
          </div>
        </div>
        <div className='search-wrapper'>
          <h4>by Keyword</h4>
          <div className='text-input'>
            <input
              type='text'
              value={filters.keywords}
              onChange={(e) => addFilter('keywords', e.target.value)}
            ></input>
            <span className='reset-filters' onClick={() => clearFilters()}>
              Reset Filters
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const OptionPill = ({
  type,
  value,
  addFilter,
  removeFilter,
  selected,
  toggleFilter,
}) => {
  const id = `pill-${type}-${value}`
  const map = type === 'product' ? PRODUCT_NAMES : null
  const mappedVal = map ? map[value] : value
  const [wasClicked, setWasClicked] = useState(false)

  useEffect(() => {
    if (wasClicked) {
      document.getElementById('#pub-whats-new').scrollIntoView()
      setWasClicked(false)
    }
  }, [wasClicked])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      id={id}
      className={`pill ${type} ${value} ${selected}`}
      onClick={() => {
        toggleFilter(type, value)
        setWasClicked(!wasClicked)
      }}
    >
      <div className='text'>
        {/* {type}
        <br/> */}
        {mappedVal}
      </div>
      {/* <span className='close' onClick={() => removeFilter(type, value)}>x</span> */}
    </div>
  )
}

export default PublicationChanges
