import './SectionSelector.css'
import { useCallback } from 'react'


const SectionOption = ({ isSelected, title, onChange }) => {
  const sectionClasses = `section ${isSelected && 'selected'}`
  const handleClick = useCallback(_event => onChange(title), [onChange])
  let ariaLabel = `Navigate to the ${title} tab.`
  if (isSelected) ariaLabel += ' This section is currently selected.'

  return (
    <button
      className={sectionClasses}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export const SectionSelector = ({ selected, options, onChange }) => {
  const sections = options.map(opt => (
    <SectionOption
      key={opt}
      title={opt}
      onChange={onChange}
      isSelected={opt === selected}
    />
  ))

  return (
    <nav className='SectionSelector sections'>
      {sections}
    </nav>
  )
}
