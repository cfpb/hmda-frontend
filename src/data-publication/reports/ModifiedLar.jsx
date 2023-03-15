import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import SearchList from './SearchList.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { withYearValidation } from '../../common/withYearValidation.js'
import { CombinedMLAR } from './CombinedMLAR.jsx'
import { Provider } from 'react-redux'
import s3Store from '../../common/s3/store'

import './ModifiedLar.css'

const ModifiedLar = props => {
  const { url, params: { year } } = props.match
  const { mlar, shared  } = props.config.dataPublicationYears
  const years = mlar || shared

  return (
    <React.Fragment>
      <div className="ModifiedLar" id="main-content">
        <Heading
          type={1}
          headingText="Modified Loan/Application Register (LAR)"
          paragraphText="A downloadable modified LAR file is available for every
            financial institution that has completed a HMDA data submission in the selected year.
            The modified LAR data represents the most current HMDA submission made by an institution.
            Enter a financial institution’s name to download its modified LAR file.
            If you cannot find a particular financial institution using this form, the
            institution may not have been required to report HMDA data or it
            may not have completed its HMDA data submission."
        >
          <p>
            <Link to="/data-publication/documents#modified-lar">
              Modified LAR file specifications, schemas, and instructions
            </Link>
          </p>
        </Heading>
        <YearSelector year={year} url={url} years={years}/>
        <div className="card">
          <h3>Modified LAR by <span className="highlight">Individual</span> Institution</h3>
          <SearchList year={year} isModLar />
          <p className="updateSchedule"><strong>Update Frequency:</strong> Upon Institution Submission</p>
        </div>
        <Provider store={s3Store}>
          <CombinedMLAR year={year} />
        </Provider>
      </div>
    </React.Fragment>
  )
}

export default withAppContext(withYearValidation(ModifiedLar))
