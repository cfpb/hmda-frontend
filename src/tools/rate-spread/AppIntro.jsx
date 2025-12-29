import { Link } from 'react-router-dom'
import Alert from '../../common/Alert.jsx'
import Heading from '../../common/Heading.jsx'
import { getDefaultConfig } from '../../common/configUtils'

function ToolAnnouncementAlert({ heading, type, message }) {
  return (
    <Alert heading={heading} type={type}>
      <p>{message}</p>
    </Alert>
  )
}

function AppIntro({ toolAnnouncement }) {
  const { fileServerDomain } = getDefaultConfig(window.location.hostname)
  return (
    <Heading
      type={1}
      style={{ marginBottom: 0 }}
      headingText='Rate Spread Calculator'
    >
      <p className='font-lead'>
        This calculator provides rate spreads for HMDA reportable loans with a
        final action date on or after January 1st, 2018. Use the{' '}
        <a href='https://www.ffiec.gov/ratespread/newcalc.aspx'>
          prior rate spread calculator
        </a>{' '}
        for loans with a final action date before January 1st, 2018.
      </p>
      {toolAnnouncement ? (
        <ToolAnnouncementAlert
          heading={toolAnnouncement.heading}
          type={toolAnnouncement.type}
          message={toolAnnouncement.message}
        />
      ) : null}

      {/* GHE 5356: Only show this alert until Jan 5, 2026 at 12:01 AM ET */}
      {new Date() < new Date('2026-01-05T00:01:00-05:00') && (
        <ToolAnnouncementAlert
          heading='APOR Update Notice'
          type='warning'
          message='In light of the federal holidays from Wednesday, December 24 to Friday, December 26, the CFPB is publishing for the week of 12/29/2025 the APORs for fixed rate and adjustable rate loans on Tuesday, December 23, based on the APORs from the prior week. This is consistent with the current APOR methodology.'
        />
      )}

      <p>
        The rate spread calculator generates the spread between the Annual
        Percentage Rate (APR) and a survey-based estimate of APRs currently
        offered on prime mortgage loans of a comparable type utilizing the
        “Average Prime Offer Rates”{' '}
        <a download href={`${fileServerDomain}/apor/YieldTableFixed.txt`}>
          fixed table
        </a>{' '}
        or{' '}
        <a
          href={`${fileServerDomain}/apor/YieldTableAdjustable.txt`}
          download
        >
          adjustable table
        </a>
        , action taken, amortization type, lock-in date, APR, fixed term (loan
        maturity) or variable term (initial fixed-rate period), and reverse
        mortgage.
      </p>
      <p>
        <a href={`${fileServerDomain}/apor/SurveyTable.csv`} download>
          Mortgage rate survey data
        </a>{' '}
        used to calculate rate spreads for loans reportable under HMDA is
        available for download. The data are provided through ICE Mortgage
        TechnologyTM. ICE Data as a Service is provided by ICE Mortgage
        TechnologyTM, part of Intercontinental Exchange, Inc.
      </p>
      <p>
        <Link to='/tools/rate-spread/requirements'>Data requirements</Link> for
        the rate spread calculator are provided in accordance with Regulation C
        effective January 1st, 2018.
      </p>
      <p>
        The <Link to='/tools/rate-spread/methodology'>current methodology</Link>{' '}
        for determining Average Prime Offer Rates is provided. APOR rates
        published prior to April 24, 2023 used an{' '}
        <Link to='/tools/rate-spread/methodology-alt'>
          alternate methodology
        </Link>{' '}
        and{' '}
        <a href={`${fileServerDomain}/apor/SurveyTable-legacy.csv`}>
          alternate rate survey data
        </a>{' '}
        which are also provided.
      </p>
    </Heading>
  )
}

export default AppIntro
