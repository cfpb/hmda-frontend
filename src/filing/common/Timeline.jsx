import React from 'react'
import Heading from '../../common/Heading'
import { useEnvironmentConfig } from '../../common/useEnvironmentConfig'
import { format, parse } from 'date-fns'
import './Timeline.css'

const Timeline = () => {
  const config = useEnvironmentConfig(window.location.hostname)
  const filingPeriods = config.timedGuards

  const currentYear = new Date().getFullYear()

  const formatDate = (dateString) => {
    const date = parse(dateString, 'MM/dd/yyyy', new Date())
    return format(date, 'MMM dd, yyyy')
  }

  const renderTimelineCard = (year, periods, index) => {
    if (!periods.annual) return null

    const [annualPeriodStart, annualPeriodEnd, annualResubmissionEnd] =
      periods.annual.split(' - ')
    const endYear = new Date(annualResubmissionEnd).getFullYear()
    if (endYear < currentYear) return null

    const isLeft = index % 2 !== 0
    const cardClassName = `timeline-card ${isLeft ? 'left' : 'right'}`
    const contentClassName = `card-content ${isLeft ? 'align-right' : 'align-left'}`

    console.log(index + 1, cardClassName)

    return (
      <div key={year} className={cardClassName}>
        <div className={contentClassName}>
          <div className='annual-section'>
            <div className='annual-tag'>ANNUAL</div>
            <p className='date-range'>
              {formatDate(annualPeriodStart)} - {formatDate(annualPeriodEnd)}
            </p>
            <h2>{year} Filing</h2>
            <a
              href={`/documentation/fig/${year}/overview`}
              target='_blank'
              className='read-fig'
            >
              Read {year} FIG ▸
            </a>
          </div>
          <div className='quarterly-section'>
            {['Q1', 'Q2', 'Q3'].map((quarter) => {
              if (!periods[quarter]) return null
              const [start, end] = periods[quarter].split(' - ')
              return (
                <div
                  key={quarter}
                  className={`quarter-item ${quarter.toLowerCase()}`}
                >
                  <div className='quarter-tag'>{quarter}</div>
                  <p>
                    {formatDate(start)} - {formatDate(end)}
                  </p>
                </div>
              )
            })}
            <div className='quarter-item ends'>
              <div className='quarter-tag'>ENDS</div>
              <p>{formatDate(annualResubmissionEnd)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTimeline = () => {
    return Object.entries(filingPeriods)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([year, periods], index) => renderTimelineCard(year, periods, index))
      .filter(Boolean)
  }

  return (
    <div className='home'>
      <div className='full-width'>
        <h1 className='timeline-title'>HMDA Filing Timeline</h1>
        {/* <Heading type={1} headingText='HMDA Filing Timeline' /> */}
        <p className='font-lead'>
          The following timeline represents the active filing seasons. Visit{' '}
          <a href='documentation/faq/data-collection-timelines'>
            HMDA Data Collection Timelines
          </a>{' '}
          to learn more about late quarterly filing submission dates.
        </p>
      </div>
      <div className='timeline'>
        <div className='timeline-line'></div>
        {renderTimeline()}
      </div>
    </div>
  )
}

export default Timeline
