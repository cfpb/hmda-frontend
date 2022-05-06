/**
 * Next Up:
 * - Link the event listeners for this groups of graphs 
 *  = https://www.highcharts.com/demo/synchronized-charts
 *  = https://stackoverflow.com/questions/55392659/how-can-i-pass-values-from-highcharts-event-callbacks-click-mouseover-mouseou
 *  = Syncing tooltip -> https://stackoverflow.com/questions/36437297/highcharts-synchronized-charts-display-tooltip
 */
import { hmda_charts } from '../config'
import { cloneObject, isEven } from '../utils'
import LineGraph, { defaultAxisX } from '../LineGraph'
import Highcharts from 'highcharts'
import { useLayoutEffect } from 'react'
import { syncGraphEvents } from './linkGraphEvents'

const makePairs = (result, value, index, array) => {
  if (index % 2 === 0) result.push(array.slice(index, index + 2))
  return result
}

const makeHighchartsAxis = () => { }

const checkAxisX = axis => {
  if (!axis) return cloneObject(defaultAxisX)
  return axis
}

export const LineGraphDual = ({
  title,
  subtitle,
  yAxis,
  xAxis,
  series = [],
  footerText,
  legendRight,
  callback
}) => {
  if (!yAxis || !yAxis.length) return <p>No Data</p>

  const graphs = {}
  const refs = []
  const graphDefaults = [...Array(Math.floor(yAxis.length / 2))].map((_, idx) => ({
    id: idx,
    series: [],
    style: {},
  }))
  graphDefaults.forEach(g => graphs[g.id] = g)
  const lastGraphIdx = graphDefaults.length - 1
  
  // console.log('graphs: ', graphs)
  console.log('xAxis: ', xAxis)
  console.log('Highcharts.charts: ', Highcharts.charts)
  
  graphs[0].title = title
  graphs[0].subtitle = subtitle
  graphs[0].xAxis = [{ ...checkAxisX(xAxis), visible: false }]
  graphs[lastGraphIdx].xAxis = checkAxisX(xAxis)
  graphs[lastGraphIdx].footerText = footerText

  // Assign axes, two per graph
  const axisPairs = yAxis.reduce(makePairs, [])
  axisPairs.forEach((pair, idx) => {
    graphs[idx].yAxis = pair
  })

  // Assign series based on the associated axis
  series.forEach(s => {
    const axisIdx = s.yAxis || 0
    
    const graphIdx = axisPairs.findIndex((pair, idx) =>
      pair.includes(yAxis[axisIdx])
    )
    const adjusted = cloneObject(s)
    adjusted.yAxis = axisIdx % 2
    graphs[graphIdx].series.push(adjusted)
  })

  const getGraph = (graph, nextArg) => {
    console.log('Current graph')
    console.log(graph)
    console.log('nextArg', nextArg)
    refs.push(graph)
    console.log('refs', refs)
  }
  
  // Trying to attach shared event handlers
  useLayoutEffect(() => {
    syncGraphEvents(refs)
  })

  return (
    <div id='LineGraphDual' className='LineGraphDual'>
      {Object.keys(graphs)
        .sort()
        .map(idx => {
          const currentGraph = graphs[idx]
          console.log('Current graph: ', currentGraph)
          const conditionalProps = {}
          const key = currentGraph.yAxis.join('-')
          

          return (
            <div className='wrapper' key={key}>
              <LineGraph
                {...currentGraph}
                {...conditionalProps}
                legendRight={legendRight}
                callback={chart => getGraph(chart)}
              />
              {idx != lastGraphIdx && <div className='shared-border'></div>}
            </div>
          )
        })}
    </div>
  )
}
