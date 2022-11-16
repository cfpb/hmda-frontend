import React, { useState } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { CURRENT_YEAR } from "../../../common/constants/years"
import Error from "../../../common/Error"
import DynamicRenderer from "../../../documentation/DynamicRenderer"
import { HomeLink } from "../../HomeLink"
import "../graphs.css"
import { SectionSelector } from "../SectionSelector"
import { GraphsHeader } from "./GraphsHeader"
import QuarterlyFilersTable from "./QuarterlyFilersTable"
import { SectionGraphs } from "./SectionGraphs"

const PATH_FILERS_INFO = "/data-browser/graphs/quarterly/info/filers"
const PATH_FAQ = "/data-browser/graphs/quarterly/info/faq"

export const QuarterlyGraphs = (props) => {
  const [error, setError] = useState()
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Populated from API
  const location = useLocation()

  const showGraphs = ![PATH_FILERS_INFO, PATH_FAQ].includes(location.pathname)

  return (
    <div className='Graphs'>
      <HomeLink />
      <GraphsHeader overview={graphHeaderOverview} />
      <Error error={error} />
      <SectionSelector props={props} />
      <div className='section-wrapper'>
        <SectionGraphs
          {...{
            error,
            setError,
            setGraphHeaderOverview,
            location: props.location,
            match: props.match,
            history: props.history,
            show: showGraphs,
          }}
        />
        <Switch>
          {/* Setting direct paths to access other tabs */}
          <Route
            path={PATH_FILERS_INFO}
            render={() => <QuarterlyFilersTable />}
          />
          <Route
            path={PATH_FAQ}
            render={() => (
              <DynamicRenderer
                year={CURRENT_YEAR}
                slug={'data-browser-graphs-faq'}
                props={props}
                displayTOCBackLink={false}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
