import { LATEST_FIG_YEAR } from '../../common/constants/years'
import { ExternalLink } from '../../common/ExternalLink'
import { ExpandableCard } from '../ExpandableCard'
import NewIndicator from '../NewIndicator'

const figUpdates = {
  2021: '11/20/2020',
  2022: '10/20/2021',
}

export const FigLastUpdated = ({ year }) => {
  if (!figUpdates[year]) return null
  return (
    <span className='last-updated'>( Last updated: {figUpdates[year]})</span>
  )
}

export const FilingGuides = () => (
  <article>
    <h3>Guides for HMDA Filers</h3>
    <p>Published resources to help guide financial institutions through the processes of submitting HMDA data.</p>
    <ul>
      <li>
        <a
          href={`/documentation/faq/data-collection-timelines#filing-instructions-guide-fig`}
        >
          Filing Instructions Guides (FIG)
        </a>
        <ul>
        <li>
            <a
              href={`/documentation/fig/2023/overview`}
            >
              For data collected in 2023
              <NewIndicator />
            </a>
          </li>
          <li>
            <a
              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${LATEST_FIG_YEAR}-hmda-fig.pdf`}
              download={true}
            >
              For data collected in {LATEST_FIG_YEAR}
              <NewIndicator />
              <FigLastUpdated year={LATEST_FIG_YEAR} />
            </a>
          </li>
          <li>
            <a
              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers-for-${LATEST_FIG_YEAR}.pdf`}
              download={true}
            >
              Supplemental Guide for Quarterly Filers for {LATEST_FIG_YEAR}
              <NewIndicator />
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
          download={true}
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
