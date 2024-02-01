import React from 'react'
import { Link } from 'react-router-dom'
import './ImageCard.scss'
import iconSprite from '../common/uswds/img/sprite.svg'
import NewIndicator from '../homepage/NewIndicator'

const TileImage = ({ src }) => {
  return <img className='tile-image' src={src} />
}

const ImageCardWithList = props => {
  return (
    <div className='ImageCard' style={{ cursor: 'initial' }}>
      <TileImage src={props.image} />

      <div className='info'>
        <h3>{props.title}</h3>
        <span className='desc'>{props.description}</span>
        {/* Render list */}
        {props.list && (
          <ul className='tile-list'>
            {props.list.map((option, i) => (
              <li key={i}>
                <Link to={option.link}>
                  {option.name}
                  {option.new && <NewIndicator id='tools-card-indicator' />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const ImageCard = props => {
  const linkUrl = `/data-browser/${props.path}/${props.year}`

  return (
    <div className={'card-wrapper'}>
      {props.list ? (
        <ImageCardWithList {...props} />
      ) : (
        <Link className='ImageCard' to={props.url ? props.url : linkUrl}>
          <TileImage src={props.image} />
          <div className='info'>
            <h3>{props.title}</h3>
            <span className='desc'>{props.description}</span>
          </div>
        </Link>
      )}

      {props.faq && (
        <Link
          to={props.faq.url}
          target='_blank'
          rel='noopener noreferrer'
          className='faq'
        >
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#help_outline`}></use>
          </svg>
          {props.faq.label || 'FAQ'}
        </Link>
      )}
    </div>
  )
}

export default ImageCard
