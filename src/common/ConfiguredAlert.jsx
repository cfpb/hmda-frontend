import React from 'react'
import Alert from './Alert'

function ConfiguredAlert({ message, heading, type, link }) {
  return (
    <Alert heading={heading} type={type}>
      <p>
        {message}
        <Anchor link={link} />
      </p>
    </Alert>
  )
}

function Anchor({ link }) {
  if (!link) return null
  const { text, url } = link
  if (!text || !url) return null
  return (
    <>
      {' '}
      <a href={url}>{text}</a>
    </>
  )
}

export default ConfiguredAlert
