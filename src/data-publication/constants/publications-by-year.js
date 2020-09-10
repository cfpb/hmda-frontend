const base = '/data-publication/'
const mlarLink = year => `${base}modified-lar/${year}`
const drLink = year => `${base}disclosure-reports/${year}`
const arLink = year => `${base}aggregate-reports/${year}`
const narLink = year => `${base}national-aggregate-reports/${year}`
const snapLink = year => `${base}snapshot-national-loan-level-dataset/${year}`
const dynLink = year => `${base}dynamic-national-loan-level-dataset/${year}`
const finLink = year => `${base}final-national-loan-level-dataset/${year}`
const ultLink = year => `${base}ultimate-national-loan-level-dataset/${year}`

const publications =  {
  '2019': [
      {
        headingLink: mlarLink(2019),
        headingText: "Modified Loan/Application Register (LAR)",
        paragraphText: "The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy.",
      },
      {
        headingLink: drLink(2019),
        headingText: "Disclosure Reports",
        paragraphText: "These reports summarize lending activity for individual institutions, both nationwide and by MSA/MD.",
      },
      {
        headingLink: arLink(2019),
        headingText: "MSA/MD Aggregate Reports",
        paragraphText: "These reports summarize lending activity by MSA/MD.",
        
      },
      {
        headingLink: snapLink(2019),
        headingText: "Snapshot National Loan-Level Dataset",
        paragraphText: "The snapshot files contain the national HMDA datasets as of a fixed date for all HMDA reporters, as modified by the Bureau to protect applicant and borrower privacy.",
      },
      {
        headingLink: dynLink(2019),
        headingText: "Dynamic National Loan-Level Dataset",
        paragraphText: "The dynamic files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy, updated weekly for all HMDA reporters.",
      },
  ],
  '2018': [
    {
      headingLink: mlarLink(2018),
      headingText: "Modified Loan/Application Register (LAR)",
      paragraphText: "The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy.",
    },
    {
      headingLink: drLink(2018),
      headingText: "Disclosure Reports",
      paragraphText: "These reports summarize lending activity for individual institutions, both nationwide and by MSA/MD.",
    },
    {
      headingLink: arLink(2018),
      headingText: "MSA/MD Aggregate Reports",
      paragraphText: "These reports summarize lending activity by MSA/MD.",
      
    },
    {
      headingLink: finLink(2018),
      headingText: "Final National Loan-Level Dataset",
      paragraphText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat non deleniti! Voluptatem esse corrupti eligendi animi suscipit, at explicabo.",
    },
    {
      headingLink: snapLink(2018),
      headingText: "Snapshot National Loan-Level Dataset",
      paragraphText: "The snapshot files contain the national HMDA datasets as of a fixed date for all HMDA reporters, as modified by the Bureau to protect applicant and borrower privacy.",
    },
    {
      headingLink: dynLink(2018),
      headingText: "Dynamic National Loan-Level Dataset",
      paragraphText: "The dynamic files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy, updated weekly for all HMDA reporters.",
    },
  ],
  '2017': [
    {
      headingLink: mlarLink(2017),
      headingText: "Modified Loan/Application Register (LAR)",
      paragraphText: "The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy.",
    },
    {
      headingLink: drLink(2017),
      headingText: "Disclosure Reports",
      paragraphText: "These reports summarize lending activity for individual institutions, both nationwide and by MSA/MD.",
    },
    {
      headingLink: arLink(2017),
      headingText: "MSA/MD Aggregate Reports",
      paragraphText: "These reports summarize lending activity by MSA/MD.",
      
    },
    {
      headingLink: narLink(2017),
      headingText: "National Aggregate Reports",
      paragraphText: "These reports summarize nationwide lending activity. They indicate the number and dollar amounts of loan applications, cross-tabulated by loan, borrower and geographic characteristics.",
      
    },
    {
      headingLink: ultLink(2017),
      headingText: "Ultimate National Loan-Level Dataset",
      paragraphText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero a consectetur expedita omnis quasi quod, dolorem provident ducimus soluta eum praesentium nobis minus odio tempora quae aperiam? Magnam, deleniti possimus.",
    },
    {
      headingLink: finLink(2017),
      headingText: "Final National Loan-Level Dataset",
      paragraphText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat non deleniti! Voluptatem esse corrupti eligendi animi suscipit, at explicabo.",
    },
    {
      headingLink: snapLink(2017),
      headingText: "Snapshot National Loan-Level Dataset",
      paragraphText: "The snapshot files contain the national HMDA datasets as of a fixed date for all HMDA reporters, as modified by the Bureau to protect applicant and borrower privacy.",
    },
    {
      headingLink: dynLink(2017),
      headingText: "Dynamic National Loan-Level Dataset",
      paragraphText: "The dynamic files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy, updated weekly for all HMDA reporters.",
    },
  ]
}

export default publications