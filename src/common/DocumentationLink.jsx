import { Link } from 'react-router-dom'

export function DocumentationLink({ id, year, children, text }) {
  const yr = year || new Date().getFullYear()

  return (
    <Link to={`/documentation/${yr}/${id}`} target='_blank'>
      {text || children}
    </Link>
  )
}
