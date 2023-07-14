import React, { useState } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import Alert from "../../../common/Alert"
import { withAppContext } from "../../../common/appContextHOC"
import Error from "../../../common/Error"
import {useAnnouncement} from "../../../common/useAnnouncement"
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
  const announcement = useAnnouncement({toolName: "graphs", config: props.config})

  return (
    <div className='Graphs'>
      {announcement && (
        <Alert heading={announcement.heading} type={announcement.type}>
          <p>{announcement.message}</p>
        </Alert>
      )}
      <GraphsHeader
        overview={graphHeaderOverview}
        announcement={announcement}
      />
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
          {/* Filers info tab */}
          <Route
            path={PATH_FILERS_INFO}
            render={() => <QuarterlyFilersTable />}
          />
        </Switch>
      </div>
    </div>
  )
}

export default withAppContext(QuarterlyGraphs)
