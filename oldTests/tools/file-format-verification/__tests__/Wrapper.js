import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

export default class Wrapper extends Component {
  render() {
    return (
      <Provider store={mockStore(this.props.store || {})}>
        {this.props.children}
      </Provider>
    )
  }
}
