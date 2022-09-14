import React, { useEffect, useState } from "react"
import { GraphsHeader } from "./GraphsHeader"
import { HomeLink } from "../../HomeLink"
import { SectionFAQ } from "./SectionFAQ.jsx"
import { SectionFilerInfo } from "./SectionFilerInfo"
import { SectionGraphs } from "./SectionGraphs"
import { SectionSelector } from "../SectionSelector"
import { Switch, Route } from "react-router-dom"
import Error from "../../../common/Error"
import "../graphs.css"

const SectionOptions = ["Graphs", "Filer", "FAQ"]

export const QuarterlyGraphs = (props) => {
  const [error, setError] = useState()
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Populated from API
  const [section, setSection] = useState(SectionOptions[0])

  useEffect(() => {
    // Handling which tab is active via url
    if (props.history.location.pathname.includes("/info/filer")) {
      setSection(SectionOptions[1])
    } else if (props.history.location.pathname.includes("/info/faq")) {
      setSection(SectionOptions[2])
    }
  }, [props.history.location.pathname])

  return (
    <div className="Graphs">
      <HomeLink />
      <GraphsHeader overview={graphHeaderOverview} />
      <Error error={error} />
      <SectionSelector
        options={SectionOptions}
        selected={section}
        onChange={setSection}
      />
      <div className="section-wrapper">
        <SectionGraphs
          show={section === "Graphs"}
          {...{
            error,
            setError,
            setGraphHeaderOverview,
            location: props.location,
            match: props.match,
            history: props.history,
          }}
        />

        <Switch>
          {/* Setting direct paths to access other tabs */}
          <Route
            path={"/data-browser/graphs/quarterly/info/filer"}
            render={() => <SectionFilerInfo show={section === "Filer"} />}
          />
          <Route
            path={"/data-browser/graphs/quarterly/info/faq"}
            render={() => <SectionFAQ show={section === "FAQ"} />}
          />
        </Switch>
      </div>
    </div>
  )
}
