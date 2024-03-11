import Alert from '../../../common/Alert'
import { ContactHmdaHelp } from '../../ContactHmdaHelp'
import LinkToGraphFAQ from './LinkToGraphFAQ'
import { QuarterlyFilingCalendar } from './QuarterlyFilingCalendar'

const DefaultOverview =
  'The following graphs present data for the financial institutions reporting HMDA quarterly data.'

export const GraphsHeader = ({ overview, toolAnnouncement }) => (
  <header className='heading'>
    <h1>HMDA Quarterly Graphs</h1>
    <p className='lead'>{overview || DefaultOverview}</p>
    {toolAnnouncement && (
      <Alert
        heading={toolAnnouncement.heading}
        type={toolAnnouncement.type}
        style={{ maxWidth: '100%' }}
      >
        <p>{toolAnnouncement.message}</p>
      </Alert>
    )}
    <QuarterlyFilingCalendar />
    <p className='lead'>
      <LinkToGraphFAQ />
    </p>
    <p className='lead'>
      <ContactHmdaHelp subject='Quarterly Graphs' />
    </p>
  </header>
)
