import './NewIndicator.css'

export function NewIndicator({ text, id }) {
  return (
    <span id={id} className='new-indicator'>
      {text || 'New'}
    </span>
  )
}

export default NewIndicator
