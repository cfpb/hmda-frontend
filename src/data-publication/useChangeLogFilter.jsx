import { useState } from 'react'

const defaultState = {
  type: [],
  product: [],
  keywords: '',
}

/**
 * State management for Change Log Filters
 * @param {Object} initState Collection of filters
 */
export function useChangeLogFilter(initState = defaultState) {
  const [filters, setFilters] = useState(initState)

  /* Add a filter */
  const add = (key, value) => {
    if (key === 'keywords') setFilters((state) => ({ ...state, [key]: value }))
    else setFilters((state) => ({ ...state, [key]: [...state[key], value] }))
  }

  /* Remove a filter */
  const remove = (key, value) => {
    if (key === 'keywords') setFilters((state) => ({ ...state, [key]: value }))
    else
      setFilters((state) => ({
        ...state,
        [key]: [...state[key].filter((val) => val !== value)],
      }))
  }

  /* Clear all filters */
  const clear = () => setFilters(initState)

  /* Remove filter if it exists, add filter otherwise */
  const toggle = (key, value) => {
    if (filters[key].indexOf(value) > -1) return remove(key, value)
    add(key, value)
  }

  /* Apply filtering logic to a dataset */
  const apply = (sourceData = {}, filterLists = filters) => {
    let result = { ...JSON.parse(JSON.stringify(sourceData)) }

    Object.keys(result).forEach((date) => {
      // Array of Changes on this date
      if (result[date] && result[date].length) {
        // Keyword filter
        // TODO: Offer case sensitive option?
        if (filterLists.keywords && filterLists.keywords.length > 0) {
          const words = filterLists.keywords
            .split(' ')
            .filter((wrd) => wrd)
            .map((wrd) => wrd.toLowerCase())

          // Check if @string contains @word
          const hasPartialTextMatch = (string, word) => {
            if (!string || !word) return false
            return string.toLowerCase().indexOf(word.toLowerCase()) > -1
          }

          result[date] = result[date].filter((item) =>
            words.some((word) => {
              return (
                hasPartialTextMatch(item.type, word) || // Matches part of type
                hasPartialTextMatch(item.product, word) || // Matches part of product
                hasPartialTextMatch(item.description, word) || // Matches part of description
                hasPartialTextMatch(item.changeDateOrdinal, word) || // Matches part of changeDateOrdinal
                hasPartialTextMatch(item.productYear, word) // Matches part of productYear
              )
            })
          )
        }

        // Change Type filter
        if (filterLists.type && filterLists.type.length > 0) {
          result[date] = result[date].filter(
            (item) => filterLists.type.indexOf(item.type) > -1
          )
        }

        // Product filter
        if (filterLists.product && filterLists.product.length > 0) {
          result[date] = result[date].filter(
            (item) => filterLists.product.indexOf(item.product) > -1
          )
        }
      }
    })

    return result
  }

  return {
    filters,
    add,
    apply,
    clear,
    remove,
    toggle,
  }
}
