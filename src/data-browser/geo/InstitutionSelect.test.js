import { shallow } from 'enzyme'
import React from 'react'
import InstitutionSelect from './InstitutionSelect'

describe('InstitutionSelect', () => {
  it('selects all institutions by default and disables item input', () => {
    const changeSpy = jest.fn()
    const wrapper = shallow(
      <InstitutionSelect items={[]} onChange={changeSpy} options={[]} />
    )
    const itemSelect = wrapper.find('#lei-item-select')

    expect(itemSelect.prop('isDisabled')).toBe(true)
    expect(itemSelect.prop('placeholder')).toBe('All institutions selected')
  })

  it('enables item input for Nationwide', () => {
    const changeSpy = jest.fn()
    const wrapper = shallow(
      <InstitutionSelect items={[]} onChange={changeSpy} options={[]} nationwide={true}/>
    )
    const itemSelect = wrapper.find('#lei-item-select')

    expect(itemSelect.prop('isDisabled')).toBe(false)
    expect(itemSelect.prop('placeholder')).toContain('Select or type')
  })

})
