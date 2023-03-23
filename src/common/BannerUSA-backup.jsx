import React from 'react'

import './BannerUSA.css'
import flag from './images/favicon-57.png'

const BannerUSA = () => {
  return (
    <div className="banner">
      <header className="banner-header">
        <div className="banner-inner">
          <img src={flag} alt="U.S. flag" />
          <p>An official website of the United States government</p>
        </div>
      </header>
    </div>
  )
}

export default BannerUSA
