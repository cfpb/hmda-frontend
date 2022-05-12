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

import Highcharts from "highcharts";
import HighchartsExport from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
import { hmda_charts } from "./config";
import GraphA from "./Quarterly/GraphA";
import { GraphB } from "./Quarterly/GraphB";
import { exportMultipleChartsToPdf } from "./utils/exportMultiplePDFs";
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

export const Graph = ({ options, callback }) => {
  return (
    <div className="graph-wrapper">
      <div className="export-charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          callback={callback}
        />
      </div>
    </div>
  );
};

export const Graphs = () => {
  // Fake Data
  let graphOptions = [
    {
      id: "graphA",
      name: "Volume of Closed-end Mortages and Open-end LOCs by Quarter",
      type: "Line",
    },
    {
      id: "graphB",
      name: "Information about HMDA",
      type: "Line",
    },
  ];

  // Dropdown select function that extacts data to be sent to backend or filter data on frontend (WIP)
  const getGraphData = (e) => {
    // Holds name of chosen graph
    let value = e.target.value;

    // Grab the id being passed to the option from data-key
    const selectedIndex = e.target.options.selectedIndex;
    let id = e.target.options[selectedIndex].getAttribute("data-key");
  };

  return (
    <div className="Graphs">
      <h1>HMDA Graphs</h1>
      <p>A page that shows graphs.</p>
      {/* <button className="button" onClick={exportMultipleChartsToPdf}>
        Export to PDF
      </button> */}
      {/* <select onChange={getGraphData}>
        <option value="">Choose a Graph</option>
        {graphOptions.map((graph) => (
          <option key={graph.id} data-key={graph.id}>
            {graph.name}
          </option>
        ))}
      </select> */}
      {/* <GraphB /> */}
      <GraphA />
    </div>
  );
};
