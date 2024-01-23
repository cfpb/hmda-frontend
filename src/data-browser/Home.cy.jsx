import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { getDefaultConfig } from '../common/configUtils'
import Home from './Home'

const { HOST } = Cypress.env()

describe('<Home />', () => {
  it('renders', () => {
    const config = getDefaultConfig(HOST)

    cy.mount(
      <BrowserRouter>
        <Home config={config} />
      </BrowserRouter>,
    )
    cy.get('[data-cy=dataBrowserAPILink]').should(
      'have.text',
      'HMDA Data Browser API',
    )
  })
})
