import React, { useEffect, useState } from "react";
import Select from "../Select.jsx";
import { Graph } from "./Graph";
import { groupStyles, groupBadgeStyles } from "./utils/inlineStyling";
import "./graphs.css";
import { GraphsHeader } from "./GraphsHeader";
import { deriveHighchartsConfig } from "./highchartsConfig";
import { PeriodSelectors } from "./PeriodSelectors";
import { produce } from "immer";
import LoadingIcon from "../../common/LoadingIcon";

export const Graphs = (props) => {
  const [options, setOptions] = useState([]); // All the graph options with categories
  const [graphHeaderOverview, setGraphHeaderOverview] = useState(); // Overview text which comes from graphs API - State is sent to GraphsHeader Component
  const [quarters, setQuarters] = useState(); // Contains all the quarters from a selected graph and is used for period filtering
  const [selected, setSelected] = useState(); // Selected graph
  const [graphData, setGraphData] = useState(); // Contains all the graphs from the API
  const [singleGraph, setSingleGraph] = useState();
  const [data, setData] = useState({}); // API data cache
  const [periodLow, setPeriodLow] = useState(); // Period filters
  const [periodHigh, setPeriodHigh] = useState();
  const [categories, setCategories] = useState(); // Holds the xAxis values/labels

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      {/* Adds length of graphs in that category */}
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  // Function to fetch single graph data when a graph from the dropdown has been selected
  const fetchSingleGraph = async (endpoint) => {
    const response = await fetch(`/quarterly-data/graphs/${endpoint}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error(`Error: ${error}.`));

    // Loop over coordinates the first time to extract all xAxis labels for the current graph
    let filingPeriods = new Set();
    response.series.forEach((s) =>
      s.coordinates.map((point) => filingPeriods.add(point.x))
    );
    filingPeriods = Array.from(filingPeriods).sort();
    setCategories(filingPeriods);

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

    setGraphHeaderOverview(response.overview);

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

    if (singleGraph) {
      const nextState = produce(data, (draft) => {
        let graphLines = [];

        // Generating each line for the graph
        singleGraph.series.map((graph) => {
          // Create an Array of zeros, matching the length of the xAxis labels array
          const currentSeries = Array.apply(null, Array(categories.length)).map(
            (_) => null
          );

          // Match each point in the series to its xAxis index by referencing categories
          graph.coordinates.forEach((point) => {
            const idx = categories.indexOf(point.x);
            if (idx < 0) return; // Skip unknown filing periods
            currentSeries[idx] = parseInt(point.y) || 0;
          });

          graphLines.push({
            name: graph.name,
            data: currentSeries,
            yAxis: 0,
          });
        });

        draft[selected.value] = graphLines;
      });
      setData(nextState);

      // Dynamically generate period selector options
      if (categories) {
        let periodOptions = categories.map((yq) => ({ value: yq, label: yq }));
        setQuarters(periodOptions);
        setPeriodLow(periodOptions[0]);
        setPeriodHigh(periodOptions[periodOptions.length - 1]);
      }
    }
  }, [selected, singleGraph, categories]);

  useEffect(() => {
    // Used to populate drop-down with different options and categories
    if (graphData) {
      let optionsWithCategories = [
        {
          label: "Quantity",
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

  return (
    <div className="Graphs">
      <GraphsHeader loading={options.length} overview={graphHeaderOverview} />

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
          {singleGraph && quarters && (
            <PeriodSelectors
              {...{
                periodOpts: quarters,
                periodLow,
                setPeriodLow,
                periodHigh,
                setPeriodHigh,
              }}
            />
          )}

          {selected && singleGraph && quarters && (
            <Graph
              options={deriveHighchartsConfig({
                loading: !data[selected.value],
                title: singleGraph.title,
                subtitle: singleGraph.subtitle,
                periodRange: [
                  quarters.indexOf(periodLow),
                  quarters.indexOf(periodHigh) + 1,
                ],
                series: data[selected.value],
                yAxis: [singleGraph.yLabel],
                categories, // will come from the xAxis values of the fetched data
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
