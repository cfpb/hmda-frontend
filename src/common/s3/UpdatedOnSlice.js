import { createSlice } from '@reduxjs/toolkit'

export const UpdatedOn = createSlice({
  name: 'updatedOn',
  initialState: { "url": "date" },
  reducers: {
    saveDate: (state, action) => {
      const { url, date } = action.payload
      state[url] = date
    }
  }
})

export const { saveDate } = UpdatedOn.actions

export default UpdatedOn.reducer