import { Link } from "react-router-dom"
import { ExternalLink } from "../../common/ExternalLink"
import { ExpandableCard } from "../ExpandableCard"

export const FilingDocs = () => (
  <ExpandableCard
    id="home-expand-filing-docs"
    title="Filing Documentation"
    description="Answers to common questions about the process of filing HMDA data."
    destination="/documentation"
  >
    <ul>
      <li>
        <Link to="documentation/2022/filing-faq/">HMDA Filing FAQ</Link>
      </li>
      <li>
        <Link to="/documentation/2022/identifiers-faq/">
          HMDA Institution Identifiers FAQ
        </Link>
      </li>
      <li>
        <Link to="/documentation/2022/data-collection-timelines/">
          Annual HMDA Data Collection Timelines
        </Link>
      </li>
      <li>
        <Link to="/documentation/2022/quarterly-filing-dates/">
          Quarterly HMDA Data Collection Timelines
        </Link>
      </li>
      <li>
        <ExternalLink url="https://hmdahelp.consumerfinance.gov/knowledgebase/s/topic/0TOt0000000PFzGGAW/hmda-articles">
          HMDA Operations Knowledge Base
        </ExternalLink>
      </li>
      <li>
        <ExternalLink url="https://cfpb.github.io/hmda-platform">
          HMDA Platform API
        </ExternalLink>
      </li>
    </ul>
  </ExpandableCard>
)
