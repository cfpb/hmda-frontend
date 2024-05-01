import React from 'react'
import { shallow } from 'enzyme'
import ImageCard from '../../src/data-browser/ImageCard.jsx'

it('renders an enabled ImageCard with image', () => {
  const r = shallow(
    <ImageCard path='a' year='b' image='c' caption='d' enabled />,
  )
  expect(r.find('img[src="c"]').length).toBe(1)
  expect(r.find('img[alt="d"]').length).toBe(1)
  expect(r.find('Link[to="a/b"]').length).toBe(1)
  expect(r.find('Link[disabled=false]').length).toBe(1)
})

it('renders an enabled ImageCard without an image', () => {
  const r = shallow(<ImageCard path='a' year='b' caption='d' enabled />)
  expect(r.find('img').length).toBe(0)
})

it('renders a disabled ImageCard', () => {
  const r = shallow(<ImageCard />)
  expect(r.find('img').length).toBe(0)
  expect(r.find('Link[disabled=true]').length).toBe(1)
})
