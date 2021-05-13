import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ImageCard.css'

const TileImage = ({ src }) => <img className='tile-image' src={src} />

const ImageCard = (props) => {
  const [isHovered, setIsHovered] = useState(false)
  
  let cardClass = 'ImageCard'
  if (props.enabled) cardClass += ' enabled'
  const linkUrl = `/data-browser/${props.path}/${props.year}`

  return (
    <Link
      className='card'
      disabled={!props.enabled}
      to={linkUrl}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cardClass}>
        <TileImage src={isHovered ? props.imageHover : props.image} />
        <span>
          <h4>{props.caption}</h4>
          <span className='desc'>{props.description}</span>
        </span>
      </div>
    </Link>
  )
}

export default ImageCard
