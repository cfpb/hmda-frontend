import QFilingCal from '../../../documentation/markdown/images/quarterly_filing_2026.png'
import { ExpandableSection } from '../../../common/ExpandableSection'

export function QuarterlyFilingCalendar({ expanded = false }) {
  return (
    <ExpandableSection
      label='Quarterly Filing Calendar'
      expandedByDefault={expanded}
    >
      <img src={QFilingCal} alt='Quarterly Filing Calendar' />
    </ExpandableSection>
  )
}
