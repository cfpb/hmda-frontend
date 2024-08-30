import React from 'react'
import { Link } from 'react-router-dom'
import iconSprite from '../common/uswds/img/sprite.svg'

export const QuickLinks = ({ hideContent }) => {
  if (hideContent) return <></>

  return (
    <>
      <section id='quicklinks'>
        <div className='title'>
          <span>QuickLinks</span>
        </div>
        <Link to='/tools/rate-spread'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#attach_money`}></use>
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
            <use href={`${iconSprite}#account_balance`}></use>
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
            <use href={`${iconSprite}#help`}></use>
          </svg>
          <span>
            Frequently Asked
            <br />
            Questions
          </span>
        </a>
        <a href='/documentation/fig/2024/overview'>
          <svg
            className='usa-icon'
            aria-hidden='true'
            focusable='false'
            role='img'
          >
            <use href={`${iconSprite}#near_me`}></use>
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
