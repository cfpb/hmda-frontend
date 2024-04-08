import './LoanGroupingCalendar.css'

// One block of the Quarterly calendar
const Quarter = ({ number, dates }) => {
  const quarterId = 'q' + number

  return (
    <div className={`quarter ${quarterId}`}>
      <div className='label'>Quarter {number}</div>
      <div className='dates'>{dates}</div>
    </div>
  )
}

export const LoanGroupingCalendar = () => {
  return (
    <>
      <p className='lead'>
        Loans are grouped by quarter based on their Final Action Taken date,
        shown below:
      </p>
      <div className='loan-grouping-calendar'>
        <div className='quarters'>
          <Quarter number={1} dates='Jan 1 - Mar 31' />
          <Quarter number={2} dates='Apr 1 - Jun 30' />
          <Quarter number={3} dates='Jul 1 - Sep 30' />
          <Quarter number={4} dates='Oct 1 - Dec 31' />
        </div>
      </div>
    </>
  )
}
