import React from 'react'

export function DownloadButton({ url }) {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'>
      Download
    </a>
  )
}
