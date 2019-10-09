import React from 'react'
import Heading from '../../common/Heading.jsx'

import './SupportingDocs.css'

const ModifiedLarDocs = props => {
  return (
    <div className="SupportingDocs" id="main-content">
      <Heading
        type={1}
        headingText="HMDA Supporting Documents"
      ></Heading>
      <div className="DocSection">
        <h2>Modified LAR</h2>
          <p>
            <h4>File specifications</h4>
            <div>
              Complete documentation for the dataset including field number, data type, valid values, and examples
              <ul>
              <li><a
                title="Modified LAR 2018 file specification"
                href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/spec/Modified%20LAR%20Schema.csv"
              >2018</a></li>
              <li><a
                title="Modified LAR 2017 file specification"
                href="https://github.com/cfpb/hmda-platform/blob/master/docs/v1/2017_Modified_LAR_Spec.csv"
              >2017</a></li>
              </ul>
            </div>
          </p>
          <p>
            <h4>Heading for CSV files</h4>
            <div>
              A list of column names for use with the Modified LAR text files
              <ul>
                <li>
                  <a
                    title="Modified LAR header for 2018 csv file"
                    href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/spec/2018_Modified_LAR_Heading.csv"
                  >2018</a>
                </li>
                <li>
                  <a
                    title="Modified LAR header for 2017 csv file"
                    href="https://github.com/cfpb/hmda-platform/blob/master/docs/v1/2017_Modified_LAR_Heading.csv"
                  >2017</a>
                </li>
              </ul>
            </div>
          </p>
          <p>
            <h4>Data Dictionaries</h4>
            <div>
              A simplified version of the file specification intended for easy conversion to SQL statements
              <ul>
                <li>
                  <a
                    title="Modified LAR 2018 data dictionary"
                    href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/spec/2018_Modified_LAR_Data_Dictionary.csv"
                  >2018</a>
                </li>
                <li>
                  <a
                    title="Modified LAR 2017 data dictionary"
                    href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/spec/2017_Modified_LAR_Data_Dictionary.csv"
                  >2017</a>
                </li>
              </ul>
            </div>
          </p>
          <p>
           <h4>Field Information</h4>
            <div>
              A discussion of the data available in the Modified LAR text files. Includes information on additional fields and how the base data was modified to protect the privacy of borrowers
              <ul>
                <li>
                <a
                  title="Modified LAR Field information"
                  href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/UsingModifiedLar.md"
                >Field Information</a>
                </li>
              </ul>
            </div>
          </p>
          <p>
            <h4>Code Sheet</h4>
            <div>
              A quick reference guide containing the valid codes by field, intended for use during analysis
              <ul>
                <li>
                    <a
                      title="Modified LAR Code Sheet"
                      href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/spec/2018_Modified_LAR_Code_Sheet.csv"
                    >Code Sheet</a>
                </li>
              </ul>
            </div>
          </p>
          <p>
            <h4>Opening Text Files With Excel</h4>
            <div>
              Step by step instructions for opening an institution&#39;s Modified LAR file in Excel and adding the column names
              <ul>
                <li>
                  <a
                    title="Opening Modified LAR Text Files With Excel"
                    href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/ModifiedLarWithExcel.md"
                  >Opening Text Files With Excel</a>
                </li>
              </ul>
            </div>
          </p>
      </div>
      {/*
      <div className="DocSection">
        <h2>Disclosure</h2>
          <p>
            Something else
          </p>
          <p>
            Another thing
          </p>
      </div>
      */}
    </div>
  )
}

export default ModifiedLarDocs

