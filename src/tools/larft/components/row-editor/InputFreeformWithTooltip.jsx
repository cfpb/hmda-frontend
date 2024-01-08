import { Tooltip } from '../../../../common/Tooltip'
import InfoIcon from '../../../../filing/images/info.svg?react'
import { getFieldType } from '../../utils/input'

/**
 * A freeform text input with a tooltip for added guidance.
 *
 * @param {String} placeholder
 * @param {Object} column Field details
 * @param {Object} row LAR/TS row content
 * @param {Object} common Additional input attributes
 */
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
