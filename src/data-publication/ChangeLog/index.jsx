import React from 'react'
import { Link } from 'react-router-dom'
import LoadingIcon from '../../common/LoadingIcon'
import { DEFAULT_FILTERS, PUB_CHANGELOG_URL, FILTER_OPTIONS } from './constants'
import defaultData from './change-log-data.json'
import ChangeLogTable from './ChangeLogTable'
import FilterBar from './FilterBar'
import { useChangeLogFilter } from './useChangeLogFilter'
import { useRemoteJSON } from '../../common/useRemoteJSON'
import { organizeChangeData } from './sortFunctions'
import './ChangeLog.css'

/** 
 * Publications: Updates and Notes
 * (default export)
 * */
const ChangeLog = () => {
  const filter = useChangeLogFilter(DEFAULT_FILTERS)

  const [changeLog, loading] = useRemoteJSON(PUB_CHANGELOG_URL, {
    transformReceive: (data) => organizeChangeData(data),
    defaultData: organizeChangeData(defaultData),
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
      <header className="heading">
      <div className='intro'>
        <h1>{heading}</h1>
        <p className='lead'>
          The HMDA data and reports are the most comprehensive publicly
          available information on mortgage market activity. This page includes
          all updates related to data products for the HDMA data collected in or
          after 2017. This includes header changes, data product differences
          over the years, release notes, and information on which product may be
          best for you.
        </p>
      </div>
      </header>
      <a
        id='focus-on-filter-bar'
        className='nav-anchor'
        role='note'
        href='#focus-on-filter-bar'
        aria-hidden='true'
        tabIndex='-1'
      >
        invisible filter anchor
      </a>
      <div className='filter-wrapper'>
        <h2 className='filter header'>Filter the Change Log</h2>
        <FilterBar
          filter={filter}
          productOptions={FILTER_OPTIONS.PRODUCT}
          typeOptions={FILTER_OPTIONS.TYPE}
        />
        <ChangeLogTable
          data={filter.apply(changeLog)}
          filter={filter}
          changeLog={changeLog}
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
  <div id='ChangeLog' className='full-width'>
    {children}
  </div>
)

export default ChangeLog
