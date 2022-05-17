import { useEffect, useState } from 'react'
import Select from '../Select.jsx'
import { Graph } from './Graph'
import { graphOptions } from './graphOptions'
import './graphs.css'
import { GraphsHeader } from './GraphsHeader'
import { deriveHighchartsConfig } from './highchartsConfig'
import { PeriodSelectors } from './PeriodSelectors'
import { availableGraphs, mockFetchedData, periodOpts } from './utils/mockData'

export const Graphs = (props) => {
  const [selected, setSelected] = useState(graphOptions[0]) // Selected graph
  const [data, setData] = useState({}) // API data cache
  const [periodLow, setPeriodLow] = useState(periodOpts[0]) // Period filters
  const [periodHigh, setPeriodHigh] = useState(periodOpts[periodOpts.length-1])

  const handleGraphSelection = e => {
    setSelected(graphOptions.find(opt => opt.id == e.value))
    props.history.push(`/data-browser/graphs/${e.value}`) // Push graph-id to url when one has been selected
  }

  // Fetch API data on graph selection
  useEffect(() => {
    if (!selected) return
    if (data[selected.id]) return // Already cached

    let splitURL = window.location.href.split("/"); // Splits the URL to allow easier access to graph-id

    // adding graph-id to the url makes it's length 6
    if (splitURL.length === 6) {
      setSelected(graphOptions.find(opt => opt.id == splitURL[5])) // Find match from graphOptions based off graph-id from URL
    }

    // Update URL to hold the initial graph-id when page loads
    if (selected && splitURL.length !== 6) {
      props.history.push(`/data-browser/graphs/${selected.id}`)
    }

    // Mock data fetching
    mockFetchedData(selected, data, setData)
  }, [selected])

  // The indexes to which we will filter the data before passing to Highcharts, based on the selected Filing Period range
  let lowerLimit = periodOpts.indexOf(periodLow)
  let upperLimit = periodOpts.indexOf(periodHigh) + 1

  return (
    <div className='Graphs'>
      <GraphsHeader />
      <Select
        options={availableGraphs}
        placeholder='Select a Graph'
        onChange={e => handleGraphSelection(e)}
        value={{ value: selected.id, label: selected.title }}
      />
      <PeriodSelectors
        {...{ periodOpts, periodLow, setPeriodLow, periodHigh, setPeriodHigh }}
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
    </div>
  )
}
