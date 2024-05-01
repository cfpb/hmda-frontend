import React from 'react'
import { shallow } from 'enzyme'
import Alert from '../../src/common/Alert.jsx'

it('renders null Alert with no children', () => {
  const r = shallow(<Alert />)
  expect(r.find('.alert').length).toBe(0)
})

it('renders Alert', () => {
  const r = shallow(
    <Alert>
      <p>abc</p>
    </Alert>,
  )
  expect(r.find('.alert').length).toBe(1)
  expect(r.find('.alert-info').length).toBe(1)
})

it('renders Alert with custom type', () => {
  const r = shallow(
    <Alert type='error'>
      <p>abc</p>
    </Alert>,
  )
  expect(r.find('.alert-error').length).toBe(1)
})

it('renders Alert with heading', () => {
  const r = shallow(
    <Alert heading='argle'>
      <p>abc</p>
    </Alert>,
  )
  expect(r.find('h3').text()).toBe('argle')
})
