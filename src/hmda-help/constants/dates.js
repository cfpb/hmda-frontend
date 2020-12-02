import { isBeta } from '../../common/configUtils'

// YYYY will come from state as filingPeriod
const dates = [
  { id: '2020', name:'2020', isBeta: '0' },
  { id: '2019', name:'2019', isBeta: '0' },
  { id: '2018', name:'2018', isBeta: '0' }
]

/* TODO: 
*    Build HHelp environment config or integrate broader Frontend env config.
*    For now, we want this behavior to persist in the Dev Beta environment without 
*     having to constantly ensure the "correct" version of the application is deployed.
*/ 
if (isBeta(window.location.host))
  dates.unshift({ id: '2021', name:'2021' })

export default dates