import React, { useEffect, useState } from 'react'
import LoadingIcon from '../common/LoadingIcon'
import defaultData from './constants/publication-changes.json'
import './PublicationChanges.css'

const HEADERS = {
  CHANGE: ['Completed', 'Date'],
  UPCOMING: ['Upcoming', 'Date'],
}

const PRODUCT_KEYS = ['mlar', 'datasets', 'aggregate', 'disclosure']

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
  const [openUpdates, setOpenUpdates] = useState({})

  const toggleOpen = (key) => {
    setOpenUpdates((state) => ({ ...state, [key]: state[key] ? false : true }))
  }

  useEffect(() => {
    if (!shouldFetch) return

    setLoading(true)

    fetch(FILE_URL)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('Failed to fetch')
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
    <div id='publication-changes' class='full-width'>
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
          {PRODUCT_KEYS.map((key) => (
            <UpdateItem
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
  if (!changes.length) return null

  return (
    <table className='change-table'>
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {changes.map(({ date, description }) => (
          <tr>
            <td className='description'>{description}</td>
            <td className='date'>{date}</td>
          </tr>
        ))}
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
        {data.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const LoadingState = () => (
  <div id='publication-changes' class='full-width'>
    <h1>Data Publication: Updates and Notes</h1>
    <LoadingIcon />
  </div>
)

export default PublicationChanges
