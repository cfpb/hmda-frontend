import React from 'react'
import PropTypes from 'prop-types'

import './UserHeading.css'

const UserHeading = props => {
  if (!props.period) return null

  return (
    <section className="UserHeading" id="userHeading">
      <h1>
        Filing on behalf of {props.name} for {props.period}
      </h1>
    </section>
  )
}

UserHeading.propTypes = {
  period: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default UserHeading
