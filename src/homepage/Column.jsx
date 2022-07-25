export const Column = ({ title, children }) => (
  <div className='column usa-grid-full' style={{ marginTop: '3em' }}>
    <header className='column-header'>
      <h3>{title}</h3>
    </header>
    <div className='card-container'>{children}</div>
  </div>
)
