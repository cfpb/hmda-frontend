import ReactTooltip from 'react-tooltip'

/**
 * Provides a context message upon hover/focus
 *
 * @param {String} id Tooltip identifier
 * @param {String} children Tooltip text
 * @param {Object} others Additional tooltip attributes
 */
export function Tooltip({ id, children, ...others }) {
  return (
    <ReactTooltip id={id} {...others}>
      {children}
    </ReactTooltip>
  )
}

export default Tooltip
