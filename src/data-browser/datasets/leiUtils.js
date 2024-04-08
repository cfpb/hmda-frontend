import { runFetch, makeFilersUrl } from '../api.js'
import { isEqual } from 'lodash'
import { before2018 } from './selectUtils.js'

export function keepValidLeis(valid, selected) {
  return selected.filter((s) => valid[s])
}

export function filterLeis() {
  const leis = this.state.leiDetails.leis
  if (Object.keys(leis).length) {
    const validLeis = keepValidLeis(leis, this.state.leis)
    if (!isEqual(this.state.leis, validLeis))
      this.onInstitutionChange(validLeis.map((v) => ({ value: v })))
  }
}

let fetchTracker = 0

export function fetchLeis() {
  const { category, items, year } = this.state
  const localTracker = ++fetchTracker

  this.setState((state) => ({
    leiDetails: { ...state.leiDetails, loading: true },
  }))
  return runFetch(makeFilersUrl({ category, items, year }))
    .then((data) => {
      if (localTracker !== fetchTracker) return
      const counts = {},
        leis = {}
      data.institutions.forEach((institution) => {
        const id = before2018(year) ? institution.arid : institution.lei
        counts[id] = institution.count
        leis[id] = { ...institution }
      })
      this.setState({
        leiDetails: {
          loading: false,
          leis,
          counts,
        },
      })
    })
    .catch((error) => {
      return this.setStateAndRoute({ error })
    })
}
