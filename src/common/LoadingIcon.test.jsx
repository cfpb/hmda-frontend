import React from 'react'
import { shallow } from 'enzyme'
import LoadingIcon from './LoadingIcon.jsx'

it('renders default LoadingIcon', () => {
  const r = shallow(<LoadingIcon/>)
  expect(r.find('.LoadingIcon').length).toBe(1)
})

it('renders LoadingIcon w/ custom class', () => {
  const r = shallow(<LoadingIcon className="argle"/>)
  expect(r.find('.argle').length).toBe(1)
})
