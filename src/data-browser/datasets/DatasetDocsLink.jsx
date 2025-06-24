import React from 'react'

const determineDataset = (year) => {
  let ThreeYear = [2020, 2019, 2018]
  let OneYear = [2022, 2021, 2020]

  if (ThreeYear.includes(year))
    return {
      name: 'Three Year',
      link: `/data-publication/three-year-national-loan-level-dataset/${year}`,
    }

  if (OneYear.includes(year))
    return {
      name: 'One Year',
      link: `/data-publication/one-year-national-loan-level-dataset/${year}`,
    }

  return {
    name: 'Snapshot',
    link: `/data-publication/snapshot-national-loan-level-dataset/${year}`,
  }
}

/**
 * Component that takes in a 'year' and generates Snapshot, One Year or Three Year direct links and includes link to 'Data Browser - FAQ'
 * @param {String} year string that contains the year (i.e) 2018, 2019, 2020 etc...
 */
const DatasetDocsLink = ({ year }) => {
  let dataset = determineDataset(parseInt(year))

  return (
    <div className='SelectWrapper' style={{ paddingTop: '.33em' }}>
      <p>
        Queries for {year} pull from the{' '}
        <a target='_blank' rel='noopener noreferrer' href={dataset.link}>
          {dataset.name}
        </a>{' '}
        dataset. For more info visit the{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`/documentation/faq/static-dataset-faq`}
        >
          Static Dataset FAQ.
        </a>
      </p>
    </div>
  )
}

export default DatasetDocsLink
