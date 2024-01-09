import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QuarterlyApiUrl } from '../constants'

const configsAdapter = createEntityAdapter({
  selectId: (config) => config.id,
})

const configSelectors = configsAdapter.getSelectors((state) => state.configs)

const initialState = {
  configs: configsAdapter.getInitialState(),
}

const graphsConfig = createSlice({
  name: 'graphsConfig',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      configsAdapter.upsertOne(state.configs, action)
    },
  },
})

const graphsApi = createApi({
  reducerPath: 'graphsApi',
  baseQuery: fetchBaseQuery({ baseUrl: QuarterlyApiUrl }),
  endpoints: (builder) => ({
    getAllGraphs: builder.query({
      query: () => '',
    }),
    getSingleGraph: builder.query({
      query: (endpoint) => endpoint,
    }),
  }),
})

const { setConfig: setConfigAction } = graphsConfig.actions

export const setConfig = (id, value) => setConfigAction({ id, value })

export const getConfig = (state, id) =>
  configSelectors.selectById(state, id)?.value

export const configReducer = graphsConfig.reducer

export const {
  useGetAllGraphsQuery,
  useGetSingleGraphQuery,
  endpoints: { getSingleGraph },
  reducerPath: apiReducerPath,
  reducer: apiReducer,
  middleware: apiMiddleware,
} = graphsApi
