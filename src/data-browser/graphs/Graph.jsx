import { useCallback, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExport from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import useGraphLoading from './useGraphLoading'
import { useQuery } from './utils/utils'
import { hideUnselectedLines } from './utils/graphHelpers'

HighchartsExport(Highcharts) // Enable export to image
HighchartsExportData(Highcharts) // Enable export of underlying data

export const Graph = ({ options, loading }) => {
  const chartRef = useRef()
  const query = useQuery()

  const onLoad = useCallback(
    chartRef => {
      // Hide series based on URL query parameters
      hideUnselectedLines(chartRef, query)
    },
    [query]
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
