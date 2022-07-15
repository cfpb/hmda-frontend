import { DocumentationLink } from '../../../common/DocumentationLink'
import { ContactHmdaHelp } from '../../ContactHmdaHelp'

const DefaultOverview =
  'The following graphs present data for the financial institutions reporting HMDA quarterly data.'

const ExtrapolationWarning =
  'Though the graphs provide some insight into trends for these institutions, they should not be taken to represent the behavior of all mortgage lenders during the relevant period.'

export const GraphsHeader = ({ overview }) => (
  <header className='heading'>
    <h1>HMDA Quarterly Graphs</h1>
    <p className='lead'>
      {overview || DefaultOverview} {ExtrapolationWarning}
    </p>
    <p className='lead'>
      For more information please review the{' '}
      <DocumentationLink id='quarterly-graphs-faq'>
        HMDA Quarterly Graphs FAQ
      </DocumentationLink>
      . <ContactHmdaHelp subject='Quarterly Graphs' />
    </p>
  </header>
)
