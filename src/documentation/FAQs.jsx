import React from 'react'
import { Link } from 'react-router-dom'

const links = {
  2017: [
    <li key="0"><Link to="/documentation/2017/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
  ],
  2018: [
    <li key="2018-1"><Link to="/documentation/2018/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="2018-2"><Link to="/documentation/2018/data-browser-faq/">Data Browser FAQ</Link></li>,
    <li key="2018-3"><Link to="/documentation/2018/filing-faq/">HMDA Filing FAQ</Link></li>,
    <li key="2018-4"><Link to="/documentation/2018/data-browser-maps-faq/">Maps FAQ</Link></li>,
    <li key="2018-5"><Link to="/documentation/2018/data-collection-timelines/">HMDA Data Collection Timelines</Link></li>,
    <li key="2018-6"><Link to="/documentation/2018/static-dataset-faq/">Static Dataset FAQ</Link></li>,
  ],
  2019: [
    <li key="2019-1"><Link to="/documentation/2019/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="2019-2"><Link to="/documentation/2019/data-browser-faq/">Data Browser FAQ</Link></li>,
    <li key="2019-3"><Link to="/documentation/2019/filing-faq/">HMDA Filing FAQ</Link></li>,
    <li key="2019-4"><Link to="/documentation/2019/data-browser-maps-faq/">Maps FAQ</Link></li>,
    <li key="2019-5"><Link to="/documentation/2019/data-collection-timelines/">HMDA Data Collection Timelines</Link></li>,
    <li key="2019-6"><Link to="/documentation/2019/static-dataset-faq/">Static Dataset FAQ</Link></li>,
  ],
  2020: [
    <li key="2020-1"><Link to="/documentation/2020/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="2020-2"><Link to="/documentation/2020/data-browser-faq/">Data Browser FAQ</Link></li>,
    <li key="2020-3"><Link to="/documentation/2020/filing-faq/">HMDA Filing FAQ</Link></li>,
    <li key="2020-4"><Link to="/documentation/2020/data-browser-maps-faq/">Maps FAQ</Link></li>,
    <li key="2020-5"><Link to="/documentation/2020/data-collection-timelines/">HMDA Data Collection Timelines</Link></li>,
    <li key="2020-6"><Link to="/documentation/2020/static-dataset-faq/">Static Dataset FAQ</Link></li>,
  ],
  2021: [
    <li key="2021-1"><Link to="/documentation/2021/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="2021-2"><Link to="/documentation/2021/data-browser-faq/">Data Browser FAQ</Link></li>,
    <li key="2021-3"><Link to="/documentation/2021/filing-faq/">HMDA Filing FAQ</Link></li>,
    <li key="2021-4"><Link to="/documentation/2021/data-browser-maps-faq/">Maps FAQ</Link></li>,
    <li key="2021-5"><Link to="/documentation/2021/data-collection-timelines/">HMDA Data Collection Timelines</Link></li>,
    <li key="2021-6"><Link to="/documentation/2021/static-dataset-faq/">Static Dataset FAQ</Link></li>,
  ],
  2022: [
    <li key="2022-1"><Link to="/documentation/2022/identifiers-faq/">Institution Identifiers FAQ</Link></li>,
    <li key="2022-2"><Link to="/documentation/2022/data-browser-faq/">Data Browser FAQ</Link></li>,
    <li key="2022-3"><Link to="/documentation/2022/filing-faq/">HMDA Filing FAQ</Link></li>,
    <li key="2022-4"><Link to="/documentation/2022/data-browser-maps-faq/">Maps FAQ</Link></li>,
    <li key="2022-5"><Link to="/documentation/2022/data-collection-timelines/">HMDA Data Collection Timelines</Link></li>,
    <li key="2022-6"><Link to="/documentation/2022/static-dataset-faq/">Static Dataset FAQ</Link></li>,
  ]
}

const FAQs = props => <ul>{links[props.year]}</ul>

export default FAQs
