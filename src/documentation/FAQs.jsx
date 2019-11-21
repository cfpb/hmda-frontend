import React from 'react'
import { Link } from 'react-router-dom'

const links = {
  2017: [
    <li key="0"><Link to="/documentation/2017/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
  ],
  2018: [
    <li key="1"><Link to="/documentation/2018/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="2"><Link to="/documentation/2018/data-browser-faq/">Data Browser FAQ</Link></li>,
  ],
  2019: [
    <li key="3"><Link to="/documentation/2019/filing-faq/">HMDA Filing FAQ</Link></li>,
  ],
  2020: [
  ]
}

const FAQs = props => {
  return (
    <>
      <ul>{links[props.year]}</ul>
    </>
  )
}

export default FAQs
