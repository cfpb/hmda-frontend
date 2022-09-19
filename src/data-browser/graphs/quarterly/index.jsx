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

export const QuarterlyGraphs = (props) => {
  const [error, setError] = useState()
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Populated from API

  return (
    <div className="Graphs">
      <HomeLink />
      <GraphsHeader overview={graphHeaderOverview} />
      <Error error={error} />
      <SectionSelector props={props} />
      <div className="section-wrapper">
        <Switch>
          {/* Setting direct paths to access other tabs */}
          <Route
            path={"/data-browser/graphs/quarterly/info/filers"}
            render={() => <SectionFilerInfo />}
          />
          <Route
            path={"/data-browser/graphs/quarterly/info/faq"}
            render={() => <SectionFAQ />}
          />
          <Route
            render={() => (
              <SectionGraphs
                {...{
                  error,
                  setError,
                  setGraphHeaderOverview,
                  location: props.location,
                  match: props.match,
                  history: props.history,
                }}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
