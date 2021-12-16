import React from 'react'
import { Link } from 'react-router-dom'
import { S3DocLink } from '../common/S3Integrations'

const links = {
  2017: [
    <S3DocLink
      key='0'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2017-hmda-fig.pdf'
      label='For data collected in 2017'
    />
  ],
  2018: [
    <S3DocLink
      key='1'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig.pdf'
      label='For data collected in 2018'
    />,
    <S3DocLink
      key='2'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig-2018-hmda-rule.pdf'
      label='For data collected in 2018 incorporating the 2018 HMDA rule'
    />
  ],
  2019: [
    <S3DocLink
      key='3'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2019-hmda-fig.pdf'
      label='For data collected in 2019'
    />,
    <li key='4'>
      <Link to='/documentation/2019/annual-filing-dates/'>
        Annual HMDA Filing Period Dates
      </Link>
    </li>
  ],
  2020: [
    <S3DocLink
      key='5'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2020-hmda-fig.pdf'
      label='For data collected in 2020'
    />,
    <S3DocLink
      key='6'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers.pdf'
      label='Supplemental Guide for Quarterly Filers'
    />,
    <li key='7'>
      <Link to='/documentation/2020/annual-filing-dates/'>
        Annual HMDA Filing Period Dates
      </Link>
    </li>,
    <li key='8'>
      <Link to='/documentation/2020/quarterly-filing-dates/'>
        Quarterly HMDA Filing Period Dates
      </Link>
    </li>
  ],
  2021: [
    <S3DocLink
      key='9'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2021-hmda-fig.pdf'
      label='For data collected in 2021'
    />,
    <S3DocLink
      key='10'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers.pdf'
      label='Supplemental Guide for Quarterly Filers'
    />,
    <li key='11'>
      <Link to='/documentation/2021/annual-filing-dates/'>
        Annual HMDA Filing Period Dates
      </Link>
    </li>,
    <li key='12'>
      <Link to='/documentation/2021/quarterly-filing-dates/'>
        Quarterly HMDA Filing Period Dates
      </Link>
    </li>
  ]
}

const FigLinks = props => {
  return (
    <>
        <ul>{links[props.year]}</ul>
    </>
  )
}

export default FigLinks
