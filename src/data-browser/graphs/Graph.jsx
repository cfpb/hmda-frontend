import { hideUnselectedLines } from './utils/graphHelpers'
import { useCallback, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsExport from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from 'highcharts-react-official'
import useGraphLoading from './useGraphLoading'
import { AvoidJumpToDataTable } from './highchartsCustomModules'

HighchartsExport(Highcharts) // Enable export to image
HighchartsExportData(Highcharts) // Enable export of underlying data
HighchartsAccessibility(Highcharts) // Accessibility enhancements
AvoidJumpToDataTable(Highcharts) // Workaround for Accessibility module bug

export const Graph = ({ options, loading, seriesForURL }) => {
  const chartRef = useRef()

  /**
   * Note about onLoad: 
   * 
   * Highcharts also calls this function when exporting to image.
   * Be warned that the way in which it generates these images can lead to 
   * synchronization issues with our custom hooks (particularly useQuery).
   * 
   * You can check if exporting via `ref.options.chart.forExport`
   * 
   * See the following link for context on how these images are generated.
   * https://github.com/highcharts/highcharts-react/issues/315
   */
  const onLoad = useCallback(
    ref => {
      // Hide series based on URL query parameters
      hideUnselectedLines(ref, seriesForURL)
    },
    [seriesForURL]
  )

  useGraphLoading(chartRef, loading, options)

  return (
    <div className='graph-wrapper'>
      <div className='export-charts'>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          callback={onLoad}
        />
      </div>
    </div>
  )
}
