import React from 'react'
import Heading from '../../common/Heading'
import { Link } from 'react-router-dom'
import { withAppContext } from '../../common/appContextHOC'


const _Header = ({ config: { defaultDocsPeriod = '2018' } }) => (
  <Heading
    key={1}
    type={1}
    headingText='Online Loan/Application Register (LAR) Formatting Tool'
    paragraphText='The online LAR Formatting Tool is intended to help financial institutions,
  typically those with small volumes of covered loans and applications, to
  create an electronic file that can be submitted to the HMDA Platform.'
  >
    <React.Fragment>
      <p>
        The online HMDA LAR formatting tool is a web application created by the
        Bureau for HMDA filers, who do not have another means of doing so, to
        enter and format data into a pipe delimited text file. A pipe delimited
        text file is the required format, beginning with data collected in 2017,
        for financial institutions to file their loan/application register (LAR)
        using the HMDA Platform.
      </p>
      <p>
        Follow the{' '}
        <Link
          to={`/documentation/${defaultDocsPeriod}/tools/online-lar-formatting/`}
        >
          Online LAR Formatting Tool instructions
        </Link>{' '}
        to format your data into a pipe delimited text file.
      </p>
    </React.Fragment>
  </Heading>
)

export const Header = withAppContext(_Header)