import { ExternalLink } from '../../common/ExternalLink'
import NewIndicator from '../NewIndicator'

const figUpdates = {
  2021: '11/20/2020',
  2022: '10/20/2021',
}

export function FigLastUpdated({ year }) {
  if (!figUpdates[year]) return null
  return (
    <span className='last-updated'>( Last updated: {figUpdates[year]})</span>
  )
}

export function FilingGuides() {
  return (
    <article>
      <h3>Guides for HMDA Filers</h3>
      <p>
        Published resources to help guide financial institutions through the
        processes of submitting HMDA data.
      </p>
      <ul>
        <li>
          <a href='/documentation/faq/data-collection-timelines#filing-instructions-guide-fig'>
            Filing Instructions Guides (FIG)
          </a>
          <ul>
            <li>
              <a href='/documentation/fig/2025/overview'>2025 Online FIG</a>
            </li>
            <li>
              <a href='/documentation/fig/2026/overview'>2026 Online FIG</a>
              <NewIndicator />
            </li>
            <li>
              <a href='/documentation/fig/2025/supplemental-guide-for-quarterly-filers'>
                Online Supplemental Guide for Quarterly Filers for 2025
              </a>
            </li>
            <li>
              <ExternalLink url='https://www.ffiec.gov/hmda/fileformats.htm'>
                For data collected in or before 2016
              </ExternalLink>
            </li>
          </ul>
        </li>
        <li>
          <ExternalLink url='https://www.ffiec.gov/hmda/guide.htm'>
            A Guide to HMDA Reporting: Getting It Right
          </ExternalLink>
        </li>
        <li>
          <a
            href='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/HMDA-Loan-Scenarios.pdf'
            download
          >
            HMDA Loan Scenarios
          </a>
        </li>
        <li>
          <ExternalLink url='https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/hmda-reporting-requirements/'>
            HMDA Reporting Requirements
          </ExternalLink>
        </li>
      </ul>
    </article>
  )
}
