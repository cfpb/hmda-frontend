import React from 'react'

import Heading from '../../common/Heading.jsx'

import './ProgressCard.css'

const ProgressCard = ({ name, id, link, title }) => {
  if (id !== '') {
    name = name + ' - '
  }

  if (id === 'nationwide') {
    name = ''
  }

  let disabled = false
  if (link === null) {
    disabled = true
  }

  return (
    <div className='ProgressCard'>
      <Heading
        type={4}
        headingText={title}
        paragraphText={name + id}
        headingLink={link}
        disabled={disabled}
      />
    </div>
  )
}

export default ProgressCard
