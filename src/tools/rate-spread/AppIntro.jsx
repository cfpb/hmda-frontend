import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'

const AppIntro = () => {
  return (
    <Heading type={1} style={{marginBottom: 0}} headingText="Rate Spread Calculator">
      <p className="font-lead">
        This calculator provides rate spreads for HMDA reportable loans with a
        final action date on or after January 1st, 2018. Use the{' '}
        <a href="https://www.ffiec.gov/ratespread/newcalc.aspx">
          prior rate spread calculator
        </a>{' '}
        for loans with a final action date before January 1st, 2018.
      </p>
      <p>
        The rate spread calculator generates the spread between the Annual
        Percentage Rate (APR) and a survey-based estimate of APRs currently
        offered on prime mortgage loans of a comparable type utilizing the
        “Average Prime Offer Rates”{' '}
        <a
          download
          href="https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableFixed.txt"
        >
          fixed table
        </a>{' '}
        or{' '}
        <a
          href="https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableAdjustable.txt"
          download
        >
          adjustable table
        </a>, action taken, amortization type, lock-in date, APR, fixed term
        (loan maturity) or variable term (initial fixed-rate period), and
        reverse mortgage.
      </p>
      <p>
        <a
          href="https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/SurveyTable.csv"
          download
        >
          Mortgage rate survey data
        </a>{' '}
        used to calculate rate spreads for loans reportable under HMDA is
        available for download. The data source for the 1 year ARM product is
        CFPB market research. The data source for all other products in mortgage
        rate survey data is the Freddie Mac Primary Mortgage Market Survey®.
      </p>
      <p>
        <Link to="/tools/rate-spread/requirements">Data requirements</Link> for the
        rate spread calculator are provided in accordance with Regulation C
        effective January 1st, 2018.
      </p>
      <p>
        The <Link to="/tools/rate-spread/methodology">methodology</Link> for
        determining Average Prime Offer Rates is provided.
      </p>
    </Heading>
  )
}

export default AppIntro
