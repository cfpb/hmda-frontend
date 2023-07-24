import React from 'react'
import Heading from '../../common/Heading.jsx'

const AppIntro = () => {
  return (
    <Heading
      type={1}
      style={{ marginBottom: 0 }}
      headingText='Check Digit Tool'
      paragraphText='You can use this tool for two functions. The first is to generate a two
      character check digit when you enter a Legal Entity Identifier (LEI) and
      loan or application ID. The second is to validate that a check digit is
      calculated correctly for any complete Universal Loan Identifier (ULI) you
      enter.'
    />
  )
}

export default AppIntro
