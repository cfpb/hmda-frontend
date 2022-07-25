import React from 'react';
import external from '../common/images/external-link-128px.png'
import './ExternalLink.css'

export const ExternalLink = ({ url, text, className, children }) => {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={url}
      className={'external link ' + className}
    >
      {children || text || url} <img src={external} alt='External Link' />
    </a>
  )
}

export default ExternalLink