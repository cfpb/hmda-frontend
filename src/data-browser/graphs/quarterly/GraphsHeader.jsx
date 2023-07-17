import { ContactHmdaHelp } from '../../ContactHmdaHelp'
import LinkToGraphFAQ from './LinkToGraphFAQ'
import { QuarterlyFilingCalendar } from './QuarterlyFilingCalendar'

const DefaultOverview =
  'The following graphs present data for the financial institutions reporting HMDA quarterly data.'

export const GraphsHeader = ({ overview, toolAnnouncement }) => (
  <header className='heading'>
    <h1 className={`${toolAnnouncement ? "reduce-h1-margin-top" : ""}`}>
      HMDA Quarterly Graphs
    </h1>
    <p className='lead'>{overview || DefaultOverview}</p>
    <QuarterlyFilingCalendar />
    <p className='lead'>
      <LinkToGraphFAQ />
    </p>
    <p className='lead'>
      <ContactHmdaHelp subject='Quarterly Graphs' />
    </p>
  </header>
)
