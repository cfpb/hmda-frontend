import React from 'react'
import Heading from '../common/Heading.jsx'
import NewIndicator from '../homepage/NewIndicator.jsx'

const Home = () => {
  return (
    <div className='grid home'>
      <Heading
        type={1}
        style={{ marginBottom: '3em' }}
        headingText='HMDA Tools'
        paragraphText='Here you can find various tools to assist you in getting your HMDA LAR ready for filing.'
      />

      <div className='card-container'>
        <div className='card'>
          <Heading
            headingLink='/tools/rate-spread'
            headingText='Rate Spread'
            paragraphText='This calculator provides rate spreads for HMDA reportable loans
              with a final action date on or after January 1st, 2018.'
            type={3}
          />
        </div>

        <div className='card'>
          <Heading
            headingLink=''
            headingText='LAR formatting tools'
            paragraphText='The LAR Formatting tools are intended to help financial
              institutions, typically those with small volumes of covered loans
              and applications, to create an electronic file that can be
              submitted to the HMDA Platform.'
            type={3}
          >
            <ul>
              <li>
                <a href='/tools/online-lar-formatting'>
                  Online LAR Formatting <NewIndicator />
                </a>
              </li>
              <li>
                <a href='/tools/lar-formatting'>LAR Formatting</a>
              </li>
            </ul>
          </Heading>
        </div>

        <div className='card'>
          <Heading
            headingLink='/tools/file-format-verification'
            headingText='File Format Verification'
            paragraphText='The File Format Verification Tool (FFVT) is a resource for testing
              whether your file meets certain formatting requirements specified
              in the HMDA Filing Instructions Guide.'
            type={3}
          />
        </div>

        <div className='card'>
          <Heading
            headingLink='/tools/check-digit'
            headingText='Check Digit'
            paragraphText='You can use this tool for two functions. The first is to generate
              a two character check digit when you enter a Legal Entity
              Identifier (LEI) and loan or application ID. The second is to
              validate that a check digit is calculated correctly for any
              complete Universal Loan Identifier (ULI) you enter.'
            type={3}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
