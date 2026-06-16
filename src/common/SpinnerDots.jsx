import './SpinnerDots.css'

function SpinnerDots({ centered, className }) {
  let cls = 'spinner-dots'
  if (centered) cls += ' spinner-dots--centered'
  if (className) cls += ` ${className}`

  return (
    <span className={cls} aria-hidden='true'>
      <span className='spinner-dots__dot'></span>
      <span className='spinner-dots__dot'></span>
      <span className='spinner-dots__dot'></span>
    </span>
  )
}

export default SpinnerDots
