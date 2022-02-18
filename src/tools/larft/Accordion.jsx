import React from 'react'
import './Accordion.css'

function handleToggleClick(id) {
  let accordionButton = document.getElementById(`accordion-button-${id}`)
  let expanded =
    accordionButton.getAttribute('aria-expanded') === 'false' ? false : true

  document
    .getElementById(`accordion-button-${id}`)
    .setAttribute('aria-expanded', !expanded)
  document
    .getElementById(`accordion-${id}`)
    .setAttribute('aria-hidden', expanded)
}

export const collapseAll = () => {
  document
    .querySelectorAll(`[id^="accordion-button-"]`)
    .forEach(e => e.setAttribute('aria-expanded', false))
  document
    .querySelectorAll(`[id^="accordion-"]`)
    .forEach(e => e.setAttribute('aria-hidden', true))
}

export const Accordion = ({ heading, content, children, id }) => {
  return (
    <ul className='accordion-bordered'>
      <li>
        <button
          className='accordion-button'
          aria-expanded='false'
          id={`accordion-button-${id}`}
          aria-controls={`accordion-${id}`}
          onClick={event => handleToggleClick(id)}
        >
          {heading}
        </button>
        <div
          id={`accordion-${id}`}
          className='accordion-content'
          aria-hidden='true'
        >
          {content || children || null}
        </div>
      </li>
    </ul>
  )
}

