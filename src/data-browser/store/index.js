import { configureStore } from '@reduxjs/toolkit'
import { institutions, graphs } from '../graphs/slice'

export const store = configureStore({
  reducer: {
    institutionsConfig: institutions.configReducer,
    [institutions.apiReducerPath]: institutions.apiReducer,
    graphsConfig: graphs.configReducer,
    [graphs.apiReducerPath]: graphs.apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(graphs.apiMiddleware)
      .concat(institutions.apiMiddleware),
})
