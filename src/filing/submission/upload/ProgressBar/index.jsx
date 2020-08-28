import React from 'react'
import { STATUS, CHECK } from './constants'
import './ProgressBar.css'

const ProgressBar = (props) => {
  const { label } = props

  return (
    <div className={containerClass(props)}>
      <span className='step-label'>{label}</span>
      <span className='fill' style={fillStyles(props)}>
        <span className='status-label'>{fillLabel(props)}</span>
      </span>
    </div>
  )
}

const containerClass = ({ status }) => {
  let cname = 'meter'
  if (CHECK.isPending(status))  return cname + ' pending'
  if (CHECK.isProgress(status)) return cname + ' progress animate striped'
  if (CHECK.isDone(status))     return cname + ' done'
  if (CHECK.isError(status))    return cname + ' error'
  if (CHECK.isEdits(status))    return cname + ' warn'
  if (CHECK.isSkip(status))     return cname + ' skipped'
  return cname
}

const fillStyles = ({ pct, minWidth, maxWidth, status, label }) => {
  let status100 = [STATUS.PENDING, STATUS.DONE, STATUS.EDITS, STATUS.ERROR]
  let pctAdjusted
  
  if (status100.indexOf(status) > -1) pctAdjusted = 100
  else pctAdjusted = pct > maxWidth ? maxWidth : pct < minWidth ? minWidth : pct

  label === "Macro" && console.log(`${label} ${status} ${pctAdjusted}%`)
  return { width: `${pctAdjusted}%` }
}


const fillLabel = ({ status, pct, isSV }) => {
  if (CHECK.isProgress(status))      return `${pct}%`
  if (CHECK.isError(status) && isSV) return 'Corrections Required'
  if (CHECK.isError(status))         return 'Error'
  if (CHECK.isEdits(status))         return 'Edits Found'
  if (CHECK.isPending(status))       return 'Pending'
  if (CHECK.isSkip(status))          return ''
  return 'Complete'
}

ProgressBar.defaultProps = {
  animate: false,
  isSV: false,
  maxWidth: 100,
  minWidth: 0,
  pct: 45,
  status: null,
}

export default ProgressBar
