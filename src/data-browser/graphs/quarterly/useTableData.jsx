import { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import { graphs } from '../slice'
import { SELECTED_GRAPH_DATA } from '../slice/graphConfigs'

export const useTableData = (chartRef) => {
  const [tableData, setTableData] = useState(null)
  const [isSeriesVisible, setIsSeriesVisible] = useState(true)

  const graphsConfigStore = useSelector(({ graphsConfig }) => graphsConfig)
  const selectedGraphData = graphs.getConfig(
    graphsConfigStore,
    SELECTED_GRAPH_DATA,
  )

  const formatNumber = (value, decimalPrecision) => {
    if (value === null || value === undefined || isNaN(value)) return ''
    const formatted = parseFloat(value).toFixed(decimalPrecision)
    const [wholePart, decimalPart] = formatted.split('.')
    const withCommas = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return decimalPart ? `${withCommas}.${decimalPart}` : withCommas
  }

  const generateTableData = useCallback(() => {
    if (chartRef.current && chartRef.current.chart) {
      const chart = chartRef.current.chart
      const series = chart.series.filter((s) => s.visible)

      if (series.length === 0) {
        setIsSeriesVisible(false)
        setTableData(null)
        return null
      }

      const categories = chart.xAxis[0].categories || []
      const decimalPrecision = selectedGraphData?.decimalPrecision || 0

      const tableData = {
        headers: ['Year Quarter', ...series.map((s) => s.name)],
        rows: categories.map((category, index) => {
          return [
            category,
            ...series.map((s) => {
              const value = s.data[index] ? s.data[index].y : ''
              return formatNumber(value, decimalPrecision)
            }),
          ]
        }),
      }

      setTableData(tableData)
      setIsSeriesVisible(true)

      // Hide the HighCharts data table
      const highchartsDataTable = document.querySelector('.highcharts-data-table');
      if (highchartsDataTable) {
        highchartsDataTable.style.display = 'none';
      }
    }
  }, [selectedGraphData, chartRef])

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      const chart = chartRef.current.chart
      generateTableData()

      // Use Highcharts.addEvent for proper event binding
      const hideHandler = Highcharts.addEvent(
        chart.series,
        'hide',
        generateTableData,
      )
      const showHandler = Highcharts.addEvent(
        chart.series,
        'show',
        generateTableData,
      )

      return () => {
        // Clean up event listeners
        if (hideHandler) hideHandler()
        if (showHandler) showHandler()
      }
    }
  }, [chartRef])

  return { tableData, isSeriesVisible, generateTableData }
}
