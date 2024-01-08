import { useSelector } from 'react-redux'
import { graphs } from '../slice'
import { QUARTERS } from '../slice/graphConfigs'

/**
 * Derive the latest year for which data is available based on
 * the period options included in the graph data.
 * @returns Int
 */
export const useLatestAvailableYear = () => {
  const config = useSelector(({ graphsConfig }) => graphsConfig)
  const quarters = graphs.getConfig(config, QUARTERS)

  if (!quarters || !quarters.length) return 0

  const year = quarters[quarters.length - 1]?.value.split('-')[0]
  return (year && parseInt(year, 10)) || 0
}
