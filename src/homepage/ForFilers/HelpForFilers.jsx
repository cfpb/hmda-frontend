import { CURRENT_YEAR } from '../../common/constants/years'
import { ExternalLink } from '../../common/ExternalLink'

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

export const HelpForFilers = () => {
  return (
    <header>
      <h3>Help for Filers</h3>
      <p>
        Published resources for financial institutions required to file Home
        Mortgage Disclosure Act (HMDA) data.
      </p>
      <ul>
        <li>
          <ExternalLink url='https://hmdahelp.consumerfinance.gov/knowledgebase/s/topic/0TOt0000000PFzGGAW/hmda-articles'>
            Answers to frequently asked HMDA Operations questions
          </ExternalLink>
        </li>
        <li>
          <a href='/documentation/faq/data-collection-timelines#filing-instructions-guide-fig'>
            Filing Instructions Guides
          </a>
        </li>
        <ul>
          <li>
            <a
              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${CURRENT_YEAR}-hmda-fig.pdf`}
              download={true}
            >
              For data collected in {CURRENT_YEAR}
              <FigLastUpdated year={CURRENT_YEAR} />
            </a>
          </li>
          <li>
            <a
              href='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers-for-2022.pdf'
              download={true}
            >
              Supplemental Guide for Quarterly Filers for {CURRENT_YEAR}
            </a>
          </li>
          <li>
            For data collected in or before 2016, please visit the{' '}
            <a href='https://www.ffiec.gov/hmda/fileformats.htm'>
              FFIEC Website
            </a>{' '}
            for data submission resources.
          </li>
        </ul>
        <li>
          <a href='https://www.ffiec.gov/hmda/guide.htm'>
            HMDA Reporting: Getting It Right Guide
          </a>
        </li>
        <li>
          <a
            href='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/HMDA-Loan-Scenarios.pdf'
            download={true}
          >
            HMDA Loan Scenarios Guide
          </a>
        </li>
      </ul>
    </header>
  )
}

const brokenLink = (
  <li>
    For answers to frequently asked HMDA regulatory questions, please visit the{' '}
    <a href='https://www.consumerfinance.gov/policy-compliance/guidance/hmda-implementation/'>
      CFPB&apos;s Regulatory Implementation Website
    </a>
    .
  </li>
)
