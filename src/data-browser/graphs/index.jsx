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
import LoadingIcon from "../../common/LoadingIcon";

export const Graphs = (props) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(graphOptions[0]); // Selected graph
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

  const handleGraphSelection = (e) => {
    setSelected(graphOptions.find((opt) => opt.id == e.value));
    props.history.push(`/data-browser/graphs/${e.value}`); // Push graph-id to url when one has been selected
  };

  useEffect(() => {
    // TODO: Generate data from API and create options
    // Used to populate drop-down with different options and categories
    let optionsWithCategories = [
      {
        label: "Quanity",
        options: availableGraphs.filter((g) => g.category == "quantity"),
      },
      {
        label: "Race",
        options: availableGraphs.filter((g) => g.category == "race"),
      },
      {
        label: "Loans",
        options: availableGraphs.filter((g) => g.category == "loans"),
      },
      {
        label: "Interest Rates",
        options: availableGraphs.filter((g) => g.category == "rates"),
      },
    ];

    if (optionsWithCategories.length) {
      setOptions(optionsWithCategories);
    }
  }, [availableGraphs]);

  // Fetch API data on graph selection
  useEffect(() => {
    if (!selected) return;
    if (data[selected.id]) return; // Already cached

    let splitURL = window.location.href.split("/"); // Splits the URL to allow easier access to graph-id

    // adding graph-id to the url makes it's length 6
    if (splitURL.length === 6) {
      setSelected(graphOptions.find((opt) => opt.id == splitURL[5])); // Find match from graphOptions based off graph-id from URL
    }

    // Update URL to hold the initial graph-id when page loads
    if (selected && splitURL.length !== 6) {
      props.history.push(`/data-browser/graphs/${selected.id}`);
    }

    // Mock data fetching
    mockFetchedData(selected, data, setData);
  }, [selected]);

  // The indexes to which we will filter the data before passing to Highcharts, based on the selected Filing Period range
  let lowerLimit = periodOpts.indexOf(periodLow);
  let upperLimit = periodOpts.indexOf(periodHigh) + 1;

  console.log(options.length, "options");

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
              selected ? { value: selected.id, label: selected.title } : ""
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

          {selected && (
            <Graph
              options={deriveHighchartsConfig({
                loading: !data[selected.id],
                title: selected.title,
                subtitle: selected.footer,
                periodRange: [lowerLimit, upperLimit],
                series: data[selected.id],
                yAxis: [selected.yAxisLabel],
                // xAxis: will come from the xAxis values of the fetched data,
                // categories: will come from the xAxis values of the fetched data
              })}
              loading={!data[selected.id]}
            />
          )}
        </React.Fragment>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
};
