import React from 'react'
import { format, parse, isWithinInterval } from 'date-fns'
import './FilingPeriodsCard.css'

const FilingPeriodsCard = ({ timedGuards }) => {
  const parseDate = (dateString) => {
    return parse(dateString.split(' ')[0], 'MM/dd/yyyy', new Date())
  }

  const formatDisplayDate = (dateString) => {
    const date = parseDate(dateString)
    return format(date, 'MMM dd, yyyy')
  }

  const isActivePeriod = (startDate, endDate) => {
    const now = new Date()
    const start = parseDate(startDate)
    const end = parseDate(endDate)

    return isWithinInterval(now, { start, end })
  }

  const getCurrentAndFuturePeriods = () => {
    const periods = []

    Object.entries(timedGuards)
      .sort(([yearA], [yearB]) => yearA.localeCompare(yearB))
      .forEach(([year, yearData]) => {
        // Handle Annual Filing - note that it belongs to the next year's filing period
        if (yearData.annual) {
          const [start, end] = yearData.annual.split(' - ')
          periods.push({
            type: 'ANNUAL',
            year: year, // This is the data year
            displayYear: (parseInt(year) + 1).toString(), // This is the filing period year
            startDate: start,
            endDate: end,
            displayPeriod: `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`,
          })
        }

        // Handle Quarterly Filings
        ;['Q1', 'Q2', 'Q3'].forEach((quarter) => {
          if (yearData[quarter]) {
            const [start, end] = yearData[quarter].split(' - ')
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

  const periods = getCurrentAndFuturePeriods()
  const yearGroups = organizeByYear(periods)

  return (
    <div className='filing-periods-card'>
      {yearGroups.map(([displayYear, yearPeriods], groupIndex) => (
        <div key={displayYear} className='year-section'>
          <h2 className='filing-periods-title'>{displayYear} Filing Periods</h2>
          <a
            href={`/documentation/fig/${displayYear}/overview`}
            className='filing-guide-link'
          >
            {displayYear} Filing Instructions Guide{' '}
            <span className='filing-periods-right-carrot'>▶</span>
          </a>

          <div className='periods-container'>
            {yearPeriods.map((period, periodIndex) => (
              <React.Fragment
                key={`${period.year}-${period.type}-${period.quarter || 'annual'}`}
              >
                {periodIndex === 0 && <div className='period-divider' />}
                <div
                  className={`period-item ${
                    isActivePeriod(period.startDate, period.endDate)
                      ? 'active'
                      : ''
                  }`}
                >
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
                </div>
                {periodIndex < yearPeriods.length - 1 && (
                  <div className='period-divider' />
                )}
              </React.Fragment>
            ))}
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
