import React from 'react'
import { shallow } from 'enzyme'
import PDFIcon from '../../src/common/images/PDFIcon.jsx'

const r = shallow(<PDFIcon />)

it('renders the PDFIcon component with default classname', () => {
  expect(r.find('svg.PDFIcon').length).toBe(1)
})

it('renders the PDFIcon component with custom classname', () => {
  expect(
    shallow(<PDFIcon className='custom' />).find('svg.custom').length,
  ).toBe(1)
})
