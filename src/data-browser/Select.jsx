import React, { useRef } from 'react'
import Select from 'react-select'

const isIE = /*@cc_on!@*/ false || !!document.documentMode

const WrappedSelect = (props) => {
  const selRef = useRef(null)

  function ieBlurHack() {
    if (!isIE || document.activeElement.tagName !== 'DIV') return
    selRef.current.focus()
    // eslint-disable-next-line
    throw null
  }

  return <Select ref={selRef} onBlur={ieBlurHack} {...props} />
}

export default WrappedSelect
