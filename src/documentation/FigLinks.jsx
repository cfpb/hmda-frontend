import React from 'react'
import { Link } from 'react-router-dom'
import ExternalLink from '../common/ExternalLink'

const links = {
  2017: [
    <li key="0"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2017-hmda-fig.pdf">For data collected in 2017</ExternalLink></li>,
  ],
  2018: [
    <li key="1"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig.pdf">For data collected in 2018</ExternalLink></li>,
    <li key="2"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig-2018-hmda-rule.pdf">For data collected in 2018 incorporating the 2018 HMDA rule</ExternalLink></li>
  ],
  2019: [
    <li key="3"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2019-hmda-fig.pdf">For data collected in 2019</ExternalLink></li>,
    <li key="4"><Link to="/documentation/2019/annual-filing-dates/">Annual HMDA Filing Period Dates</Link></li>
  ],
  2020: [
    <li key="5"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2020-hmda-fig.pdf">For data collected in 2020</ExternalLink></li>,
    <li key="6"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers.pdf">Supplemental Guide for Quarterly Filers</ExternalLink></li>,
    <li key="7"><Link to="/documentation/2020/annual-filing-dates/">Annual HMDA Filing Period Dates</Link></li>,
    <li key="8"><Link to="/documentation/2020/quarterly-filing-dates/">Quarterly HMDA Filing Period Dates</Link></li>
  ],
  2021: [
    <li key="9"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2021-hmda-fig.pdf">For data collected in 2021 ( Last updated: 11/20/2020 )</ExternalLink></li>,
    <li key="10"><ExternalLink url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers-for-2021.pdf">Supplemental Guide for Quarterly Filers for 2021</ExternalLink></li>,
    <li key="11"><Link to="/documentation/2021/annual-filing-dates/">Annual HMDA Filing Period Dates</Link></li>,
    <li key="12"><Link to="/documentation/2021/quarterly-filing-dates/">Quarterly HMDA Filing Period Dates</Link></li>
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
