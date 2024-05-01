import React, { useState, useEffect } from 'react'

import flag from './images/favicon-57.png'
import dotgov from './uswds/img/icon-dot-gov.svg'
import lock from './uswds/img/icon-https.svg'

const BannerUSA = () => {
  // Eliminates Google Lighthouse CLS
  const [maxBannerHeight, setMaxBannerHeight] = useState('24px')
  const usaBannerStyles = {
    maxHeight: maxBannerHeight,
    overflowX: 'hidden',
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMaxBannerHeight('none')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section
      className='usa-banner'
      style={usaBannerStyles}
      aria-label='Official website of the United States government'
    >
      <div className='usa-accordion'>
        <header className='usa-banner__header'>
          <div className='usa-banner__inner'>
            <div className='grid-col-auto'>
              <img
                aria-hidden='true'
                className='usa-banner__header-flag'
                src={flag}
                alt='USA Flag'
                height='16'
                width='16'
              />
            </div>
            <div
              className='grid-col-fill tablet:grid-col-auto'
              aria-hidden='true'
            >
              <p className='usa-banner__header-text'>
                An official website of the United States government
              </p>
              <p className='usa-banner__header-action'>Here’s how you know</p>
            </div>
            <button
              type='button'
              className='usa-accordion__button usa-banner__button'
              aria-expanded='false'
              aria-controls='gov-banner-default-default'
            >
              <span className='usa-banner__button-text'>
                Here’s how you know
              </span>
            </button>
          </div>
        </header>
        <div
          className='usa-banner__content usa-accordion__content'
          id='gov-banner-default-default'
        >
          <div className='grid-row grid-gap-lg'>
            <div className='usa-banner__guidance tablet:grid-col-6'>
              <img
                className='usa-banner__icon usa-media-block__img'
                src={dotgov}
                role='img'
                alt=''
                aria-hidden='true'
              />
              <div className='usa-media-block__body'>
                <p>
                  <strong>Official websites use .gov</strong>
                  <br />A <strong>.gov</strong> website belongs to an official
                  government organization in the United States.
                </p>
              </div>
            </div>
            <div className='usa-banner__guidance tablet:grid-col-6'>
              <img
                className='usa-banner__icon usa-media-block__img'
                src={lock}
                role='img'
                alt=''
                aria-hidden='true'
              />
              <div className='usa-media-block__body'>
                <p>
                  <strong>Secure .gov websites use HTTPS</strong>
                  <br />A <strong>lock</strong> or <strong>https://</strong>{' '}
                  means you’ve safely connected to the .gov website. Share
                  sensitive information only on official, secure websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerUSA
