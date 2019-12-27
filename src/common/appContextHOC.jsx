import React from 'react'

export const AppContext = React.createContext()

export function withAppContext(Component) {
  return () => (
    <AppContext.Consumer>
      {value => <Component {...value} />}
    </AppContext.Consumer>
  )
}
