import PropTypes from 'prop-types'
import { formatPeriodLabel } from '../api/utils.js'

import './UserHeading.css'

function UserHeading(props) {
  if (!props.period) return null

  return (
    <section>
      <h1>HMDA filing for {formatPeriodLabel(props.period)}</h1>
      <p className='lead-paragraph'>{props.name}</p>
    </section>
  )
}

UserHeading.propTypes = {
  period: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default UserHeading
