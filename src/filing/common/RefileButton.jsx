import React from 'react'
import PropTypes from 'prop-types'
import './RefileButton.css'
import { useDispatch } from 'react-redux'
import showConfirm from '../actions/showConfirm.js'
import setLei from '../actions/setLei.js'

import './RefileButton.css'

const RefileButton = ({ institution, isLink, isLower, isSmall, className }) => {
  const dispatch = useDispatch()

  const showConfirmModal = () => {
    dispatch(showConfirm())
  }

  const updateInstitution = (lei) => {
    dispatch(setLei(lei))
  }

  let refileStyle = 'RefileButton text-small'

  if (isLink) {
    refileStyle = 'RefileButton link'
    if (isLower) {
      refileStyle = `${refileStyle} text-lowercase`
    }
    if (isSmall) {
      refileStyle = `${refileStyle} text-small`
    }
  }
  if (className) {
    refileStyle = `${refileStyle} ${className}`
  }

  return (
    <button
      className={refileStyle}
      onClick={(e) => {
        e.preventDefault()
        if (institution) {
          updateInstitution(institution.lei)
        }
        showConfirmModal()
      }}
    >
      Upload a new file
    </button>
  )
}

RefileButton.propTypes = {
  institution: PropTypes.object,
  isLink: PropTypes.bool,
  isLower: PropTypes.bool,
  isSmall: PropTypes.bool,
}

export default RefileButton
