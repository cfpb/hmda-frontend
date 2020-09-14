import React, { useState, useEffect } from 'react'
import { InputGroup, Input } from './InstitutionInput'

export const OtherFields = ({ data }) => {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    } else if (document.selection) {
      document.selection.empty()
    }
  }, [showing])

  const showMore = (e) => {
    e.preventDefault()
    setShowing(!showing)
  }

  const {
    assets,
    otherLenderCode,
    institutionId2017,
    rssd,
    hmdaFiler,
    parent,
    topHolder,
    respondent,
  } = data

  let toggleBtnText
  let otherCname = 'other-fields center'

  if (showing) {
    toggleBtnText = 'Hide'
    otherCname += ' show'
  } else {
    toggleBtnText = 'Show'
  }

  return (
    <div>
      <button className='show-more btn' type='button' onClick={showMore}>
        {toggleBtnText} Additional Fields
      </button>
      <div className={otherCname}>
        <InputGroup disabled name='Parent' value={parent} />
        <InputGroup disabled name='Top Holder' value={topHolder} />
        <Input disabled text name='Assets' value={assets} />
        <Input disabled text name='Other Lender Code' value={otherLenderCode} />
        <Input
          disabled
          text
          name='Institution ID 2017'
          value={institutionId2017}
        />
        <Input disabled text name='RSSD' value={rssd} />
        <InputGroup disabled name='Respondent' value={respondent} />
        <Input disabled text name='HMDA Filer' value={hmdaFiler} />
      </div>
    </div>
  )
}
