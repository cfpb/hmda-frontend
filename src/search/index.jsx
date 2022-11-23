import React, { useEffect, useState } from 'react'
import LUNR_INDEX from './buildLunr.mjs'
import './search.css'

/*
  Feature ideas: 
    - Include small exerb about the content that was searched
    - Limit search results to 5 - 8?

  TODO:
    - Disover how to include slugs from Lunr search result - currently it only displays `ref` which is the title of the document
    - Use slugs to visit respective documentation url
    - CSS animations for when search results get displayed
*/

const Search = () => {
  const [searchResults, setSearchResults] = useState()

  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])

  const handleSearch = e => {
    if (e.target.value == '') {
      return
    } else {
      LUNR_INDEX.then(index => setSearchResults(index.search(e.target.value)))
    }
  }

  return (
    <div>
      <h2>Search Component Testing</h2>
      <br />
      <input
        className='search-input'
        placeholder='Discover the docs'
        onChange={handleSearch}
      />

      {searchResults && (
        <div
          className={searchResults.length > 0 ? 'search-results-container' : ''}
        >
          {searchResults.map((result, index) => (
            <p key={index}>
              <a href='#slug-to-document'>{result.ref}</a>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
