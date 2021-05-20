import React from 'react';

const ExternalLink = ({ url, text, className, children }) => {
  return <a
    target='_blank'
    rel='noopener noreferrer'
    href={url}
    className={'external link ' + className}
  >
    {children || text || url}
  </a>
}

export default ExternalLink