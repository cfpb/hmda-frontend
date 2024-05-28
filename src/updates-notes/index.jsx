import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoadingIcon from '../common/LoadingIcon'
import { DEFAULT_FILTERS, PUB_CHANGELOG_URL, FILTER_OPTIONS } from './constants'
import defaultData from './change-log-data.json'
import ChangeLogTable from './ChangeLogTable'
import FilterBar from './FilterBar'
import { useChangeLogFilter } from './useChangeLogFilter'
import { useRemoteJSON } from '../common/useRemoteJSON'
import { organizeChangeData } from './sortFunctions'
import './ChangeLog.scss'

/* Updates and Notes */
const UpdatesNotes = () => {
  const filter = useChangeLogFilter(DEFAULT_FILTERS)

  const [changeLog, loading] = useRemoteJSON(PUB_CHANGELOG_URL, {
    transformReceive: (data) => organizeChangeData(data),
    defaultData: organizeChangeData(defaultData),
  })

  const heading = 'HMDA Updates and Notes'

  if (loading) return <LoadingState heading={heading} />

  return (
    <PageWrapper>
      <header className='heading'>
        <div className='intro'>
          <h1>{heading}</h1>
          <p className='lead'>
            The HMDA data and reports are the most comprehensive publicly
            available information on mortgage market activity. This page
            includes all updates related to data products for the HMDA data
            collected in or after 2017. This includes header changes, data
            product differences over the years, and release notes.
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
      <h2>Change Log</h2>
      <div className='changeLog-wrapper'>
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
  <div id='UpdatesNotes' className='full-width'>
    {children}
  </div>
)

const PageRouter = () => {
  return (
    <Switch>
      <Route path='/updates-notes' component={UpdatesNotes} />
    </Switch>
  )
}

export default PageRouter
