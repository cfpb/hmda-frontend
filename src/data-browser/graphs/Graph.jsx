import { useEffect, useRef } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsExport from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

HighchartsExport(Highcharts) // Enable export to image
HighchartsExportData(Highcharts); // Enable export of underlying data

// Use square symbols in the Legend
Highcharts.seriesTypes.line.prototype.drawLegendSymbol =
  Highcharts.seriesTypes.area.prototype.drawLegendSymbol;

export const Graph = ({ options, callback, loading }) => {
  let chartRef = useRef()

  useEffect(() => {
    let chart = chartRef.current.chart

    // Force tooltip to hide when changing graph selection
    chart.tooltip.hide()

    // loading comes from LineGraph and is set in Graphs down below
    loading ? chart.showLoading() : chart.hideLoading()
  }, [loading, options])

  return (
    <div className='graph-wrapper'>
      <div className='export-charts'>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          callback={callback}
          ref={chartRef}
        />
      </div>
    </div>
  )
}
