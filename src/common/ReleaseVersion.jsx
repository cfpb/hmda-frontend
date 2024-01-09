import React from 'react'
import release from './constants/release.json'
import './ReleaseVersion.css'

const ReleaseVersion = () => (
  <a href='https://github.com/cfpb/hmda-frontend/releases' target='_blank'>
    <span className='release-version'>&nbsp;{release.version}</span>
  </a>
)

export default ReleaseVersion
