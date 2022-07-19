import ReactTooltip from 'react-tooltip'

export const Tooltip = ({ id, children, ...others }) => {
  return (
    <ReactTooltip id={id} {...others}>
      {children}
    </ReactTooltip>
  )
}

export default Tooltip