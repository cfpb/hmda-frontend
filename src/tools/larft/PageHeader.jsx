import React from 'react'
import Heading from '../../common/Heading'

const pageTitle = 'Loan/Application Register (LAR) Formatting Tool'

const description =
  'The LAR Formatting Tool is intended to help financial institutions, ' +
  'typically those with small volumes of covered loans and applications, ' +
  'to create an electronic file that can be submitted to the HMDA Platform.'

const Header = () => (
  <Heading
    key={1}
    type={1}
    headingText={pageTitle}
    paragraphText={description}
  />
)

export default Header