import React from 'react'
import Alert from '../common/Alert.jsx'

const SubmissionPageInfo = () => {
  return (
    <section className="RefileWarning">
      <Alert
        type="info"
        heading="Your filing is ready to be signed and submitted"
      >
        <div>
          Please review your filing summary and sign your filing at the bottom
          of this page.
          <br />
          If you discover an error in the summary, you will need to update your
          file and upload it again.
        </div>
      </Alert>
    </section>
  )
}

export default SubmissionPageInfo
