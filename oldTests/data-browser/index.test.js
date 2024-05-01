import React from 'react'
import { shallow } from 'enzyme'
import App from '../../src/data-browser'

const r = shallow(<App />)

it('renders a header', () => {
  expect(r.find('Header').length).toBe(1)
})

it('renders a three routes', () => {
  expect(r.find('Route').length).toBe(3)
})

it('renders a footer', () => {
  expect(r.find('Footer').length).toBe(1)
})
