import React from 'react'
import Pill from './Pill.jsx'

function makeCloser(values, index, onChange) {
  return function () {
    const selected = []
    for(let i=0; i<values.length; i++){
      if(i !== index) selected.push(values[i])
    }
    onChange(selected)
  }
}

const Pills = ({values, onChange}) => {
  return (
    <div className="Pills">
      {values.map((v, i) => {
        return  <Pill key={i} value={v.label} close={makeCloser(values, i, onChange)}/>
      })}
    </div>
  )
}

export default Pills
