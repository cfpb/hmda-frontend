import RefileButton from './RefileButton'

import './RefileButton.css'

describe('<RefileButton />', () => {
  it('renders', () => {
    cy.mount(<RefileButton config={config} />)
  })
})
