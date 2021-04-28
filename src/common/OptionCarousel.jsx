import React, { useState } from 'react'
import './OptionCarousel.css'

export const OptionCarousel = ({ options, ...rest }) => {
  const [idx, setIdx] = useState(0)
  const [custom, setCustom] = useState(false)
  if (!options || !options.length) return null

  const next = () => {
    setIdx((idx + 1) % options.length)
  }

  const noIcon = rest.noIcon ? 'no-icon' : ''
  const classname = [rest.className, 'oc-option', noIcon].filter((x) => x).join(' ')

  return (
    <>
      {custom ? (
        <CustomText />
      ) : (
        <span {...rest} className={classname} onClick={next}>
          {options[idx]}
        </span>
      )}
    </>
  )
}


const CustomText = () => {
  const [value, setValue] = useState('')
  const handleChange = e => setValue(e.target.value)
  return <input type='text' className='oc-option-custom' value={value} onChange={handleChange} placeholder='Enter text of a custom option' />
}