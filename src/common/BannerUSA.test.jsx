import React from 'react'
import { shallow } from 'enzyme'
import BannerUSA from './BannerUSA.jsx'

const r = shallow(<BannerUSA/>)

it('renders the img', () => {
  expect(r.find('img').length).toBe(1)
})

it('renders the correct text', () => {
  expect(r.text()).toBe('An official website of the United States government')
})
