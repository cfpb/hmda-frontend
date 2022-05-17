import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExport from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

HighchartsExport(Highcharts); // Enable export to image
HighchartsExportData(Highcharts); // Enable export of underlying data

// Use square symbols in the Legend
Highcharts.seriesTypes.line.prototype.drawLegendSymbol =
  Highcharts.seriesTypes.area.prototype.drawLegendSymbol;

export const Graph = ({ options, callback, loading, xRange }) => {
  let chartRef = useRef();

  useEffect(() => {
    let chart = chartRef.current.chart;

    // Parent component is fetching data
    if (loading) {
      chart.tooltip.hide(); // Force tooltip to hide when changing graph selection
      chart.showLoading(); // Display Loading screen
      // Hide the data table, which is likely showing previous selection's data
      if (chart.dataTableDiv) chart.dataTableDiv.style.display = "none";
    } else {
      chart.hideLoading();
    }
  }, [loading, options]);

  useEffect(() => {
    let chart = chartRef.current.chart;
    if (xRange) {
      console.log("Setting extremes", ...xRange);
      console.log(chart.xAxis[0].series);
      chart.xAxis[0].setExtremes(...xRange);
    }
  }, [xRange]);

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
