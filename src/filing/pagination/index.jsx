import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../common/Loading.jsx'

import './Pagination.css'

let scrollHeight
let scrollDiff

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '1' }
    this._change = this._change.bind(this)
    this._submit = this._submit.bind(this)
    this._setFromProps = this._setFromProps.bind(this)
  }

  _change(e) {
    this.setState({ value: e.target.value })
  }

  _setScrollValues() {
    scrollHeight = document.body.scrollHeight
    scrollDiff = scrollHeight - window.scrollY
  }

  _setFromProps() {
    const val = this._getPaginationValue(this.props)
    if (val === null) return
    if (this.state.value !== val) this.setState({ value: val })
  }

  _submit(e) {
    e.preventDefault()

    this._setScrollValues()

    let val = parseInt(this.state.value, 10)
    const first = this._getPaginationValue(this.props, 'first')
    const last = this._ensureLast(this.props, this._getPaginationValue(this.props, 'last'))

    if (isNaN(val)) return this._setFromProps()

    if (val < first) val = first
    if (val > last) val = last

    this.props.getPage(this.props.pagination, val)
  }

  //required due to backend total being off for parseErrors
  _ensureLast(props, last) {
    if(props.target === 'parseErrors' &&
      props.pagination &&
      ((props.pagination.total - 1) % 20) === 0 &&
      props.transmittalSheetErrors.length) {
        return last - 1
    }
    return last
  }

  _getPaginationValue(props, target = 'self') {
    if (!props.pagination) return null
    return props.pagination._links[target].match(/[^=]+$/)[0]
  }

  _getInput(target) {
    return (
      <form onSubmit={this._submit}>
        <label htmlFor={target}>{target}</label>
        <input
          id={target}
          type="text"
          value={this.state.value}
          onBlur={this._setFromProps}
          onChange={this._change}
        />
      </form>
    )
  }

  componentWillMount() {
    this._setFromProps()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pagination || nextProps.isFetching) return
    this.setState({ value: this._getPaginationValue(nextProps) })
  }

  componentDidUpdate(prevProps, prevState) {
    const currentScroll = document.body.scrollHeight
    if (
      this.state.value !== prevState.value &&
      currentScroll !== scrollHeight
    ) {
      window.scrollTo(0, currentScroll - scrollDiff)
      scrollHeight = currentScroll
    }
  }

  render() {
    const props = this.props
    const page = props.pagination
    if (!page) return null

    const firstPage = page._links.self === page._links.first
    let lastPage = page._links.self === page._links.last
    let total = page.total

    if(props.target === 'parseErrors' && props.transmittalSheetErrors.length){
      total--
      //Backend provides too many pages for parse errors because
      //we don't paginate over transmittalSheetErrors
      if(total%20 === 0) {
        const lastSplit = page._links.last.split('=')
        lastPage = page._links.self === lastSplit[0] + '=' + (lastSplit[1] - 1)
      }
    }

    // we've decided that 20 is the default for pagination
    if (total < 21) return null

    return (
      <div className="PaginationControls">
        <button
          className={firstPage ? 'button button-disabled' : ''}
          onClick={e => {
            if (!firstPage) {
              this._setScrollValues()
              props.getPreviousPage(page)
            }
          }}
        >
          Previous
        </button>
        <div>
          Page {this._getInput(this.props.target)} of{' '}
          {Math.ceil(total / 20)}
        </div>
        <button
          className={lastPage ? 'button button-disabled' : ''}
          onClick={e => {
            if (!lastPage) {
              this._setScrollValues()
              props.getNextPage(page)
            }
          }}
        >
          Next
        </button>
        {props.isFetching ? <Loading /> : null}
      </div>
    )
  }
}

Pagination.propTypes = {
  isFetching: PropTypes.bool,
  pagination: PropTypes.object,
  getPage: PropTypes.func,
  getPreviousPage: PropTypes.func,
  getNextPage: PropTypes.func
}

export default Pagination
