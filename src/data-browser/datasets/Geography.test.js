import React from 'react'
import { shallow } from 'enzyme'
import Geography from './Geography'

describe('Geography', () => {
  const geoFromQS = qs =>
    shallow(
      <Geography
        location={{ search: qs, pathname: '/data/2018' }}
        match={{ params: { year: '2018' } }}
      />
    )

  const getActionProp = (wrapper, key) =>
    wrapper.find('ActionsWarningsErrors').prop(key)

  const details = { details: { aggregations: [{ count: 10 }] } }

  describe('Nationwide', () => {
    it('without variables enables download, disables view summary', () => {
      const wrapper = geoFromQS('?category=nationwide&actions_taken=')
      expect(getActionProp(wrapper, 'downloadEnabled')).toBe(true)
      expect(getActionProp(wrapper, 'summaryEnabled')).toBe(false)
    })

    it('with variables enables download, enables view summary', () => {
      const wrapper = geoFromQS('?category=nationwide&actions_taken=1')
      expect(getActionProp(wrapper, 'downloadEnabled')).toBe(true)
      expect(getActionProp(wrapper, 'summaryEnabled')).toBe(true)
    })

    it('shows View Summary button prior to getting aggregation details', () => {
      const wrapper = geoFromQS('?category=nationwide&actions_taken=1')
      expect(getActionProp(wrapper, 'showSummaryButton')).toBe(true)
    })

    it('hides View Summary button when it has aggregation details', () => {
      const wrapper = geoFromQS('?category=nationwide&actions_taken=1')
      wrapper.setState({ ...details })
      expect(getActionProp(wrapper, 'showSummaryButton')).toBe(false)
    })
  })

  describe('States', () => {
    it('without items or variables it disables actions', () => {
      const wrapper = geoFromQS('?category=states&actions_taken=')
      expect(getActionProp(wrapper, 'downloadEnabled')).toBeFalsy()
      expect(getActionProp(wrapper, 'summaryEnabled')).toBeFalsy()
    })

    it('without items but with variables it disables actions', () => {
      const wrapper = geoFromQS('?category=states&actions_taken=1')
      expect(getActionProp(wrapper, 'downloadEnabled')).toBeFalsy()
      expect(getActionProp(wrapper, 'summaryEnabled')).toBeFalsy()
    })

    it('with items and variables it enables actions', () => {
      const wrapper = geoFromQS('?category=states&items=AL&actions_taken=1')
      expect(getActionProp(wrapper, 'downloadEnabled')).toBeTruthy()
      expect(getActionProp(wrapper, 'summaryEnabled')).toBeTruthy()
    })

    it('with items but without variables it disables summary', () => {
      const wrapper = geoFromQS('?category=states&items=AL&actions_taken=')
      expect(getActionProp(wrapper, 'downloadEnabled')).toBeTruthy()
      expect(getActionProp(wrapper, 'summaryEnabled')).toBeFalsy()
    })

    it('shows View Summary button prior to getting aggregation details', () => {
      const wrapper = geoFromQS('?category=states&actions_taken=1')
      expect(getActionProp(wrapper, 'showSummaryButton')).toBe(true)
    })

    it('hides View Summary button when it has aggregation details', () => {
      const wrapper = geoFromQS('?category=states&actions_taken=1')
      wrapper.setState({ ...details })
      expect(getActionProp(wrapper, 'showSummaryButton')).toBe(false)
    })
  })
})
