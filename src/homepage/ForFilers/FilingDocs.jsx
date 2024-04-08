import { ExternalLink } from '../../common/ExternalLink'
import NewIndicator from '../NewIndicator'

export const FilingDocs = ({ hideContent }) => (
  <article>
    <h3>Filing Documentation</h3>
    <p>Answers to common questions about the process of filing HMDA data.</p>
    <ul>
      <li>
        <a href='/documentation/faq/filing-faq'>HMDA Filing FAQ</a>
      </li>
      <li>
        <a href='/documentation/faq/identifiers-faq'>
          HMDA Institution Identifiers FAQ
        </a>
      </li>
      <li>
        <a href='/documentation/faq/data-collection-timelines#annual-filing-period-dates'>
          Annual HMDA Data Collection Timelines
        </a>
      </li>
      <li>
        <a href='/documentation/faq/data-collection-timelines#quarterly-filing-period-dates'>
          Quarterly HMDA Data Collection Timelines
        </a>
      </li>
      <li>
        <ExternalLink url='https://hmdahelp.consumerfinance.gov/knowledgebase/s/topic/0TOt0000000PFzGGAW/hmda-articles'>
          HMDA Operations Knowledge Base
        </ExternalLink>
      </li>
      <li>
        <a href='/documentation/category/developer-apis'>
          HMDA API Documentation
        </a>
      </li>
      {hideContent && (
        <li>
          <a href='/documentation/category/filing-instructions-guide'>
            HMDA Online FIG
            <NewIndicator />
          </a>
        </li>
      )}
    </ul>
  </article>
)
