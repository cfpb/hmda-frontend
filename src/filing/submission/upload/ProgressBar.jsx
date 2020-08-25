import React from 'react'

const YELLOW = '#dc731c'
const BLUE = '#0071bc'
const RED = '#b82a41' //'#e31c3d'
const GREY='#5a5a5a'

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
    width: hasPrevError ? '100%' : `${pct}%`,
    backgroundColor: hasPrevError ? GREY : BLUE
  }
  
  const progressBarStyles = {}
  if(hasPrevError) progressBarStyles.backgroundColor = GREY
  
  if (error) {
    fillStyles.backgroundColor = RED
    progressBarStyles.backgroundColor = GREY
  }

  const icon = error ? '❗' : hasPrevError ? '' : pct === 100 ? '✅' : pct > 0 ? '♽' : '⚠️'
  let fillClass = 'fill'
  if(!error && !hasPrevError && pct !== 100) fillClass += ' bars'

  return (
    <>
      {/* <div className='barLabel'>{label} {icon}</div> */}
      <div className='barLabel'>{label}</div>
      <div className='progressBar' style={progressBarStyles}>
        <div className={fillClass} style={fillStyles}>
          <span className='label'>
            {barMessage(error, hasPrevError, pct)}
            {/* {`${pct}%`} */}
            {/* {<Icon error={error} hasPrevError={hasPrevError} pct={pct} />} */}
          </span>
        </div>
      </div>
    </>
  )
}

const barMessage = (error, hasPrevError, pct) => {
  if (error) return 'Review required!'
  else if (hasPrevError) return 'Skipped'
  else if (pct === 100) return 'Done'
  else if (pct > 0) return `${pct}%`
  return `Pending...`
}

const Icon = ({ error, hasPrevError, pct }) => {
  let icon = '⚠️'
  let background = 'transparent'
  // const icon = error ?  : hasPrevError ? 'ⓧ' : pct === 100 ? '✅' : pct > 0 ? '♽' : '⚠️'
  if (error){
    icon = '❗'
    background = 'white'
  } else if (hasPrevError) {
    icon = 'ⓧ'
    background = 'transparent'
  } else if (pct === 100) {
    icon = '✅'
  } else if (pct > 0) {
    icon = '♽'
  }

  return (
    <span
      style={{
        backgroundColor: background,
        marginLeft: '1rem',
        borderRadius: '50%',
      }}
    >
      {icon}
    </span>
  )
}

ProgressBar.defaultProps = {
  percent: '0',
  error: false,
  waiting: false
}
