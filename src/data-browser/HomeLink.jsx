import { Link } from 'react-router-dom'

export function HomeLink() {
  return (
    <Link className='BackLink no-print' to='/data-browser/'>
      {'\u2b05'} DATA BROWSER HOME
    </Link>
  )
}
