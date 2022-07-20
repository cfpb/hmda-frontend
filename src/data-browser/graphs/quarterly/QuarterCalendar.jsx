import './QuarterCalendar.css'

// One block of the Quarterly calendar
const Quarter = ({ number, dates, color = 'grey' }) => {
  return (
    <div className='quarter' style={{ backgroundColor: color }}>
      <div className='label'>Quarter {number}</div>
      <div className='dates'>{dates}</div>
    </div>
  )
}


export const QuarterCalendar = () => {
  return (
    <>
      <p className='lead'>
        Loans are grouped by quarter based on their Final Action Taken date,
        shown below:
      </p>
      <div className='calendar'>
        <div className='quarters'>
          <Quarter number={1} dates='Jan 1 - Mar 31' color='#73aaed' />
          <Quarter number={2} dates='Apr 1 - Jun 31' color='#7ac38c' />
          <Quarter number={3} dates='Jul 1 - Sep 31' color='#d2b464' />
          <Quarter number={4} dates='Oct 1 - Dec 31' color='#b685ea' />
        </div>
      </div>
    </>
  )
}

