import React from "react"
import release from "./constants/release.json"
import './ReleaseVersion.css'

const ReleaseVersion = () => (
  <div className="release-version">
    Release {release.version}
  </div>
)

export default ReleaseVersion
