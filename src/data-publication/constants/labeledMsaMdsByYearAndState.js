// let's us generate the list of MSA/MDs organized by state with their associated labels for
// Aggregate reports that data-publication/constants/stateToMsas.js used to do but without
// a bunch of hard to maintain variables

import msaToNameByYear from '../../data-browser/constants/msaToName'
import stateToMsasByYear from '../../data-browser/constants/stateToMsas'

const labeledMsaMdsByYearAndState = {}

for (const year of Object.keys(stateToMsasByYear)) {
  const statesForYear = stateToMsasByYear[year]
  const namesForYear = msaToNameByYear[year] || {}
  labeledMsaMdsByYearAndState[year] = {}

  for (const state of Object.keys(statesForYear)) {
    labeledMsaMdsByYearAndState[year][state] = statesForYear[state].map(
      (msaMdCode) => ({
        id: Number(msaMdCode),
        name: namesForYear[msaMdCode],
      }),
    )
  }
}

export default labeledMsaMdsByYearAndState
