import { useState } from 'react'
import './ExpandableSection.css'

/**
 * An understated text-button driven, expandable section for content
 * @param label Expansion button text label
 * @param labelFormatter (visibility) => 'Text label'
 * @param expandedByDefault Show section's children by default
 * @param children Section content
 */
export const ExpandableSection = ({
  children,
  expandedByDefault = false,
  label = '▸ Click to expand',
  labelFormatter = () => null,
}) => {
  const [visible, setVisible] = useState(expandedByDefault)
  const labelText = labelFormatter(visible) || label
  const toggleVisible = () => setVisible(value => !value)

  return (
    <div className='expandable-section'>
      <button onClick={toggleVisible} className='text-button'>
        {labelText}
      </button>
      {visible && children}
    </div>
  )
}
