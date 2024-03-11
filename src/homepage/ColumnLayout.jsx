import './ColumnLayout.css'

export const ColumnLayout = ({ children }) => (
  <div className='column-container'>{children}</div>
)

/**
 * @param {String} title Column label
 * @param {Object} children Column content
 * @param {Boolean} hideContent Preserves the Column's space on the page but does not render it's content
 */
export const Column = ({ title, children, hideContent }) => {
  if (hideContent)
    return <div className='column usa-grid-full' style={{ marginTop: '3em' }} />

  return (
    <div className='column usa-grid-full' style={{ marginTop: '3em' }}>
      <header className='column-header'>
        <h3>{title}</h3>
      </header>
      <div className='card-container'>{children}</div>
    </div>
  )
}

export default ColumnLayout
