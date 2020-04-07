import React from 'react'
import release from './constants/release.json'
import './ReleaseVersion.css'

const ReleaseVersion = () => (
  <span className="release-version">
    &nbsp;{release.version}
  </span>
)

export default ReleaseVersion
