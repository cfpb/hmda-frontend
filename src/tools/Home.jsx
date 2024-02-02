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
          with a final action date on or after January 1st, 2018. Average Prime Offer Rates (APOR) are also available on this page.'
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
          description='Verifies that your LAR file meets format specifications required to submit on the HMDA Platform.'
          enabled
          url='/tools/file-format-verification'
          image={Verify}
        />

        <ImageCard
          title='Check Digit'
          description='Generates the two-character check digit to create a Universal Loan Identifier (ULI) and/or validates an existing ULI.'
          enabled
          url='/tools/check-digit'
          image={Check}
        />
      </div>
    </div>
  )
}

export default Home
