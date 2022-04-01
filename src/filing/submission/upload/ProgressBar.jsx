import React from 'react'

const YELLOW = '#dc731c'
const BLUE = '#0071bc'
const RED = '#e31c3d'

const calcPercent = pct => {
  if(typeof pct === 'number') return pct
  if(pct.match(/^\d/)) return parseInt(pct)
  if(pct.match(/^Done|^Errors/)) return 100
  return 0
}

export const ProgressBar = ({ percent, label, error, hasPrevError }) => {
  if([null, undefined].indexOf(percent) > -1) return null
  let pct = calcPercent(percent)

  const fillStyles = {
    width: `${pct}%`,
    backgroundColor: pct === 100 ? BLUE : YELLOW
  }
  if (error) fillStyles.backgroundColor = RED

  const progressBarStyles = {}
  if(hasPrevError) progressBarStyles.backgroundColor = YELLOW

  return (
    <>
      <div className='barLabel'>{label}</div>
      <div className='progressBar' style={progressBarStyles}>
        <div className='fill' style={fillStyles}>
          <span className='label'>{`${pct}%`}</span>
        </div>
      </div>
    </>
  )
}

ProgressBar.defaultProps = {
  percent: '0',
  error: false,
  waiting: false
}
