import './NewIndicator.css'

export const NewIndicator = ({ text }) => {
  return <span className='new-indicator'>{text || 'New'}</span>
}

export default NewIndicator
