import React from 'react'
import Heading from '../../common/Heading.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import ProgressCard from './ProgressCard.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import { NATIONAL_AGGREGATE_REPORTS } from '../constants/national-aggregate-reports.js'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { withYearValidation } from '../../common/withYearValidation.jsx'

import './NationalAggregate.css'

const detailsCache = {
  reports: {},
}

NATIONAL_AGGREGATE_REPORTS.forEach((v) => {
  if (v.value) {
    detailsCache.reports[v.value] = v
  }

  if (v.options) {
    v.options.forEach((option) => {
      detailsCache.reports[option.value] = option
    })
  }
})

const NationalAggregate = (props) => {
  const { match, config } = props
  const { params, url } = match
  const report = detailsCache.reports[params.reportId]
  const { national, shared } = config.dataPublicationYears
  const years = national || shared

  return (
    <React.Fragment>
      <div className='NationalAggregate' id='main-content'>
        <Heading
          type={1}
          headingText='National Aggregate Reports'
          paragraphText='These reports summarize nationwide lending activity.
          They indicate the number and dollar amounts of loan applications,
          cross-tabulated by loan, borrower and geographic characteristics.'
        >
          <p>
            To learn about modifications to these reports over the years, visit
            the{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`/documentation/publications/ad-changes`}
            >
              A&D Report Changes
            </a>{' '}
            page.
            <br />
            Looking for other HMDA data? Visit the new{' '}
            <a target='_blank' rel='noopener noreferrer' href='/data-browser/'>
              HMDA Data Browser
            </a>{' '}
            to filter and download HMDA datasets.
          </p>
        </Heading>
        <ol className='ProgressCards'>
          <li>
            <ProgressCard
              title='year'
              name={params.year ? params.year : 'Select a year'}
              id=''
              link={'/data-publication/national-aggregate-reports/'}
            />
          </li>
          <li>
            <ProgressCard
              title='report'
              name={
                params.reportId
                  ? report.label
                  : params.year
                    ? 'Select a report'
                    : ''
              }
              id={params.reportId ? report.value : ''}
              link={
                params.year
                  ? `/data-publication/national-aggregate-reports/${params.year}`
                  : null
              }
            />
          </li>
        </ol>
        <hr />
        {params.year ? (
          params.year !== '2017' ? (
            <h3>
              National Aggregate reports are not produced for data collected in
              or after 2018.
            </h3>
          ) : params.reportId ? null : (
            <Reports {...props} />
          )
        ) : (
          <YearSelector url={url} years={years} />
        )}
      </div>

      {params.reportId && params.year === '2017' ? <Report {...props} /> : null}
    </React.Fragment>
  )
}

export default withAppContext(withYearValidation(NationalAggregate))
