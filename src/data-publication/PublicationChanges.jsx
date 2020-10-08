import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingIcon from '../common/LoadingIcon'
import defaultData from './constants/publication-changes.json'
import './PublicationChanges.css'

const HEADERS = {
  CHANGE: ['Completed', 'Date'],
  UPCOMING: ['Upcoming', 'Date'],
}

const PRODUCT_KEYS = ['mlar', 'datasets', 'aggregate', 'disclosure']

const OPEN_PRODUCT_UPDATES = PRODUCT_KEYS.reduce((acc, key) => {
  acc[key] = true // Open by default?
  return acc
}, {})

const PRODUCT_TITLES = {
  mlar: 'Modified LAR',
  datasets: 'National Loan Level Datasets',
  aggregate: 'Aggregate Reports',
  disclosure: 'Disclosure Reports',
}

const FILE_URL = 'https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/data-publication/constants/publication-changes.js'

const shouldFetch =
  window.location.host.indexOf('localhost') < 0 ||
  process.env.REACT_APP_ENVIRONMENT !== 'CI'

const PublicationChanges = () => {
  const [changes, setChanges] = useState(defaultData)
  const [loading, setLoading] = useState(false)
  const [openUpdates, setOpenUpdates] = useState(OPEN_PRODUCT_UPDATES)

  const toggleOpen = (key) => {
    setOpenUpdates((state) => ({ ...state, [key]: state[key] ? false : true }))
  }

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
        setChanges(result)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />

  return (
    <div id='publication-changes' className='full-width'>
      <div className='BackLink'><Link to='/data-publication/'>{'\u2b05'} Back to HMDA Data Publications</Link></div>
      <h1>Data Publication: Updates and Notes</h1>
      <p className='intro'>
        The HMDA data and reports are the most comprehensive publicly available
        information on mortgage market activity. This page includes all updates
        related to data products for the HDMA data collected in or after 2017.
        This includes header changes, data product differences over the years,
        release notes, and information on which product may be best for you.
      </p>
      <h2>What's New with Data Publication</h2>
      <div className='split'>
        <div className='updates'>
          <h3><span></span> Updates</h3>
          {PRODUCT_KEYS.map((key, idx) => (
            <UpdateItem
              key={`${key}-${idx}`}
              data={changes.updates[key]}
              title={PRODUCT_TITLES[key]}
              open={openUpdates[key]}
              toggle={() => toggleOpen(key)}
            />
          ))}
        </div>
        <div className='release-notes'>
          <h3><span></span> Release Notes</h3>
          <ChangeTable changes={changes.completed} headers={HEADERS.CHANGE} />
          <ChangeTable changes={changes.upcoming} headers={HEADERS.UPCOMING} />
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
        {changes.map(({ date, description }, idx) => (
          <tr key={`change-${idx}`}>
            <td className='description'>{description}</td>
            <td className='date'>{date}</td>
          </tr>
        ))}
        {!changes.length && (
          <tr key={`change-0`}>
            <td colSpan={headers.length}>None</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const UpdateItem = ({ data, title, open, toggle }) => {
  if (!data || !data.length) return null

  return (
    <div className='update-item'>
      <span onClick={toggle}>
        {open ? '▾' : '▸'} {title}
      </span>
      <ul className={open ? 'open' : undefined}>
        {data.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const LoadingState = () => (
  <div id='publication-changes' className='full-width'>
    <h1>Data Publication: Updates and Notes</h1>
    <LoadingIcon />
  </div>
)

export default PublicationChanges
