import React from 'react'
import { Link } from 'react-router-dom'
import { NewIndicator } from '../homepage/NewIndicator'

const links = {
  v1: [
    <li key="v1-0"><Link to="/documentation/v1/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
  ],
  v2: [
    <li key="v2-0"><Link to="/documentation/v2/data-browser-graphs-faq/">Graphs FAQ <NewIndicator/></Link></li>,
    <li key="v2-1"><Link to="/documentation/v2/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="v2-2"><Link to="/documentation/v2/data-browser-faq/">Data Browser FAQ</Link></li>,
    <li key="v2-3"><Link to="/documentation/v2/filing-faq/">HMDA Filing FAQ</Link></li>,
    <li key="v2-4"><Link to="/documentation/v2/data-browser-maps-faq/">Maps FAQ</Link></li>,
    <li key="v2-5"><Link to="/documentation/v2/static-dataset-faq/">Static Dataset FAQ</Link></li>,
    <li key="v2-6"><Link to="/documentation/v2/data-collection-timelines/">HMDA Data Collection Timelines</Link></li>,
  ],
}

const FAQs = props => <ul>{links[props.version]}</ul>

export default FAQs
