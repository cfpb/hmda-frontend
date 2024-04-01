import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../../src/common/Footer.jsx'

const r = shallow(<Footer />)

it('renders the Footer component', () => {
  expect(r.find('.Footer').length).toBe(1)
})
