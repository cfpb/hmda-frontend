import React from 'react'
import './Accordion.css'

/**
 * Displays a field's label with details (examples, description, enumerations) as
 * an expandable/collapsable element.
 *
 * @param {String} heading
 * @param {String} content
 * @param {String} children
 * @param {String} id
 */
export function Accordion({ heading, content, children, id }) {
  const contentBody = content || children || null

  return (
    <ul className='accordion-bordered'>
      <li onClick={() => handleToggle(id)}>
        <AccordionHeading id={id} text={heading} />
        <AccordionContent id={id} content={contentBody} />
      </li>
    </ul>
  )
}

function AccordionHeading({ id, text }) {
  return (
    <button
      className='accordion-button'
      aria-expanded='false'
      id={`accordion-button-${id}`}
      aria-controls={`accordion-${id}`}
    >
      {text}
    </button>
  )
}

function AccordionContent({ id, content }) {
  return (
    <div
      id={`accordion-${id}`}
      className='accordion-content'
      aria-hidden='true'
    >
      {content}
    </div>
  )
}

const handleToggle = (id) => {
  const accordionButton = document.getElementById(`accordion-button-${id}`)
  const expanded = accordionButton.getAttribute('aria-expanded') !== 'false'

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
    .forEach((e) => e.setAttribute('aria-expanded', false))
  document
    .querySelectorAll(`[id^="accordion-"]`)
    .forEach((e) => e.setAttribute('aria-hidden', true))
}
