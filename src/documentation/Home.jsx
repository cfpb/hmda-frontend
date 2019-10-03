import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Heading.jsx'
import YearSelector from '../common/YearSelector.jsx'
import Publications from './publications'
import Tools from './tools'

import './Home.css'

const Home = props => {
  const { year, url } = props
  return (
    <div className="home">
      <div className="intro">
        <Header type={1} headingText="HMDA Documentation">
          <p className="lead">A collection of HMDA Documentation Resources</p>
        </Header>
      </div>
      <YearSelector year={year} url={url}/>
      <div>
        <h2><Link to={`/documentation/${year}/publications/`}>HMDA Publications</Link></h2>
        <Publications year={year}/>
      </div>
      <div>
        <h2><Link to={`/documentation/${year}/tools/`}>HMDA Tools</Link></h2>
        <Tools year={year}/>
      </div>
      <div>
        <h2>Other HMDA Documentation</h2>
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href="https://cfpb.github.io/hmda-platform/">API Documentation</a></li>
          </ul>
      </div>
    </div>
  )
}

export default Home
