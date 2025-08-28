import { isBeta } from '../../common/Beta'
import { ExpandableCard } from '../ExpandableCard'
import NewIndicator from '../NewIndicator'

function ToolsProd() {
  return (
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
        <a href='/tools/online-lar-formatting'>Online LAR Formatting</a>
      </li>
      <li>
        <a href='/tools/lar-formatting'>Excel LAR Formatting</a>
      </li>
    </ul>
  )
}

function ToolsBeta() {
  return (
    <ul>
      <li>
        <a href='/filing'>HMDA Beta Filing Platform</a>
      </li>
    </ul>
  )
}

export function Filing({ defaultPeriod }) {
  return (
    <>
      <article>
        <h3>{`HMDA ${isBeta() ? 'Beta ' : ''}Filing Tools`}</h3>
        <p>
          The HMDA Filing Platform allows financial institutions to upload,
          review, certify, and submit HMDA data collected in or after 2017.
        </p>
        {isBeta() ? <ToolsBeta /> : <ToolsProd />}
      </article>
    </>
  )
}
