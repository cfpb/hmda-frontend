import React from 'react'
import PropTypes from 'prop-types'

import './RefileButton.css'

const RefileButton = props => {
  let refileStyle = 'RefileButton text-small'
  if (props.isLink) {
    refileStyle = 'RefileButton link'
    if (props.isLower) {
      refileStyle = `${refileStyle} text-lowercase`
    }
    if (props.isSmall) {
      refileStyle = `${refileStyle} text-small`
    }
  }
  if (props.className) {
    refileStyle = `${refileStyle} ${props.className}`
  }

  return (
    <button
      className={refileStyle}
      onClick={e => {
        e.preventDefault()
        if (props.institution) {
          props.updateInstitution(props.institution.lei)
        }
        props.showConfirmModal()
      }}
    >
      Upload a new file
    </button>
  )
}

RefileButton.propTypes = {
  institution: PropTypes.object,
  updateInstitution: PropTypes.func.isRequired,
  showConfirmModal: PropTypes.func.isRequired,
  isLink: PropTypes.bool,
  isLower: PropTypes.bool,
  isSmall: PropTypes.bool
}

export default RefileButton
