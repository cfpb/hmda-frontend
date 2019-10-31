import React, { useState, useEffect } from 'react'
import LoadingIcon from './LoadingIcon.jsx'

function makeAsyncComponent(importComponentFn) {
  return function AsyncComponent() {
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      importComponentFn().then(component => {
        setComponent(component.default)
      })
    }, [])

    return Component ? Component : <LoadingIcon/>
  }
}

export default makeAsyncComponent
