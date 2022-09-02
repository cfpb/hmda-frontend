import React, { useEffect, useState } from "react"
import { GraphsHeader } from "./GraphsHeader"
import { HomeLink } from "../../HomeLink"
import { SectionFAQ } from "./SectionFAQ.jsx"
import { SectionFilerInfo } from "./SectionFilerInfo"
import { SectionGraphs } from "./SectionGraphs"
import { SectionSelector } from "../SectionSelector"
import { Switch, Route, Link } from "react-router-dom"
import Error from "../../../common/Error"
import "../graphs.css"

const SectionOptions = ["Graphs", "Filer Info", "FAQ"]

export const QuarterlyGraphs = (props) => {
  const [error, setError] = useState()
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Populated from API
  const [section, setSection] = useState(SectionOptions[0])

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
            path={"/data-browser/graphs/quarterly/filer-info"}
            render={() => <SectionFilerInfo show={section === "Filer Info"} />}
          />
          <Route
            path={"/data-browser/graphs/quarterly/faq"}
            render={() => <SectionFAQ show={section === "FAQ"} />}
          />
        </Switch>
      </div>
    </div>
  )
}
