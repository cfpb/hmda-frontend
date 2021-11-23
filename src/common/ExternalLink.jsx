import React from 'react';

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