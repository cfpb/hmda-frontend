import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QuarterlyFilerInstitutionApiUrl } from '../constants'

const initialState = {
  sort: [
    { id: 'name', desc: false },
  ],
}

const institutionsConfig = createSlice({
  name: 'institutionsConfig',
  initialState,
  reducers: {
    updateSort: (state, action) => {
      state.sort = action.payload
    },
  },
})

const institutionsApi = createApi({
  reducerPath: 'institutionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: QuarterlyFilerInstitutionApiUrl }),
  endpoints: (builder) => ({
    getQuarterliesWithLars: builder.query({
      query: ({ year, past }) => `${year}/lars/past/${past}`,
    }),
  }),
})

export const {
  reducer: configReducer,
  actions: { updateSort },
} = institutionsConfig

export const {
  useGetQuarterliesWithLarsQuery,
  reducerPath: apiReducerPath,
  reducer: apiReducer,
  middleware: apiMiddleware,
} = institutionsApi
