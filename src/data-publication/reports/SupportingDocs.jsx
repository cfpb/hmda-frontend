import React from 'react'
import Heading from '../../common/Heading.jsx'
import ExternalLink from '../../common/ExternalLink'
import { S3DocLink } from '../../common/S3Integrations.jsx'

import './SupportingDocs.css'

const ModifiedLarDocs = () => {
  return (
    <div className='SupportingDocs' id='main-content'>
      <Heading type={1} headingText='HMDA Supporting Documents'></Heading>
      <div className='DocSection'>
        <h2>Modified LAR</h2>
        <div>
          <h4>File specifications</h4>
          <div>
            Complete documentation for the dataset including field number, data
            type, valid values, and examples
            <ul>
              <li>
                <a
                  title='Modified LAR 2018, 2019, 2020, and 2021 file specification'
                  href='/documentation/v2/modified-lar-schema/'
                >
                  2018, 2019, 2020, and 2021
                </a>
              </li>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/v1/2017_Modified_LAR_Spec.csv'
                  }
                  title='Modified LAR 2017 file specification'
                  text='2017'
                />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4>Data Dictionaries</h4>
          <div>
            A simplified version of the file specification intended for easy
            conversion to SQL statements
            <ul>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/spec/markdown/modified_lar/2021_Modified_LAR_Data_Dictionary.md'
                  }
                  text='2021'
                  title='Modified LAR 2021 data dictionary'
                />
              </li>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/spec/markdown/modified_lar/2020_Modified_LAR_Data_Dictionary.md'
                  }
                  text='2020'
                  title='Modified LAR 2020 data dictionary'
                />
              </li>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/spec/markdown/modified_lar/2019_Modified_LAR_Data_Dictionary.md'
                  }
                  text='2019'
                  title='Modified LAR 2019 data dictionary'
                />
              </li>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/spec/markdown/modified_lar/2018_Modified_LAR_Data_Dictionary.md'
                  }
                  text='2018'
                  title='Modified LAR 2018 data dictionary'
                />
              </li>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/v1/2017_Modified_LAR_Data_Dictionary.csv'
                  }
                  text='2017'
                  title='Modified LAR 2017 data dictionary'
                />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4>Field Information</h4>
          <div>
            A discussion of the data available in the Modified LAR text files.
            Includes information on additional fields and how the base data was
            modified to protect the privacy of borrowers
            <ul>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/UsingModifiedLar.md'
                  }
                  text='Field Information'
                  title='Modified LAR Field information'
                />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4>Code Sheet</h4>
          <div>
            A quick reference guide containing the valid codes by field,
            intended for use during analysis
            <ul>
              <S3DocLink
                url={
                  'https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-public-LAR-code-sheet.pdf'
                }
                title='Modified LAR Code Sheet'
                label='Code Sheet'
              />
            </ul>
          </div>
        </div>
        <div>
          <h4>Opening Text Files With Excel</h4>
          <div>
            Step by step instructions for opening an institution&#39;s Modified
            LAR file in Excel and adding the column names
            <ul>
              <li>
                <ExternalLink
                  url={
                    'https://github.com/cfpb/hmda-platform/blob/master/docs/ModifiedLarWithExcel.md'
                  }
                  title='Opening Modified LAR Text Files With Excel'
                  text='Opening Text Files With Excel'
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModifiedLarDocs
