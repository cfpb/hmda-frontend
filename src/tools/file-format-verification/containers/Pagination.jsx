import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPage, paginationFadeIn, paginationFadeOut } from '../actions'
import Pagination from '../components/Pagination.jsx'

class PaginationContainer extends Component {
  render() {
    return <Pagination {...this.props} />
  }
}

function mapStateToProps(state) {
  const { pagination } = state.app

  return {
    pagination
  }
}

function fadeAndSet(dispatch, page) {
  const fadeIn = () => {
    return dispatch(paginationFadeIn())
  }

  setTimeout(fadeIn, 300)
  dispatch(paginationFadeOut())
  dispatch(setPage(page))
}

function mapDispatchToProps(dispatch) {
  return {
    getPage: page => {
      if (page === undefined) return
      fadeAndSet(dispatch, page)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
export { PaginationContainer, mapStateToProps, mapDispatchToProps }
