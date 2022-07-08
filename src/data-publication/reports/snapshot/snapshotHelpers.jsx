import React from 'react'
import { S3DatasetLink } from '../../../common/S3Integrations'
import { LabelWithTooltip } from '../LabelWithTooltip'

/**
 * Creates a link within a list item
 */
const makeListLink = ({ url, label }, _idx) => (
  <li key={url}>
    <a href={url}>{label}</a>
  </li>
)

/**
 * List of Documentation links for a given year
 * @param {String} year 
 * @returns Array
 */
export function linkToDocs(year = '2018') {
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

/**
 * Renders a formatted list of Datasets
 */
export function renderDatasets(datasets) {
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
                showLastUpdated={true} />
              <S3DatasetLink
                url={dataset.txt}
                label='Pipe Delimited'
                showLastUpdated={true} />
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
