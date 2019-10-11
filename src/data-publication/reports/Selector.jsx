import React from 'react'
import Select from 'react-select'
import Heading from '../../common/Heading.jsx'

import './Selector.css'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(option) {
    if (this.props.selectorCallback) this.props.selectorCallback(option.data)
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    this.props.history.push({
      pathname: url + option.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Heading type={4} headingText={this.props.header} />
        <Select
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          searchable={true}
          autoFocus
          menuIsOpen
          options={this.props.options}
          noResultsText={
            <div className="alert alert-error" role="alert">
              <div className="alert-body">
                <h3 className="alert-heading">No results found!</h3>
                Sorry, there doesn't seem to be a match found. Please try again.
              </div>
            </div>
          }
        />
      </React.Fragment>
    )
  }
}

export default Selector
