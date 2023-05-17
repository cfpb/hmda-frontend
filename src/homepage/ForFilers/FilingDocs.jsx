import { ExternalLink } from "../../common/ExternalLink"
import { ExpandableCard } from "../ExpandableCard"

export const FilingDocs = () => (
  <ExpandableCard
    id='home-expand-filing-docs'
    title='Filing Documentation'
    description='Answers to common questions about the process of filing HMDA data.'
    destination='/documentation/faq/filing-faq'
  >
    <ul>
      <li>
        <a href='/documentation/faq/filing-faq'>HMDA Filing FAQ</a>
      </li>
      <li>
        <a href='/documentation/faq/data-collection-timelines#filing-instructions-guide-fig'>
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
    </ul>
  </ExpandableCard>
)
