import React from 'react'
import DataBrowser from './DataBrowser.jsx'
import RateSpread from './RateSpread.jsx'
import CheckDigit from './CheckDigit.jsx'
import LARFT from './LARFT.jsx'
import FFVT from './FFVT.jsx'

const Tools = props => {
  const { year } = props
  return (
    <ul className="ProductCollection">
      <DataBrowser year={year} inList={true}/>
      <RateSpread year={year} inList={true}/>
      <CheckDigit year={year} inList={true}/>
      <LARFT year={year} inList={true}/>
      <FFVT year={year} inList={true}/>
    </ul>
  )
}

export default Tools
