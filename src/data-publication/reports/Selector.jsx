import React from 'react'
import Select from 'react-select'
import Heading from '../../common/Heading.jsx'

import './Selector.css'

const Selector = (props) => {
  const handleChange = (option) => {
    if (props.selectorCallback) props.selectorCallback(option.data)
    let url = props.match.url
    if (!url.match(/\/$/)) url += '/'
    props.history.push({
      pathname: url + option.value,
    })
  }

  return (
    <>
      <Heading type={4} headingText={props.header} />
      <Select
        onChange={handleChange}
        placeholder={props.placeholder}
        searchable={true}
        autoFocus
        menuIsOpen
        options={props.options}
        noResultsText={
          <div className='alert alert-error' role='alert'>
            <div className='alert-body'>
              <h3 className='alert-heading'>No results found!</h3>
              Sorry, there doesn't seem to be a match found. Please try again.
            </div>
          </div>
        }
      />
    </>
  )
}

export default Selector
