import React from 'react'
import Select from 'react-select'

const isIE = /*@cc_on!@*/false || !!document.documentMode;

function ieBlurHack() {
  if(!isIE) return
  const e = null
  throw e
}

const WrappedSelect = props => {
  return <Select onBlur={ieBlurHack} {...props}/>
}

export default WrappedSelect
