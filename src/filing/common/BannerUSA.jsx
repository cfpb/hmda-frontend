import React from 'react'

import './BannerUSA.css'

import favicon from '../images/favicon-57.png'

const USABanner = () => {
  return (
    <section className="banner">
      <header className="banner-header">
        <div className="banner-inner">
          <img src={favicon} alt="U.S. flag" />
          <p>An official website of the United States government</p>
        </div>
      </header>
    </section>
  )
}

export default USABanner
