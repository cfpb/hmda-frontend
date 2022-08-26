import { ContactHmdaHelp } from '../../ContactHmdaHelp'
import { QuarterlyFilingCalendar } from './QuarterlyFilingCalendar'

const DefaultOverview =
  'The following graphs present data for the financial institutions reporting HMDA quarterly data.'

export const GraphsHeader = ({ overview }) => (
  <header className='heading'>
    <h1>HMDA Quarterly Graphs</h1>
    <p className='lead'>{overview || DefaultOverview}</p>
    <QuarterlyFilingCalendar />
    <p className='lead'>
      <ContactHmdaHelp subject='Quarterly Graphs' />
    </p>
  </header>
)
