import { useCallback, useEffect, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsExport from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsReact from 'highcharts-react-official'
import { hideUnselectedLines } from './utils/graphHelpers'
import useGraphLoading from './useGraphLoading'
import { AvoidJumpToDataTable } from './highchartsCustomModules'
import { DataTable } from './quarterly/DataTable'
import { useTableData } from './quarterly/useTableData'

HighchartsExport(Highcharts) // Enable export to image
HighchartsExportData(Highcharts) // Enable export of underlying data
HighchartsAccessibility(Highcharts) // Accessibility enhancements
AvoidJumpToDataTable(Highcharts) // Workaround for Accessibility module bug

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
})

export const Graph = ({ options, loading, seriesForURL }) => {
  const chartRef = useRef()

  // No longer using HighCharts Data Table and instead we are generating our own to allow for more custom styling
  const { tableData, isSeriesVisible, generateTableData } =
    useTableData(chartRef)

  useGraphLoading(chartRef, loading, options)

  const onLoad = useCallback(
    (chart) => {
      hideUnselectedLines(chart, seriesForURL)
      generateTableData()
    },
    [seriesForURL],
  )

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      generateTableData()
    }
  }, [options])

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
      {isSeriesVisible && <DataTable tableData={tableData} />}
    </div>
  )
}
