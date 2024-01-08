import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchPage from '../actions/fetchPage.js'
import paginationFadeIn from '../actions/paginationFadeIn.js'
import paginationFadeOut from '../actions/paginationFadeOut.js'
import Pagination from './index.jsx'

const fetchChecker = {}

class PaginationContainer extends Component {
  render() {
    return <Pagination {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const stateTarget = ownProps.target
  let isFetching

  if (stateTarget !== 'parseErrors') {
    if (state.app.edits.rows[stateTarget]) {
      isFetching = state.app.edits.rows[stateTarget].isFetching
    }
  } else {
    if (state.app[stateTarget]) {
      isFetching = state.app[stateTarget].isFetching
    }
  }

  fetchChecker[ownProps.target] = isFetching
  return {
    pagination: state.app.pagination[ownProps.target],
    transmittalSheetErrors: state.app.parseErrors.transmittalSheetErrors,
  }
}

function fetchAndFade(dispatch, target, pagination, link) {
  const fadeIn = () => {
    if (!fetchChecker[target]) return dispatch(paginationFadeIn(target))
    setTimeout(fadeIn, 100)
  }

  dispatch(paginationFadeOut(target))
  setTimeout(fadeIn, 300)
  dispatch(fetchPage(target, makePathname(pagination, link)))
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getPage: (pagination, page) => {
      if (!pagination || page === undefined) return
      fetchAndFade(dispatch, ownProps.target, pagination, '?page=' + page)
    },
    getNextPage: (pagination) => {
      if (!pagination) return
      fetchAndFade(
        dispatch,
        ownProps.target,
        pagination,
        pagination._links.next,
      )
    },
    getPreviousPage: (pagination) => {
      if (!pagination) return
      fetchAndFade(
        dispatch,
        ownProps.target,
        pagination,
        pagination._links.prev,
      )
    },
  }
}

function makePathname(pagination, querystring) {
  if (!pagination) return
  return pagination._links.href.slice(0, -5) + querystring
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
export {
  PaginationContainer,
  mapStateToProps,
  mapDispatchToProps,
  makePathname,
}
