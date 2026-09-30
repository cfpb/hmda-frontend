import Alert from '../../common/Alert'
import { isBeta } from '../../common/Beta'
import { HeaderDocsLink } from './Header'

export function HeaderOpen({ period, lateDate, endDate }) {
  const officialOrSimulated = isBeta() ? (
    <>
      You may <span className='simulated'>simulate filing of HMDA data</span>{' '}
      for your authorized institutions below.
    </>
  ) : (
    <>
      You may <span className='official'>file official HMDA data</span> for your
      authorized institutions below.
    </>
  )

  return (
    <Alert heading={`The ${period} filing period is open.`}>
      <div>
        <p className='font-lead'>
          Timely submissions of {period} HMDA data will be accepted until{' '}
          <strong>{lateDate}</strong>.
          <br />
          Resubmissions and late submissions will be accepted until{' '}
          <strong>{endDate}</strong>.
        </p>
        <p className='font-lead'>
          <HeaderDocsLink period={period} />{' '}
          {!isBeta() && (
            <>
              The{' '}
              <a
                href='https://ffiec.beta.cfpb.gov/filing'
                target='_blank'
                rel='noreferrer'
              >
                HMDA Beta Platform
              </a>{' '}
              is available to test your HMDA data prior to official submission.
              Our{' '}
              <a href='/tools/online-lar-formatting' target='_blank'>
                Online LAR Formatting Tool
              </a>{' '}
              can help you validate your file.
            </>
          )}
          <p>{officialOrSimulated}</p>
        </p>
      </div>
    </Alert>
  )
}
