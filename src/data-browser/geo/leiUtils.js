import { runFetch, makeFilersUrl } from '../api.js'
import { isEqual } from 'lodash'

export function keepValidLeis(valid, selected) {
  return selected.filter(s => valid[s])
}

export function filterLeis() {
  const leis = this.state.leiDetails.leis
  if (Object.keys(leis).length) {
    const validLeis = keepValidLeis(leis, this.state.leis)
    if (!isEqual(this.state.leis, validLeis))
      this.onInstitutionChange(validLeis.map(v => ({ value: v })))
  }
}

let fetchTracker = 0

export function fetchLeis() {
  const { category, items } = this.state
  const localTracker = ++fetchTracker

  this.setState(state => ({ leiDetails: { ...state.leiDetails, loading: true }}))
  runFetch(makeFilersUrl({ category, items }))
    .then(data => {
      if(localTracker !== fetchTracker) return
      const counts = {}, leis = {}
      data.institutions.forEach(institution => {
        counts[institution.lei] = institution.count
        leis[institution.lei] = {...institution}
      })
      this.setState({
        leiDetails: {
          loading: false,
          leis,
          counts
        }
      })
    })
    .catch(error => {
      return this.setStateAndRoute({error})
    })
}
