import React from 'react'
import { shallow } from 'enzyme'
import X from './X.jsx'

const r = shallow(<X/>)

it('renders the X component', () => {
  expect(r.find('svg').length).toBe(1)
})
