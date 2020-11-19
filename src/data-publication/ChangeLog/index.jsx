import React from 'react'
import { Link } from 'react-router-dom'
import LoadingIcon from '../../common/LoadingIcon'
import { DEFAULT_FILTERS, PUB_CHANGELOG_URL, FILTER_OPTIONS } from '../constants/publication-changes'
import defaultData from '../constants/publicationChangeLog.json'
import PublicationChangeLogTable from './ChangeLogTable'
import PublicationFilterBar from './FilterBar'
import { useChangeLogFilter } from './useChangeLogFilter'
import { useRemoteJSON } from '../../common/useRemoteJSON'
import { organizeChangeData } from './sortFunctions'
import './ChangeLog.css'

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

  if (loading) return <LoadingState heading={heading} />

  return (
    <PageWrapper>
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
      <a
        id='pub-whats-new'
        className='nav-anchor'
        role='note'
        href='#pub-whats-new'
        aria-hidden='true'
        tabIndex='-1'
      >
        invisible filter anchor
      </a>
      <div className='filter-wrapper'>
        <h2 className='filter header'>Filter the Change Log</h2>
        <PublicationFilterBar
          filter={filter}
          productOptions={FILTER_OPTIONS.PRODUCT}
          typeOptions={FILTER_OPTIONS.TYPE}
        />
        <PublicationChangeLogTable
          data={filter.apply(changeLog)}
          filter={filter}
        />
      </div>
    </PageWrapper>
  )
}

const LoadingState = ({ heading }) => (
  <PageWrapper>
    <h1>{heading}</h1>
    <LoadingIcon />
  </PageWrapper>
)

const PageWrapper = ({ children }) => (
  <div id='publication-changes' className='full-width'>
    {children}
  </div>
)

export default PublicationChanges
