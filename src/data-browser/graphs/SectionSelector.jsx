import "./SectionSelector.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useCallback } from "react"
import { GRAPH_URL } from "./slice/graphConfigs"
import { graphs } from "../graphs/slice"

const SectionOption = ({ isSelected, title, onChange }) => {
  const sectionClasses = `section ${isSelected && "selected"}`

  const graphStore = useSelector(({ graphs }) => graphs)
  const graphURL = graphs.getConfig(graphStore, GRAPH_URL) // Getting graph url string from redux store
  const handleClick = useCallback((_event) => onChange(title), [onChange])
  let ariaLabel = `Navigate to the ${title} tab.`
  if (isSelected) ariaLabel += " This section is currently selected."

  return (
    // Generating links to direct user to '/graphs' (original graph they were viewing), '/filer' and '/faq'
    <Link
      to={
        title === "Graphs"
          ? graphURL
          : `/data-browser/graphs/quarterly/info/${title
              .replace(" ", "-")
              .toLowerCase()}`
      }
    >
      <button
        className={sectionClasses}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {title}
      </button>
    </Link>
  )
}

export const SectionSelector = ({ selected, options, onChange }) => {
  const sections = options.map((opt) => (
    <SectionOption
      key={opt}
      title={opt}
      onChange={onChange}
      isSelected={opt === selected}
    />
  ))

  return <nav className="SectionSelector sections">{sections}</nav>
}
