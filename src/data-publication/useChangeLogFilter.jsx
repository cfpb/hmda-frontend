import { useState } from 'react'
import React from 'react';

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

          // // Check if @string contains @word
          // const hasPartialTextMatch = (string, word) => {
          //   if (!string || !word) return false
          //   return string.toLowerCase().indexOf(word.toLowerCase()) > -1
          // }

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
    let newContent = content.split(' ').filter(x => x).map((word, w_idx) => {
      const keywords = filters.keywords.split(' ').filter(x => x)
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

  return {
    filters,
    add,
    apply,
    clear,
    remove,
    toggle,
    highlightKeywords
  }
}


const Highlighted = ({ text }) => {
  return (
    <span className='highlighted' >
      {text}
    </span>
  )
}