import { Link } from 'react-router-dom'
import iconSprite from '../common/uswds/img/sprite.svg'

export function QuickLinks({ hideContent }) {
  if (hideContent) return <></>

  return (
    <>
      <section id='quicklinks'>
        <div className='title'>
          <span>QuickLinks</span>
        </div>
        <Link to='/updates-notes'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#campaign`} />
          </svg>{' '}
          <span>
            News and
            <br />
            Updates
          </span>
        </Link>
        <Link to='/tools/rate-spread'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#attach_money`} />
          </svg>{' '}
          <span>
            Rate Spread
            <br />
            Calculator
          </span>
        </Link>
        <Link to='/filing/'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#account_balance`} />
          </svg>{' '}
          <span>
            HMDA Filing <br />
            Platform
          </span>
        </Link>
        <a href='/documentation'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#help`} />
          </svg>
          <span>
            Frequently Asked
            <br />
            Questions
          </span>
        </a>
        <a href='/documentation/fig/2026/overview'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#near_me`} />
          </svg>
          <span>
            Filing Instructions
            <br />
            Guide
          </span>
        </a>
      </section>
    </>
  )
}
