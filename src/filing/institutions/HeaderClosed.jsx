import React from "react"
import Alert from "../../common/Alert"
import { formattedQtrBoundaryDate } from "../utils/date"

export const HeaderClosed = ({ filingPeriod, filingQtr, filingYear, filingQuartersLate }) => {
  return (
    <Alert
      heading={`The ${filingPeriod} filing period is closed.`}
      type="warning"
    >
      {!filingQtr ? (
        <p>
          The HMDA Platform remains available outside of the filing period for
          late submissions and resubmissions of {filingPeriod} HMDA data.
        </p>
      ) : (
        <p>
          As of{" "}
          <strong>
            {formattedQtrBoundaryDate(filingQtr, filingQuartersLate)},{" "}
            {filingYear}
          </strong>
          , submissions of {filingPeriod} HMDA data are no longer accepted.
          <br />
          For further questions regarding filing, please visit the{" "}
          <a
            href={`/documentation/${filingYear}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>{" "}
          page.
          <br />
          If you require additional assistance, contact{" "}
          <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
        </p>
      )}
    </Alert>
  )
}
