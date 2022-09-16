import "./SectionSelector.css"
import { NavLink } from "react-router-dom"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { GRAPH_URL } from "./slice/graphConfigs"
import { graphs } from "../graphs/slice"

const SectionOption = ({ isSelected, title, url }) => {
  const sectionClasses = `button section ${isSelected && "selected"}`

  const graphStore = useSelector(({ graphs }) => graphs)
  const graphURL = graphs.getConfig(graphStore, GRAPH_URL) // Getting graph url string from redux store
  let ariaLabel = `Navigate to the ${title} tab.`
  if (isSelected) ariaLabel += " This section is currently selected."

  return (
    // Generating links to direct user to '/graphs' (original graph they were viewing), '/filers' and '/faq'
    <NavLink
      className={sectionClasses}
      aria-label={ariaLabel}
      to={
        title === "Graphs"
          ? `${graphURL}`
          : `/data-browser/graphs/quarterly/info${url}`
      }
    >
      {title}
    </NavLink>
  )
}

export const SectionSelector = ({ selected, options }) => {
  const sections = options.map((opt) => (
    <SectionOption
      key={opt.label}
      title={opt.label}
      url={opt.url}
      isSelected={opt.label === selected.label}
    />
  ))

  return <nav className="SectionSelector sections">{sections}</nav>
}
