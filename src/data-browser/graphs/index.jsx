import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select from "../Select.jsx";
import { Graph } from "./Graph";
import { groupStyles, groupBadgeStyles } from "./utils/inlineStyling";
import "./graphs.css";
import { GraphsHeader } from "./GraphsHeader";
import { deriveHighchartsConfig } from "./highchartsConfig";
import { PeriodSelectors } from "./PeriodSelectors";
import { produce } from "immer";
import LoadingIcon from "../../common/LoadingIcon";
import { useQuery } from "./utils/utils.js";

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
  const [seriesForURL, setSeriesForURL] = useState();

  let query = useQuery();
  let baseURL = "/data-browser/graphs";

  // This will only be called once, upon loading of the Highcharts graph
  const onGraphLoad = useCallback(
    (chartRef) => {
      // 1. Get a the list of visible series names from the query string
      const visible = query.get("visibleSeries")?.split(",") || [];

      console.log(visible, "visible from url");

      // 2. Hide any lines not listed in the URL
      chartRef.series.forEach((s) => {
        if (!visible.includes(s.name)) {
          console.log(s.name, "HIDE SERIES");
          s.hide();
        }
      });
    },
    [query]
  );

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

    // Generating a list of series to insert into the URL
    let availableSeries = [];

    response.series.forEach((s) => {
      availableSeries.push(s.name);
    });

    setSeriesForURL(availableSeries);

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

    /*

    Code to handle specfiic linking of a graph, visiting '/graphs' and redirects due to incorrect graph parameter

    [IF] Parameter doesn't exist in response.graphs then redirect to '/graphs/{first-graph-from-response}' 
    [OR] URL ends in 'graphs' it will render the page with the first graph found
    [ELSE IF] URL contains parameter for a specific graph then it will render the page with that graph
    */

    if (
      !response.graphs.some((g) => g.endpoint == props.match.params.graph) ||
      props.location.pathname.match(/graph$"/)
    ) {
      let firstGraph = response.graphs[0];

      fetchSingleGraph(firstGraph.endpoint);
      setSelected({
        value: firstGraph.endpoint,
        label: firstGraph.title,
        category: firstGraph.category,
      });
      props.history.push(`/data-browser/graphs/${firstGraph.endpoint}`);
    } else if (props.match.params.graph) {
      let initialGraphToLoad = response.graphs.find(
        (graph) => graph.endpoint == props.match.params.graph
      );
      fetchSingleGraph(initialGraphToLoad.endpoint);
      setSelected({
        value: initialGraphToLoad.endpoint,
        label: initialGraphToLoad.title,
        category: initialGraphToLoad.category,
      });
    }

    // Delegate overview text from API
    setGraphHeaderOverview(response.overview);

    // Generate new array with graph objects
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
    // if (graphData[selected.value]) return; // Already cached

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

      let lowPeriod = query.get("periodLow");
      let highPeriod = query.get("periodHigh");

      // Dynamically generate period selector options
      let periodOptions = categories.map((yq) => ({
        value: yq,
        label: yq,
      }));
      setQuarters(periodOptions);

      // Set periods based off URL parameters otherwise set periods based off categories which contains quarters
      if (
        props.location.search.match(/periodLow/) &&
        props.location.search.match(/periodHigh/) &&
        periodOptions.some((q) => q.value == lowPeriod) &&
        periodOptions.some((q) => q.value == highPeriod)
      ) {
        setPeriodLow({ value: lowPeriod, label: lowPeriod });
        setPeriodHigh({ value: highPeriod, label: highPeriod });
      } else {
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

      {options.length && singleGraph ? (
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
          {selected && singleGraph && quarters && seriesForURL && (
            <PeriodSelectors
              {...{
                props,
                periodOpts: quarters,
                periodLow,
                setPeriodLow,
                periodHigh,
                setPeriodHigh,
                endpoint: selected.value,
                seriesForURL,
              }}
            />
          )}

          {selected && singleGraph && quarters && seriesForURL && (
            <Graph
              onLoad={onGraphLoad}
              options={deriveHighchartsConfig({
                loading: !data[selected.value],
                title: singleGraph.title,
                subtitle: singleGraph.subtitle,
                periodRange: [
                  quarters.findIndex((q) => q.value == periodLow.value),
                  quarters.findIndex((q) => q.value == periodHigh.value) + 1,
                ],
                series: data[selected.value],
                yAxis: [singleGraph.yLabel],
                categories, // will come from the xAxis values of the fetched data
                props,
                periodLow,
                periodHigh,
                endpoint: selected.value,
                seriesForURL,
                setSeriesForURL,
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
