import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ImageCard.scss'

const TileImage = ({ src }) => <img className='tile-image' src={src} />

const ImageCard = (props) => {
  const linkUrl = `/data-browser/${props.path}/${props.year}`

  return (
    <div className={'card-wrapper'}>
      <Link
        className='ImageCard'
        to={linkUrl}
      >
        <TileImage src={props.image} />
        <div className='info'>
          <h3>{props.title}</h3>
          <h4>{props.caption}</h4>
          <span className='desc'>{props.description}</span>
        </div>
      </Link>
      {props.faq && <Link to={props.faq.url} target="_blank" rel="noopener noreferrer" className='faq'>{props.faq.label || "FAQ"}</Link>}
    </div>
  )
}

export default ImageCard
