import { LineGraph } from '../LineGraph/index'

// Mock data
const graphA_data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const graphA_data2 = [...graphA_data1].reverse().map(num => num * 1000)

export const GraphA = () => (
  <LineGraph
    title={'Volume of Closed-end Mortgages and Open-end LOCs by Quarter'}
    subtitle={'1st lien, owner-occupied, 1-4, site-built'}
    yAxis={['Closed-End', 'Open-End']}
    series={[
      {
        name: 'Closed-End',
        data: graphA_data2,
        yAxis: 0,
      },
      {
        name: 'Open-End',
        data: graphA_data1,
        yAxis: 1,
      },
    ]}
    footerText='The trends of Closed-End and Open-End from 2018 to 2020 by quarter. Data used for the graph excludes commercial loans, reverse mortgages, IO loans, and negative amortization loans. Graph uses the 19 FIs that reported HMDA data for 2018, 2019 and each quarter of 2020.'
  />
)
