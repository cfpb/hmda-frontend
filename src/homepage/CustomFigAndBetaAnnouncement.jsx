import Alert from '../common/Alert'

export function CustomFigAndBetaAnnouncement() {
  return (
    <Alert
      heading='2027 Online Filing Instructions Guide and HMDA Beta Platform Released'
      type='error'
    >
      <div>
        <p>
          On November 18, 2026, the CFPB released the{' '}
          <a href='https://ffiec.cfpb.gov/documentation/fig/2027/overview'>
            2027 Online Filing Instructions Guide (FIG)
          </a>
          , the{' '}
          <a href='https://ffiec.cfpb.gov/documentation/fig/2027/supplemental-guide-for-quarterly-filers'>
            Online Supplemental Guide for Quarterly Filers for 2027
          </a>
          , and the{' '}
          <a href='https://ffiec.beta.cfpb.gov/'>
            HMDA Beta Platform for data collected in 2027
          </a>
          . Learn more on the{' '}
          <a href='https://ffiec.cfpb.gov/updates-notes'>News and Updates</a>{' '}
          page.
        </p>
      </div>
    </Alert>
  )
}
