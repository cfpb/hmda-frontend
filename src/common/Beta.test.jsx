import React from 'react'
import { shallow } from 'enzyme'
import Beta from './Beta.jsx'

const r = shallow(<Beta/>)

it('renders the Beta component', () => {
  expect(r.find('.Beta').length).toBe(1)
})
