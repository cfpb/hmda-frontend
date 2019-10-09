import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import SearchList from './SearchList.jsx'
import YearSelector from '../../common/YearSelector.jsx'

import './ModifiedLar.css'

const ModifiedLar = props => {
  const year = props.match.params.year

  return (
    <React.Fragment>
      <div className="ModifiedLar" id="main-content">
        <Heading
          type={1}
          headingText="Modified Loan/Application Register (LAR)"
          paragraphText="A downloadable modified LAR file is available for every
            financial institution that has completed a HMDA data submission in the selected year.
            Enter a financial institution’s name to download its modified LAR file.
            If you cannot find a particular financial institution using this form, the
            institution may not have been required to report HMDA data or it
            may not have completed its HMDA data submission."
        >
          <p>
            <Link to="/documents#modified-lar">
              Modified LAR file specifications, schemas, and instructions
            </Link>
          </p>
        </Heading>
        <YearSelector standalone={true} />
        <SearchList year={year} />
      </div>
    </React.Fragment>
  )
}

export default ModifiedLar
