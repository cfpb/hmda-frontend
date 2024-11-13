import React from 'react'
import { format, parse, isWithinInterval } from 'date-fns'
import Icon from '../../common/uswds/components/Icon'
import Tooltip from '../../common/Tooltip'
import './FilingPeriodsCard.css'

/**
 * A React component that displays current and upcoming filing periods for HMDA data submissions,
 * organized by year with both quarterly and annual filing windows.
 * 
 * @component
 * @param {Object} timedGuards - An object containing filing period information organized by year (comes from config)
 * @param {string} testDate - Optional ISO date string (YYYY-MM-DD) for testing different dates
 * 
 * @example
 * // timedGuards structure
 * const timedGuards = {
 *   2024: {
 *    Q1: '04/01/2024 - 05/30/2024 - 06/30/2024',
 *    Q2: '07/01/2024 - 08/29/2024 - 09/30/2024',
 *    Q3: '10/01/2024 - 11/29/2024 - 12/31/2024',
 *    annual: '01/01/2025 - 03/03/2025 - 12/31/2027',
 *  },
 * }
 * 
 * // Basic usage
 * <FilingPeriodsCard timedGuards={timedGuards} />
 * 
 * // With test date
 * <FilingPeriodsCard timedGuards={timedGuards} testDate="2024-04-01" />
 * 
 * @returns {JSX.Element} A card displaying filing periods grouped by year
 * 
 * @description
 * Features:
 * - Displays up to 5 filing periods (current + 4 future periods)
 * - Groups filing periods by year (quarterly and annual)
 * - Highlights active filing period
 * - Shows Filing Instructions Guide (FIG) links when available
 * - FIG becomes available in Fall of the previous year
 * 
 * @notes
 * - Annual filing periods belong to the next year's filing period
 * - Only shows periods that are either active or in the future
 */

// Determine viewport and make adjustments for the Tooltip position
const useViewport = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)
    handleWindowResize()
    
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return {
    tooltipPosition: windowWidth <= 1024 ? 'left' : 'top'
  }
}

