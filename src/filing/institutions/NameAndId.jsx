import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as InfoIcon } from '../images/info.svg'

const InstitutionNameAndId = ({ name, lei, filingPeriod, setSelected }) => {
  return (
    <h3>
      {name} - {lei} - {filingPeriod}
      <span className="details-icon" onClick={() => setSelected(lei)}>
        <InfoIcon title="Institution details" />
      </span>
    </h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  lei: PropTypes.string,
  filingPeriod: PropTypes.string
}

export default InstitutionNameAndId
