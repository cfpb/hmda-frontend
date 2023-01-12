import React from 'react'
import { Link } from 'react-router-dom'

import './VersionSelector.css'

const makeToUrl = (version, v, url) => {
  if (!version || !url.match(version)) return `${url}/${v}`.replace('//', '/')
  return url.replace(version, v)
}

const VersionSelector = ({ version, url, versions}) => {
  return (
    <div className='VersionSelector'>
      <h4>Select a version</h4>
      {versions.map((v, i) => {
        const className = v === version ? 'active' : ''
        const toUrl = makeToUrl(version, v, url)
        return (
          <Link to={toUrl} className={className} key={i}>Platform {v}</Link>
        )
      })}
    </div>
  )
}

export default VersionSelector