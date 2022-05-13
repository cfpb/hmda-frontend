// Useful links
// API Docs -> https://api.highcharts.com/highcharts
// Dual Axis demo -> https://www.highcharts.com/demo/combo-dual-axes
// Importing modules -> https://github.com/highcharts/highcharts-react#how-to-add-a-module
// Center legend title -> https://jsfiddle.net/BlackLabel/od90nLwt/1/
// We'll need to link the stacked charts -> https://www.highcharts.com/demo/synchronized-charts
// https://whawker.github.io/react-jsx-highcharts/examples/index.html
// https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/
// Exporting separate charts together -> https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/exporting/multiple-charts/

/**
 * Thoughts
 * - Charts
 *   - Single Axis
 *   - Dual Axis
 *   - Quad Axis
 * - Printing/Exporting
 *   - We need to reset the font sizes to make generated output usable, otherwise things overflow
 *   - We need to link the Dual charts' export functionality so users can get everything in one export
 */

import { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExport from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
import produce from "immer";
import LineGraph from "./LineGraph/index";
import Select from "../Select.jsx";
import { hmda_charts } from "./config";
import { graphOptions } from "./graphOptions";
import "./graphs.css";

HighchartsExport(Highcharts); // Enable export to image
HighchartsExportData(Highcharts); // Enable export of underlying data

// Use square symbols in the Legend
Highcharts.seriesTypes.line.prototype.drawLegendSymbol =
  Highcharts.seriesTypes.area.prototype.drawLegendSymbol;

// OPTIONS based adjustments
hmda_charts.config.alignLegendRight = hmda_charts.config.alignLegendRight
  ? hmda_charts.styles.alignRight
  : {};

export const Graph = ({ options, callback, loading }) => {
  let chartRef = useRef();

  useEffect(() => {
    let chart = chartRef.current.chart;

    // loading comes from LineGraph and is set in Graphs down below
    if (loading === false) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
  }, [loading]);

  return (
    <div className="graph-wrapper">
      <div className="export-charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          callback={callback}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

// Drop-down options
const availableGraphs = graphOptions.map((g) => ({
  value: g.id,
  label: g.title,
}));

// Mock data
const graphA_data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const randomize = (num) => Math.round(num * Math.random() * 10);

export const Graphs = () => {
  const [selected, setSelected] = useState(graphOptions[0]); // Selected graph
  const [data, setData] = useState({}); // Cache API data
  const [isLoading, setIsLoading] = useState(false);

  const handleGraphSelection = (e) => {
    setSelected(graphOptions.find((opt) => opt.id == e.value));
  };

  // Fetch API data on graph selection, if necessary
  useEffect(() => {
    if (!selected) return; // Nothing to do until a graph is selected
    if (data[selected.id]) return; // Graph's data is already cached

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
      <br />
      <br />
      {selected && (
        <LineGraph
          loading={isLoading}
          title={selected.title}
          footerText={selected.footer}
          yAxis={[selected.yAxisLabel]}
          series={[
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
          ]}
        />
      )}
      <p>Currently selected graph:</p>
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
};
