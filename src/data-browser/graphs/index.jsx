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

import Highcharts from 'highcharts'
import HighchartsExport from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import { hmda_charts } from './config'
import { GraphA } from './Quarterly/GraphA'
import { GraphB } from './Quarterly/GraphB'
import './graphs.css'

HighchartsExport(Highcharts)     // Enable export to image
HighchartsExportData(Highcharts) // Enable export of underlying data

// Use square symbols in the Legend
Highcharts.seriesTypes.line.prototype.drawLegendSymbol =
  Highcharts.seriesTypes.area.prototype.drawLegendSymbol

// OPTIONS based adjustments
hmda_charts.config.alignLegendRight = hmda_charts.config.alignLegendRight
  ? hmda_charts.styles.alignRight
  : {}  


export const Graph = ({ options, footerText, callback }) => (
  <div className='graph-wrapper'>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      callback={callback}
    />
    {footerText && <p>{footerText}</p>}
  </div>
)


export const Graphs = ({ }) => {
  return (
    <div className='Graphs'>
      <h1>HMDA Graphs</h1>
      <p>A page that shows graphs.</p>
      <GraphB />
      <GraphA />
    </div>
  )
}
