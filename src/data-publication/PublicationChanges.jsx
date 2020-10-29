import React from 'react'
import { Link } from 'react-router-dom'
import LoadingIcon from '../common/LoadingIcon'
import { ordinal } from '../filing/utils/date'
import { CATEGORIES, DEFAULT_FILTERS, PRODUCTS, PUB_CHANGELOG_URL } from './constants/publication-changes'
import defaultData from './constants/publicationChangeLog.json'
import PublicationChangeLogTable from './PublicationChangeLogTable'
import PublicationFilterBar from './PublicationFilterBar'
import PublicationHighlights from './PublicationHighlights'
import { useChangeLogFilter } from './useChangeLogFilter'
import { useRemoteJSON } from '../common/useRemoteJSON'
import './PublicationChanges.css'

/** 
 * Publications: Updates and Notes
 * (default export)
 * */
const PublicationChanges = () => {
  const filter = useChangeLogFilter(DEFAULT_FILTERS)

  const [changeLog, loading] = useRemoteJSON(PUB_CHANGELOG_URL, {
    beforeUpdate: (data) => organizeChangeData(data),
    defaultContent: organizeChangeData(defaultData),
    msgReject: 'Unable to fetch remote Publication Change Log!',
  })
  
  const heading = 'Data Publication: Updates and Notes'

  const productOptions = PRODUCTS.map((product) => ({
    value: product,
    type: 'product',
  }))

  const typeOptions = Object.keys(CATEGORIES).map((type) => ({
    value: type,
    type: 'type',
  }))

  if (loading) return <LoadingState heading={heading} />

  return (
    <div id='publication-changes' className='full-width'>
      <div className='BackLink'>
        <Link to='/data-publication/'>
          {'\u2b05'} Back to HMDA Data Publications
        </Link>
      </div>
      <h1>{heading}</h1>
      <p className='intro'>
        The HMDA data and reports are the most comprehensive publicly available
        information on mortgage market activity. This page includes all updates
        related to data products for the HDMA data collected in or after 2017.
        This includes header changes, data product differences over the years,
        release notes, and information on which product may be best for you.
      </p>
      <PublicationHighlights data={changeLog} />
      <a
        id='pub-whats-new'
        role='note'
        href='#pub-whats-new'
        aria-hidden='true'
      >
        invisible filter anchor
      </a>
      <div className='pub-change-log'>
        <h2 className='filter header'>Filter the Change Log</h2>
        <PublicationFilterBar
          filter={filter}
          productOptions={productOptions}
          typeOptions={typeOptions}
        />
        <PublicationChangeLogTable
          data={filter.apply(changeLog)}
          filter={filter}
        />
      </div>
    </div>
  )
}


/** Sort by Change Type */
const byChangeType = (a, b) => {
  if (!a.type || !b.type || CATEGORIES[a.type] > CATEGORIES[b.type]) return 0
  if (CATEGORIES[a.type].order > CATEGORIES[b.type].order) return 1
  if (CATEGORIES[a.type].order < CATEGORIES[b.type].order) return -1
  return -1
}


/** Groups and sorts data by changeDate */
export const organizeChangeData = (input) => {
  const data = input && input.log ? input.log : {}
  const result = {}

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


/** Loading Spinner */
const LoadingState = ({ heading }) => (
  <div id='publication-changes' className='full-width'>
    <h1>{heading}</h1>
    <LoadingIcon />
  </div>
)

export default PublicationChanges
