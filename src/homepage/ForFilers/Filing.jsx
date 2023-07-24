import { isBeta } from '../../common/Beta'
import { ExpandableCard } from '../ExpandableCard'
import NewIndicator from '../NewIndicator'

const ToolsProd = () => (
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
      <a href='/tools/online-lar-formatting'>
        Online LAR Formatting <NewIndicator />
      </a>
    </li>
    <li>
      <a href='/tools/lar-formatting'>Excel LAR Formatting</a>
    </li>
  </ul>
)

const ToolsBeta = () => (
  <ul>
    <li>
      <a href='/tools/online-lar-formatting'>
        Online LAR Formatting <NewIndicator />
      </a>
    </li>
  </ul>
)

export const Filing = ({ defaultPeriod }) => (
  <>
  <article>
    <h3>{'HMDA ' + (isBeta() ? 'Beta ' : '') + 'Filing Tools'}</h3>
    <p>The HMDA Filing Platform allows financial institutions to upload, review, certify, and submit HMDA data collected in or after 2017.</p>
    {isBeta() ? <ToolsBeta /> : <ToolsProd />}
  </article>
  <ExpandableCard
    id='home-expand-filing'
    title={'Access the HMDA ' + (isBeta() ? 'Beta ' : '') + 'Filing Platform'}
    description='The HMDA Filing Platform allows financial institutions to upload, review, certify, and submit HMDA data collected in or after 2017.'
    destination={`/filing/${defaultPeriod}/`}
    expandedByDefault={true}
    openNewWindow={true}
  >
    {isBeta() ? <ToolsBeta /> : <ToolsProd />}
  </ExpandableCard>
  </>
)
