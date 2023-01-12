import React from "react"
import { Link } from "react-router-dom"
import { S3DocLink } from "../common/S3Integrations"

const links = {
  v1: [
    <S3DocLink
      key="0"
      url="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2017-hmda-fig.pdf"
      label="For data collected in 2017"
    />,
  ],
  v2: [
    <li key="annual-dates">
      <Link to="/documentation/v2/annual-filing-dates/">
        Annual HMDA Filing Period Dates
      </Link>
    </li>,
    <li key="quarterly-dates">
      <Link to="/documentation/v2/quarterly-filing-dates/">
        Quarterly HMDA Filing Period Dates
      </Link>
    </li>,
  ],
}

const FigLinks = (props) => {
  return (
    <>
      <ul>{links[props.version]}</ul>
    </>
  )
}

export default FigLinks
