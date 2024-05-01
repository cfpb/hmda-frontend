import React from 'react'
import { shallow } from 'enzyme'
import Home from '../../src/data-browser/Home.jsx'

const r = shallow(<Home />)

it('renders the Home component', () => {
  expect(r.find('.home').length).toBe(1)
  expect(r.find('Header').length).toBe(1)
  expect(r.find('ImageCard').length).toBe(2)
})
