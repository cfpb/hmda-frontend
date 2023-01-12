import React from 'react'
import DataBrowser from './DataBrowser.jsx'
import RateSpread from './RateSpread.jsx'
import CheckDigit from './CheckDigit.jsx'
import LARFT from './LARFT.jsx'
import FFVT from './FFVT.jsx'

const Tools = props => {
  const { version } = props
  return (
    <ul className="ProductCollection">
      <DataBrowser version={version} inList={true}/>
      <RateSpread version={version} inList={true}/>
      <CheckDigit version={version} inList={true}/>
      <LARFT version={version} inList={true}/>
      <FFVT version={version} inList={true}/>
    </ul>
  )
}

export default Tools
