import { isBeta } from '../../common/Beta'
import { ExpandableCard } from '../ExpandableCard'

export const Filing = ({ defaultPeriod }) => (
  <ExpandableCard
    title={'Access the HMDA ' + (isBeta() ? 'Beta ' : '') + 'Filing Platform'}
    description='The HMDA Filing Platform allows financial instiutions to upload, review, certify, and submit HMDA data collected in or after 2017.'
    destination={`/filing/${defaultPeriod}/`}
    expandedByDefault={true}
    disableExpansion={isBeta()}
  >
    <ul>
      <li>
        <a href='/tools/rate-spread'>Rate Spread Calculator</a>
      </li>
      <li>
        <a href='/tools/check-digit'>Check Digit Generation/Validation</a>
      </li>
      <li>
        <a href='/tools/file-format-verification'>
          File Format Verification Tool
        </a>
      </li>
      <li>
        <a href='/tools/lar-formatting'>LAR Formatting Tool</a>
      </li>
    </ul>
  </ExpandableCard>
)