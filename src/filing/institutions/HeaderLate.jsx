import React from "react"
import Alert from "../../common/Alert"
import { formattedQtrBoundaryDate } from "../utils/date"

export const HeaderLate = ({
  filingPeriod,
  filingQuarters,
  filingYear,
  filingQtr,
  filingQuartersLate
}) => {
  return (
    <Alert
      heading={`The ${filingPeriod} filing deadline has passed.`}
      type="warning"
    >
      <>
        <p>
          Submissions of {filingPeriod} data are no longer considered timely, as
          of{" "}
          <strong>
            {formattedQtrBoundaryDate(filingQtr, filingQuarters, 1)},{" "}
            {filingYear}
          </strong>
          .
          <br />
          The platform will continue to accept late submissions until{" "}
          <strong>
            {formattedQtrBoundaryDate(filingQtr, filingQuartersLate, 1)},{" "}
            {filingYear}
          </strong>
          .
        </p>
        <p>
          For more info on quarterly filing dates, visit the{" "}
          <a
            target="_blank"
            href={`https://ffiec.cfpb.gov/documentation/${filingYear}/quarterly-filing-dates/`}
            rel="noopener noreferrer"
          >
            documentation page.
          </a>
          <br />
          You may file HMDA data for your authorized institutions below.
        </p>
      </>
    </Alert>
  )
}
