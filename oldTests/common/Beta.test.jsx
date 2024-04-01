import React from 'react'
import { shallow } from 'enzyme'
import Beta from '../../src/common/Beta.jsx'

const r = shallow(<Beta />)

it('renders the Beta component', () => {
  expect(r.find('.Beta').length).toBe(1)
})
