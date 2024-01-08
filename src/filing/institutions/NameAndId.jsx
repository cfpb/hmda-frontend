import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InfoIcon from '../images/info.svg?react'

const InstitutionNameAndId = ({ name, lei, filingPeriod }) => {
  return (
    <h3>
      <span>
        {name} - {lei} - {filingPeriod}
      </span>
      <Link
        to={`/filing/${filingPeriod}/institutions/${lei}`}
        className='details-icon'
      >
        <InfoIcon title='Institution details' />
      </Link>
    </h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  lei: PropTypes.string,
  filingPeriod: PropTypes.string,
}

export default InstitutionNameAndId
