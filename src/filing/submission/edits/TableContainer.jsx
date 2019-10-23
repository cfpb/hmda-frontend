import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditsTable from './Table.jsx'

export class EditsTableContainer extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.paginationFade !== nextProps.paginationFade) return true
    return !nextProps.paginationFade
  }

  render() {
    return <EditsTable {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const name = ownProps.edit && ownProps.edit.edit

  const rowObj = state.app.edits.rows[name]
  const pagination = state.app.pagination[name]
  const paginationFade = state.app.paginationFade[name]

  return {
    rowObj,
    pagination,
    paginationFade
  }
}

export default connect(mapStateToProps)(EditsTableContainer)
