import { useState } from 'react'
import './ExpandableSection.css'

const standardLabelFormatter = (isExpanded, label) =>
  (isExpanded ? '▾ ' : '▸ ') + label

/**
 * An understated text-button driven, expandable section for content
 * @param label Expansion button text label
 * @param labelFormatter (isExpanded, label) => 'Text label'
 * @param expandedByDefault Show section's children by default
 * @param children Section content
 */
export const ExpandableSection = ({
  children,
  expandedByDefault = false,
  label = 'Click to expand',
  labelFormatter = standardLabelFormatter,
}) => {
  const [expanded, setExpanded] = useState(expandedByDefault)
  const labelText = labelFormatter(expanded, label)
  const toggleVisible = () => setExpanded((value) => !value)

  const classes = ['expandable-section']
  let ariaLabel = 'Expand ' + label

  if (expanded) {
    classes.push('expanded')
    ariaLabel = 'Collapse ' + label
  }

  return (
    <div className={classes.join(' ')}>
      <button
        onClick={toggleVisible}
        className='text-button heading'
        aria-label={ariaLabel}
      >
        {labelText}
      </button>
      {expanded && <div className='content'>{children}</div>}
    </div>
  )
}
