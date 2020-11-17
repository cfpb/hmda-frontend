import React from 'react'
import { Link } from 'react-router-dom'
import { isBeta } from '../common/Beta.jsx'
import { withAppContext } from '../common/appContextHOC'
import ConfiguredAlert from '../common/ConfiguredAlert'

import './Home.css'

export function isProd() {
  return window.location.hostname.match('ffiec')
}

const Home = ({ config }) => {
  const isProdBeta = isProd() && isBeta()
  const { announcement, defaultPeriod, publicationReleaseYear } = config

  return (
    <main className="App home" id="main-content">
      <div>
        <header>
          <h1>The Home Mortgage Disclosure Act</h1>
          <p className="lead">
            HMDA requires many financial institutions to maintain, report, and
            publicly disclose information about mortgages.
          </p>
        </header>
        {announcement && <ConfiguredAlert {...announcement} />}
      </div>
      <div style={{marginTop: '3em'}} className="usa-grid-full">
        <div className="card-container">
          <div className="card">
            <header>
              <h3>
                <a
                  href={`/filing/${defaultPeriod}/`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Access the HMDA Filing Platform
                </a>
              </h3>
              <p>
                Beginning with HMDA data collected in or after 2017, financial
                institutions will use the HMDA Platform to upload their
                loan/application registers (LARs), review edits, certify the
                accuracy and completeness of the data, and submit data for the
                filing year.
              </p>
            </header>

            <header>
              <h3>Help for Filers</h3>
              <p>
                Published resources for financial institutions required to file
                Home Mortgage Disclosure Act (HMDA) data.
              </p>
            </header>
            <ul>
              <li>Filing Instructions Guide</li>
              <ul>
                {[2021, 2020, 2019, 2018, 2017].map(year => {
                  if (year === 2018) {
                    return (
                      <li>
                        For data collected in {year}
                        <ul>
                          <li key={year + '-hmda-rule'}>
                            <a
                              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig-2018-hmda-rule.pdf`}
                              download={true}
                            >
                              Incorporating the 2018 HMDA rule
                            </a>
                          </li>
                          <li key={year}>
                            <a
                              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${year}-hmda-fig.pdf`}
                              download={true}
                            >
                              Prior to the 2018 HMDA rule
                            </a>
                          </li>
                        </ul>
                      </li>
                    )
                  }

                  { if (year === 2021) {
                    return <li key={year}>
                    <a
                      href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${year}-hmda-fig.pdf`}
                      download={true}
                    >
                      For data collected in {year}
                      <span className='last-updated'>( Last updated: 11/20/2020 )</span>
                    </a>
                  </li>
                  }}

                  return (
                    <li key={year}>
                      <a
                        href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${year}-hmda-fig.pdf`}
                        download={true}
                      >
                        For data collected in {year}
                      </a>
                    </li>
                  )
                })}                             
                <li>
                  For data collected in or before 2016, please visit the{' '}
                  <a
                    href="https://www.ffiec.gov/hmda/fileformats.htm"
                  >
                    FFIEC Website
                  </a>{' '}
                  for data submission resources.
                </li>
              </ul>
              <li>
                <a
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers-for-2021.pdf"
                  download={true}
                >
                  Supplemental Guide for Quarterly Filers for 2021
                </a>
              </li>
              <li>
                <a
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers.pdf"
                  download={true}
                >
                  Supplemental Guide for Quarterly Filers for 2020
                </a>
              </li>
              <li>
                <a href="https://www.ffiec.gov/hmda/guide.htm">
                  Getting It Right Guide
                </a>
              </li>
              <li>
                <a
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/HMDA-Loan-Scenarios.pdf"
                  download={true}
                >
                  Loan Scenarios
                </a>
              </li>
              <li>
                <a href="https://hmdahelp.consumerfinance.gov/knowledgebase/s/">
                  Self Service Knowledge Portal
                </a>: Contains answers to frequently asked HMDA Operations questions.
              </li>
              <li>
                For answers to frequently asked HMDA regulatory questions, please visit the{' '}
                <a href="https://www.consumerfinance.gov/policy-compliance/guidance/hmda-implementation/">
                  CFPB&apos;s Regulatory Implementation Website
                </a>.
              </li>
            </ul>
            {isProdBeta ? null :
            <header>
              <h3>
                <Link to="/documentation/">Documentation</Link>
              </h3>
              <p>
                A collection of documentation resources for HMDA data publication products.
              </p>
            </header>
            }
          </div>

          <div className="card">
            { isProdBeta ? null :
            <header>
              <h3>
                <Link to="/data-browser/">HMDA Data Browser</Link>
              </h3>
              <p>
                 The HMDA Data Browser is a tool that allows users to filter and download HMDA datasets.
              </p>
            </header>
            }
           {isProdBeta ? null :
            <header>
              <h3>
                <Link to="/tools/">Tools</Link>
              </h3>
              <p>
                Here you can find various tools to assist you in getting your
                HMDA LAR ready for filing.
              </p>
              <ul>
                <li>
                  <a href="/tools/rate-spread">Rate Spread</a>
                </li>
                <li>
                  <a href="/tools/check-digit">Check Digit</a>
                </li>
                <li>
                  <a href="/tools/file-format-verification">
                    File Format Verification
                  </a>
                </li>
                <li>
                  <a href="/tools/lar-formatting">LAR Formatting</a>
                </li>
              </ul>
            </header>
            }
            {isProdBeta ? null :
            <header>
              <h3>
                <Link to="/data-publication/">Data Publication</Link>
              </h3>
              <p>
                The HMDA data and reports are the most comprehensive publicly
                available information on mortgage market activity.
              </p>
              <ul>
                <li>
                  <a href={`/data-publication/modified-lar/${publicationReleaseYear}`}>
                    Modified LAR
                  </a>
                </li>
                <li>
                  <a href={`/data-publication/disclosure-reports/${publicationReleaseYear}`}>
                    Disclosure Reports
                  </a>
                </li>
                <li>
                  <a href={`/data-publication/aggregate-reports/${publicationReleaseYear}`}>
                    MSA/MD Aggregate Reports
                  </a>
                </li>
                <li>
                  <a href={`/data-publication/national-aggregate-reports/${publicationReleaseYear}`}>
                    National Aggregate Reports
                  </a>
                </li>
                <li>
                  <a href={`/data-publication/snapshot-national-loan-level-dataset/${publicationReleaseYear}`}>
                    Snapshot National Loan-Level Dataset
                  </a>
                </li>
                <li>
                  <a href={`/data-publication/dynamic-national-loan-level-dataset/${publicationReleaseYear}`}>
                    Dynamic National Loan-Level Dataset
                  </a>
                </li>
              </ul>
            </header>
           }
           {isProdBeta ? null :
            <header>
              <h3>
                <a href="https://www.consumerfinance.gov/data-research/hmda/">Research and Reports</a>
              </h3>
              <p>
                Research and reports on mortgage market activity
              </p>
            </header>
           }
          </div>
        </div>
      </div>
    </main>
  )
}

export default withAppContext(Home)
