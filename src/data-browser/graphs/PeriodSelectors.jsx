import LoadingIcon from '../../common/LoadingIcon'
import Select from '../Select'

export const PeriodSelectors = ({
  isLoading,
  periodHigh,
  periodLow,
  periodOpts,
  setPeriodHigh,
  setPeriodLow,
}) => {
  if (isLoading) return <LoadingIcon />

  const showRangeReset =
    periodLow.value !== periodOpts[0].value ||
    periodHigh.value !== periodOpts[periodOpts.length - 1].value

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
          aria-label='Set lower limit of Filing Period range'
          classNamePrefix='react-select__period_start' // Used for cypress testing
          options={periodOpts.filter((yq) =>
            periodHigh ? yq.value < periodHigh.value : yq,
          )}
          onChange={(e) => setPeriodLow(e)}
          value={periodLow}
        />
        <div className='to'>to</div>
        <Select
          aria-label='Set upper limit of Filing Period range'
          classNamePrefix='react-select__period_end' // Used for cypress testing
          options={periodOpts.filter((yq) =>
            periodLow ? yq.value > periodLow.value : yq,
          )}
          onChange={(e) => setPeriodHigh(e)}
          value={periodHigh}
        />{' '}
      </div>
      <br />
      <br />
    </div>
  )
}
