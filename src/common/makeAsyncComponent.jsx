import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import LoadingIcon from './LoadingIcon.jsx'

function makeAsyncComponent(importComponentFn, title, description) {
  return function AsyncComponent() {
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      importComponentFn().then((component) => {
        setComponent(component.default)
      })
    }, [])

    return Component ? (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content={description} />
        </Helmet>
        {Component}
      </>
    ) : (
      <LoadingIcon />
    )
  }
}

export default makeAsyncComponent
