import { ONE_YEAR_DATASET } from './one-year-datasets'
import { SNAPSHOT_DATASET } from './snapshot-dataset'
import { THREE_YEAR_DATASET } from './three-year-datasets'

const base = '/data-publication/'
const arLink = (year) => `${base}aggregate-reports/${year}`
const drLink = (year) => `${base}disclosure-reports/${year}`
const dynLink = (year) => `${base}dynamic-national-loan-level-dataset/${year}`
const mlarLink = (year) => `${base}modified-lar/${year}`
const narLink = (year) => `${base}national-aggregate-reports/${year}`
const snapLink = (year) => `${base}snapshot-national-loan-level-dataset/${year}`
const oneYearLink = (year) =>
  `${base}one-year-national-loan-level-dataset/${year}`
const threeYearLink = (year) =>
  `${base}three-year-national-loan-level-dataset/${year}`

const arDesc = 'These reports summarize lending activity by MSA/MD.'
const drDesc =
  'These reports summarize lending activity for individual institutions, both nationwide and by MSA/MD.'
const dynDesc =
  'The dynamic files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy, updated weekly for all HMDA reporters.'
const mlarDesc =
  'The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy.'
const narDesc =
  'These reports summarize nationwide lending activity. They indicate the number and dollar amounts of loan applications, cross-tabulated by loan, borrower and geographic characteristics.'
const snapDesc =
  'The snapshot files contain the national HMDA datasets as of a fixed date for all HMDA reporters, as modified by the Bureau to protect applicant and borrower privacy.'
const oneYearDesc =
  'The data includes the Loan Application Register (LAR) and Transmittal Sheet (TS) submitted to the Bureau, which are made available to the public and include adjustments to the data incorporated in the 12 months following the reporting deadline.'
const threeYearDesc =
  'The data includes the Loan Application Register (LAR) and Transmittal Sheet (TS) submitted to the Bureau, which are made available to the public and include adjustments to the data incorporated in the 34 months following the reporting deadline.'

const arTitle = 'MSA/MD Aggregate Reports'
const drTitle = 'Disclosure Reports'
const dynTitle = 'Dynamic National Loan-Level Dataset'
const mlarTitle = 'Modified Loan/Application Register (LAR)'
const narTitle = 'National Aggregate Reports'
const snapTitle = 'Snapshot National Loan-Level Dataset'
const oneYearTitle = 'One Year National Loan-Level Dataset'
const threeYearTitle = 'Three Year National Loan-Level Dataset'

const publications = {
  2023: [
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2023',
      headingLink: snapLink(2023),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2023].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2023',
      headingLink: drLink(2023),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2023',
      headingLink: arLink(2023),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2023',
      headingLink: mlarLink(2023),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2023',
      headingLink: dynLink(2023),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2022: [
    {
      updateFrequency:
        'Does not update. Generated one year after filing deadline',
      availableFor: '2019-2022',
      headingLink: oneYearLink(2022),
      headingText: oneYearTitle,
      paragraphText: oneYearDesc,
      freezeDate: ONE_YEAR_DATASET[2022].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2022',
      headingLink: snapLink(2022),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2022].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2022',
      headingLink: drLink(2022),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2022',
      headingLink: arLink(2022),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2022',
      headingLink: mlarLink(2022),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2022',
      headingLink: dynLink(2022),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2021: [
    {
      updateFrequency:
        'Does not update. Generated one year after filing deadline',
      availableFor: '2019-2021',
      headingLink: oneYearLink(2021),
      headingText: oneYearTitle,
      paragraphText: oneYearDesc,
      freezeDate: ONE_YEAR_DATASET[2021].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: snapLink(2021),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2021].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: drLink(2021),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: arLink(2021),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2021',
      headingLink: mlarLink(2021),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2021',
      headingLink: dynLink(2021),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2020: [
    {
      updateFrequency:
        'Does not update. Generated three years after filing deadline',
      availableFor: '2017-2020',
      headingLink: threeYearLink(2020),
      headingText: threeYearTitle,
      paragraphText: threeYearDesc,
      freezeDate: THREE_YEAR_DATASET[2020].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated one year after filing deadline',
      availableFor: '2019-2020',
      headingLink: oneYearLink(2020),
      headingText: oneYearTitle,
      paragraphText: oneYearDesc,
      freezeDate: ONE_YEAR_DATASET[2020].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: snapLink(2020),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2020].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: drLink(2020),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: arLink(2020),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2021',
      headingLink: mlarLink(2020),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2021',
      headingLink: dynLink(2020),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2019: [
    {
      updateFrequency:
        'Does not update. Generated three years after filing deadline',
      availableFor: '2017-2019',
      headingLink: threeYearLink(2019),
      headingText: threeYearTitle,
      paragraphText: threeYearDesc,
      freezeDate: THREE_YEAR_DATASET[2019].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated one year after filing deadline',
      availableFor: '2019-2020',
      headingLink: oneYearLink(2019),
      headingText: oneYearTitle,
      paragraphText: oneYearDesc,
      freezeDate: ONE_YEAR_DATASET[2019].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: snapLink(2019),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2019].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: drLink(2019),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: arLink(2019),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2021',
      headingLink: mlarLink(2019),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2021',
      headingLink: dynLink(2019),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2018: [
    {
      updateFrequency:
        'Does not update. Generated three years after filing deadline',
      availableFor: '2017-2018',
      headingLink: threeYearLink(2018),
      headingText: threeYearTitle,
      paragraphText: threeYearDesc,
      freezeDate: THREE_YEAR_DATASET[2018].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: snapLink(2018),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2018].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: drLink(2018),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: arLink(2018),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2021',
      headingLink: mlarLink(2018),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2021',
      headingLink: dynLink(2018),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2017: [
    {
      updateFrequency:
        'Does not update. Generated three years after filing deadline',
      availableFor: '2017-2018',
      headingLink: threeYearLink(2017),
      headingText: threeYearTitle,
      paragraphText: threeYearDesc,
      freezeDate: THREE_YEAR_DATASET[2017].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: snapLink(2017),
      headingText: snapTitle,
      paragraphText: snapDesc,
      freezeDate: SNAPSHOT_DATASET[2017].freezeDate,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: drLink(2017),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      updateFrequency:
        'Does not update. Generated a few months after filing deadline',
      availableFor: '2017-2021',
      headingLink: arLink(2017),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      updateFrequency: 'Does not update.',
      availableFor: '2017',
      headingLink: narLink(2017),
      headingText: narTitle,
      paragraphText: narDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Upon Institution resubmission',
      availableFor: '2017-2021',
      headingLink: mlarLink(2017),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      group: 'dynamic',
      updateFrequency: 'Weekly on Mondays',
      availableFor: '2019-2021',
      headingLink: dynLink(2017),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
}

export default publications
