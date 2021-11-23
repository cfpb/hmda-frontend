import React from 'react';
import external from '../common/images/external-link-128px.png'
import './ExternalLink.css'

const ExternalLink = ({ url, text, className, children, title }) => {
  return <a
    target='_blank'
    rel='noopener noreferrer'
    href={url}
    className={'external link ' + className}
    title={title}
  >
    {children || text || url}
  </a>
}

export default ExternalLink