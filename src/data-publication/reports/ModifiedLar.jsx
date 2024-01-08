import React, { useState } from 'react'
import Heading from '../../common/Heading.jsx'
import SearchList from './SearchList.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { withYearValidation } from '../../common/withYearValidation.jsx'
import { CombinedMLAR } from './CombinedMLAR.jsx'
import { Provider } from 'react-redux'
import s3Store from '../../common/s3/store'

import './ModifiedLar.css'

const ModifiedLar = (props) => {
  const [hasCombined, setHasCombined] = useState(false)
  const {
    url,
    params: { year },
  } = props.match
  const { mlar, shared } = props.config.dataPublicationYears
  const years = mlar || shared

  return (
    <React.Fragment>
      <div className='ModifiedLar' id='main-content'>
        <Heading
          type={1}
          headingText='Modified Loan/Application Register (LAR)'
          paragraphText={buildParagraphText(hasCombined)}
        >
          <p>
            <a
              href='/documentation/publications/modified-lar/resources/supporting-resources'
              target='_blank'
              rel='noopener noreferrer'
            >
              Modified LAR file specifications, schemas, and instructions
            </a>
          </p>
        </Heading>
        <YearSelector year={year} url={url} years={years} />
        <div className='card'>
          <h3>
            Modified LAR by <span className='highlight'>Individual</span>{' '}
            Institution
          </h3>
          <SearchList year={year} isModLar />
          <UpdateFrequency year={year} />
        </div>
        <Provider store={s3Store}>
          <CombinedMLAR
            year={year}
            hasCombined={hasCombined}
            setHasCombined={setHasCombined}
          />
        </Provider>
      </div>
    </React.Fragment>
  )
}

const buildParagraphText = (hasCombined) => {
  return (
    <>
      {BaseParagraphText}
      {hasCombined ? CombinedParagraphAddition : null}
      {BaseParagraphText2}
    </>
  )
}

const BaseParagraphText = (
  <>
    A downloadable modified LAR file is available for every financial
    institution that has completed a HMDA data submission in the selected year.
    The modified LAR data represents the most current HMDA submission made by an
    institution. Enter a financial institution’s name to download its modified
    LAR file. If you cannot find a particular financial institution using this
    form, the institution may not have been required to report HMDA data or it
    may not have completed its HMDA data submission.
  </>
)

const BaseParagraphText2 = (
  <>
    <br />
    <br />
    Typically, some data resubmissions to correct errors occur during the weeks
    following the annual submission deadline. For this reason, data users may
    want to wait for the release of the Snapshot National Loan-Level Dataset to
    analyze the nationwide data.
  </>
)

const CombinedParagraphAddition =
  " You may also download a combined file containing all financial institutions' modified LAR records in a single file. The combined file is updated weekly on Mondays."

export const UpdateFrequency = ({ year }) => {
  const currentYear = new Date().getFullYear()
  return (
    <p className='updateSchedule'>
      <strong>Update Frequency:</strong>{' '}
      {year >= currentYear - 3
        ? 'Upon Institution Submission'
        : 'Data No Longer Updated'}
    </p>
  )
}
export default withAppContext(withYearValidation(ModifiedLar))
