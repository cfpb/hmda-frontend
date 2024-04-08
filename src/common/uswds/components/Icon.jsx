import React from 'react'
import iconSprite from '../img/sprite.svg'

const Icon = ({ iconName, styleIcon }) => {
  return (
    <svg aria-hidden='true' focusable='false' role='img' style={styleIcon}>
      <use href={`${iconSprite}#${iconName}`}></use>
    </svg>
  )
}

export default Icon
