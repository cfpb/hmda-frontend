import { isBeta } from '../../common/Beta'

export const Filing = ({ defaultPeriod }) => (
  <header>
    <h3>
      <a
        href={`/filing/${defaultPeriod}/`}
        rel='noopener noreferrer'
        target='_blank'
      >
        Access the HMDA {isBeta() && 'Beta '} Filing Platform
      </a>
    </h3>
    <p>
      The HMDA Filing Platform allows financial instiutions to upload, review,
      certify, and submit HMDA data collected in or after 2017.
    </p>

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
  </header>
)