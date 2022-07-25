import { Link } from 'react-router-dom'

export const ChangeLog = ({ isProdBeta }) => {
  if (isProdBeta) return null

  return (
    <header>
      <h3>
        <Link to='/data-publication/updates'>HMDA Updates and Notes</Link>
      </h3>
      <p>
        Tracking releases, updates, and corrections to HMDA's publications, data
        products, documentation, and tools.
      </p>
    </header>
  )
}
