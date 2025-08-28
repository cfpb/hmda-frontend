import React from 'react'

export const AppContext = React.createContext()

export function withAppContext(Component) {
  return function (props) {
    return (
      <AppContext.Consumer>
        {(value) => <Component {...props} {...value} />}
      </AppContext.Consumer>
    )
  }
}
