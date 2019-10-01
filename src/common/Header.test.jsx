import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header.jsx'

it('renders the Header with default links', () => {
  const r = shallow(<Header/>)
  expect(r.find('li').length).toBe(6)
})

it('renders the Header with provided links', () => {
  const r = shallow(<Header links={[{name:'a', href:'/b'}]}/>)
  expect(r.find('li').length).toBe(1)
})

it('only sets one active link', () => {
  const r = shallow(<Header/>)
  expect(r.find('.active').length).toBe(1)
})
