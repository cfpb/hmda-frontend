import React from 'react'
import Alert from '../../common/Alert.jsx'

const SubmissionPageInfo = ({ isPassed }) => {
  let type, heading, content

  if (isPassed) {
    type = 'warning'
    heading = 'Filing period is closed'
    content = (
      <div>
        The filing deadline has passed. New signings are no longer accepted.
      </div>
    )
  } else {
    type = 'info'
    heading = 'Your official filing is ready to be signed and submitted'
    content = (
      <div>
        Please review your filing summary and sign your filing at the bottom of
        this page.
        <br />
        If you discover an error in the summary, you will need to update your
        file and upload it again.
      </div>
    )
  }

  return (
    <section className='RefileWarning'>
      <Alert type={type} heading={heading}>
        {content}
      </Alert>
    </section>
  )
}

export default SubmissionPageInfo
