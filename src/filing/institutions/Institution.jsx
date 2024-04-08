import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import InstitutionNameAndId from './NameAndId.jsx'
import InstitutionStatus from './Status.jsx'
import InstitutionViewButton from './ViewButton.jsx'
import InstitutionRefile from './Refile.jsx'
import SubmissionNav from './Progress.jsx'
import SubmissionHistory from './SubmissionHistory.jsx'

const Institution = ({
  institution,
  filing,
  submission,
  submissions,
  links,
  submissionPages,
  selectedPeriod,
}) => {
  const status = submission && submission.status

  return (
    <React.Fragment>
      {/*
        a filing should be created when an institution is created
        so this shouldn't happen but just in case ...
        render the current status if there is a filing
        otherwise render an alert
      */}
      {filing ? (
        <section className='institution'>
          <div className='current-status'>
            <InstitutionNameAndId
              name={institution.name}
              lei={institution.lei}
              filingPeriod={filing.period || selectedPeriod.period}
            />

            <SubmissionNav submission={submission} />

            <InstitutionStatus
              filing={filing}
              submission={submission}
              isClosed={selectedPeriod.isClosed}
            />

            <InstitutionViewButton
              submission={submission}
              institution={institution}
              filingPeriod={filing.period}
              isClosed={selectedPeriod.isClosed}
            />

            <InstitutionRefile
              institution={institution}
              status={status}
              isClosed={selectedPeriod.isClosed}
            />
          </div>
          <SubmissionHistory
            submissions={submissions}
            lei={institution.lei}
            links={links}
            submissionPages={submissionPages}
          />
        </section>
      ) : (
        // this error is rendered here so we can
        // give the user the FI name and lei
        <section className='institution'>
          <div className='current-status'>
            <InstitutionNameAndId
              name={institution.name}
              lei={institution.lei}
              filingPeriod={selectedPeriod.period}
            />
            <Alert type='error' heading='Sorry, there was a problem.'>
              <p>
                There was a problem initializing your filing. Please contact{' '}
                <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
              </p>
            </Alert>
          </div>
        </section>
      )}
    </React.Fragment>
  )
}

Institution.propTypes = {
  institution: PropTypes.object,
  filing: PropTypes.object,
  submission: PropTypes.object,
  submissions: PropTypes.array,
  selectedPeriod: PropTypes.object,
}

export default Institution
