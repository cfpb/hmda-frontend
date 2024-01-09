import { createSlice } from '@reduxjs/toolkit'

export const S3Headers = createSlice({
  name: 's3Headers',
  initialState: { url: 'headers' },
  reducers: {
    saveHeaders: (state, action) => {
      const { url, headers } = action.payload
      state[url] = headers
    },
  },
})

export const { saveHeaders } = S3Headers.actions

export default S3Headers.reducer
