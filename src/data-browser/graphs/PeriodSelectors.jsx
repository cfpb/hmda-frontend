import Select from '../Select'

export const PeriodSelectors = ({
  periodOpts,
  periodLow,
  setPeriodLow,
  periodHigh,
  setPeriodHigh,
}) => (
  <div className='period-wrapper'>
    Period Range
    <div className='period-range'>
      <Select
        options={periodOpts}
        onChange={e => setPeriodLow(e)}
        value={periodLow}
      />
      <div
        style={{
          textAlign: 'center',
          flex: '0',
          margin: '0 15px',
          verticalAlign: 'center',
        }}
      >
        to
      </div>
      <Select
        options={periodOpts.filter(yq =>
          periodLow ? yq.value >= periodLow.value : yq
        )}
        onChange={e => setPeriodHigh(e)}
        value={periodHigh}
      />{' '}
    </div>
    <br />
    <br />
  </div>
)