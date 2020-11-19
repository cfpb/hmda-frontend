import { useEffect, useState } from 'react'
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'

const defaultState = {
  type: [],
  product: [],
  keywords: [],
}
const validParams = Object.keys(defaultState)

/**
 * State management for Change Log Filters
 * @param {Object} initState Collection of filters
 */
export function useChangeLogFilter(initState = defaultState) {
  const [filters, setFilters] = useState(initState)
  const history = useHistory()
  const location = useLocation()

  // Load filters from search query on initial render
  // eslint-disable-next-line
  useEffect(() => fromQueryString(location.search), [])

  // Update URL everytime the filters are updated
  // eslint-disable-next-line
  useEffect(() => history.push(location.pathname + toQueryString(filters)), [
    filters,
  ])

  /* Add a filter */
  const add = (key, value) => {
    if (key === 'keywords') {
      setFilters((state) => ({
        ...state,
        [key]: value ? value.split(' ') : [],
      }))
    }
    else setFilters((state) => ({ ...state, [key]: [...state[key], value] }))
  }

  /* Remove a filter */
  const remove = (key, value) => {
    if (key === 'keywords') {
      setFilters((state) => ({
        ...state,
        [key]: state[key].filter((word) => word !== value),
      }))
    }
    else
      setFilters((state) => ({
        ...state,
        [key]: [...state[key].filter((val) => val !== value)],
      }))
  }

  /* Clear a single filter or all filters */
  const clear = (filterType) => {
    if (filterType) setFilters((state) => ({ ...state, [filterType]: [] }))
    else setFilters(initState)
  }

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
        if (filterLists.keywords.length > 0) {
          const words = filterLists.keywords
            .filter((wrd) => wrd)
            .map((wrd) => wrd.toLowerCase())

          // Check if @string contains all strings @words
          const hasAllWords = (string, words) => {
            if (!string || !words || !words.length) return false
            return words.every(word => string.toLowerCase().indexOf(word.toLowerCase()) > -1)
          }

          // Search only Change Description by keyword
          result[date] = result[date].filter((item) =>
            hasAllWords(item.description, words)
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

  const highlightKeywords = (content) => {
    if (!filters.keywords) return content
    const keywords = filters.keywords.filter(x => x)

    let newContent = content.split(' ').filter(x => x).map((word, w_idx) => {
      if (!keywords.length) return word + ' '

      let highlightedWord = word
      let wordHighlighted = false

      keywords.forEach(keyword => {
        if (wordHighlighted) return
        const index = highlightedWord.toString().toLowerCase().indexOf(keyword.toLowerCase())

        if (index > -1) { 
          const before = word.substr(0, index)
          const highlight = word.substr(index, keyword.length)
          const after = word.substr(index + keyword.length )
        
          highlightedWord = (
            <>
              {before}
              <Highlighted text={highlight} />
              {after}
            </>
          )

          wordHighlighted = true
        }

      })

      return <span key={`highlight-${word}-${w_idx}`}>{highlightedWord}{' '}</span>
    })

    return <>{newContent}</>
  }

  /* Derive query string from filter state */
  const toQueryString = (filters) => {
    const params = Object.keys(defaultState)
    .filter(filterType => filters[filterType].length)
    .map((filterType) => `${filterType}=${filters[filterType].join(',')}`)

    return params ? `?${params.join('&')}` : ''
  }

  /* Derive filter state from query string */
  const fromQueryString = (qs) => {
    const qStrings = qs.replace(/\?/g, '').split('&').reduce((acc, curr) => {
      const [param, values] = curr.split('=')
      if (validParams.indexOf(param) > -1)
        acc[param] = values.split(',').filter(x => x)
      return acc
    }, {})

    if (Object.keys(qStrings).length) {
      setFilters(({ ...defaultState, ...qStrings}))
    }
  }

  return {
    filters,
    add,
    apply,
    clear,
    remove,
    toggle,
    highlightKeywords,
    toQueryString,
    fromQueryString
  }
}


const Highlighted = ({ text }) => {
  return (
    <span className='highlighted' >
      {text}
    </span>
  )
}