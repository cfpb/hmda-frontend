import React from 'react'

const links = {
  2017: [
    <li key="0"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2017-hmda-fig.pdf">For data collected in 2017</a></li>,
  ],
  2018: [
    <li key="1"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig.pdf">For data collected in 2018</a></li>,
    <li key="2"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig-2018-hmda-rule.pdf">For data collected in 2018 incorporating the 2018 HMDA rule</a></li>
  ],
  2019: [
    <li key="3"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2019-hmda-fig.pdf">For data collected in 2019</a></li>
  ],
  2020: [
    <li key="4"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2020-hmda-fig.pdf">For data collected in 2020</a></li>,
    <li key="5"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers.pdf">Supplemental Guide for Quarterly Filers</a></li>

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
