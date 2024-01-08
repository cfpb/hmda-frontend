import { Link } from 'react-router-dom'

export const HomeLink = () => {
  return (
    <Link className='BackLink no-print' to='/data-browser/'>
      {'\u2b05'} DATA BROWSER HOME
    </Link>
  )
}
