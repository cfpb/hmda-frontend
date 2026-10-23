import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

/**
 * Provides a context message upon hover/focus
 *
 * @param {String} id Tooltip identifier
 * @param {String} children Tooltip text
 * @param {Object} others Additional tooltip attributes
 */
export function Tooltip({ id, children, ...others }) {
  const tooltipProps = {
    disableStyleInjection: 'core',
    ...others,
  }

  return (
    <ReactTooltip id={id} {...tooltipProps}>
      {children}
    </ReactTooltip>
  )
}

export default Tooltip
