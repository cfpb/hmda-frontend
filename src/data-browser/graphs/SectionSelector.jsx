import './SectionSelector.css'
import { useCallback } from 'react'


const Section = ({ isSelected, title, onChange }) => {
  const sectionClasses = `section ${isSelected && 'selected'}`
  const handleClick = useCallback(_event => onChange(title), [onChange])

  return (
    <div className={sectionClasses}>
      <button onClick={handleClick}>{title}</button>
    </div>
  )
}

export const SectionSelector = ({ selected, options, onChange }) => {
  const sections = options.map(opt => (
    <Section
      key={opt}
      title={opt}
      onChange={onChange}
      isSelected={opt === selected}
    />
  ))

  return (
    <div className='SectionSelector'>
      <div className='sections'>{sections}</div>
    </div>
  )
}
