import React from 'react'

export const AppContext = React.createContext()

export function withAppContext(Component) {
  return (props) => (
    <AppContext.Consumer>
      {(value) => <Component {...props} {...value} />}
    </AppContext.Consumer>
  )
}
