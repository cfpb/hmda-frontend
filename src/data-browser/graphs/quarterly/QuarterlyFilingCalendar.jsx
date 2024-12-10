import QFilingCal from '../../../documentation/markdown/images/quarterly_filing_2025.png'
import { ExpandableSection } from '../../../common/ExpandableSection'

export const QuarterlyFilingCalendar = ({ expanded = false }) => {
  return (
    <ExpandableSection
      label='Quarterly Filing Calendar'
      expandedByDefault={expanded}
    >
      <img src={QFilingCal} alt='Quarterly Filing Calendar 2021' />
    </ExpandableSection>
  )
}
