import {
  createLEIOption,
  itemStyleFn,
  makeItemPlaceholder,
  sortByLabel,
} from '../../data-browser/datasets/selectUtils'

/** Construct the placeholder text for the Select box based on loading status and availability of options  */
export function itemPlaceholder(loading, hasItems, category, selectedValue) {
  if (loading) return 'Loading...'
  if (!hasItems || category === 'leis') return `Type to select an Institution`
  const placeholder = makeItemPlaceholder(category, [selectedValue])
  return placeholder
}

/** Create a map of Filers (Institution Name, LEI) by LEI for efficient access */
export function createLeiMap(json) {
  if (!json || !json.institutions.filter((x) => x.lei).length) return null

  return json.institutions.reduce((memo, curr) => {
    memo[curr.lei.toUpperCase()] = { ...curr, name: curr.name.toUpperCase() }
    return memo
  }, {})
}

/** Style adjustments for react-select components */
export const styleFn = {
  ...itemStyleFn,
  container: (p) => ({ ...p, width: '100%' }),
  control: (p) => ({ ...p, borderRadius: '4px' }),
}

/** Conditionally save the selected Institution */
export const saveSelected = (id, data, setFn) => {
  let selected = createLEIOption(id, data)
  // Line below helps hide dropdown menu when an LEI ID from the URL is not found in data
  selected.label = selected.label.replace('undefined - ', '')
  setFn(selected)
}

/** Generate and sort options, asc by Institution name */
export const buildOptions = (data) => {
  if (!data) return []

  return Object.keys(data)
    .map((d) => createLEIOption(d, data))
    .sort(sortByLabel)
}
