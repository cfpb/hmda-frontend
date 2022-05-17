import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Geography from "./datasets/Geography.jsx";
import MapsGraphs from "./maps/MapsGraphs.jsx";
import NotFound from "../common/NotFound";
import { withAppContext } from "../common/appContextHOC";
import { Graphs } from "./graphs";

const DataBrowser = (props) => {
  const { publicationReleaseYear } = props.config;

  return (
    <div className="DataBrowser App">
      <Switch>
        <Route exact path="/data-browser" component={Home} />
        <Route
          path="/data-browser/graphs"
          render={(r_props) => <Graphs {...r_props} {...props} />}
        />
        <Route
          path="/data-browser/data/:year?"
          render={(r_props) => <Geography {...r_props} {...props} />}
        />
        <Route
          path={["/data-browser/maps/:year?", "/data-browser/maps"]}
          render={(r_props) => {
            const year = r_props.match.params.year;
            let { pathname, search } = r_props.location;

            if (!year) {
              if (pathname.substr(-1) !== "/") pathname = pathname + "/";
              return (
                <Redirect
                  to={`${pathname}${publicationReleaseYear}${search}`}
                />
              );
            }

            return <MapsGraphs {...r_props} {...props} />;
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default withAppContext(DataBrowser);
