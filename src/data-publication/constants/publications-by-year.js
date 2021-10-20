const base = '/data-publication/'
const arLink = year => `${base}aggregate-reports/${year}`
const drLink = year => `${base}disclosure-reports/${year}`
const dynLink = year => `${base}dynamic-national-loan-level-dataset/${year}`
const oneYearLink = year => `${base}one-year-national-loan-level-dataset/${year}`
const mlarLink = year => `${base}modified-lar/${year}`
const narLink = year => `${base}national-aggregate-reports/${year}`
const snapLink = year => `${base}snapshot-national-loan-level-dataset/${year}`
const threeYearLink = year => `${base}three-year-national-loan-level-dataset/${year}`

const arDesc = "These reports summarize lending activity by MSA/MD."
const drDesc = "These reports summarize lending activity for individual institutions, both nationwide and by MSA/MD."
const dynDesc = "The dynamic files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy, updated weekly for all HMDA reporters."
const oneYearDesc = "The data includes the Loan Application Register (LAR) and Transmittal Sheet (TS) submitted to the Bureau, which are cutoff when revisions to the data filing period is complete. Transmittal sheets include information about the filing institution, reporting period, and contact information. LARs include all data fields relating to the reported loan or application. Each covered loan or application appears on its own line."
const mlarDesc = "The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy."
const narDesc = "These reports summarize nationwide lending activity. They indicate the number and dollar amounts of loan applications, cross-tabulated by loan, borrower and geographic characteristics."
const snapDesc = "The snapshot files contain the national HMDA datasets as of a fixed date for all HMDA reporters, as modified by the Bureau to protect applicant and borrower privacy."
const threeYearDesc = "The data includes the Loan Application Register (LAR) and Transmittal Sheet (TS) submitted to the Bureau, which are made available to the public and include adjustments to the data incorporated in the 24 months following the reporting deadline. Transmittal sheets include information about the filing institution, reporting period, and contact information. LARs include all data fields relating to the reported loan or application. Each covered loan or application appears on its own line."

const arTitle = "MSA/MD Aggregate Reports"
const drTitle = "Disclosure Reports"
const dynTitle = "Dynamic National Loan-Level Dataset"
const mlarTitle = "Modified Loan/Application Register (LAR)"
const narTitle = "National Aggregate Reports"
const snapTitle = "Snapshot National Loan-Level Dataset"
const oneYearTitle = "One Year National Loan-Level Dataset"
const threeYearTitle = "Three Year National Loan-Level Dataset"


const publications = {
  2019: [
    {
      headingLink: mlarLink(2019),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      headingLink: drLink(2019),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      headingLink: arLink(2019),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      headingLink: snapLink(2019),
      headingText: snapTitle,
      paragraphText: snapDesc,
    },
    {
      headingLink: dynLink(2019),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2018: [
    {
      headingLink: mlarLink(2018),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      headingLink: drLink(2018),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      headingLink: arLink(2018),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      headingLink: oneYearLink(2018),
      headingText: oneYearTitle,
      paragraphText: oneYearDesc,
    },
    {
      headingLink: snapLink(2018),
      headingText: snapTitle,
      paragraphText: snapDesc,
    },
    {
      headingLink: dynLink(2018),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
  2017: [
    {
      headingLink: mlarLink(2017),
      headingText: mlarTitle,
      paragraphText: mlarDesc,
    },
    {
      headingLink: drLink(2017),
      headingText: drTitle,
      paragraphText: drDesc,
    },
    {
      headingLink: arLink(2017),
      headingText: arTitle,
      paragraphText: arDesc,
    },
    {
      headingLink: narLink(2017),
      headingText: narTitle,
      paragraphText: narDesc,
    },
    {
      headingLink: threeYearLink(2017),
      headingText: threeYearTitle,
      paragraphText: threeYearDesc,
    },
    {
      headingLink: oneYearLink(2017),
      headingText: oneYearTitle,
      paragraphText: oneYearDesc,
    },
    {
      headingLink: snapLink(2017),
      headingText: snapTitle,
      paragraphText: snapDesc,
    },
    {
      headingLink: dynLink(2017),
      headingText: dynTitle,
      paragraphText: dynDesc,
    },
  ],
}

export default publications