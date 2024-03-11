import React, { useState } from 'react'
import { BiLinkAlt } from 'react-icons/bi'
import './CopyURLButton.css'

/**
 * Button to copy page URL
 * @param {string} cname - Allows styling of the button otherwise use default class for button
 * @param {string} text - Has a default text of "Share" otherwise use text passed into component
 */

let debounceCopyConfirmation = null

const CopyURLButton = ({ cname, text = 'Share URL' }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const copy = () => {
    const el = document.createElement('input')
    el.value = window.location.href
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    // Avoid hiding tooltip prematurely when button is clicked multiple times
    if (debounceCopyConfirmation) return

    setShowTooltip(true)
    debounceCopyConfirmation = true

    // Hide tooltip after 2 seconds
    setTimeout(() => {
      debounceCopyConfirmation = false
      setShowTooltip(false)
    }, 2000)
  }

  return (
    <button className={cname || 'CopyURLButton'} onClick={copy}>
      <div style={{ display: 'flex' }}>
        <BiLinkAlt
          style={{ marginRight: '4px', fill: 'white' }}
          fontWeight={'bold'}
        />
        {text}
        {showTooltip && <span className='tooltiptext'>Link Copied!</span>}
      </div>
    </button>
  )
}

export default CopyURLButton
