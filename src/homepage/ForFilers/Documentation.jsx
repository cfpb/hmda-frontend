
import { Link } from 'react-router-dom'

export const Documentation = ({ isProdBeta, children }) => {
  if (isProdBeta) return null

  return (
    <header>
      <h3>
        <Link to='/documentation/'>Documentation</Link>
      </h3>
      <p>
        A collection of documentation resources for HMDA data publication
        products.
      </p>
      {children}
    </header>
  )
}