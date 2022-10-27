import React from 'react'
import Heading from '../../common/Heading'
import { Link } from 'react-router-dom'
import { withAppContext } from '../../common/appContextHOC'

const _Header = ({ config: { defaultDocsPeriod = '2018' } }) => (
  <Heading
    key={1}
    type={1}
    headingText='Loan/Application Register (LAR) Formatting Tool'
    paragraphText='The LAR Formatting Tool is intended to help financial institutions,
  typically those with small volumes of covered loans and applications, to
  create an electronic file that can be submitted to the HMDA Platform.'
  >
    <React.Fragment>
      {/* <p>
        Follow the{' '}
        <Link
          to={`/documentation/${defaultDocsPeriod}/tools/new-lar-formatting/`}
        >
          LAR Formatting Tool instructions
        </Link>{' '}
        to format your data into a pipe delimited text file.
      </p> */}
    </React.Fragment>
  </Heading>
)

export const Header = withAppContext(_Header)
