import { useState, useEffect } from 'react'

function makeAsyncComponent(importComponentFn) {
  return function AsyncComponent() {
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      importComponentFn().then(component => {
        setComponent(component.default)
      })
    }, [])

    return Component
  }
}

export default makeAsyncComponent
