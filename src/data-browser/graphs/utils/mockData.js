import { produce } from 'immer'
import { yearQuarters } from '../config'
import { graphOptions, graphOptionsCategory } from '../graphOptions'

// Drop-down options
export const availableGraphs = graphOptions.map((g) => ({
  value: g.id,
  label: g.title,
  category: g.category,
}))

export const periodOpts = yearQuarters.map((yq) => ({ value: yq, label: yq }))

// Graph data
export const graphA_data1 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
]
export const randomize = (num) => Math.round(num * Math.random() * 10)

export const mockFetchedData = (selected, data, setData) =>
  setTimeout(() => {
    const nextState = produce(data, (draft) => {
      draft[selected.id] = [
        {
          name: 'Closed-End',
          data: graphA_data1.map(randomize),
          yAxis: 0,
        },
        {
          name: 'Open-End',
          data: graphA_data1.map(randomize),
          yAxis: 0,
        },
      ]
    })

    console.log(nextState, 'mock data state')
    setData(nextState)
  }, 1000)
