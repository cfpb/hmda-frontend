import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Heading.jsx'
import VersionSelector from '../common/VersionSelector.jsx'
import { VERSIONS } from '../common/constants/DocumentationVersions.js'
import FAQs from './FAQs.jsx'
import FigLinks from './FigLinks.jsx'
import Publications from './publications/index.js'
import Tools from './tools/index.js'
import ExternalAPIs from './ExternalAPIs.jsx'

const Home = ({ url, version }) => {
  return (
    <div className='home'>
      <div className='intro'>
        <Header type={1} headingText='HMDA Documentation'>
          <p className='lead'>A collection of HMDA Documentation Resources</p>
        </Header>
      </div>
      <VersionSelector url={url} version={version} versions={VERSIONS} />
      <div>
        <h2>
          <Link to={`/documentation/${version}/faqs/`}>
            Frequently Asked Questions
          </Link>
        </h2>
      </div>
      <FAQs version={version} />
      <div>
        <h2>
          <Link to={`/documentation/${version}/fig/`}>HMDA Filing</Link>
        </h2>
        <FigLinks version={version} />
      </div>
      <div>
        <h2>
          <Link to={`/documentation/${version}/publications/`}>
            HMDA Publications
          </Link>
        </h2>
        <Publications version={version} />
      </div>
      <div>
        <h2>
          <Link to={`/documentation/${version}/tools/`}>HMDA Tools</Link>
        </h2>
        <Tools version={version} />
      </div>
      <div>
        <h2>HMDA APIs</h2>
        <p>
          Endpoints, schemas, and examples to help you access HMDA Data via the
          HMDA APIs.
        </p>
        <ExternalAPIs />
      </div>
    </div>
  )
}

export default Home
