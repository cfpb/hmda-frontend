import React, { useState } from 'react'
import { format, parse } from 'date-fns'
import Icon from '../../common/uswds/components/Icon'
import './FilingPeriodsCard.css'

/**
 * Component that displays HMDA filing periods, showing both annual and quarterly filing windows.
 * Annual section shows current year's data (filed next year), while quarterly section shows next year's filing periods.
 *
 * @component
 * @param {Object} props.timedGuards - Filing period information by year
 *
 * @example
 * const timedGuards = {
 *   2024: {
 *     annual: "01/01/2025 - 03/03/2025 - 12/31/2027"  // For 2024 data filed in 2025
 *   },
 *   2025: {
 *     Q1: "04/01/2025 - 05/30/2025 - 06/30/2025",
 *     Q2: "07/01/2025 - 08/29/2025 - 09/30/2025",
 *     Q3: "10/01/2025 - 11/29/2025 - 12/31/2025"
 *   }
 * }
 *
 * @maintenance
 * Every December, update the component to reference next year's timedGuards:
 * - Change currentYear (2024) to 2025
 * - Update FileGuideLink year props accordingly
 */

const FilingPeriodsCard = ({ timedGuards }) => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false)

  const currentYear = '2024'
  const nextYear = (parseInt(currentYear) + 1).toString()

  const formatDate = (dateString) => {
    const date = parse(dateString.trim(), 'MM/dd/yyyy', new Date())
    return format(date, 'MMM dd, yyyy')
  }

  const getFormattedPeriod = (periodString) => {
    const [startDate, endDate] = periodString.split(' - ')
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  // Get both years' data
  const currentYearData = timedGuards[currentYear]
  const nextYearData = timedGuards[nextYear]

  // Parse quarterly and annual data
  const periods = {
    annual: {
      period: getFormattedPeriod(currentYearData.annual),
    },
    quarterly: [
      {
        quarter: 'Q1',
        period: getFormattedPeriod(nextYearData.Q1),
      },
      {
        quarter: 'Q2',
        period: getFormattedPeriod(nextYearData.Q2),
      },
      {
        quarter: 'Q3',
        period: getFormattedPeriod(nextYearData.Q3),
      },
    ],
  }

  // Helper component for file guide links
  const FileGuideLink = ({ year, type }) => (
    <a
      href={`/documentation/fig/${year}/overview`}
      className={`filing-guide-link-${type}`}
    >
      {year} Filing Instructions Guide{' '}
      <span className='filing-periods-right-carrot'>▶</span>
    </a>
  )

  return (
    <div className='filing-periods-card'>
      {/* Annual Section */}
      <div className='year-section'>
        <h2 className='filing-periods-title annual-title'>
          Annual Filing Period
        </h2>
        <FileGuideLink year={currentYear} type='year' />
        <div className='period-wrapper'>
          <div className='period-item'>
            <span className='period-tag annual'>{currentYear} Data</span>
            <span className='period-date-annual'>{periods.annual.period}</span>
          </div>
        </div>
      </div>

      {/* Quarterly Section */}
      <div className='year-section'>
        <h2 className='quarterly-title'>Quarterly Filing Periods*</h2>
        <FileGuideLink year={nextYear} type='quarter' />
        <div className='period-wrapper'>
          {periods.quarterly.map((quarter) => (
            <div key={quarter.quarter} className='period-item'>
              <span className='period-tag quarter'>{quarter.quarter} Data</span>
              <span className='period-date-quarter'>{quarter.period}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly Filer Info Section */}
      <div className='quarterly-filer-info'>
        <div
          onClick={() => setIsInfoExpanded(!isInfoExpanded)}
          className='quarterly-filer-toggle'
        >
          *Who is a Quarterly Filer?
          <Icon
            iconName={isInfoExpanded ? 'expand_less' : 'expand_more'}
            styleIcon={{
              height: '16px',
              width: '16px',
              marginLeft: '8px',
            }}
          />
        </div>

        {isInfoExpanded && (
          <div className='quarterly-filer-content'>
            <p>
              A financial institution is required to report quarterly HMDA data
              if it reported a combined total of at least 60,000 applications
              and covered loans, excluding purchased covered loans, for the
              preceding calendar year.
            </p>
            <a
              href='/documentation/faq/data-browser-graphs-faq#what-are-the-requirements-to-become-a-quarterly-filer'
              className='quarterly-filer-link'
            >
              Learn more about quarterly filers →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilingPeriodsCard
