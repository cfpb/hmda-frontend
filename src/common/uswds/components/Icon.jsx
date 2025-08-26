import React from 'react'
import iconSprite from '../img/sprite.svg'

function Icon({ iconName, styleIcon }) {
  return (
    <svg aria-hidden='true' focusable='false' role='img' style={styleIcon}>
      <use href={`${iconSprite}#${iconName}`} />
    </svg>
  )
}

export default Icon
