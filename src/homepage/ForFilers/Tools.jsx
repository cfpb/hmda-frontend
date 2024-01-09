import { Link } from 'react-router-dom'

export const Tools = ({ isProdBeta }) => {
  if (isProdBeta) return null

  return (
    <header>
      <h3>
        <Link to='/tools/'>Tools</Link>
      </h3>
      <p>
        Here you can find various tools to assist you in getting your HMDA LAR
        ready for filing.
      </p>
      <ul>
        <li>
          <a href='/tools/rate-spread'>Rate Spread</a>
        </li>
        <li>
          <a href='/tools/check-digit'>Check Digit</a>
        </li>
        <li>
          <a href='/tools/file-format-verification'>File Format Verification</a>
        </li>
        <li>
          <a href='/tools/lar-formatting'>Excel LAR Formatting</a>
        </li>
      </ul>
    </header>
  )
}
