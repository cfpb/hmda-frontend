import React from 'react'
import { shallow } from 'enzyme'
import NotFound from '../../src/common/NotFound.jsx'

it('renders NotFound component', () => {
  const r = shallow(<NotFound />)
  expect(r.find('.NotFound').length).toBe(1)
  expect(r.find('Link').length).toBe(1)
})
