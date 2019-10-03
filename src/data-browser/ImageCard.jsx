import React from 'react'
import { Link } from 'react-router-dom'
import './ImageCard.css'

const ImageCard = props => {
  let cardClass='ImageCard card'
  if(props.enabled) cardClass += ' enabled'

  return (
    <div className={cardClass}>
      <Link
        disabled={!props.enabled}
        to={`/data-browser/${props.path}/${props.year}`}>
        {props.image
          ?
          <div className="ImageWrapper">
            <img src={props.image} alt={props.caption} className="imagechild"/>
          </div>
        : null
        }
        <h4>{props.caption}</h4>
      </Link>
      {props.children}
    </div>
  )
}

export default ImageCard
