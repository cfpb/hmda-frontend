import { useState, useEffect } from "react";
import produce from "immer";
import LineGraph from "./LineGraph/index";
import Select from "../Select.jsx";
import { yearQuarters } from "./config";
import { graphOptions } from "./graphOptions";
import "./graphs.css";

// Drop-down options
const availableGraphs = graphOptions.map((g) => ({
  value: g.id,
  label: g.title,
}));

const periodOpts = yearQuarters.map((yq) => ({ value: yq, label: yq }));

// Mock data
const graphA_data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const randomize = (num) => Math.round(num * Math.random() * 10);

export const Graphs = (props) => {
  const [selected, setSelected] = useState(graphOptions[0]); // Selected graph
  const [data, setData] = useState({}); // Cache API data
  // Period range filters
  const [periodLow, setPeriodLow] = useState(periodOpts[0]);
  const [periodHigh, setPeriodHigh] = useState(
    periodOpts[periodOpts.length - 1]
  );

  const handleGraphSelection = (e) => {
    setSelected(graphOptions.find((opt) => opt.id == e.value));
    props.history.push(`/data-browser/graphs/${e.value}`); // Push graph-id to url when one has been selected
  };

  // Fetch API data on graph selection, if necessary
  useEffect(() => {
    if (!selected) return; // Nothing to do until a graph is selected
    if (data[selected.id]) return; // Graph's data is already cached

    let splitURL = window.location.href.split("/"); // Splits the URL to allow easier access to graph-id

    // Edge case: trailing slash after graphs and custom graph id in URL
    if (splitURL[5] == "" || splitURL[5] != selected.id) {
      // Redirect the URL to hold the initial graph-id when page loads
      props.history.push(`/data-browser/graphs/${selected.id}`);
    } else if (splitURL.length === 6) {
      setSelected(graphOptions.find((opt) => opt.id == splitURL[5])); // Find match from graphOptions based off graph-id from URL
    }

    // Mock data fetching
    setTimeout(() => {
      const nextState = produce(data, (draft) => {
        draft[selected.id] = [
          {
            name: "Closed-End",
            data: graphA_data1.map(randomize),
            yAxis: 0,
          },
          {
            name: "Open-End",
            data: graphA_data1.map(randomize),
            yAxis: 0,
          },
        ];
      });

      setData(nextState);
    }, 1000);

    // fetch(selected.endpoint)
    // .then(success => success.json)
    // .then(json => {
    //     const nextState = produce(data, draft => { draft[selected.id] = json })
    //     saveData(nextState)
    //     setIsLoading(true) // Loader gets removed once data shows in chart
    //   }
    // )
    // .catch(reject => {
    //   // Notify user of error
    // })
  }, [selected]);

  return (
    <div className="Graphs">
      <h1>HMDA Graphs</h1>
      <p>
        The following graphs present data for the 19 financial institutions
        reporting HMDA quarterly data throughout 2020 and displays data for each
        of those institutions for 2019 and 2018 as well.
      </p>
      <p>
        Though the graphs provide some insight into trends for these
        institutions, they should not be taken to represent the behavior of all
        mortgage lenders during the relevant period.
      </p>
      <p>Use the menu below to select a graph.</p>
      <Select
        options={availableGraphs}
        placeholder="Select a Graph"
        onChange={(e) => handleGraphSelection(e)}
        value={{ value: selected.id, label: selected.title }}
      />
      <div className="period-wrapper">
        Period Range
        <div className="period-range">
          <Select
            options={periodOpts}
            onChange={(e) => setPeriodLow(e)}
            value={periodLow}
          />{" "}
          to{" "}
          <Select
            options={periodOpts.filter((yq) =>
              periodLow ? yq.value >= periodLow.value : yq
            )}
            onChange={(e) => setPeriodHigh(e)}
            value={periodHigh}
          />{" "}
        </div>
      </div>
      <br />
      <br />
      {selected && (
        <LineGraph
          loading={!data[selected.id]}
          title={selected.title}
          subtitle={selected.footer}
          yAxis={[selected.yAxisLabel]}
          series={data[selected.id]}
          xRange={[
            periodOpts.indexOf(periodLow),
            periodOpts.indexOf(periodHigh),
          ]}
        />
      )}
    </div>
  );
};
