import { Link } from 'react-router-dom'
import { ExternalLink } from '../../common/ExternalLink'
import NewIndicator from '../NewIndicator'

export const DataUsersFAQs = () => {
  return (
    <header>
      <h3>Frequently Asked Questions</h3>
      <p>
        Quick answers to common questions about working with HMDA datasets and
        Data Browser tools.
      </p>
      <ul>
        <li>
          <a
            href='https://files.consumerfinance.gov/f/documents/cfpb_beginners-guide-accessing-using-hmda-data_guide_2022-06.pdf'
            download={true}
          >
            A Beginner's Guide to HMDA Data
            <NewIndicator />
          </a>
        </li>
        <li>
          <Link to='/documentation/2022/data-browser-faq/'>
            Data Browser - Dataset Filtering FAQ
          </Link>
        </li>
        <li>
          <Link to='/documentation/2022/maps-faq/'>
            Data Browser - Maps FAQ
          </Link>
        </li>
        <li>
          <Link to='/documentation/2022/static-dataset-faq/'>
            Data Publication - Static Dataset FAQ
          </Link>
        </li>
      </ul>
    </header>
  )
}
