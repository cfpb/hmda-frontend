import React from 'react';

const ExternalLink = ({ url, text, className }) => {
  return <a
    target='_blank'
    rel='noopener noreferrer'
    href={url}
    className={'external link ' + className}
  >
    {text || url}
  </a>
}

export default ExternalLink