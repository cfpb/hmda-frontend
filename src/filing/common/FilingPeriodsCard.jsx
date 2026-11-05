import { format, parse } from 'date-fns'
import Icon from '../../common/uswds/components/Icon'
import './FilingPeriodsCard.css'

const QUARTERS = ['Q1', 'Q2', 'Q3']

const formatDate = (dateString) =>
  format(parse(dateString.trim(), 'MM/dd/yyyy', new Date()), 'MMM dd, yyyy')

const formatPeriod = (periodString) => {
  const [start, end] = periodString.split(' - ')
  return `${formatDate(start)} - ${formatDate(end)}`
}

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

function FilingPeriodsCard({ timedGuards }) {
  const currentYear = '2025'
  const nextYear = (parseInt(currentYear) + 1).toString()

  const currentYearData = timedGuards[currentYear]
  const nextYearData = timedGuards[nextYear]

  return (
    <section className='filing-periods-card usa-card'>
      <div className='usa-card__container'>
        <header className='usa-card__header'>
          <h2 className='usa-card__heading'>Filing resources</h2>
        </header>
        <div className='usa-card__body'>
          <p>Key dates, instructions, and updates.</p>

          <ul className='filing-resource-list'>
            <li className='filing-resource'>
              <span className='filing-resource-icon'>
                <Icon
                  iconName='calendar_today'
                  styleIcon={{ height: '24px', width: '24px' }}
                />
              </span>
              <div>
                <h3>
                  Annual filing
                  <span className='filing-resource-badge'>
                    {currentYear} DATA
                  </span>
                </h3>
                <p>{formatPeriod(currentYearData.annual)}</p>
                <a href={`/documentation/fig/${currentYear}/overview`}>
                  {currentYear} Filing Instructions Guide
                </a>
              </div>
            </li>

            <li className='filing-resource'>
              <span className='filing-resource-icon'>
                <Icon
                  iconName='calendar_today'
                  styleIcon={{ height: '24px', width: '24px' }}
                />
              </span>
              <div>
                <h3>
                  Quarterly filing
                  <span className='filing-resource-badge'>{nextYear} DATA</span>
                </h3>
                {QUARTERS.map((quarter) => (
                  <p key={quarter}>
                    {quarter}: {formatPeriod(nextYearData[quarter])}
                  </p>
                ))}
                <a href={`/documentation/fig/${nextYear}/overview`}>
                  {nextYear} Filing Instructions Guide
                </a>
                <a href='/documentation/faq/data-browser-graphs-faq#what-are-the-requirements-to-become-a-quarterly-filer'>
                  Quarterly filing eligibility
                </a>
              </div>
            </li>

            <li className='filing-resource'>
              <span className='filing-resource-icon'>
                <Icon
                  iconName='campaign'
                  styleIcon={{ height: '24px', width: '24px' }}
                />
              </span>
              <div>
                <h3>News and updates</h3>
                <p>
                  View the latest{' '}
                  <a href='/updates-notes'>HMDA Platform announcements</a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FilingPeriodsCard
