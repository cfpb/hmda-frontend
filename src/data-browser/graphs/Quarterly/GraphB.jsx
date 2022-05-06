import { LineGraph } from '../LineGraph/index'
import { randomNumber } from '../utils'

// Mock data
const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const ballon = [...count].map(_ => randomNumber(650, 1300))
const reverse = [...count].map(_ => randomNumber(0, 100))
const commercial = [...count].map(_ => randomNumber(10000, 21000))
const IO = [...count].map(_ => randomNumber(15000, 22000))
const negativeAmort = [...count].map(_ => randomNumber(0, 1000))

export const GraphB = () => (
  <LineGraph
    title={
      'Number of commercial purpose loans, reverse mortages, ballons, IO loans, and negative amortization loans'
    }
    subtitle={'Originated'}
    yAxis={[
      'Loan Count [Ballon and Reverse]',
      'Negative Amortization',
      'Commercial',
      'IO',
    ]}
    series={[
      {
        name: 'Ballon',
        data: ballon,
        yAxis: 0,
      },
      {
        name: 'Reverse',
        data: reverse,
        yAxis: 0,
      },
      {
        name: 'Negative Amortization',
        data: negativeAmort,
        yAxis: 1,
      },
      {
        name: 'Commercial',
        data: commercial,
        yAxis: 2,
      },
      {
        name: 'IO',
        data: IO,
        yAxis: 3,
      },
    ]}
    footerText='The trends of commercial purpose loans, reverse mortages, balloons, IO loans, and negative amortizatoin loans from 2018 to 2020 by quarter.  Graph uses the 19 FIs that reported HMDA data for 2018, 2019, and each quarter of 2020.'
    legendRight={true}
  />
)
