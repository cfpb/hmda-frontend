import React from 'react'
import Heading from '../common/Heading.jsx'
import Calculator from '../common/images/tools/calculator_color.png'
import Check from '../common/images/tools/check_color.png'
import Format from '../common/images/tools/format_color.png'
import Verify from '../common/images/tools/verify_color.png'

import './Home.css'
import ImageCard from '../data-browser/ImageCard.jsx'

const Home = () => {
  const LARFormattingOptions = [
    { name: 'LAR Formatting', link: '/tools/lar-formatting' },
    {
      name: 'Online LAR Formatting',
      link: '/tools/online-lar-formatting',
      new: true,
    },
  ]

  return (
    <div className='grid home'>
      <Heading
        type={1}
        headingText='HMDA Tools'
        paragraphText='Here you can find various tools to assist you in getting your HMDA LAR ready for filing.'
      />

      <div className='card-container'>
        <ImageCard
          title='Rate Spread Calculator'
          description='Provides rate spreads for HMDA reportable loans
          with a final action date on or after January 1st, 2018.'
          enabled
          url={'/tools/rate-spread'}
          image={Calculator}
        />

        <ImageCard
          title='LAR Formatting'
          description='Tools to help small financial institutions create electronic HMDA submission files.'
          disabled
          image={Format}
          list={LARFormattingOptions}
        />

        <ImageCard
          title='File Format Verification Tool'
          description='Checks if your LAR file meets format specified in the HMDA Filing Instructions Guide.'
          enabled
          url='/tools/file-format-verification'
          image={Verify}
        />

        <ImageCard
          title='Check Digit'
          description='Generates a two character check digit for a Legal Entity Identifier (LEI) and loan/application ID. It can also validate check digits in a complete Universal Loan Identifier (ULI) that is entered.'
          enabled
          url='/tools/check-digit'
          image={Check}
        />
      </div>
    </div>
  )
}

export default Home