const FilingPeriodsCard = ({ timedGuards, testDate }) => {
  const { tooltipPosition } = useViewport()

  const parseDate = (dateString) => {
    return parse(dateString.split(' ')[0], 'MM/dd/yyyy', new Date())
  }

  const formatDisplayDate = (dateString) => {
    const date = parseDate(dateString)
    return format(date, 'MMM dd, yyyy')
  }

  const isActivePeriod = (startDate, endDate) => {
    // Parse the test date to ensure consistent format
    const now = testDate
      ? parse(testDate, 'yyyy-MM-dd', new Date())
      : new Date()
    const start = parseDate(startDate)
    const end = parseDate(endDate)

    return isWithinInterval(now, { start, end })
  }

  const getCurrentAndFuturePeriods = () => {
    const periods = []
    const now = testDate
      ? parse(testDate, 'yyyy-MM-dd', new Date())
      : new Date()

    Object.entries(timedGuards)
      .sort(([yearA], [yearB]) => yearA.localeCompare(yearB))
      .forEach(([year, yearData]) => {
        // Handle Annual Filing - note that it belongs to the next year's filing period
        if (yearData.annual) {
          const [start, end] = yearData.annual.split(' - ')
          const startDate = parseDate(start)
          // Only add if the start date is in the future or if period is active
          if (startDate >= now || isActivePeriod(start, end)) {
            periods.push({
              type: 'ANNUAL',
              year: year,
              displayYear: (parseInt(year) + 1).toString(),
              startDate: start,
              endDate: end,
              displayPeriod: `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`,
            })
          }
        }

        // Handle Quarterly Filings
        ;['Q1', 'Q2', 'Q3'].forEach((quarter) => {
          if (yearData[quarter]) {
            const [start, end] = yearData[quarter].split(' - ')
            const startDate = parseDate(start)
            // Only add if the start date is in the future or if period is active
            if (startDate >= now || isActivePeriod(start, end)) {
              periods.push({
                type: 'QUARTERLY',
                year: year,
                displayYear: year,
                quarter: quarter,
                startDate: start,
                endDate: end,
                displayPeriod: `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`,
              })
            }
          }
        })
      })

    // Sort periods by start date
    periods.sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate))

    // Find the current active period
    const activePeriodIndex = periods.findIndex((period) =>
      isActivePeriod(period.startDate, period.endDate),
    )

    if (activePeriodIndex === -1) {
      // If no active period, just take the next 5 future periods
      return periods.slice(0, 5)
    }

    // Return the active period plus the next 4 periods
    return periods.slice(activePeriodIndex, activePeriodIndex + 5)
  }

  const organizeByYear = (periods) => {
    const yearGroups = {}

    periods.forEach((period) => {
      const groupYear = period.displayYear
      if (!yearGroups[groupYear]) {
        yearGroups[groupYear] = []
      }
      yearGroups[groupYear].push(period)
    })

    return Object.entries(yearGroups).sort(([yearA], [yearB]) =>
      yearA.localeCompare(yearB),
    )
  }

  // Following FIG gets released in August - 2026 FIG -> August 2025
  const isFIGAvailable = (figYear) => {
    const now = testDate
      ? parse(testDate, 'yyyy-MM-dd', new Date())
      : new Date()
    const figReleaseDate = new Date(parseInt(figYear) - 1, 7, 15) // August 15th of previous year (month is 0-based)

    return now >= figReleaseDate
  }

  const periods = getCurrentAndFuturePeriods()
  const yearGroups = organizeByYear(periods)

  return (
    <div className='filing-periods-card'>
      {yearGroups.map(([displayYear, yearPeriods], groupIndex) => (
        <div key={displayYear} className='year-section'>
          <h2 className='filing-periods-title'>{displayYear} Filing Periods</h2>
          {isFIGAvailable(displayYear) ? (
            <a
              href={`/documentation/fig/${displayYear}/overview`}
              className='filing-guide-link'
            >
              {displayYear} Filing Instructions Guide{' '}
              <span className='filing-periods-right-carrot'>▶</span>
            </a>
          ) : (
            <span className='filing-guide-link unavailable'>
              {displayYear} FIG will be available Fall{' '}
              {parseInt(displayYear) - 1}
            </span>
          )}

          <div className='periods-container'>
            {yearPeriods.map((period, periodIndex) => {
              const isActive = isActivePeriod(period.startDate, period.endDate)
              const isQuarterly = period.type === 'QUARTERLY'
              const showInfo = isActive && isQuarterly

              return (
                <React.Fragment
                  key={`${period.year}-${period.type}-${period.quarter || 'annual'}`}
                >
                  {periodIndex === 0 && <div className='period-divider' />}
                  <div className={`period-item ${isActive ? 'active' : ''}`}>
                    <span
                      className={`period-tag ${
                        period.type === 'ANNUAL'
                          ? 'annual'
                          : period.quarter.toLowerCase()
                      }`}
                    >
                      {period.type === 'ANNUAL'
                        ? `${period.year} ANNUAL`
                        : period.quarter}
                    </span>
                    <span className='period-date'>{period.displayPeriod}</span>
                    {showInfo && (
                      <div className='period-info'>
                        <span
                          data-tip
                          data-for={`period-info-${period.year}-${period.quarter}`}
                          className='info-icon-wrapper'
                        >
                          <Icon
                            iconName='info'
                            styleIcon={{
                              height: '20px',
                              width: '20px',
                              color: '#666666',
                            }}
                          />
                        </span>
                        <Tooltip
                          id={`period-info-${period.year}-${period.quarter}`}
                          place={tooltipPosition}
                          effect='solid'
                          delayHide={300}
                          clickable={true}
                          globalEventOff='click'
                        >
                          <div className='tooltip-content'>
                            <a
                              href='/documentation/faq/data-browser-graphs-faq#what-are-the-requirements-to-become-a-quarterly-filer'
                              className='tooltip-link'
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Learn more about quarterly filers
                            </a>
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                  {periodIndex < yearPeriods.length - 1 && (
                    <div className='period-divider' />
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {groupIndex < yearGroups.length - 1 && (
            <div className='year-section-divider' />
          )}
        </div>
      ))}
    </div>
  )
}

export default FilingPeriodsCard
