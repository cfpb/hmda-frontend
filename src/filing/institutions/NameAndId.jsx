import React from 'react'
import PropTypes from 'prop-types'

const InstitutionNameAndId = ({ name, lei, filingPeriod }) => {
  return (
    <h3>
      {name} - {lei} - {filingPeriod}
    </h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  lei: PropTypes.string,
  filingPeriod: PropTypes.string
}

export default InstitutionNameAndId
