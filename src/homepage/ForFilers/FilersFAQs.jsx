import { Link } from 'react-router-dom'
import { ExternalLink } from '../../common/ExternalLink'


export const FilersFAQs = () => {
  return (
    <>
      <header>
        <h3>Frequently Asked Questions</h3>
        <p>Quick answers to common questions about the process of filing HMDA data.</p>
        <ul>
          <li>
            <Link to='documentation/2022/filing-faq/'>HMDA Filing FAQ</Link>
          </li>
          <li>
            <Link to='/documentation/2022/identifiers-faq/'>
              HMDA Institution Identifiers FAQ
            </Link>
          </li>
          <li>
            <Link to='/documentation/2022/data-collection-timelines/'>
              Annual HMDA Data Collection Timelines
            </Link>
          </li>
          <li>
            <Link to='/documentation/2022/quarterly-filing-dates/'>
              Quarterly HMDA Data Collection Timelines
            </Link>
          </li>
          <li>
            <ExternalLink url='https://hmdahelp.consumerfinance.gov/knowledgebase/s/topic/0TOt0000000PFzGGAW/hmda-articles'>
              HMDA Operations Knowledge Base
            </ExternalLink>
          </li>
        </ul>
      </header>
    </>
  )
}
