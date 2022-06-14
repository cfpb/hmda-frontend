import React from 'react'
import Heading from '../../../common/Heading.jsx'
import YearSelector from '../../../common/YearSelector.jsx'
import { THREE_YEAR_DATASET } from '../../constants/three-year-datasets.js'
import { withAppContext } from '../../../common/appContextHOC.jsx'
import { S3DatasetLink } from '../../../common/S3Integrations'
import { LabelWithTooltip } from '../LabelWithTooltip.jsx'
import './ThreeYear.css'

function makeListLink(href, val) {
  return (
    <li key={href}>
      <a download={true} href={href}>{val}</a>
    </li>
  )
}

function linkToDocs(year = '2018'){
  return [
    <li key="0"><a href={`/documentation/${year}/public-lar-schema/`}>Public LAR Schema</a></li>,
    <li key="1"><a href={`/documentation/${year}/public-ts-schema/`}>Public Transmittal Sheet Schema</a></li>,
    <li key="2"><a href={`/documentation/${year}/public-panel-schema/`}>Public Panel Schema</a></li>,
    <li key="3"><a href={`/documentation/${year}/lar-data-fields/`}>Public HMDA Data Fields with Values and Definitions</a></li>,
    <li key="4"><a href={`/documentation/${year}/panel-data-fields/`}>Public Panel Values and Definitions</a></li>
  ]
}

function renderDatasets(datasets){
  return (
    <ul id='datasetList'>
      {datasets.map((dataset, i) => {
        return (
          <li key={i}>
            <LabelWithTooltip {...dataset} />
            <ul>
              <S3DatasetLink
                url={dataset.csv}
                label={'CSV'}
                showLastUpdated={true}
              />
              <S3DatasetLink
                url={dataset.txt}
                label={'Pipe Delimited'}
                showLastUpdated={true}
              />
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

const ThreeYear = props => {
  const { params, url } = props.match
  const { year } = params
  const { threeYear, shared  } = props.config.dataPublicationYears
  const years =  threeYear || shared
  const currYearsData = THREE_YEAR_DATASET[year]

  return (
    <div className="ThreeYear" id="main-content">
      <Heading
        type={1}
        headingText="Three Year National Loan Level Dataset"
        paragraphText={
          <>
            The data includes the Loan Application Register (LAR) and
            Transmittal Sheet (TS) submitted to the Bureau, which are made
            available to the public and include adjustments to the data
            incorporated in the 24 months following the reporting deadline.
            Transmittal sheets include information about the filing institution,
            reporting period, and contact information. LARs include all data
            fields relating to the reported loan or application. Each covered
            loan or application appears on its own line.
          </>
        }>
        {year === '2017'
          ? <p className="text-small">
              Three Year data has preserved some elements of historic LAR data files
              that are not present in the Dynamic Data. These columns are &quot;As of
              Date&quot;, &quot;Edit Status&quot;, &quot;Sequence Number&quot;, and &quot;Application Date
              Indicator&quot;. Be aware that data load procedures that handle both files
              will need to recognize this difference.
            </p>
          : null
        }
        <p className="text-small">
          Use caution when analyzing loan amount and income, which do not have
          an upper limit and may contain outliers.
        </p>
      </Heading>

      <YearSelector year={year} url={url} years={years} />

      { year ?
        <div className="grid">
          <div className="item">
            <Heading type={4} headingText={year + ' Datasets'} />
            {renderDatasets(currYearsData.datasets)}
          </div>
          <div className="item">
            <Heading type={4} headingText={year + ' File Specifications'} />
            <ul>
              {year === '2017'
                ? makeListLink(currYearsData.dataformat, 'Three Year LAR, TS and Reporter Panel')
                : linkToDocs(year)
              }
            </ul>
          </div>
        </div>
        : null }
    </div>
  )
}

export default withAppContext(ThreeYear)
