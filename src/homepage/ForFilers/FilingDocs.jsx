import { Link } from "react-router-dom"
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
        <Link to='/documentation/faq/filing-faq'>HMDA Filing FAQ</Link>
      </li>
      <li>
        <Link to='/documentation/2022/identifiers-faq/'>
          HMDA Institution Identifiers FAQ
        </Link>
      </li>
      <li>
        <Link to='/documentation/faq/data-collection-timelines#annual-filing-period-dates'>
          Annual HMDA Data Collection Timelines
        </Link>
      </li>
      <li>
        <Link to='/documentation/faq/data-collection-timelines#quarterly-filing-period-dates'>
          Quarterly HMDA Data Collection Timelines
        </Link>
      </li>
      <li>
        <ExternalLink url='https://hmdahelp.consumerfinance.gov/knowledgebase/s/topic/0TOt0000000PFzGGAW/hmda-articles'>
          HMDA Operations Knowledge Base
        </ExternalLink>
      </li>
      <li>
        <Link to='/documentation/category/developer-apis'>
          HMDA API Documentation
        </Link>
      </li>
    </ul>
  </ExpandableCard>
)
