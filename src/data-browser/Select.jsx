import React, { useRef } from 'react'
import Select from 'react-select'

const isIE = /*@cc_on!@*/false || !!document.documentMode;



const WrappedSelect = props => {
  const selRef = useRef(null)

  function ieBlurHack() {
    const focusedElement = document.activeElement
    if(!isIE || focusedElement === document.body) return
    selRef.current.focus()
    throw null
  }

  return <Select ref={selRef} onBlur={ieBlurHack} {...props}/>
}

export default WrappedSelect
