import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../common/Heading.jsx'
import VersionSelector from '../common/VersionSelector.jsx'
import { VERSIONS } from '../common/constants/DocumentationVersions.js'

export const excludeVersionSelector = (slug) => ['check-digit', 'rate-spread'].indexOf(slug) > -1

const Product = props => {
  let { list } = props
  const { heading, lead, inList, url, version, collection, slug } = props
  let header
  

  if(!list || !list.length) {
    if(inList) return null
    list = <li>No documentation for {version}.</li>
  }

  if(inList){
    header = <h4><Link to={`/documentation/${version}/${collection}/${slug}/`}>{heading}</Link></h4>
  }else{
    header = (
      <Heading type={1} headingText={heading}>
        <p className="lead">{lead}</p>
      </Heading>
    )
  }

  const product = (
    <div className="Product">
      <div className="intro">
        { header }
        { inList ? <p>{lead}</p> : null}
        { inList || excludeVersionSelector(slug) ? null : <VersionSelector version={version} url={url} versions={VERSIONS} /> }
        { inList || slug === 'check-digit' ? null : <h4>Documentation</h4> }
        <ul>
          {list}
        </ul>
      </div>
    </div>
  )

  return props.inList ? <li>{product}</li> : product
}

export default Product
