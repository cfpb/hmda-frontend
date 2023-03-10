import NewIndicator from '../NewIndicator'
import { ExpandableCard } from '../ExpandableCard'

export const DataDocs = () => {
  return (
    <ExpandableCard
      id='home-expand-data-docs'
      title='Data Documentation'
      description='Answers to common questions about working with HMDA datasets and Data Browser tools.'
      destination='/documentation/'
    >
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
          <a href='/documentation/faq/data-browser-graphs-faq'>
            Data Browser - Graphs FAQ
            <NewIndicator />
          </a>
        </li>
        <li>
          <a href='/documentation/faq/data-browser-maps-faq'>
            Data Browser - Maps FAQ
          </a>
        </li>
        <li>
          <a href='/documentation/faq/downloading-datasets'>
            Data Browser - Dataset Filtering FAQ
          </a>
        </li>
        <li>
          <a href='/documentation/faq/static-dataset-faq'>
            Data Publication - Static Dataset FAQ
          </a>
        </li>
      </ul>
    </ExpandableCard>
  )
}
