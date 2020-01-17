import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import InstitutionNameAndId from './NameAndId.jsx'
import InstitutionStatus from './Status.jsx'
import InstitutionViewButton from './ViewButton.jsx'
import InstitutionRefile from './Refile.jsx'
import InstitutionSubmissionHistory from './SubmissionHistory.jsx'
import SubmissionNav from './Progress.jsx'

const Institution = ({ institution, filing, filingQuarters, submission, submissions }) => {
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
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} lei={institution.lei} filingPeriod={filing.period} />

            <SubmissionNav submission={submission} />

            <InstitutionStatus filing={filing} submission={submission} />

            <InstitutionViewButton
              status={status}
              institution={institution}
              filingPeriod={filing.period}
            />

            <InstitutionRefile 
              institution={institution} 
              status={status} 
              filingPeriod={filing.period} 
              filingQuarters={filingQuarters}
            />
          </div>
          <InstitutionSubmissionHistory
            submissions={submissions}
            lei={institution.lei}
          />
        </section>
      ) : (
        // this error is rendered here so we can
        // give the user the FI name and lei
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} lei={institution.lei} />
            <Alert type="error" heading="Sorry, there was a problem.">
              <p>
                There was a problem initializing your filing. Please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
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
}

export default Institution
