import React from 'react'
import iconSprite from '../common/uswds/img/sprite.svg'

export const VideoModal = ({ showModal, setShowModal, title, content }) => {
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div
      className={
        showModal
          ? 'usa-modal-wrapper is-visible'
          : 'usa-modal-wrapper is-hidden'
      }
    >
      <div className='usa-modal-overlay'>
        <div
          className='usa-modal usa-modal--lg'
          id='example-modal-1'
          aria-labelledby='modal-1-heading'
          aria-describedby='modal-1-description'
        >
          <div className='video-container'>
            <iframe
              width='1120'
              height='630'
              src='https://www.youtube.com/embed/C_73Swgyc4g'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
          <button
            type='button'
            onClick={closeModal}
            className='usa-button usa-modal__close'
            aria-label='Close this window'
          >
            <svg
              className='usa-icon'
              aria-hidden='true'
              focusable='false'
              role='img'
            >
              <use href={`${iconSprite}#close`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
