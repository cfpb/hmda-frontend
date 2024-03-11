import './NewIndicator.css'

export const NewIndicator = ({ text, id }) => {
  return (
    <span id={id} className='new-indicator'>
      {text || "New"}
    </span>
  )
}

export default NewIndicator
