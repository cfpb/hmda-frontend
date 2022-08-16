import React from 'react'
import DynamicRenderer from '../../../documentation/DynamicRenderer'

const CurrentYear = new Date().getFullYear()

export const SectionFAQ = ({ show }) => {
  if (!show) return null

  return (
    <DynamicRenderer
      year={CurrentYear}
      slug={'data-browser-graphs-faq'}
      showBackLink={false}
    />
  )
}
