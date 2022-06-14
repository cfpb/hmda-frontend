import React from 'react'
import Heading from '../../../common/Heading.jsx'
import YearSelector from '../../../common/YearSelector.jsx'
import { ONE_YEAR_DATASET } from '../../constants/one-year-datasets.js'
import { withAppContext } from '../../../common/appContextHOC.jsx'
import { S3DatasetLink, S3DocLink } from '../../../common/S3Integrations'
import { LabelWithTooltip } from '../LabelWithTooltip'
import './OneYear.css'

const makeListLink = ({ url, label }, idx) => (
  <li key={idx}>
    <a href={url}>{label}</a>
  </li>
)

function linkToDocs(year = '2018') {
  const entries = [
    {
      url: `/documentation/${year}/public-lar-schema/`,
      label: 'Public LAR Schema',
    },
    {
      url: `/documentation/${year}/public-ts-schema/`,
      label: 'Public Transmittal Sheet Schema',
    },
    {
      url: `/documentation/${year}/public-panel-schema/`,
      label: 'Public Panel Schema',
    },
    {
      url: `/documentation/${year}/lar-data-fields/`,
      label: 'Public HMDA Data Fields with Values and Definitions',
    },
    {
      url: `/documentation/${year}/panel-data-fields/`,
      label: 'Public Panel Values and Definitions',
    },
  ]
  
  return entries.map(makeListLink)
}

function renderDatasets(datasets) {
  return (
    <ul id='datasetList'>
      {datasets.map((dataset, i) => {
        return (
          <li key={i}>
            <LabelWithTooltip {...dataset} />
            <ul className='dataset-items'>
              <S3DatasetLink
                url={dataset.csv}
                label='CSV'
                showLastUpdated={true}
              />
              <S3DatasetLink
                url={dataset.txt}
                label='Pipe Delimited'
                showLastUpdated={true}
              />
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

const OneYear = props => {
  const { params, url } = props.match
  const { year } = params
  const { oneYear, shared } = props.config.dataPublicationYears
  const years = oneYear || shared
  const currYearsData = ONE_YEAR_DATASET[year]

  return (
    <div className='OneYear' id='main-content'>
      <Heading
        type={1}
        headingText='One Year Loan Level Dataset'
        paragraphText={
          <>
            The data includes the Loan Application Register (LAR) and
            Transmittal Sheet (TS) submitted to the Bureau, which are made
            available to the public and include adjustments to the data
            incorporated in the 12 months following the reporting deadline.
            Transmittal sheets include information about the filing institution,
            reporting period, and contact information. LARs include all data
            fields relating to the reported loan or application. Each covered
            loan or application appears on its own line.
          </>
        }
      >
        {year === '2017' ? (
          <p className='text-small'>
            One Year data has preserved some elements of historic LAR data files
            that are not present in the Dynamic Data. These columns are "As of
            Date", "Edit Status", "Sequence Number", and "Application Date
            Indicator". Be aware that data load procedures that handle both
            files will need to recognize this difference.
          </p>
        ) : null}
        <p className='text-small'>
          Use caution when analyzing loan amount and income, which do not have
          an upper limit and may contain outliers.
        </p>
      </Heading>

      <YearSelector year={year} url={url} years={years} />

      {year ? (
        <div className='grid'>
          <div className='item'>
            <Heading type={4} headingText={year + ' Datasets'} />
            {renderDatasets(currYearsData.datasets)}
          </div>
          <div className='item'>
            <Heading type={4} headingText={year + ' File Specifications'} />
            <ul>
              {year === '2017' ? (
                <S3DocLink
                  key={currYearsData.dataformat}
                  url={currYearsData.dataformat}
                  label={'One Year LAR, TS and Reporter Panel'}
                  showLastUpdated={true}
                />
              ) : (
                linkToDocs(year)
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default withAppContext(OneYear)
