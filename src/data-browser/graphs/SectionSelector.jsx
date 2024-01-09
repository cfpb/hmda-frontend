import './SectionSelector.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GRAPH_URL } from './slice/graphConfigs'
import { graphs } from '../graphs/slice'
import { useEffect, useState } from 'react'

const SectionOption = ({ isSelected, title, url }) => {
  const sectionClasses = `button section ${isSelected && 'selected'}`

  const graphsConfigStore = useSelector(({ graphsConfig }) => graphsConfig)
  const graphURL = graphs.getConfig(graphsConfigStore, GRAPH_URL) // Getting graph url string from redux store
  let ariaLabel = `Navigate to the ${title} tab.`
  if (isSelected) ariaLabel += ' This section is currently selected.'

  return (
    // Generating links to direct user to '/graphs' (original graph they were viewing), '/filers' and '/faq'
    <NavLink
      className={sectionClasses}
      aria-label={ariaLabel}
      to={
        title === 'Graphs'
          ? `${graphURL}`
          : `/data-browser/graphs/quarterly/info${url}`
      }
    >
      {title}
    </NavLink>
  )
}

export const SectionSelector = ({ props }) => {
  const SectionOptions = [
    { label: 'Graphs' }, // url for graphs comes from redux
    { label: 'Filer Info', url: '/filers' },
  ]

  const [section, setSection] = useState(SectionOptions[0])

  useEffect(() => {
    // Handling which tab is active via url
    if (props.history.location.pathname.includes('/info/filers')) {
      setSection(SectionOptions[1])
    } else {
      setSection(SectionOptions[0])
    }
  }, [props.history.location.pathname])

  const sections = SectionOptions.map((opt) => (
    <SectionOption
      key={opt.label}
      title={opt.label}
      url={opt.url}
      isSelected={opt.label === section.label}
    />
  ))

  return <nav className='SectionSelector sections'>{sections}</nav>
}
