import React from 'react'
import { withAppContext } from '../../common/appContextHOC.jsx'
import Heading from '../../common/Heading.jsx'
import { S3DatasetLink } from '../../common/S3Integrations'

const AppIntro = () => {
  return [
    <Heading
      key={1}
      type={1}
      headingText='Excel Loan/Application Register (LAR) Formatting Tool'
      paragraphText='The Excel LAR Formatting tool is intended to help financial institutions,
        typically those with small volumes of covered loans and applications, to
        create an electronic file that can be submitted to the HMDA Platform.'
    >
      <React.Fragment>
        <p>
          The HMDA Excel LAR formatting tool is a Microsoft® Excel® workbook
          created by the Bureau for HMDA filers, who do not have another means
          of doing so, to enter and format data into a pipe delimited text file.
          A pipe delimited text file is the required format beginning for data
          collected in 2017 for financial institutions to file their
          loan/application register (LAR) using the HMDA Platform.
        </p>
        <p>
          Follow the <a href='/documentation/tools/lar-formatting/'>Excel LAR Formatting Tool instructions</a> to format your data into a pipe delimited text file.
        </p>
      </React.Fragment>
    </Heading>,

    <h4 key={2}>Downloads</h4>,

    <ul key={3}>
      <S3DatasetLink
        url='https://s3.amazonaws.com/cfpb-hmda-public/prod/larft/HMDA_LAR_Formatting_Tool.xlsm'
        label='Excel LAR Formatting Tool for data collected in or after 2018'
        showLastUpdated
      />
    </ul>,
  ]
}

export default withAppContext(AppIntro)
