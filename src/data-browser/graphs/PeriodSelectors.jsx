import Select from '../Select'

export const PeriodSelectors = ({
  periodOpts,
  periodLow,
  setPeriodLow,
  periodHigh,
  setPeriodHigh,
}) => {
  const showRangeReset =
    periodLow !== periodOpts[0] ||
    periodHigh !== periodOpts[periodOpts.length - 1]

  return (
    <div className='period-wrapper'>
      <br />
      Filing Period Range{' '}
      {showRangeReset && (
        <button
          className='reset'
          onClick={() => {
            setPeriodLow(periodOpts[0])
            setPeriodHigh(periodOpts[periodOpts.length - 1])
          }}
        >
          Show All Quarters
        </button>
      )}
      <div className='period-range'>
        <Select
          options={periodOpts.slice(0, -1)}
          onChange={e => setPeriodLow(e)}
          value={periodLow}
        />
        <div className='to'>to</div>
        <Select
          options={periodOpts.filter(yq =>
            periodLow ? yq.value > periodLow.value : yq
          )}
          onChange={e => setPeriodHigh(e)}
          value={periodHigh}
        />{' '}
      </div>
      <br />
      <br />
    </div>
  )

}
