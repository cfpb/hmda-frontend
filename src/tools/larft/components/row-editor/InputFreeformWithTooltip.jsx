import { Tooltip } from '../../../../common/Tooltip'
import { ReactComponent as InfoIcon } from '../../../../filing/images/info.svg'
import { getFieldType } from './parsedHelpers'

export const InputFreeformWithTooltip = ({
  row,
  column,
  placeholder,
  ...common
}) => {
  const { fieldName, tooltip } = column
  const value = row[fieldName]?.toString() || ''

  return (
    <>
      <Tooltip id={fieldName} place={'top'} effect={'solid'}>
        {tooltip}
      </Tooltip>
      <div style={{ display: 'flex' }}>
        <input
          className='text-input'
          {...common}
          type={getFieldType(column)}
          value={value}
          placeholder={placeholder}
          style={{ marginRight: '5px' }}
        />

        <div data-tip data-for={fieldName} style={{ marginTop: '5px' }}>
          <InfoIcon
            style={{
              cursor: 'pointer',
              height: '18px',
              width: '18px',
              fill: '#0071bc',
            }}
          />
        </div>
      </div>
    </>
  )
}
