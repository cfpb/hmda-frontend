import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ExternalLink from '../common/ExternalLink'

import './ImageCard.css'

const TileImage = ({ src }) => <img className='tile-image' src={src} />

const ImageCard = (props) => {
  if (props.placeholder) return <div className='card-wrapper placeholder' />

  const [isHovered, setIsHovered] = useState(false)
  
  const enabled = props.enabled ? ' enabled' : ''
  let cardClass = 'ImageCard' + enabled
  const linkUrl = `/data-browser/${props.path}/${props.year}`

  return (
    <div className={'card-wrapper' + enabled}>
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
      {props.faq && (
        <ExternalLink url={props.faq.url} className='faq'>
          {props.faq.label || 'FAQ'}
        </ExternalLink>
      )}
    </div>
  )
}

export default ImageCard
