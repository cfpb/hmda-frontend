import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../common/Heading.jsx'
import NewIndicator from '../homepage/NewIndicator.jsx'
import Calculator from '../common/images/tools/calculator_color.png'
import Check from '../common/images/tools/check_color.png'
import Format from '../common/images/tools/format_color.png'
import Verify from '../common/images/tools/verify_color.png'

import './Home.css'

const Home = () => {
  return (
    <div className='grid home'>
      <Heading
        type={1}
        headingText='HMDA Tools'
        paragraphText='Here you can find various tools to assist you in getting your HMDA LAR ready for filing.'
      />

      <div className='card-container'>
        <Link to='/tools/rate-spread' className='card tools-card'>
          <Calculator className='icon' style={{ marginLeft: '-1px' }} />
          <Heading
            headingText='Rate Spread Calculator'
            paragraphText='Provides rate spreads for HMDA reportable loans
            with a final action date on or after January 1st, 2018.'
            type={3}
            style={{ marginTop: 0 }}
          />
        </Link>

        <div
          className='card tools-card tools-card-no-hover-change'
          style={{ cursor: 'initial' }}
        >
          <Format
            className='icon'
            style={{ marginLeft: '5px', height: '36px', width: '36px' }}
          />
          <Heading
            headingText='LAR Formatting'
            paragraphText='Tools to help small financial institutions create electronic HMDA submission files.'
            type={3}
            style={{ marginTop: 0 }}
          >
            <ul>
              <li>
                <a href='/tools/online-lar-formatting'>
                  Online LAR Formatting{' '}
                  <NewIndicator id='tools-card-indicator' />
                </a>
              </li>
              <li>
                <a href='/tools/lar-formatting'>Excel LAR Formatting</a>
              </li>
            </ul>
          </Heading>
        </div>

        <Link to='/tools/file-format-verification' className='card tools-card'>
          <Verify className='icon' />
          <Heading
            headingText='File Format Verification Tool'
            paragraphText='Checks if your LAR file meets format specified in the HMDA Filing Instructions Guide.'
            type={3}
            style={{ marginTop: 0 }}
          />
        </Link>

        <Link to='/tools/check-digit' className='card tools-card'>
          <Check className='icon' />
          <Heading
            headingText='Check Digit'
            paragraphText='Generates a two character check digit for a Legal Entity Identifier (LEI) and loan/application ID. It can also validate check digits in a complete Universal Loan Identifier (ULI) that is entered.'
            type={3}
            style={{ marginTop: 0 }}
          />
        </Link>
      </div>
    </div>
  )
}

export default Home
