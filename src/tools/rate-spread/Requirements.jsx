import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'

const Requirements = () => {
  return (
    <div className='data-requirements grid' id='main-content'>
      <Heading
        type={1}
        headingText='Data Requirements for the Rate Spread Calculator'
        paragraphText='The calculator requires several components to successfully generate a
        rate spread for HMDA reporting. The required data include the action
        taken type, reverse mortgage code, amortization type, rate-set date,
        annual percentage rate, and loan term.'
      >
        <p>
          <Link to='/tools/rate-spread'>
            Go back to the Rate Spread Calculator
          </Link>
        </p>
      </Heading>

      <div>
        <h3>Action Taken Type</h3>
        <p>
          Select Action Taken code 1, 2 or 8. Under the 2015 HMDA Final Rule,
          rate spread is reported only on originated loans, applications that
          were approved but not accepted and preapproval requests that were
          approved but not accepted. If Action Taken equals 3, 4, 5, 6, or 7,
          report Rate Spread as NA.
        </p>
        <h3>Reverse Mortgage Code</h3>
        <p>
          Under the 2015 HMDA Final Rule, rate spread is not applicable for
          reverse mortgages. Therefore, the rate spread calculator specifies
          that Reverse Mortgage equals 2. If Reverse Mortgage equals 1, report
          Rate Spread as NA.
        </p>
        <h3>Amortization Type</h3>
        <p>
          Select an amortization type. Based on this selection, the calculator
          logic will determine whether the fixed or adjustable table should be
          referenced to perform the calculation.
        </p>
        <h3>Rate-set Date</h3>
        <p>
          Financial institutions are required to compare the APR for the covered
          loan or application disclosed on the applicable Regulation Z
          disclosure with the corresponding ‘rate’ from the applicable ‘Average
          Prime Offer Rates” table. All loans locking from Monday through the
          following Sunday would use the APOR posted on the previous Thursday.
          For consistency’s sake, financial institutions may not apply new
          benchmarks before the Monday following publication, even if their
          systems are capable of applying the new benchmarks earlier.
        </p>
        <p>
          Enter the rate-set date in mm/dd/yyyy format. Dates entered must be
          between January 2nd, 2017 and the current date.
        </p>
        <p>
          To calculate rate spread on loans with an action taken date prior to
          January 1st, 2018 use the{' '}
          <a href='https://www.ffiec.gov/ratespread/newcalc.aspx'>
            prior rate spread calculator
          </a>
          .
        </p>
        <p>
          If an interest rate is set pursuant to a "lock-in" agreement between
          the financial institution and the borrower, then the date on which the
          agreement fixes the interest rate is the date the rate was set. If a
          rate is re-set after a lock-in agreement is executed (for example,
          because the borrower exercises a float-down option or the agreement
          expires), then the relevant date is the date the financial institution
          exercises discretion in setting the rate for the final time before
          final action is taken. If no lock-in agreement is executed, then the
          relevant date is the date on which the financial institution sets the
          rate for the final time before final action is taken.
        </p>
        <h3>Annual Percentage Rate (APR)</h3>
        <p>
          Enter the APR in percentage format. Data entered should be in the
          range 0 to 99.999%. For example, an APR of 4.875% should be entered
          4.875. If the figure is more than three decimal places, users may
          round the figure or truncate the digits beyond three decimal places.
          If the figure is less than three decimal places, trailing zeros may be
          included or truncated. Do not include any leading zeros.
        </p>
        <h3>
          Loan Term: Fixed rate (loan maturity) or Variable rate (initial
          fixed-rate period)
        </h3>
        <p>
          Enter the loan term in years between 1 and 50. The loan term is
          defined differently depending on whether the loan is fixed- or
          variable- rate. For a fixed-rate loan, the term is the loan’s
          maturity, that is, the period until the last payment will be due under
          the loan contract. For a variable-rate loan, the term is the initial,
          fixed-rate period, that is, the period until the first schedule rate
          reset. For example, five years is the relevant term for a
          variable-rate transaction with a five-year, fixed-rate introductory
          period that is amortized over thirty years.
        </p>
        <p>
          When a covered loan’s term to maturity (or, for a variable-rate
          transaction, the initial fixed-rate period) is not in whole years, the
          financial institution uses the number of whole years closest to the
          actual loan term or, if the actual loan term is exactly halfway
          between two whole years, by using the shorter loan term. There is an
          exception for a loan term shorter than six months (including
          variable-rate covered loans with no initial, fixed-rate periods),
          which should be rounded to 1.
        </p>
        <p>
          If the amortization period of a loan is longer than the term of the
          loan because, for example, the loan has a balloon feature, enter the
          loan term to determine the applicable prime offer rate. For example,
          in the case of a five-year loan that has a balloon payment because the
          payments are amortized over 30 years, enter a term of 5.
        </p>
      </div>
    </div>
  )
}

export default Requirements
