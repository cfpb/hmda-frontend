import React, { useEffect, useState } from "react";
import Select from "../Select.jsx";
import { Graph } from "./Graph";
import { graphOptions } from "./graphOptions";
import { groupStyles, groupBadgeStyles } from "./utils/inlineStyling";
import "./graphs.css";
import { GraphsHeader } from "./GraphsHeader";
import { deriveHighchartsConfig } from "./highchartsConfig";
import { PeriodSelectors } from "./PeriodSelectors";
import { availableGraphs, mockFetchedData, periodOpts } from "./utils/mockData";
import { produce } from "immer";
import LoadingIcon from "../../common/LoadingIcon";

export const Graphs = (props) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(); // Selected graph
  const [graphData, setGraphData] = useState();
  const [singleGraph, setSingleGraph] = useState();
  const [data, setData] = useState({}); // API data cache
  const [periodLow, setPeriodLow] = useState(periodOpts[0]); // Period filters
  const [periodHigh, setPeriodHigh] = useState(
    periodOpts[periodOpts.length - 1]
  );

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      {/* Adds length of graphs in that category */}
      {/* <span style={groupBadgeStyles}>{data.options.length}</span> */}
    </div>
  );

  // Function to fetch single graph data when a graph from the dropdown has been selected
  const fetchSingleGraph = async (endpoint) => {
    const response = await fetch(`/quarterly-data/graphs/${endpoint}`)
      .then((res) => res.json())
      .then((data) => data);
    console.log(response, "fetchSingleGraph"); // Testing
    setSingleGraph(response);
  };

  const handleGraphSelection = (e) => {
    setSelected(graphData.find((opt) => opt.value == e.value));
    fetchSingleGraph(e.value); // e.value = endpoint for single graph (i.e) -> /applications
    props.history.push(`/data-browser/graphs/${e.value}`); // Push graph endpoint to url when one has been selected
  };

  const fetchAllGraphs = async () => {
    const response = await fetch("/quarterly-data/graphs")
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error(`Error: ${error}.`));

    setGraphData(
      response.graphs.map((g) => ({
        value: g.endpoint,
        label: g.title,
        category: g.category,
      }))
    );
  };

  useEffect(() => {
    fetchAllGraphs();
  }, []);

  // Fetch API data on graph selection
  useEffect(() => {
    if (!selected) return;
    if (graphData[selected.endpoint]) return; // Already cached

    let splitURL = window.location.href.split("/"); // Splits the URL to allow easier access to graph endpoint

    // adding graph endpoint to the url makes it's length 6
    if (splitURL.length === 6) {
      setSelected(graphData.find((opt) => opt.value == splitURL[5])); // Find match from graphData based off graph endpoint from URL
      // fetchSingleGraph(splitURL[5]);
    }

    // Update URL to hold the initial graph endpoint when page loads
    if (selected && splitURL.length !== 6) {
      props.history.push(`/data-browser/graphs/${selected.value}`);
    }

    // Mock data fetching - not the real API data
    // mockFetchedData(selected, data, setData);

    if (singleGraph) {
      const nextState = produce(data, (draft) => {
        let graphLines = [];

        // Generating each line for the graph
        singleGraph.series.map((graph) =>
          graphLines.push({
            name: graph.name,
            data: graph.coordinates.map((line) => line.y),
            yAxis: 0,
          })
        );

        draft[selected.value] = graphLines;
      });

      console.log(nextState, "generate lines?");
      setData(nextState);
    }
  }, [selected, singleGraph]);

  // The indexes to which we will filter the data before passing to Highcharts, based on the selected Filing Period range
  let lowerLimit = periodOpts.indexOf(periodLow);
  let upperLimit = periodOpts.indexOf(periodHigh) + 1;

  // console.log(graphData, "Graph Data - Endpoint");

  useEffect(() => {
    // Used to populate drop-down with different options and categories
    if (graphData) {
      let optionsWithCategories = [
        {
          label: "Quanity",
          options: graphData.filter((g) => g.category == "quantity"),
        },
        {
          label: "Interest Rates",
          options: graphData.filter((g) => g.category == "rate"),
        },
      ];

      if (optionsWithCategories.length) {
        setOptions(optionsWithCategories);
      }
    }
  }, [graphData]);

  console.log(selected, "selected from dropdown");

  return (
    <div className="Graphs">
      <GraphsHeader loading={options.length} />

      {options.length ? (
        <React.Fragment>
          <Select
            options={options}
            placeholder="Select a Graph"
            onChange={(e) => handleGraphSelection(e)}
            value={
              selected ? { value: selected.value, label: selected.label } : ""
            }
            formatGroupLabel={(data) => formatGroupLabel(data)}
          />
          <PeriodSelectors
            {...{
              periodOpts,
              periodLow,
              setPeriodLow,
              periodHigh,
              setPeriodHigh,
            }}
          />

          {selected && singleGraph && (
            <Graph
              options={deriveHighchartsConfig({
                loading: !data[selected.value],
                title: singleGraph.title,
                subtitle: singleGraph.subtitle,
                periodRange: [lowerLimit, upperLimit],
                series: data[selected.value],
                yAxis: [singleGraph.yLabel],
                // xAxis: will come from the xAxis values of the fetched data,
                // categories: will come from the xAxis values of the fetched data
              })}
              loading={!data[selected.value]}
            />
          )}
        </React.Fragment>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
};
