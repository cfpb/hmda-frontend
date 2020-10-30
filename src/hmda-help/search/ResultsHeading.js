import React from 'react'
import PropTypes from 'prop-types'

const ResultsHeading = props => {
  let numOfResults = props.institutions.filter(x => x).length
  if (numOfResults === 0) return <h2>Sorry, no results were found.</h2>

  let resultsText = numOfResults === 1 ? 'result' : 'results'
  return (
    <h2>
      {numOfResults} {resultsText} found
    </h2>
  )
}

ResultsHeading.propTypes = {
  institutions: PropTypes.array
}

export default ResultsHeading
